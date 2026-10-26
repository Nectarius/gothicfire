package game

import EnvConfig
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.websocket.*
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.delay
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import models.*
import org.slf4j.LoggerFactory
import java.util.UUID


class GameSession(
    var gameState: GameState = GameState(),
    val gameId: String = "global_game",
    val ownerUserId: String? = null
) {
    private val logger = LoggerFactory.getLogger(GameSession::class.java)
    private val mutex = Mutex()
    
    private val advisorService: AdvisorService by lazy {
        val client = HttpClient(CIO)
        val agentUrl = EnvConfig["AI_AGENT_URL"] ?: EnvConfig["AI_AGENT_ENDPOINT"] ?: "http://127.0.0.1:8000"
        val timeout = EnvConfig["AI_AGENT_TIMEOUT_MS"]?.toLongOrNull() ?: 90000L
        AdvisorService(client, agentUrl, timeout)
    }
    
    companion object {
        // 2 hours in milliseconds
        const val ABANDON_TIMEOUT_MS = 2 * 60 * 60 * 1000L
    }
    
    private fun saveCurrentState(trigger: String) {
        val humanPlayer = gameState.players.find { !it.isBot }
        db.GameRepository.saveGameState(
            gameId = gameId,
            state = gameState,
            trigger = trigger,
            userId = ownerUserId,
            playerName = humanPlayer?.name ?: gameState.creatorPlayerId
        )
    }
    
    suspend fun reconnect(playerId: String, session: DefaultWebSocketSession) {
        mutex.withLock {
            connections[playerId] = session
            lastSeenTimestamps[playerId] = System.currentTimeMillis()
        }
    }
    
    // WebSockets connected to this session
    val connections = mutableMapOf<String, DefaultWebSocketSession>()
    
    // Observers who are connected but not yet on a team
    val observers = mutableMapOf<String, DefaultWebSocketSession>()

    data class PendingTacticalBattle(
        val isPlaceAction: Boolean,
        val targetSector: String,
        val strategy: BattleStrategy,
        val attackerCharId: String,
        val defenderCharId: String,
        val attackerPlayerId: String,
        val defenderPlayerId: String
    )

    var pendingTacticalBattle: PendingTacticalBattle? = null
    
    suspend fun addObserver(observerId: String, session: DefaultWebSocketSession) {
        mutex.withLock {
            observers[observerId] = session
        }
        broadcastState()
    }
    
    suspend fun removeObserver(observerId: String) {
        mutex.withLock {
            observers.remove(observerId)
        }
    }
    
    suspend fun createGame(playerName: String, gameName: String) {
        mutex.withLock {
            if (gameState.status == GameStatus.NOT_CREATED || gameState.status == GameStatus.GAME_OVER) {
                gameState = gameState.copy(
                    status = GameStatus.LOBBY,
                    gameName = gameName,
                    creatorPlayerId = playerName,
                    teamInfos = emptyMap()
                )
            }
        }
        broadcastState()
    }
    
    suspend fun cancelGame(playerName: String) {
        mutex.withLock {
            if (gameState.status == GameStatus.LOBBY && gameState.creatorPlayerId == playerName) {
                logger.info("Game cancelled by creator $playerName")
                gameState = GameState()
            }
        }
        broadcastState()
    }
    

    suspend fun createTeamAndJoin(incomingPlayerId: String, team: Team, name: String, color: String, playerName: String, session: DefaultWebSocketSession): String? {
        mutex.withLock {
            if (gameState.status != GameStatus.LOBBY) return null
            if (gameState.teamInfos.containsKey(team)) return null // already created
            
            val newTeamInfo = TeamInfo(id = team, name = name, color = color, creatorId = incomingPlayerId)
            gameState = gameState.copy(
                teamInfos = gameState.teamInfos + (team to newTeamInfo)
            )
        }
        // Now automatically join the team
        return joinTeam(incomingPlayerId, playerName, team, session)
    }
    
    // Tracks when each player was last seen (connected via WebSocket).
    // Updated on join/reconnect and on every broadcastState for connected players.
    // Set to current time on disconnect so we can measure how long they've been gone.
    private val lastSeenTimestamps = mutableMapOf<String, Long>()
    
    suspend fun joinTeam(incomingPlayerId: String, playerName: String, team: Team, session: DefaultWebSocketSession): String? {
        var effectivePlayerId = incomingPlayerId
        var success = false
        
        mutex.withLock {
            if (gameState.status == GameStatus.IN_PROGRESS) {
                // Game is in progress — only allow reconnecting an existing player on the same team
                val existingPlayer = gameState.players.find { it.name.equals(playerName, ignoreCase = true) && it.team == team }
                    ?: gameState.players.find { it.team == team }
                    ?: gameState.players.find { it.id == incomingPlayerId }
                
                if (existingPlayer != null) {
                    effectivePlayerId = existingPlayer.id
                    connections[effectivePlayerId] = session
                    lastSeenTimestamps[effectivePlayerId] = System.currentTimeMillis()
                    success = true
                    val observerId = observers.entries.find { it.value == session }?.key
                    if (observerId != null) {
                        observers.remove(observerId)
                    }
                    logger.info("Reconnected player '{}' (id={}) to active game.", existingPlayer.name, effectivePlayerId)
                } else {
                    // Block new players from joining an active game
                    connections[incomingPlayerId] = session
                    broadcastError(incomingPlayerId, "Game is currently in progress. New players cannot join.")
                    connections.remove(incomingPlayerId)
                    logger.info("Rejected new player '{}' — game already in progress.", playerName)
                    return@withLock
                }
            } else if (gameState.status == GameStatus.GAME_OVER) {
                // Game is over — block joining, the session manager should reset first
                connections[incomingPlayerId] = session
                broadcastError(incomingPlayerId, "Game is over. Please wait for a new game to start.")
                connections.remove(incomingPlayerId)
                return@withLock
            } else {
                // LOBBY — allow new players to join
                val teamCount = gameState.players.count { it.team == team }
                if (teamCount >= 5) {
                    connections[incomingPlayerId] = session
                    broadcastError(incomingPlayerId, "Team $team is full.")
                    connections.remove(incomingPlayerId)
                    return@withLock
                }
                
                val observerId = observers.entries.find { it.value == session }?.key
                if (observerId != null) {
                    observers.remove(observerId)
                }
                
                // If player already exists, they might be rejoining, otherwise add them
                if (gameState.players.none { it.id == incomingPlayerId }) {
                    val newPlayer = Player(id = incomingPlayerId, name = playerName, team = team)
                    gameState = gameState.copy(players = gameState.players + newPlayer)
                }
                connections[incomingPlayerId] = session
                lastSeenTimestamps[incomingPlayerId] = System.currentTimeMillis()
                success = true
            }
        }
        
        if (success) {
            broadcastState()
            return effectivePlayerId
        }
        return null
    }
    
    suspend fun leave(playerId: String) {
        mutex.withLock {
            connections.remove(playerId)
            // Record the disconnect timestamp so we can track abandonment
            lastSeenTimestamps[playerId] = System.currentTimeMillis()
            
            if (gameState.status == GameStatus.LOBBY) {
                gameState = gameState.copy(
                    players = gameState.players.filter { it.id != playerId },
                    characters = gameState.characters.filter { it.playerId != playerId }
                )
                lastSeenTimestamps.remove(playerId)
            }
        }
        
        // Check if an entire team has abandoned during an active game
        checkAbandonmentTimeout()
        
        broadcastState()
    }
    
    /**
     * Checks if all players on one team have been disconnected for longer than ABANDON_TIMEOUT_MS.
     * If so, the opposing team wins by forfeit.
     */
    private suspend fun checkAbandonmentTimeout() {
        mutex.withLock {
            if (gameState.status == GameStatus.NOT_CREATED) return
            
            if (connections.isEmpty() && observers.isEmpty() && lastSeenTimestamps.isNotEmpty()) {
                if (gameState.isPvE) {
                    logger.info("PvE player disconnected for gameId '{}'. Saving game state and keeping session active.", gameId)
                    try {
                        saveCurrentState("PLAYER_DISCONNECTED")
                    } catch (e: Exception) {
                        logger.warn("Could not save PvE state on disconnect: {}", e.message)
                    }
                    return@withLock
                }
                
                logger.info("All players and observers have disconnected. Game ends and resets.")
                gameState = GameState()
                try {
                    saveCurrentState("ALL_DISCONNECTED")
                } catch (e: Exception) {
                    logger.debug("Could not save disconnected state: {}", e.message)
                }
                return@withLock
            }
            
            if (gameState.status != GameStatus.IN_PROGRESS) return
            
            val now = System.currentTimeMillis()
            
            for (team in gameState.teamInfos.keys) {
                val teamPlayerIds = gameState.players.filter { it.team == team && !it.isBot }.map { it.id }
                if (teamPlayerIds.isEmpty()) continue
                
                // Check if ALL players on this team are disconnected AND have been gone for 2+ hours
                val allAbandoned = teamPlayerIds.all { playerId ->
                    val isDisconnected = !connections.containsKey(playerId)
                    if (!isDisconnected) return@all false
                    
                    val lastSeen = lastSeenTimestamps[playerId] ?: now
                    (now - lastSeen) >= ABANDON_TIMEOUT_MS
                }
                
                if (allAbandoned) {
                    val winningTeam = gameState.teamInfos.keys.firstOrNull { it != team } ?: Team.RED
                    logger.info("Team {} has been abandoned for 2+ hours. Team {} wins by forfeit.", team, winningTeam)
                    gameState = gameState.copy(
                        status = GameStatus.GAME_OVER,
                        winningTeam = winningTeam
                    )
                    saveCurrentState("ABANDON_FORFEIT")
                    return
                }
            }
        }
    }
    
    suspend fun toggleReady(playerId: String) {
        mutex.withLock {
            if (gameState.status != GameStatus.LOBBY) return
            
            val newPlayers = gameState.players.map {
                if (it.id == playerId) it.copy(isReady = !it.isReady) else it
            }
            gameState = gameState.copy(players = newPlayers)
        }
        broadcastState()
    }
    
    suspend fun selectCastleAndReady(playerId: String, castleId: String) {
        mutex.withLock {
            if (gameState.status != GameStatus.LOBBY) return
            val player = gameState.players.find { it.id == playerId } ?: return
            
            val territory = MapData[castleId]
            if (territory == null || !territory.isCastle) return
            if (gameState.teamCastles.containsValue(castleId)) return // already taken
            
            val newTeamCastles = gameState.teamCastles.toMutableMap()
            newTeamCastles[player.team] = castleId
            
            val newPlayers = gameState.players.map {
                if (it.id == playerId) it.copy(isReady = true) else it
            }
            
            gameState = gameState.copy(players = newPlayers, teamCastles = newTeamCastles)
        }
        broadcastState()
    }
    
    suspend fun startGame(playerId: String) {
        mutex.withLock {
            if (gameState.status != GameStatus.LOBBY) return
            
            val player = gameState.players.find { it.id == playerId }
            if (player?.name != gameState.creatorPlayerId) return@withLock
            
            if (gameState.teamInfos.size != 2) return@withLock
            
            val teams = gameState.teamInfos.keys.toList()
            val allTeamsHavePlayers = teams.all { t -> gameState.players.any { it.team == t } }
            if (!allTeamsHavePlayers) {
                return@withLock
            }
            
            // Check if all players are ready
            if (gameState.players.any { !it.isReady }) {
                return@withLock
            }
            
            // All good, start
            val initialTerritories = MapData.mapValues { (sectorId, territory) ->
                TerritoryState(
                    sectorId = sectorId,
                    ownerPlayerId = null,
                    ownerTeam = null,
                    cultivation = territory.cultivation,
                    protection = territory.protection,
                    food = 0,
                    gold = 0
                )
            }.toMutableMap()

            // Automatically place player characters into their team's castle
            val updatedCharacters = gameState.characters.map { char ->
                val player = gameState.players.find { it.id == char.playerId }
                val team = player?.team ?: teams[0]
                val defaultCastle = if (team == teams[0]) "14" else "23"
                val castleSector = gameState.teamCastles[team] ?: defaultCastle
                
                // Assign starting castle ownership to the player/team
                val castleTerr = initialTerritories[castleSector]
                if (castleTerr != null) {
                    initialTerritories[castleSector] = castleTerr.copy(
                        ownerPlayerId = char.playerId,
                        ownerTeam = team
                    )
                }
                
                char.copy(
                    currentSector = castleSector,
                    hasActedThisTurn = false
                )
            }
            
            gameState = gameState.copy(
                status = GameStatus.IN_PROGRESS,
                activeTeamTurn = teams[0],
                currentTurn = 1,
                territories = initialTerritories,
                characters = updatedCharacters
            )
        }
        
        val teams = gameState.teamInfos.keys.toList()
        val allTeamsHavePlayers = teams.size == 2 && teams.all { t -> gameState.players.any { it.team == t } }
        if (!allTeamsHavePlayers) {
            broadcastError(playerId, "Need at least one player on both teams to start.")
        } else if (gameState.players.any { !it.isReady }) {
            broadcastError(playerId, "All players must be ready to start.")
        } else {
            broadcastState()
        }
    }
    
    suspend fun startPvEGame(
        playerId: String, 
        gameName: String, 
        allowSecondPlayer: Boolean, 
        playerTeam: Team, 
        playerTeamColor: String, 
        playerTeamName: String, 
        chosenHeroes: List<String>, 
        chosenCastle: String,
        session: DefaultWebSocketSession? = null,
        chosenAdvisor: String = "ZORAX"
    ) {
        mutex.withLock {
            if (gameState.status == GameStatus.IN_PROGRESS || gameState.status == GameStatus.GAME_OVER) return@withLock
            
            // Validate chosen heroes
            val distinctHeroIds = chosenHeroes.distinct().take(2)
            if (distinctHeroIds.size != 2) return@withLock
            val chosenTemplates = distinctHeroIds.mapNotNull { id -> PredefinedCharacters.find { it.templateId == id } }
            if (chosenTemplates.size != 2) return@withLock
            
            if (session != null) {
                connections[playerId] = session
                lastSeenTimestamps[playerId] = System.currentTimeMillis()
            }
            
            // Set up lobby
            gameState = GameState(
                status = GameStatus.LOBBY,
                gameName = gameName,
                creatorPlayerId = playerId,
                isPvE = true
            )
            
            val humanTeamInfo = TeamInfo(id = playerTeam, name = playerTeamName, color = playerTeamColor, creatorId = playerId)
            val botTeamInfo = TeamInfo(id = Team.YELLOW, name = "Enemy", color = "#eab308", creatorId = "BOT")
            
            gameState = gameState.copy(teamInfos = mapOf(playerTeam to humanTeamInfo, Team.YELLOW to botTeamInfo))
            
            val humanPlayer = Player(id = playerId, name = playerId, team = playerTeam, isReady = true, advisorId = chosenAdvisor) // Name will be overridden by caller if needed
            val botPlayer = Player(id = "bot_1", name = "Computer", team = Team.YELLOW, isReady = true, isBot = true)
            
            gameState = gameState.copy(players = listOf(humanPlayer, botPlayer))
            
            val newChars = chosenTemplates.map { template ->
                Character(
                    id = UUID.randomUUID().toString(),
                    playerId = playerId,
                    name = template.name,
                    warlord = template.warlord,
                    intellect = template.intellect,
                    vanguard = template.vanguard,
                    archon = template.archon
                )
            }.toMutableList()
            
            val botCharacterCount = if (allowSecondPlayer) 3 else 2
            val availableTemplates = PredefinedCharacters.filter { it.templateId !in distinctHeroIds }.shuffled()
            val botTemplates = availableTemplates.take(botCharacterCount)
            
            for (template in botTemplates) {
                newChars.add(
                    Character(
                        id = UUID.randomUUID().toString(),
                        playerId = botPlayer.id,
                        name = template.name,
                        warlord = template.warlord,
                        intellect = template.intellect,
                        vanguard = template.vanguard,
                        archon = template.archon
                    )
                )
            }
            gameState = gameState.copy(characters = newChars)
            
            val preferredOpposite = when (chosenCastle) {
                "14" -> "23"
                "23" -> "14"
                "7" -> "52"
                "52" -> "7"
                else -> null
            }
            val defaultCastles = MapData.values.filter { it.isCastle }.map { it.id }
            val botCastle = if (preferredOpposite != null && preferredOpposite != chosenCastle && preferredOpposite in defaultCastles) {
                preferredOpposite
            } else {
                defaultCastles.filter { it != chosenCastle }.randomOrNull() ?: "14"
            }
            
            gameState = gameState.copy(teamCastles = mapOf(playerTeam to chosenCastle, Team.YELLOW to botCastle))
            
            // Now start the game directly
            val initialTerritories = MapData.mapValues { (sectorId, territory) ->
                TerritoryState(
                    sectorId = sectorId,
                    ownerPlayerId = null,
                    ownerTeam = null,
                    cultivation = territory.cultivation,
                    protection = territory.protection,
                    food = 0,
                    gold = 0
                )
            }.toMutableMap()
            
            val updatedCharacters = gameState.characters.map { char ->
                val p = gameState.players.find { it.id == char.playerId }
                val t = p?.team ?: Team.RED
                val cSector = gameState.teamCastles[t] ?: "14"
                
                val cTerr = initialTerritories[cSector]
                if (cTerr != null && cTerr.ownerPlayerId == null) {
                    initialTerritories[cSector] = cTerr.copy(
                        ownerPlayerId = char.playerId,
                        ownerTeam = t
                    )
                }
                
                char.copy(
                    currentSector = cSector,
                    hasActedThisTurn = false
                )
            }
            
            gameState = gameState.copy(
                status = GameStatus.IN_PROGRESS,
                activeTeamTurn = playerTeam, // Human goes first
                currentTurn = 1,
                territories = initialTerritories,
                characters = updatedCharacters
            )
            saveCurrentState("PVE_GAME_START")
        }
        broadcastState()
    }
    
    suspend fun joinPvEGame(playerId: String, playerName: String, chosenHeroes: List<String>, session: io.ktor.websocket.DefaultWebSocketSession): String? {
        var effectivePlayerId = playerId
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS || !gameState.isPvE) return@withLock
            
            val humanTeam = gameState.teamInfos.keys.find { it != Team.YELLOW } ?: return@withLock
            val existingHumanPlayers = gameState.players.filter { it.team == humanTeam && !it.isBot }
            
            // Cannot join if there are already 2 human players (allowSecondPlayer maxed out implicitly)
            if (existingHumanPlayers.size >= 2 && existingHumanPlayers.none { it.id == playerId }) return@withLock
            
            val existingPlayer = existingHumanPlayers.find { it.id == playerId }
            if (existingPlayer != null) {
                // Reconnect
                effectivePlayerId = existingPlayer.id
                connections[effectivePlayerId] = session
                lastSeenTimestamps[effectivePlayerId] = System.currentTimeMillis()
            } else {
                // New player joining existing game
                val distinctHeroIds = chosenHeroes.distinct().take(2)
                if (distinctHeroIds.size != 2) return@withLock
                val chosenTemplates = distinctHeroIds.mapNotNull { id -> PredefinedCharacters.find { it.templateId == id } }
                if (chosenTemplates.size != 2) return@withLock
                
                val newPlayer = Player(id = playerId, name = playerName, team = humanTeam, isReady = true)
                gameState = gameState.copy(players = gameState.players + newPlayer)
                
                val castleSector = gameState.teamCastles[humanTeam] ?: "14"
                
                val newChars = chosenTemplates.map { template ->
                    Character(
                        id = UUID.randomUUID().toString(),
                        playerId = playerId,
                        name = template.name,
                        warlord = template.warlord,
                        intellect = template.intellect,
                        vanguard = template.vanguard,
                        archon = template.archon,
                        currentSector = castleSector,
                        hasActedThisTurn = false
                    )
                }
                gameState = gameState.copy(characters = gameState.characters + newChars)
                
                connections[playerId] = session
                lastSeenTimestamps[playerId] = System.currentTimeMillis()
            }
        }
        broadcastState()
        return effectivePlayerId
    }
    
    suspend fun selectCharacters(playerId: String, templateIds: List<String>) {
        mutex.withLock {
            if (gameState.status != GameStatus.LOBBY) return
            
            // Player must pick exactly 2 distinct templates
            val distinctTemplateIds = templateIds.distinct().take(2)
            if (distinctTemplateIds.size != 2) {
                return@withLock
            }
            
            val chosenTemplates = distinctTemplateIds.mapNotNull { id ->
                PredefinedCharacters.find { it.templateId == id }
            }
            if (chosenTemplates.size != 2) {
                return@withLock
            }
            
            val otherChars = gameState.characters.filter { it.playerId != playerId }
            val newChars = chosenTemplates.map { template ->
                Character(
                    id = UUID.randomUUID().toString(),
                    playerId = playerId,
                    name = template.name,
                    warlord = template.warlord,
                    intellect = template.intellect,
                    vanguard = template.vanguard,
                    archon = template.archon
                )
            }
            
            gameState = gameState.copy(characters = otherChars + newChars)
        }
        broadcastState()
    }

    suspend fun createCharacter(playerId: String, name: String, warlord: Int, intellect: Int, vanguard: Int, archon: Int) {
        mutex.withLock {
            if (gameState.status != GameStatus.LOBBY) return
            
            // Check if player already has 2 characters
            val existing = gameState.characters.filter { it.playerId == playerId }
            if (existing.size >= 2) {
                return@withLock
            }
            
            val char = Character(
                id = UUID.randomUUID().toString(),
                playerId = playerId,
                name = name,
                warlord = warlord,
                intellect = intellect,
                vanguard = vanguard,
                archon = archon
            )
            
            gameState = gameState.copy(characters = gameState.characters + char)
        }
        
        if (gameState.characters.none { it.playerId == playerId && it.name == name }) {
             broadcastError(playerId, "You already have maximum characters.")
        } else {
             broadcastState()
        }
    }
    
    data class CaptureResult(
        val updatedTerritories: Map<String, TerritoryState>,
        val lootedFood: Int,
        val lootedGold: Int
    )

    private fun handleCaptureTerritory(territories: Map<String, TerritoryState>, sectorId: String, player: Player): CaptureResult {
        val baseCultivation = MapData[sectorId]?.cultivation ?: 10
        val baseProtection = MapData[sectorId]?.protection ?: 5
        val currentTerr = territories[sectorId] ?: TerritoryState(
            sectorId = sectorId,
            cultivation = baseCultivation,
            protection = baseProtection
        )
        val wasOwnedByAnother = currentTerr.ownerPlayerId != null && currentTerr.ownerPlayerId != player.id
        val (lootedFood, lootedGold) = if (wasOwnedByAnother) {
            (currentTerr.food / 2) to (currentTerr.gold / 2)
        } else {
            0 to 0
        }

        val updatedTerr = if (currentTerr.ownerPlayerId != player.id) {
            currentTerr.copy(
                ownerPlayerId = player.id,
                ownerTeam = player.team,
                cultivation = if (currentTerr.cultivation > baseCultivation) baseCultivation else currentTerr.cultivation,
                protection = baseProtection,
                food = 0,
                gold = 0
            )
        } else {
            currentTerr
        }
        return CaptureResult(
            updatedTerritories = territories + (sectorId to updatedTerr),
            lootedFood = lootedFood,
            lootedGold = lootedGold
        )
    }

    suspend fun placeCharacter(playerId: String, targetSector: String, characterId: String? = null, strategy: BattleStrategy = BattleStrategy.NONE) {
        var battleToStart: TacticalBattleState? = null

        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return
            
            // Validate target sector is on the map
            if (!MapData.containsKey(targetSector)) return
            
            // Validate target sector is empty or occupied by enemy
            val occupant = gameState.characters.find { it.currentSector == targetSector && !it.isDead }
            if (occupant != null) {
                val occupantPlayer = gameState.players.find { it.id == occupant.playerId }
                if (occupantPlayer?.team == player.team) return@withLock
            }
            
            val charToPlace = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && it.currentSector == null && !it.hasActedThisTurn && !it.isDead } ?: return@withLock
            
            if (charToPlace.currentSector != null) return@withLock // Already on the board
            if (charToPlace.hasActedThisTurn || charToPlace.isDead) return@withLock
            
            var newTerritories = gameState.territories
            if (occupant != null) {
                val battleState = initiateTacticalBattleState(player, charToPlace, occupant, targetSector, strategy, isPlaceAction = true)
                gameState = gameState.copy(activeTacticalBattle = battleState)
                battleToStart = battleState
                return@withLock
            } else {
                val captureRes = handleCaptureTerritory(newTerritories, targetSector, player)
                newTerritories = captureRes.updatedTerritories
                
                val newChars = gameState.characters.map {
                    if (it.id == charToPlace.id) {
                        it.copy(
                            currentSector = targetSector,
                            hasActedThisTurn = true,
                            food = it.food + captureRes.lootedFood,
                            gold = it.gold + captureRes.lootedGold
                        )
                    } else it
                }
                gameState = gameState.copy(characters = newChars, territories = newTerritories)
                
                val castleOwner = gameState.teamCastles.entries.find { it.value == targetSector }?.key
                val isCastleCaptured = castleOwner != null && castleOwner != player.team
                if (isCastleCaptured) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = player.team)
                }
            }
            
            checkTurnEnd()
        }

        if (battleToStart != null) {
            broadcastEvent(GameEvent.TacticalBattleStarted(battleToStart))
            broadcastState()
            checkAndTriggerTacticalAi(battleToStart)
            return
        }

        broadcastState()
    }
    
    suspend fun moveCharacter(playerId: String, targetSector: String, characterId: String? = null, strategy: BattleStrategy = BattleStrategy.NONE) {
        var battleToStart: TacticalBattleState? = null

        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return
            
            // Validate target sector is on the map
            if (!MapData.containsKey(targetSector)) return
            
            val charToMove = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && it.currentSector != null && !it.hasActedThisTurn && !it.isDead } ?: return@withLock
            
            if (charToMove.currentSector == null) return@withLock
            if (charToMove.hasActedThisTurn || charToMove.isDead) return@withLock
            
            if (!isAdjacentSector(charToMove.currentSector, targetSector)) return@withLock
            
            val occupant = gameState.characters.find { it.currentSector == targetSector && !it.isDead }
            var newTerritories = gameState.territories
            
            if (occupant != null) {
                // If the occupant is on the same team, invalid move (cannot attack ally)
                val occupantPlayer = gameState.players.find { it.id == occupant.playerId }
                if (occupantPlayer?.team == player.team) return@withLock
                
                val battleState = initiateTacticalBattleState(player, charToMove, occupant, targetSector, strategy, isPlaceAction = false)
                gameState = gameState.copy(activeTacticalBattle = battleState)
                battleToStart = battleState
                return@withLock
            } else {
                val captureRes = handleCaptureTerritory(newTerritories, targetSector, player)
                newTerritories = captureRes.updatedTerritories
                
                val newChars = gameState.characters.map {
                    if (it.id == charToMove.id) {
                        it.copy(
                            currentSector = targetSector,
                            hasActedThisTurn = true,
                            food = it.food + captureRes.lootedFood,
                            gold = it.gold + captureRes.lootedGold
                        )
                    } else it
                }
                gameState = gameState.copy(characters = newChars, territories = newTerritories)
                
                val castleOwner = gameState.teamCastles.entries.find { it.value == targetSector }?.key
                val isCastleCaptured = castleOwner != null && castleOwner != player.team
                if (isCastleCaptured) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = player.team)
                }
            }
            checkTurnEnd()
        }

        if (battleToStart != null) {
            broadcastEvent(GameEvent.TacticalBattleStarted(battleToStart))
            broadcastState()
            checkAndTriggerTacticalAi(battleToStart)
            return
        }

        broadcastState()
    }

    suspend fun upgradeTerritory(playerId: String, sectorId: String, upgradeType: String, characterId: String? = null) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return
            
            val char = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && !it.hasActedThisTurn && !it.isDead } ?: return
            if (char.hasActedThisTurn || char.isDead) return
            
            val territory = gameState.territories[sectorId] ?: return
            if (territory.ownerPlayerId != playerId && territory.ownerTeam != player.team) return // Only owner or team owner can upgrade
            
            val updatedTerritories = gameState.territories.toMutableMap()
            val boostAmount = char.intellect.coerceIn(2, 7)
            val newTerritory = when (upgradeType.uppercase()) {
                "CULTIVATION" -> territory.copy(cultivation = territory.cultivation + boostAmount)
                "PROTECTION" -> territory.copy(protection = territory.protection + boostAmount)
                else -> territory
            }
            updatedTerritories[sectorId] = newTerritory
            
            val newChars = gameState.characters.map {
                if (it.id == char.id) it.copy(hasActedThisTurn = true) else it
            }
            
            gameState = gameState.copy(
                territories = updatedTerritories,
                characters = newChars
            )
            checkTurnEnd()
        }
        broadcastState()
    }
    
    suspend fun collectResources(playerId: String, sectorId: String, characterId: String? = null) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            val player = gameState.players.find { it.id == playerId } ?: return
            
            val char = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && it.currentSector == sectorId && !it.isDead } ?: return
            if (char.isDead) return
            if (char.currentSector != sectorId) return // Player must have character at location
            
            val territory = gameState.territories[sectorId] ?: return
            if (territory.ownerPlayerId != playerId && territory.ownerTeam != player.team) return // Only owner or team can collect
            
            val foodToCollect = territory.food
            val goldToCollect = territory.gold
            if (foodToCollect == 0 && goldToCollect == 0) return
            
            val updatedTerritories = gameState.territories.toMutableMap()
            updatedTerritories[sectorId] = territory.copy(food = 0, gold = 0)
            
            val newChars = gameState.characters.map {
                if (it.id == char.id) it.copy(food = it.food + foodToCollect, gold = it.gold + goldToCollect) else it
            }
            
            gameState = gameState.copy(
                territories = updatedTerritories,
                characters = newChars
            )
        }
        broadcastState()
    }
    
    suspend fun recruitArmy(playerId: String, unitType: ArmyType, count: Int, characterId: String? = null) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            if (count !in 1..MAX_SQUAD_SIZE) return
            
            val char = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && !it.isDead } ?: return
            if (char.isDead) return
            if (char.army.total() + count > MAX_SQUAD_SIZE) return
            
            val sectorId = char.currentSector ?: return
            val territory = gameState.territories[sectorId] ?: return
            val protection = territory.protection
            
            val price = when(unitType) {
                ArmyType.MAGES -> 80
                ArmyType.HEAVY_INFANTRY -> 50
                ArmyType.ARCHERS -> 40
                ArmyType.LIGHT_INFANTRY -> 30
            }
            
            val requiredProtection = when(unitType) {
                ArmyType.MAGES -> 30
                ArmyType.HEAVY_INFANTRY -> 20
                ArmyType.ARCHERS -> 10
                ArmyType.LIGHT_INFANTRY -> 0
            }
            
            if (protection < requiredProtection) return
            
            val cost = count * price
            if (char.gold < cost) return
            
            val newArmy = when(unitType) {
                ArmyType.MAGES -> char.army.copy(mages = char.army.mages + count)
                ArmyType.HEAVY_INFANTRY -> char.army.copy(heavyInfantry = char.army.heavyInfantry + count)
                ArmyType.ARCHERS -> char.army.copy(archers = char.army.archers + count)
                ArmyType.LIGHT_INFANTRY -> char.army.copy(lightInfantry = char.army.lightInfantry + count)
            }
            
            val newChars = gameState.characters.map {
                if (it.id == char.id) {
                    it.copy(gold = it.gold - cost, army = newArmy)
                } else {
                    it
                }
            }
            
            gameState = gameState.copy(characters = newChars)
        }
        broadcastState()
    }
    
    suspend fun searchScroll(playerId: String, targetSector: String, characterId: String? = null) {
        var foundScroll: Scroll? = null
        var searchChar: Character? = null
        
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return
            
            if (!MapData.containsKey(targetSector)) return
            
            val char = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && !it.hasActedThisTurn && !it.isDead } ?: return
            if (char.hasActedThisTurn || char.isDead) return
            if (char.currentSector == null) return // Must be on the board
            
            // Target must be current sector or adjacent
            if (char.currentSector != targetSector && !isAdjacentSector(char.currentSector, targetSector)) return
            
            searchChar = char
            
            // 25% chance to find a scroll
            val roll = kotlin.random.Random.nextInt(100)
            if (roll < 25) {
                val scrollType = ScrollType.entries[kotlin.random.Random.nextInt(ScrollType.entries.size)]
                foundScroll = Scroll(
                    id = UUID.randomUUID().toString(),
                    type = scrollType,
                    boostAmount = 3
                )
            }
            
            val newChars = gameState.characters.map {
                if (it.id == char.id) {
                    val updatedScrolls = if (foundScroll != null) it.scrolls + foundScroll else it.scrolls
                    it.copy(hasActedThisTurn = true, scrolls = updatedScrolls)
                } else it
            }
            
            gameState = gameState.copy(characters = newChars)
            checkTurnEnd()
        }
        
        // Broadcast events outside the lock
        val c = searchChar
        if (c != null) {
            val scroll = foundScroll
            if (scroll != null) {
                broadcastEvent(GameEvent.ScrollFound(c.id, c.name, scroll))
            } else {
                broadcastEvent(GameEvent.ScrollSearchFailed(c.id, c.name, targetSector))
            }
        }
        broadcastState()
    }
    suspend fun buySiegeWeapon(playerId: String, characterId: String?) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            if (gameState.activeTeamTurn != gameState.players.find { it.id == playerId }?.team) return
            
            val char = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && !it.isDead } ?: return
            
            if (char.isDead || char.hasActedThisTurn) return
            if (char.gold < 50) return
            if (char.currentSector == null || MapData[char.currentSector]?.isCastle != true) return
            
            val newChars = gameState.characters.map {
                if (it.id == char.id) {
                    it.copy(
                        gold = it.gold - 50,
                        siegeWeapons = it.siegeWeapons + 1,
                        hasActedThisTurn = true
                    )
                } else it
            }
            
            gameState = gameState.copy(characters = newChars)
            checkTurnEnd()
        }
        broadcastState()
    }
    
    suspend fun useScroll(playerId: String, scrollId: String, characterId: String? = null) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            
            val char = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && !it.isDead } ?: return
            if (char.isDead) return
            
            val scroll = char.scrolls.find { it.id == scrollId } ?: return
            
            val newChars = gameState.characters.map {
                if (it.id == char.id) {
                    val updatedChar = when (scroll.type) {
                        ScrollType.WARLORD -> it.copy(warlord = it.warlord + scroll.boostAmount)
                        ScrollType.INTELLECT -> it.copy(intellect = it.intellect + scroll.boostAmount)
                        ScrollType.VANGUARD -> it.copy(vanguard = it.vanguard + scroll.boostAmount)
                        ScrollType.ARCHON -> it.copy(archon = it.archon + scroll.boostAmount)
                    }
                    updatedChar.copy(scrolls = updatedChar.scrolls.filter { s -> s.id != scrollId })
                } else it
            }
            
            gameState = gameState.copy(characters = newChars)
        }
        broadcastState()
    }
    
    suspend fun transferResources(playerId: String, fromCharId: String, toCharId: String, food: Int, gold: Int) {
        if (food <= 0 && gold <= 0) return
        var eventToBroadcast: GameEvent? = null
        
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            
            val fromChar = gameState.characters.find { it.id == fromCharId && it.playerId == playerId } ?: return
            val toChar = gameState.characters.find { it.id == toCharId && it.playerId == playerId } ?: return
            
            if (fromChar.isDead || toChar.isDead || fromChar.hasActedThisTurn) return
            
            if (fromChar.food < food || fromChar.gold < gold) return
            
            val newChars = gameState.characters.map { char ->
                when (char.id) {
                    fromChar.id -> char.copy(
                        food = char.food - food,
                        gold = char.gold - gold,
                        hasActedThisTurn = true
                    )
                    toChar.id -> char.copy(
                        food = char.food + food,
                        gold = char.gold + gold
                    )
                    else -> char
                }
            }
            
            gameState = gameState.copy(characters = newChars)
            checkTurnEnd()
            
            eventToBroadcast = GameEvent.ResourceTransferred(
                fromCharId = fromChar.id,
                toCharId = toChar.id,
                fromSectorId = fromChar.currentSector ?: "",
                toSectorId = toChar.currentSector ?: "",
                food = food,
                gold = gold
            )
        }
        
        eventToBroadcast?.let { broadcastEvent(it) }
        broadcastState()
    }
    
    suspend fun skipTurn(playerId: String, characterId: String) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            val char = gameState.characters.find { it.id == characterId && it.playerId == playerId } ?: return
            if (char.hasActedThisTurn || char.isDead) return
            
            val newChars = gameState.characters.map {
                if (it.id == characterId) it.copy(hasActedThisTurn = true) else it
            }
            gameState = gameState.copy(characters = newChars)
        }
        checkTurnEnd()
        broadcastState()
    }

    suspend fun marketTrade(playerId: String, characterId: String, buyFood: Boolean, goldAmount: Int) {
        if (goldAmount <= 0) return
        
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            val char = gameState.characters.find { it.id == characterId && it.playerId == playerId } ?: return
            if (char.isDead) return
            
            val newChars = gameState.characters.map { c ->
                if (c.id == char.id) {
                    if (buyFood) {
                        // Buy 1 Food for 1 Gold
                        val cost = goldAmount
                        if (c.gold < cost) return@withLock
                        c.copy(gold = c.gold - cost, food = c.food + goldAmount)
                    } else {
                        // Sell 2 Food for 1 Gold (goldAmount is how much gold we want to get)
                        val foodCost = goldAmount * 2
                        if (c.food < foodCost) return@withLock
                        c.copy(food = c.food - foodCost, gold = c.gold + goldAmount)
                    }
                } else c
            }
            
            gameState = gameState.copy(characters = newChars)
        }
        broadcastState()
    }

    private suspend fun checkTurnEnd() {
        if (gameState.status == GameStatus.GAME_OVER) {
            saveCurrentState("GAME_OVER")
            return
        }

        // Find all living characters on the board that belong to the active team
        val activeTeamPlayerIds = gameState.players.filter { it.team == gameState.activeTeamTurn }.map { it.id }.toSet()
        val activeTeamChars = gameState.characters.filter { it.playerId in activeTeamPlayerIds && !it.isDead }
        
        if (activeTeamChars.isNotEmpty() && activeTeamChars.all { it.hasActedThisTurn }) {
            // End turn
            val newTeamTurn = if (gameState.isPvE) {
                if (gameState.activeTeamTurn == Team.YELLOW) {
                    gameState.teamInfos.keys.find { it != Team.YELLOW } ?: Team.RED
                } else {
                    Team.YELLOW
                }
            } else {
                val teams = gameState.teamInfos.keys.toList()
                if (teams.size >= 2) {
                    val currentIdx = teams.indexOf(gameState.activeTeamTurn)
                    val nextIdx = (if (currentIdx >= 0) currentIdx + 1 else 0) % teams.size
                    teams[nextIdx]
                } else {
                    gameState.activeTeamTurn
                }
            }
            
            val newTurnCount = if (gameState.isPvE) {
                if (gameState.activeTeamTurn == Team.YELLOW) gameState.currentTurn + 1 else gameState.currentTurn
            } else {
                val teams = gameState.teamInfos.keys.toList()
                if (teams.size >= 2 && gameState.activeTeamTurn == teams.last()) {
                    gameState.currentTurn + 1
                } else {
                    gameState.currentTurn
                }
            }
            
            // Process upkeep for the team whose turn is ending and reset action status
            val updatedChars = gameState.characters.map { char ->
                if (char.playerId in activeTeamPlayerIds) {
                    if (!char.isDead && char.army.total() > 0) {
                        val foodNeeded = char.army.total()
                        val (newFood, remainingArmy) = if (char.food >= foodNeeded) {
                            (char.food - foodNeeded) to char.army
                        } else {
                            val lossRate = 0.25
                            val m = kotlin.math.round(char.army.mages * lossRate).toInt()
                            val h = kotlin.math.round(char.army.heavyInfantry * lossRate).toInt()
                            val l = kotlin.math.round(char.army.lightInfantry * lossRate).toInt()
                            val a = kotlin.math.round(char.army.archers * lossRate).toInt()
                            
                            val shrunkArmy = Army(
                                mages = kotlin.math.max(0, char.army.mages - m),
                                heavyInfantry = kotlin.math.max(0, char.army.heavyInfantry - h),
                                lightInfantry = kotlin.math.max(0, char.army.lightInfantry - l),
                                archers = kotlin.math.max(0, char.army.archers - a)
                            )
                            0 to shrunkArmy
                        }
                        
                        char.copy(
                            food = newFood,
                            army = remainingArmy,
                            hasActedThisTurn = false
                        )
                    } else {
                        char.copy(hasActedThisTurn = false)
                    }
                } else {
                    char
                }
            }
            
            val generatedEvents = mutableListOf<GameEvent.NatureEventOccurred>()
            val finalUpdatedChars = updatedChars.toMutableList()
            var eventCount = 0
            
            // Produce food and gold for all owned territories, and roll for nature events
            val updatedTerritories = gameState.territories.mapValues { (sectorId, terr) ->
                if (terr.ownerPlayerId != null || terr.ownerTeam != null) {
                    val foodGain = (terr.cultivation / 2).coerceAtLeast(1)
                    var currentTerr = terr.copy(food = terr.food + foodGain, gold = terr.gold + 1)
                    
                    val charsHere = finalUpdatedChars.filter { it.currentSector == sectorId && !it.isDead }
                    
                    // Only trigger events on territories where HUMAN characters are present, with a 15% chance
                    val humanCharsHere = charsHere.filter { ch ->
                        val p = gameState.players.find { it.id == ch.playerId }
                        p?.isBot != true
                    }
                    if (humanCharsHere.isNotEmpty() && eventCount < 5 && kotlin.random.Random.nextDouble() < 0.15) {
                        val eventTypes = NatureEventType.values().toMutableList()
                        if (eventTypes.isNotEmpty()) {
                            val eventType = eventTypes.random()
                            eventCount++
                            generatedEvents.add(GameEvent.NatureEventOccurred(sectorId, eventType))
                            
                            when (eventType) {
                                NatureEventType.ABUNDANT_HARVEST -> {
                                    currentTerr = currentTerr.copy(food = currentTerr.food + 15)
                                }
                                NatureEventType.VOLUNTEERS -> {
                                    val charTarget = charsHere.first()
                                    val newCount = kotlin.random.Random.nextInt(2, 5)
                                    val space = MAX_SQUAD_SIZE - charTarget.army.total()
                                    val actualAdd = kotlin.math.max(0, kotlin.math.min(newCount, space))
                                    val newArmy = charTarget.army.copy(lightInfantry = charTarget.army.lightInfantry + actualAdd)
                                    val idx = finalUpdatedChars.indexOfFirst { it.id == charTarget.id }
                                    if (idx != -1) {
                                        finalUpdatedChars[idx] = charTarget.copy(army = newArmy)
                                    }
                                }
                                NatureEventType.HURRICANE, NatureEventType.FLOOD -> {
                                    val minProtection = if (MapData[sectorId]?.isCastle == true) 20 else 0
                                    currentTerr = currentTerr.copy(
                                        protection = (currentTerr.protection - 3).coerceAtLeast(minProtection),
                                        cultivation = (currentTerr.cultivation - 3).coerceAtLeast(0)
                                    )
                                }
                            }
                        }
                    }
                    currentTerr
                } else {
                    terr
                }
            }
            var newMarketRate = gameState.marketRate
            if (kotlin.random.Random.nextDouble() < 0.25) {
                val fluctuation = kotlin.random.Random.nextDouble(-2.0, 2.0).toFloat()
                newMarketRate = (newMarketRate + fluctuation).coerceIn(1.0f, 15.0f)
            }
            val newFurMarket = gameState.furMarket.mapValues { (_, entry) ->
                FurMarket.nextEntry(entry)
            }
            
            gameState = gameState.copy(
                activeTeamTurn = newTeamTurn,
                currentTurn = newTurnCount,
                characters = finalUpdatedChars,
                territories = updatedTerritories,
                marketRate = newMarketRate,
                furMarket = newFurMarket,
                furSalesThisTurn = emptyMap()
            )
            
            generatedEvents.forEach { broadcastEvent(it) }
            
            if (gameState.currentTurn > gameState.maxTurns) {
                gameState = gameState.copy(status = GameStatus.GAME_OVER)
                saveCurrentState("GAME_OVER")
            } else {
                saveCurrentState("TURN_END")
            }
            
            if (gameState.status == GameStatus.IN_PROGRESS) {
                val nextActiveTeam = gameState.activeTeamTurn
                if (gameState.isPvE && nextActiveTeam == Team.YELLOW) {
                    kotlinx.coroutines.GlobalScope.launch {
                        AiPlayerManager.executeBotTurn(this@GameSession)
                    }
                }
            }
        }
    }
    
    suspend fun broadcastError(playerId: String, message: String) {
        val json = Json { encodeDefaults = true }
        val session = connections[playerId] ?: return
        val eventStr = json.encodeToString<GameEvent>(GameEvent.Error(message))
        try {
            session.send(Frame.Text(eventStr))
        } catch (e: Exception) {
            logger.error("Error sending to {}: {}", playerId, e.message)
        }
    }
    
    suspend fun askAdvisor(playerId: String, questionType: String) {
        val player = gameState.players.find { it.id == playerId } ?: return
        val advisorId = player.advisorId.ifBlank { "ZORAX" }
        logger.info("Player {} consulting advisor {} with question '{}'", playerId, advisorId, questionType)
        
        val adviceResponse = advisorService.consultAdvisor(gameState, playerId, advisorId, questionType)
        
        val event = GameEvent.AdvisorAdviceReceived(
            advisorId = advisorId,
            advisorName = adviceResponse.advisorName,
            questionType = questionType,
            advice = adviceResponse.advice,
            keyPoints = adviceResponse.keyPoints,
            timestamp = System.currentTimeMillis()
        )
        broadcastEvent(event)
    }

    suspend fun consultCastleLord(playerId: String, sectorId: String, characterId: String) {
        if (gameState.status != GameStatus.IN_PROGRESS) {
            logger.warn("Cannot consult castle lord: Game is not in progress")
            return
        }
        val territory = MapData[sectorId]
        if (territory?.isCastle != true) {
            logger.warn("Cannot consult castle lord: Sector {} is not a castle", sectorId)
            return
        }
        val char = gameState.characters.find { it.id == characterId && it.playerId == playerId && !it.isDead }
        if (char == null || char.currentSector != sectorId) {
            logger.warn("Cannot consult castle lord: Character {} is dead or not stationed at castle sector {}", characterId, sectorId)
            return
        }
        val lord = getCastleLordForSector(sectorId) ?: return
        logger.info("Player {} commander {} seeking audience with Castle Lord {} at sector {}", playerId, char.name, lord.name, sectorId)

        val dialogueResponse = advisorService.consultCastleLord(gameState, playerId, sectorId, characterId)

        val event = GameEvent.CastleDialogueReceived(
            lordId = dialogueResponse.lordId.ifBlank { lord.id },
            lordName = dialogueResponse.lordName.ifBlank { lord.name },
            sectorId = sectorId,
            speech = dialogueResponse.speech,
            keyPoints = dialogueResponse.keyPoints,
            timestamp = System.currentTimeMillis()
        )
        broadcastEvent(event)
    }

    suspend fun talkToTavernPatron(playerId: String, sectorId: String, patronId: String, characterId: String) {
        val subLocation = getSubLocationForSector(sectorId)
        if (subLocation == null && sectorId != "14") {
            logger.warn("Cannot visit sub-location: Sector {} does not have a sub-location", sectorId)
            return
        }
        val player = gameState.players.find { it.id == playerId } ?: return
        val char = gameState.characters.find { it.id == characterId && it.playerId == playerId } ?: return
        if (char.currentSector != sectorId || char.isDead) {
            logger.warn("Cannot visit sub-location: Character {} is dead or not stationed at sector {}", characterId, sectorId)
            return
        }

        val myTeam = player.team
        val currentTerr = gameState.territories[sectorId]
        val isOwner = currentTerr?.ownerTeam == myTeam || gameState.teamCastles[myTeam] == sectorId
        if (!isOwner) {
            val locName = subLocation?.modalTitle ?: "this location"
            broadcastError(playerId, "You must control this sector to visit $locName.")
            return
        }

        if (sectorId == "14") {
            val myChars = gameState.characters.filter { it.playerId == playerId && !it.isDead }
            val totalArmy = myChars.sumOf { it.army.total() }
            val totalFood = myChars.sumOf { it.food }
            val totalGold = myChars.sumOf { it.gold }

            val enemyChars = gameState.characters.filter { c ->
                val p = gameState.players.find { it.id == c.playerId }
                p?.team != myTeam && !c.isDead
            }
            val enemyArmy = enemyChars.sumOf { it.army.total() }

            val patron = getPatronForSector(sectorId, patronId)
                ?: KhorinisTavernPatrons.find { it.id == patronId }
                ?: KhorinisTavernPatrons[0]

            val (greeting, gossip) = when (patronId) {
                "KARDIF" -> {
                    val foodStatus = when {
                        totalFood < totalArmy -> "Word on the docks is that your boys are chewing on leather belts. You've only got $totalFood food for $totalArmy men—famine will thin your ranks next turn!"
                        totalFood > 60 -> "The harbor storehouse is smelling of dried fish and fresh bread. With $totalFood food, your garrison won't be mutinying anytime soon."
                        else -> "Supplies are holding steady ($totalFood food in the larder), but keep an eye on your supply lines."
                    }
                    patron.catchphrase to "Listen closely... $foodStatus Also, our scouts spotted roughly $enemyArmy enemy troops prowling beyond the farm roads."
                }
                "MOE" -> {
                    val prot = currentTerr?.protection ?: (MapData["14"]?.protection ?: 20)
                    val protLine = if (prot >= 20) {
                        "The city walls are rock solid with $prot protection. Even the militia paladins can't complain about that."
                    } else {
                        "The palisades need work—only $prot protection! If the mercenaries or orcs push from Lobart's side, don't expect me to hold the gate alone!"
                    }
                    patron.catchphrase to "You want harbor advice? $protLine Keep your blade sharp and don't turn your back on anyone in the alleys."
                }
                "ALRIK" -> {
                    val militaryLine = when {
                        totalArmy > enemyArmy * 1.5 -> "Ha! Look at that muster—$totalArmy seasoned men against their measly $enemyArmy. That's not a war, that's a butcher's shop. Forward marches are easy when you outnumber the enemy like that!"
                        totalArmy < enemyArmy -> "You're outnumbered, Commander ($totalArmy vs $enemyArmy hostiles). In the ring, that means you fight dirty or you die. Don't engage without heavy infantry or defensive walls."
                        else -> "An even match on the field—$totalArmy troops under our banner against $enemyArmy across the border. It'll come down to who picks the better battle strategy."
                    }
                    patron.catchphrase to "My sword arm is always ready for good coin. $militaryLine"
                }
                "HALVOR" -> {
                    val marketLine = "The merchant ship just brought word from the mainland. The merchant exchange rate is ${gameState.marketRate} gold per food sack. You're holding $totalGold gold in the war chest—spend it on archers or grain before the market shifts!"
                    patron.catchphrase to marketLine
                }
                "VALENTINO" -> {
                    val nobleLine = if (totalGold >= 150) {
                        "Hmph! Carrying $totalGold gold, are we? Not bad for a rough commander. Still, you couldn't afford a single evening at the hotel in the upper quarter."
                    } else {
                        "Only $totalGold gold in your purse? Pathetic! Even the beggars at the Adanos temple collect more copper than that. Go tax Onar's peasants or harvest some wheat before speaking to me."
                    }
                    patron.catchphrase to nobleLine
                }
                else -> patron.catchphrase to (patron.defaultResponse.ifEmpty { "Drink up, Commander! The harbor is quiet tonight." })
            }

            val event = GameEvent.TavernDialogueReceived(
                patronId = patron.id,
                patronName = patron.name,
                greeting = greeting,
                responseText = gossip,
                timestamp = System.currentTimeMillis()
            )
            broadcastEvent(event)
        } else {
            val patron = getPatronForSector(sectorId, patronId)
                ?: subLocation?.patrons?.firstOrNull()
                ?: KhorinisTavernPatrons[0]

            val terrDef = MapData[sectorId]
            val prot = currentTerr?.protection ?: (terrDef?.protection ?: 10)
            val cult = currentTerr?.cultivation ?: (terrDef?.cultivation ?: 10)
            val food = currentTerr?.food ?: 0
            val gold = currentTerr?.gold ?: 0
            val statusSummary = " [Sector Status: $prot Protection | $cult Cultivation | Stored: $food Food, $gold Gold]"

            val greeting = patron.greeting.ifEmpty { patron.catchphrase }
            val responseText = (patron.defaultResponse.ifEmpty { patron.catchphrase }) + statusSummary

            val event = GameEvent.TavernDialogueReceived(
                patronId = patron.id,
                patronName = patron.name,
                greeting = greeting,
                responseText = responseText,
                timestamp = System.currentTimeMillis()
            )
            broadcastEvent(event)
        }
    }

    suspend fun pitchHuntingCamp(playerId: String, characterId: String) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return

            val char = gameState.characters.find { it.id == characterId && it.playerId == playerId && !it.isDead } ?: return
            val sectorId = char.currentSector ?: return

            if (!HuntingCatalog.hasGameIn(sectorId)) {
                broadcastError(playerId, "No huntable beasts roam this sector.")
                return
            }

            val alreadyHasCamp = gameState.huntingCamps.any { it.sectorId == sectorId && it.ownerPlayerId == playerId }
            if (alreadyHasCamp) {
                broadcastError(playerId, "You already have an active hunting camp in this sector.")
                return
            }

            if (char.gold < FurMarket.CAMP_COST) {
                broadcastError(playerId, "Not enough gold to pitch a hunting camp (requires ${FurMarket.CAMP_COST} gold).")
                return
            }

            val camp = HuntingCamp(
                sectorId = sectorId,
                ownerPlayerId = playerId,
                ownerTeam = player.team,
                pitchedByCharId = char.id,
                pitchedOnTurn = gameState.currentTurn
            )
            val newChars = gameState.characters.map {
                if (it.id == char.id) it.copy(gold = it.gold - FurMarket.CAMP_COST) else it
            }
            gameState = gameState.copy(
                characters = newChars,
                huntingCamps = gameState.huntingCamps + camp
            )
        }
        broadcastState()
    }

    suspend fun dismantleHuntingCamp(playerId: String, characterId: String) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return

            val char = gameState.characters.find { it.id == characterId && it.playerId == playerId && !it.isDead } ?: return
            val sectorId = char.currentSector ?: return

            val camp = gameState.huntingCamps.find { it.sectorId == sectorId && it.ownerPlayerId == playerId }
            if (camp == null) {
                broadcastError(playerId, "You do not have a hunting camp in this sector to dismantle.")
                return
            }

            gameState = gameState.copy(
                huntingCamps = gameState.huntingCamps.filter { it != camp }
            )
        }
        broadcastState()
    }

    suspend fun harvestHide(playerId: String, characterId: String, hideType: HideType) {
        var harvestedEvent: GameEvent.HideHarvested? = null

        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return

            val char = gameState.characters.find { it.id == characterId && it.playerId == playerId && !it.isDead } ?: return
            if (char.hasActedThisTurn) {
                broadcastError(playerId, "${char.name} has already acted this turn.")
                return
            }
            val sectorId = char.currentSector ?: return

            val hasCamp = gameState.huntingCamps.any { it.sectorId == sectorId && it.ownerPlayerId == playerId }
            if (!hasCamp) {
                broadcastError(playerId, "You must establish a hunting camp in this sector before harvesting hides.")
                return
            }

            if (!HuntingCatalog.isHuntable(hideType, sectorId)) {
                broadcastError(playerId, "${hideType.displayName} cannot be harvested in Sector $sectorId.")
                return
            }

            val currentCount = char.hides[hideType] ?: 0
            val updatedHides = char.hides + (hideType to (currentCount + 1))
            val newChars = gameState.characters.map {
                if (it.id == char.id) it.copy(hides = updatedHides, hasActedThisTurn = true) else it
            }
            gameState = gameState.copy(characters = newChars)
            harvestedEvent = GameEvent.HideHarvested(char.id, char.name, sectorId, hideType)
            checkTurnEnd()
        }

        harvestedEvent?.let { broadcastEvent(it) }
        broadcastState()
    }

    suspend fun sellHide(playerId: String, characterId: String, hideType: HideType) {
        var soldEvent: GameEvent.HideSold? = null

        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return

            val char = gameState.characters.find { it.id == characterId && it.playerId == playerId && !it.isDead } ?: return
            val currentCount = char.hides[hideType] ?: 0
            if (currentCount <= 0) {
                broadcastError(playerId, "You do not have any ${hideType.displayName} to sell.")
                return
            }

            val playerSales = gameState.furSalesThisTurn[playerId] ?: emptySet()
            if (playerSales.contains(hideType)) {
                broadcastError(playerId, "The merchant has bought their fill of this pelt for now. Check back next turn.")
                return
            }

            val marketEntry = gameState.furMarket[hideType] ?: FurMarketEntry(1.0)
            val payout = FurMarket.effectivePrice(hideType, marketEntry.multiplier)

            val updatedHides = if (currentCount - 1 > 0) char.hides + (hideType to (currentCount - 1)) else char.hides - hideType
            val newChars = gameState.characters.map {
                if (it.id == char.id) it.copy(hides = updatedHides, gold = it.gold + payout) else it
            }
            val updatedSales = gameState.furSalesThisTurn + (playerId to (playerSales + hideType))
            gameState = gameState.copy(characters = newChars, furSalesThisTurn = updatedSales)
            soldEvent = GameEvent.HideSold(char.id, hideType, payout)
        }

        soldEvent?.let { broadcastEvent(it) }
        broadcastState()
    }

    suspend fun askHunterAboutHide(playerId: String, sectorId: String, patronId: String, hideType: HideType, characterId: String) {
        val player = gameState.players.find { it.id == playerId } ?: return
        val char = gameState.characters.find { it.id == characterId && it.playerId == playerId } ?: return
        if (char.currentSector != sectorId || char.isDead) {
            logger.warn("Cannot consult hunter: Character {} is dead or not stationed at sector {}", characterId, sectorId)
            return
        }

        val myTeam = player.team
        val currentTerr = gameState.territories[sectorId]
        val isOwner = currentTerr?.ownerTeam == myTeam || gameState.teamCastles[myTeam] == sectorId
        if (!isOwner) {
            broadcastError(playerId, "You must control this sector to consult with the hunter.")
            return
        }

        val patron = getPatronForSector(sectorId, patronId)
            ?: KhorinisTavernPatrons.find { it.id == patronId }
        if (patron == null) return

        if (!patron.isHunter) {
            broadcastError(playerId, "${patron.name} does not possess hunter tracking information.")
            return
        }

        val grounds = HuntingCatalog.groundsFor(hideType)
        val event = GameEvent.HunterIntelReceived(
            patronId = patron.id,
            patronName = patron.name,
            hideType = hideType,
            grounds = grounds,
            timestamp = System.currentTimeMillis()
        )
        broadcastEvent(event)
    }

    suspend fun selectAdvisor(playerId: String, advisorId: String) {
        mutex.withLock {
            val updatedPlayers = gameState.players.map { p ->
                if (p.id == playerId) p.copy(advisorId = advisorId) else p
            }
            gameState = gameState.copy(players = updatedPlayers)
            saveCurrentState("SELECT_ADVISOR")
        }
        broadcastState()
    }

    suspend fun endGame(playerId: String) {
        mutex.withLock {
            val player = gameState.players.find { it.id == playerId }
            if (player?.name != null && player.name == gameState.creatorPlayerId) {
                logger.info("Game forcibly ended by creator ${player.name}")
                if (gameState.isPvE) {
                    db.GameRepository.clearActiveGame(gameId)
                } else {
                    gameState = GameState()
                    saveCurrentState("CREATOR_ENDED")
                }
                gameState = GameState()
            }
        }
        broadcastState()
    }
    
    suspend fun broadcastState() {
        // Refresh lastSeen for all currently connected players
        val now = System.currentTimeMillis()
        connections.keys.forEach { playerId ->
            lastSeenTimestamps[playerId] = now
        }
        
        // Check abandonment before broadcasting
        checkAbandonmentTimeout()
        
        val json = Json { encodeDefaults = true }
        
        observers.forEach { (observerId, session) ->
            val event = GameEvent.GameStateUpdated(gameState, "")
            val eventStr = json.encodeToString<GameEvent>(event)
            try {
                session.send(Frame.Text(eventStr))
            } catch (e: Exception) {
                logger.error("Error broadcasting to observer {}: {}", observerId, e.message)
            }
        }
        
        connections.forEach { (playerId, session) ->
            val playerGameState = if (gameState.status == GameStatus.IN_PROGRESS) {
                val visibleChars = gameState.characters.filter { char ->
                    isCharacterVisibleToPlayer(char, playerId, gameState)
                }
                gameState.copy(characters = visibleChars)
            } else {
                gameState
            }
            val event = GameEvent.GameStateUpdated(playerGameState, playerId)
            val eventStr = json.encodeToString<GameEvent>(event)
            try {
                session.send(Frame.Text(eventStr))
            } catch (e: Exception) {
                logger.error("Error broadcasting to {}: {}", playerId, e.message)
            }
        }
    }
    
    suspend fun broadcastEvent(event: GameEvent) {
        val json = Json { encodeDefaults = true }
        val eventStr = json.encodeToString<GameEvent>(event)
        
        observers.forEach { (observerId, session) ->
            try {
                session.send(Frame.Text(eventStr))
            } catch (e: Exception) {
                logger.error("Error broadcasting event to observer {}: {}", observerId, e.message)
            }
        }
        
        connections.forEach { (playerId, session) ->
            try {
                session.send(Frame.Text(eventStr))
            } catch (e: Exception) {
                logger.error("Error broadcasting event to {}: {}", playerId, e.message)
            }
        }
    }

    private fun initiateTacticalBattleState(
        attackerPlayer: Player,
        attackerChar: Character,
        defenderChar: Character,
        targetSector: String,
        strategy: BattleStrategy,
        isPlaceAction: Boolean
    ): TacticalBattleState {
        val defenderPlayer = gameState.players.find { it.id == defenderChar.playerId }
        val battleId = "battle_${UUID.randomUUID().toString().take(8)}"
        val protection = gameState.territories[targetSector]?.protection ?: (MapData[targetSector]?.protection ?: 0)
        val (biome, tiles) = TacticalMapGenerator.generateMap(targetSector, protection, attackerChar.siegeWeapons)
        val units = TacticalMapGenerator.spawnAllUnits(
            battleId = battleId,
            attackerChar = attackerChar,
            defenderChar = defenderChar,
            attackerPlayerId = attackerPlayer.id,
            defenderPlayerId = defenderChar.playerId,
            attackerTeam = attackerPlayer.team,
            defenderTeam = defenderPlayer?.team ?: Team.BLUE
        )
        pendingTacticalBattle = PendingTacticalBattle(
            isPlaceAction = isPlaceAction,
            targetSector = targetSector,
            strategy = strategy,
            attackerCharId = attackerChar.id,
            defenderCharId = defenderChar.id,
            attackerPlayerId = attackerPlayer.id,
            defenderPlayerId = defenderChar.playerId
        )
        return TacticalBattleState(
            battleId = battleId,
            sectorId = targetSector,
            gridWidth = TacticalMapGenerator.GRID_WIDTH,
            gridHeight = TacticalMapGenerator.GRID_HEIGHT,
            tiles = tiles,
            attackerPlayerId = attackerPlayer.id,
            defenderPlayerId = defenderChar.playerId,
            attackerCharId = attackerChar.id,
            defenderCharId = defenderChar.id,
            attackerStrategy = strategy,
            activeUnitOwnerId = attackerPlayer.id,
            roundNumber = 1,
            units = units,
            battleLog = listOf("Tactical battle begun in ${MapData[targetSector]?.name ?: "Sector $targetSector"} (${biome.name})!")
        )
    }

    suspend fun tacticalMoveUnit(playerId: String, battleId: String, unitId: String, targetX: Int, targetY: Int) {
        var updatedBattleState: TacticalBattleState? = null
        var logMessage: String? = null

        mutex.withLock {
            val battle = gameState.activeTacticalBattle ?: return
            if (battle.battleId != battleId || battle.activeUnitOwnerId != playerId || battle.isFinished) return

            val unit = battle.units.find { it.id == unitId && it.ownerPlayerId == playerId && it.isAlive } ?: return
            val validMoves = TacticalRules.findValidMoves(unit, battle)
            if ((targetX to targetY) !in validMoves) return

            val dist = kotlin.math.abs(targetX - unit.x) + kotlin.math.abs(targetY - unit.y)
            val updatedUnit = unit.copy(
                x = targetX,
                y = targetY,
                movesRemaining = (unit.movesRemaining - dist).coerceAtLeast(0)
            )
            val log = "${unit.name} moved to ($targetX, $targetY)."
            val updatedBattle = battle.copy(
                units = battle.units.map { if (it.id == unit.id) updatedUnit else it },
                battleLog = battle.battleLog + log
            )
            gameState = gameState.copy(activeTacticalBattle = updatedBattle)
            updatedBattleState = updatedBattle
            logMessage = log
        }

        if (updatedBattleState != null && logMessage != null) {
            broadcastEvent(GameEvent.TacticalStateUpdated(updatedBattleState, logMessage))
            broadcastState()
        }
    }

    suspend fun tacticalAttackUnit(playerId: String, battleId: String, attackerUnitId: String, targetUnitId: String) {
        var battleToConclude: TacticalBattleState? = null
        var winnerToConclude: String? = null
        var stateToBroadcast: TacticalBattleState? = null
        var logToBroadcast: String? = null

        mutex.withLock {
            val battle = gameState.activeTacticalBattle ?: return
            if (battle.battleId != battleId || battle.activeUnitOwnerId != playerId || battle.isFinished) return

            val attacker = battle.units.find { it.id == attackerUnitId && it.ownerPlayerId == playerId && it.isAlive } ?: return
            val target = battle.units.find { it.id == targetUnitId && it.ownerPlayerId != playerId && it.isAlive } ?: return

            if (!TacticalRules.canAttackTarget(attacker, target, battle)) return

            val rng = kotlin.random.Random.nextInt(-1, 2)
            val dmg = TacticalRules.calculateDamage(attacker, target, battle, rng)
            val newHp = (target.currentHp - dmg).coerceAtLeast(0)
            val isTargetKilled = newHp <= 0

            val updatedAttacker = attacker.copy(hasAttackedThisTurn = true)
            val updatedTarget = target.copy(currentHp = newHp)

            val updatedUnits = battle.units.map {
                when (it.id) {
                    attacker.id -> updatedAttacker
                    target.id -> updatedTarget
                    else -> it
                }
            }

            val log = "${attacker.name} attacked ${target.name} for $dmg damage!${if (isTargetKilled) " ${target.name} was defeated!" else ""}"

            val mageTargets = if (attacker.unitType == TacticalUnitType.MAGE || attacker.unitType == TacticalUnitType.MAGE_HERO) {
                battle.mageAttackedTargetIds + target.id
            } else battle.mageAttackedTargetIds
            val targetsHit = battle.targetsHitThisRound + target.id

            val opponentPlayerId = target.ownerPlayerId
            val opponentHeroKilled = target.unitType.isHero && isTargetKilled
            val allOpponentUnitsDead = updatedUnits.none { it.ownerPlayerId == opponentPlayerId && it.isAlive }

            if (opponentHeroKilled || allOpponentUnitsDead) {
                val concludedBattle = battle.copy(
                    units = updatedUnits,
                    isFinished = true,
                    winnerPlayerId = playerId,
                    battleLog = battle.battleLog + log + " Victory for ${attacker.name}!"
                )
                battleToConclude = concludedBattle
                winnerToConclude = playerId
            } else {
                val updatedBattle = battle.copy(
                    units = updatedUnits,
                    battleLog = battle.battleLog + log,
                    mageAttackedTargetIds = mageTargets,
                    targetsHitThisRound = targetsHit
                )
                gameState = gameState.copy(activeTacticalBattle = updatedBattle)
                stateToBroadcast = updatedBattle
                logToBroadcast = log
            }
        }

        if (stateToBroadcast != null && logToBroadcast != null) {
            broadcastEvent(GameEvent.TacticalStateUpdated(stateToBroadcast, logToBroadcast))
            broadcastState()
        }

        if (battleToConclude != null && winnerToConclude != null) {
            finishTacticalBattle(battleToConclude, winnerToConclude)
        }
    }

    suspend fun tacticalEndUnitTurn(playerId: String, battleId: String) {
        var nextBattleState: TacticalBattleState? = null
        var logMessage: String? = null

        mutex.withLock {
            val battle = gameState.activeTacticalBattle ?: return
            if (battle.battleId != battleId || battle.activeUnitOwnerId != playerId || battle.isFinished) return

            val nextOwner = if (playerId == battle.attackerPlayerId) battle.defenderPlayerId else battle.attackerPlayerId
            val nextRound = if (nextOwner == battle.attackerPlayerId) battle.roundNumber + 1 else battle.roundNumber

            val refreshedUnits = battle.units.map {
                if (it.ownerPlayerId == nextOwner) {
                    it.copy(movesRemaining = it.maxMoves, hasAttackedThisTurn = false)
                } else it
            }

            val log = "Round $nextRound: Turn passed to ${if (nextOwner == battle.attackerPlayerId) "Attacker" else "Defender"}."
            val updatedBattle = battle.copy(
                activeUnitOwnerId = nextOwner,
                roundNumber = nextRound,
                units = refreshedUnits,
                battleLog = battle.battleLog + log,
                mageAttackedTargetIds = if (nextOwner == battle.attackerPlayerId) emptySet() else battle.mageAttackedTargetIds,
                targetsHitThisRound = if (nextOwner == battle.attackerPlayerId) emptySet() else battle.targetsHitThisRound
            )
            gameState = gameState.copy(activeTacticalBattle = updatedBattle)
            nextBattleState = updatedBattle
            logMessage = log
        }

        if (nextBattleState != null && logMessage != null) {
            broadcastEvent(GameEvent.TacticalStateUpdated(nextBattleState, logMessage))
            broadcastState()
            checkAndTriggerTacticalAi(nextBattleState)
        }
    }

    suspend fun tacticalRetreat(playerId: String, battleId: String) {
        var battleToConclude: TacticalBattleState? = null
        var winnerToConclude: String? = null

        mutex.withLock {
            val battle = gameState.activeTacticalBattle ?: return
            if (battle.battleId != battleId || battle.isFinished) return
            if (playerId != battle.attackerPlayerId && playerId != battle.defenderPlayerId) return

            val winnerPlayerId = if (playerId == battle.attackerPlayerId) battle.defenderPlayerId else battle.attackerPlayerId
            val log = "Player retreated from tactical combat!"
            val concluded = battle.copy(
                isFinished = true,
                winnerPlayerId = winnerPlayerId,
                battleLog = battle.battleLog + log
            )
            battleToConclude = concluded
            winnerToConclude = winnerPlayerId
        }

        if (battleToConclude != null && winnerToConclude != null) {
            finishTacticalBattle(battleToConclude, winnerToConclude)
        }
    }

    suspend fun tacticalAutoResolve(playerId: String, battleId: String) {
        var battleToConclude: TacticalBattleState? = null
        var winnerToConclude: String? = null

        mutex.withLock {
            val battle = gameState.activeTacticalBattle ?: return
            if (battle.battleId != battleId || battle.isFinished) return

            val (resolvedBattle, winnerId) = TacticalAiService.autoResolve(battle)
            battleToConclude = resolvedBattle
            winnerToConclude = winnerId
        }

        if (battleToConclude != null && winnerToConclude != null) {
            finishTacticalBattle(battleToConclude, winnerToConclude)
        }
    }

    suspend fun finishTacticalBattle(finalBattleState: TacticalBattleState, winnerPlayerId: String) {
        var fightEventToSend: GameEvent.FightOccurred? = null
        var endedEventToSend: GameEvent.TacticalBattleEnded? = null
        var stateUpdatedForAttacker: GameEvent.GameStateUpdated? = null
        var shouldTriggerBotTurn = false
        var shouldBroadcast = false
        var shouldCheckTurnEnd = false

        mutex.withLock {
            val pending = pendingTacticalBattle ?: run {
                gameState = gameState.copy(activeTacticalBattle = null)
                shouldBroadcast = true
                return@withLock
            }
            val attackerPlayer = gameState.players.find { it.id == pending.attackerPlayerId } ?: run {
                gameState = gameState.copy(activeTacticalBattle = null)
                pendingTacticalBattle = null
                shouldBroadcast = true
                return@withLock
            }
            val attackerChar = gameState.characters.find { it.id == pending.attackerCharId } ?: run {
                gameState = gameState.copy(activeTacticalBattle = null)
                pendingTacticalBattle = null
                shouldBroadcast = true
                return@withLock
            }
            val defenderChar = gameState.characters.find { it.id == pending.defenderCharId } ?: run {
                gameState = gameState.copy(activeTacticalBattle = null)
                pendingTacticalBattle = null
                shouldBroadcast = true
                return@withLock
            }

            val isAttackerWinner = (winnerPlayerId == pending.attackerPlayerId)
            val winnerChar = if (isAttackerWinner) attackerChar else defenderChar
            val loserChar = if (isAttackerWinner) defenderChar else attackerChar

            val attackerSurvivingArmy = TacticalRules.mapSurvivingArmy(finalBattleState.units, pending.attackerPlayerId)
            val defenderSurvivingArmy = TacticalRules.mapSurvivingArmy(finalBattleState.units, pending.defenderPlayerId)

            val attackerLosses = (attackerChar.army.total() - attackerSurvivingArmy.total()).coerceAtLeast(0)
            val defenderLosses = (defenderChar.army.total() - defenderSurvivingArmy.total()).coerceAtLeast(0)
            val winnerLosses = if (isAttackerWinner) attackerLosses else defenderLosses
            val loserLosses = if (isAttackerWinner) defenderLosses else attackerLosses

            // Fight event with casualties
            fightEventToSend = GameEvent.FightOccurred(
                sectorId = pending.targetSector,
                winnerId = winnerChar.id,
                loserId = loserChar.id,
                winnerLosses = winnerLosses,
                loserLosses = loserLosses,
                strategy = pending.strategy
            )

            var newTerritories = gameState.territories
            var lootedFood = 0
            var lootedGold = 0

            // Collateral damage to territory
            val siegeDamage = if (attackerChar.siegeWeapons > 0) 5 else 1
            val oldTerr = newTerritories[pending.targetSector] ?: TerritoryState(
                sectorId = pending.targetSector,
                cultivation = MapData[pending.targetSector]?.cultivation ?: 10,
                protection = MapData[pending.targetSector]?.protection ?: 5
            )
            val damagedTerr = oldTerr.copy(
                protection = (oldTerr.protection - siegeDamage).coerceAtLeast(0),
                cultivation = (oldTerr.cultivation - siegeDamage).coerceAtLeast(0)
            )
            newTerritories = newTerritories + (pending.targetSector to damagedTerr)

            if (isAttackerWinner) {
                val captureRes = handleCaptureTerritory(newTerritories, pending.targetSector, attackerPlayer)
                newTerritories = captureRes.updatedTerritories
                lootedFood = captureRes.lootedFood
                lootedGold = captureRes.lootedGold
            }

            val newChars = gameState.characters.map {
                when (it.id) {
                    attackerChar.id -> {
                        if (isAttackerWinner) {
                            it.copy(
                                currentSector = pending.targetSector,
                                hasActedThisTurn = true,
                                army = attackerSurvivingArmy,
                                food = it.food + lootedFood,
                                gold = it.gold + lootedGold
                            )
                        } else {
                            it.copy(
                                currentSector = null,
                                hasActedThisTurn = true,
                                army = Army(),
                                isDead = true
                            )
                        }
                    }
                    defenderChar.id -> {
                        if (!isAttackerWinner) {
                            it.copy(army = defenderSurvivingArmy)
                        } else {
                            it.copy(currentSector = null, army = Army(), isDead = true)
                        }
                    }
                    else -> it
                }
            }

            val concludedBattle = finalBattleState.copy(isFinished = true, winnerPlayerId = winnerPlayerId)
            endedEventToSend = GameEvent.TacticalBattleEnded(concludedBattle, winnerPlayerId)

            gameState = gameState.copy(
                characters = newChars,
                territories = newTerritories,
                activeTacticalBattle = null
            )
            pendingTacticalBattle = null

            val castleOwner = gameState.teamCastles.entries.find { it.value == pending.targetSector }?.key
            val isCastleCapturedByAttacker = isAttackerWinner && castleOwner != null && castleOwner != attackerPlayer.team

            if (isCastleCapturedByAttacker) {
                gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = attackerPlayer.team)
                stateUpdatedForAttacker = GameEvent.GameStateUpdated(gameState, pending.attackerPlayerId)
                saveCurrentState("castle_capture_win")
                return@withLock
            } else if (gameState.isPvE) {
                val humanTeam = gameState.teamInfos.keys.find { it != Team.YELLOW } ?: Team.RED
                val humanPlayerIds = gameState.players.filter { it.team == humanTeam }.map { it.id }.toSet()
                val yellowPlayerIds = gameState.players.filter { it.team == Team.YELLOW }.map { it.id }.toSet()
                val allHumanDead = humanPlayerIds.isNotEmpty() && newChars.filter { it.playerId in humanPlayerIds }.all { it.isDead }
                val allYellowDead = yellowPlayerIds.isNotEmpty() && newChars.filter { it.playerId in yellowPlayerIds }.all { it.isDead }

                if (allYellowDead) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = humanTeam)
                } else if (allHumanDead) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = Team.YELLOW)
                }
            } else {
                val teams = gameState.teamInfos.keys.toList()
                if (teams.size >= 2) {
                    val team1 = teams[0]
                    val team2 = teams[1]
                    val team1PlayerIds = gameState.players.filter { it.team == team1 }.map { it.id }.toSet()
                    val team2PlayerIds = gameState.players.filter { it.team == team2 }.map { it.id }.toSet()
                    val allTeam1Dead = team1PlayerIds.isNotEmpty() && newChars.filter { it.playerId in team1PlayerIds }.all { it.isDead }
                    val allTeam2Dead = team2PlayerIds.isNotEmpty() && newChars.filter { it.playerId in team2PlayerIds }.all { it.isDead }

                    if (allTeam1Dead) {
                        gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = team2)
                    } else if (allTeam2Dead) {
                        gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = team1)
                    }
                }
            }

            shouldBroadcast = true
            shouldCheckTurnEnd = true

            if (gameState.isPvE && gameState.activeTeamTurn == Team.YELLOW && gameState.status == GameStatus.IN_PROGRESS) {
                shouldTriggerBotTurn = true
            }
        }

        if (fightEventToSend != null) {
            broadcastEvent(fightEventToSend)
        }
        if (endedEventToSend != null) {
            broadcastEvent(endedEventToSend)
        }
        if (stateUpdatedForAttacker != null) {
            broadcastEvent(stateUpdatedForAttacker)
        }
        if (shouldBroadcast) {
            broadcastState()
        }
        if (shouldCheckTurnEnd) {
            checkTurnEnd()
        }

        if (shouldTriggerBotTurn) {
            GlobalScope.launch {
                delay(800)
                AiPlayerManager.executeBotTurn(this@GameSession)
            }
        }
    }

    private fun checkAndTriggerTacticalAi(battleState: TacticalBattleState) {
        if (battleState.isFinished) return
        val activeOwnerId = battleState.activeUnitOwnerId
        val activePlayer = gameState.players.find { it.id == activeOwnerId } ?: return

        if (activePlayer.isBot) {
            GlobalScope.launch {
                delay(600)
                try {
                    executeTacticalAiTurn(activeOwnerId, battleState.battleId)
                } catch (e: Exception) {
                    logger.error("Error executing tactical AI turn: ${e.message}", e)
                    tacticalEndUnitTurn(activeOwnerId, battleState.battleId)
                }
            }
        }
    }

    private suspend fun executeTacticalAiTurn(botPlayerId: String, battleId: String) {
        val currentBattle = gameState.activeTacticalBattle ?: return
        if (currentBattle.battleId != battleId || currentBattle.activeUnitOwnerId != botPlayerId || currentBattle.isFinished) return

        val myUnits = currentBattle.units.filter { it.ownerPlayerId == botPlayerId && it.isAlive }
        for (u in myUnits) {
            val latestBattle = gameState.activeTacticalBattle ?: return
            if (latestBattle.battleId != battleId || latestBattle.isFinished) return

            val freshUnit = latestBattle.units.find { it.id == u.id } ?: continue
            if (!freshUnit.isAlive) continue

            val action = TacticalAiService.evaluateBestAction(freshUnit, latestBattle)
            when (action) {
                is TacticalAiAction.MoveAndAttack -> {
                    tacticalMoveUnit(botPlayerId, battleId, freshUnit.id, action.moveX, action.moveY)
                    delay(300)
                    val postMoveBattle = gameState.activeTacticalBattle ?: return
                    if (!postMoveBattle.isFinished) {
                        tacticalAttackUnit(botPlayerId, battleId, freshUnit.id, action.targetUnitId)
                        delay(300)
                    }
                }
                is TacticalAiAction.AttackOnly -> {
                    tacticalAttackUnit(botPlayerId, battleId, freshUnit.id, action.targetUnitId)
                    delay(300)
                }
                is TacticalAiAction.MoveOnly -> {
                    tacticalMoveUnit(botPlayerId, battleId, freshUnit.id, action.moveX, action.moveY)
                    delay(300)
                }
                is TacticalAiAction.Pass -> {}
            }
        }

        val postActionsBattle = gameState.activeTacticalBattle ?: return
        if (!postActionsBattle.isFinished && postActionsBattle.activeUnitOwnerId == botPlayerId) {
            tacticalEndUnitTurn(botPlayerId, battleId)
        }
    }
}
