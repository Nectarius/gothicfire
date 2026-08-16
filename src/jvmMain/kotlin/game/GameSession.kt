package game

import io.ktor.websocket.*
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import models.*
import org.slf4j.LoggerFactory
import java.util.UUID


class GameSession(var gameState: GameState = GameState()) {
    private val logger = LoggerFactory.getLogger(GameSession::class.java)
    private val mutex = Mutex()
    
    companion object {
        // 2 hours in milliseconds
        const val ABANDON_TIMEOUT_MS = 2 * 60 * 60 * 1000L
    }
    
    // WebSockets connected to this session
    val connections = mutableMapOf<String, DefaultWebSocketSession>()
    
    // Observers who are connected but not yet on a team
    val observers = mutableMapOf<String, DefaultWebSocketSession>()
    
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
            
            if (connections.isEmpty() && observers.isEmpty()) {
                logger.info("All players and observers have disconnected. Game ends and resets.")
                gameState = GameState()
                db.GameRepository.saveGameState(state = gameState, trigger = "ALL_DISCONNECTED")
                return@withLock
            }
            
            if (gameState.status != GameStatus.IN_PROGRESS) return
            
            val now = System.currentTimeMillis()
            
            for (team in listOf(Team.RED, Team.BLUE)) {
                val teamPlayerIds = gameState.players.filter { it.team == team }.map { it.id }
                if (teamPlayerIds.isEmpty()) continue
                
                // Check if ALL players on this team are disconnected AND have been gone for 2+ hours
                val allAbandoned = teamPlayerIds.all { playerId ->
                    val isDisconnected = !connections.containsKey(playerId)
                    if (!isDisconnected) return@all false
                    
                    val lastSeen = lastSeenTimestamps[playerId] ?: now
                    (now - lastSeen) >= ABANDON_TIMEOUT_MS
                }
                
                if (allAbandoned) {
                    val winningTeam = if (team == Team.RED) Team.BLUE else Team.RED
                    logger.info("Team {} has been abandoned for 2+ hours. Team {} wins by forfeit.", team, winningTeam)
                    gameState = gameState.copy(
                        status = GameStatus.GAME_OVER,
                        winningTeam = winningTeam
                    )
                    db.GameRepository.saveGameState(state = gameState, trigger = "ABANDON_FORFEIT")
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
            
            // Check if at least one player on each team
            val hasRed = gameState.players.any { it.team == Team.RED }
            val hasBlue = gameState.players.any { it.team == Team.BLUE }
            if (!hasRed || !hasBlue) {
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
                    cultivation = 10,
                    protection = if (territory.isCastle) 20 else 5,
                    food = 0,
                    gold = 0
                )
            }.toMutableMap()

            // Automatically place player characters into their team's castle
            val updatedCharacters = gameState.characters.map { char ->
                val player = gameState.players.find { it.id == char.playerId }
                val team = player?.team ?: Team.RED
                val defaultCastles = MapData.values.filter { it.isCastle }.map { it.id }
                val castleSector = gameState.teamCastles[team] ?: if (team == Team.RED) (defaultCastles.getOrNull(0) ?: "14") else (defaultCastles.getOrNull(1) ?: "23")
                
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
                activeTeamTurn = Team.RED,
                currentTurn = 1,
                territories = initialTerritories,
                characters = updatedCharacters
            )
        }
        
        val hasRed = gameState.players.any { it.team == Team.RED }
        val hasBlue = gameState.players.any { it.team == Team.BLUE }
        if (!hasRed || !hasBlue) {
            broadcastError(playerId, "Need at least one player on both teams to start.")
        } else if (gameState.players.any { !it.isReady }) {
            broadcastError(playerId, "All players must be ready to start.")
        } else {
            broadcastState()
        }
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
        val currentTerr = territories[sectorId] ?: TerritoryState(
            sectorId = sectorId,
            cultivation = 10,
            protection = MapData[sectorId]?.protection ?: 5
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
                cultivation = if (currentTerr.cultivation > 10) 10 else currentTerr.cultivation,
                protection = MapData[sectorId]?.protection ?: 5,
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
                if (occupantPlayer?.team == player.team) return
            }
            
            val charToPlace = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && it.currentSector == null && !it.hasActedThisTurn && !it.isDead } ?: return
            
            if (charToPlace.currentSector != null) return // Already on the board
            if (charToPlace.hasActedThisTurn || charToPlace.isDead) return
            
            var newTerritories = gameState.territories
            if (occupant != null) {
                // It's a fight!
                val protection = gameState.territories[targetSector]?.protection ?: (MapData[targetSector]?.protection ?: 0)
                val outcome = resolveFight(charToPlace, occupant, protection, strategy, charToPlace.siegeWeapons)
                val winner = outcome.winner
                val loserId = outcome.loser.id
                
                // Broadcast fight event with casualties
                val fightEvent = GameEvent.FightOccurred(
                    sectorId = targetSector,
                    winnerId = winner.id,
                    loserId = loserId,
                    winnerLosses = outcome.winnerLosses,
                    loserLosses = outcome.loserLosses,
                    strategy = strategy
                )
                broadcastEvent(fightEvent)
                
                var lootedFood = 0
                var lootedGold = 0
                
                // Collateral damage to territory
                val siegeDamage = if (charToPlace.siegeWeapons > 0) 5 else 1
                val oldTerr = newTerritories[targetSector] ?: TerritoryState(sectorId = targetSector, protection = MapData[targetSector]?.protection ?: 5)
                val damagedTerr = oldTerr.copy(
                    protection = (oldTerr.protection - siegeDamage).coerceAtLeast(0),
                    cultivation = (oldTerr.cultivation - siegeDamage).coerceAtLeast(0)
                )
                newTerritories = newTerritories + (targetSector to damagedTerr)
                
                if (outcome.isAttackerWinner) {
                    val captureRes = handleCaptureTerritory(newTerritories, targetSector, player)
                    newTerritories = captureRes.updatedTerritories
                    lootedFood = captureRes.lootedFood
                    lootedGold = captureRes.lootedGold
                }
                
                val newChars = gameState.characters.map {
                    when (it.id) {
                        charToPlace.id -> {
                            if (outcome.isAttackerWinner) {
                                it.copy(
                                    currentSector = targetSector,
                                    hasActedThisTurn = true,
                                    army = outcome.winnerRemainingArmy,
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
                        occupant.id -> {
                            if (!outcome.isAttackerWinner) {
                                it.copy(army = outcome.winnerRemainingArmy) // stays where it is, with updated army count
                            } else {
                                it.copy(currentSector = null, army = Army(), isDead = true)
                            }
                        }
                        else -> it
                    }
                }
                
                gameState = gameState.copy(characters = newChars, territories = newTerritories)
                
                val redPlayerIds = gameState.players.filter { it.team == Team.RED }.map { it.id }.toSet()
                val bluePlayerIds = gameState.players.filter { it.team == Team.BLUE }.map { it.id }.toSet()
                
                val allRedDead = redPlayerIds.isNotEmpty() && gameState.characters.filter { it.playerId in redPlayerIds }.all { it.isDead }
                val allBlueDead = bluePlayerIds.isNotEmpty() && gameState.characters.filter { it.playerId in bluePlayerIds }.all { it.isDead }
                
                val castleOwner = gameState.teamCastles.entries.find { it.value == targetSector }?.key
                val isCastleCapturedByAttacker = outcome.isAttackerWinner && castleOwner != null && castleOwner != player.team
                
                if (isCastleCapturedByAttacker) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = player.team)
                } else if (allBlueDead) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = Team.RED)
                } else if (allRedDead) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = Team.BLUE)
                }
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
        broadcastState()
    }
    
    suspend fun moveCharacter(playerId: String, targetSector: String, characterId: String? = null, strategy: BattleStrategy = BattleStrategy.NONE) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return
            
            // Validate target sector is on the map
            if (!MapData.containsKey(targetSector)) return
            
            val charToMove = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && it.currentSector != null && !it.hasActedThisTurn && !it.isDead } ?: return
            
            if (charToMove.currentSector == null) return
            if (charToMove.hasActedThisTurn || charToMove.isDead) return
            
            if (!isAdjacentSector(charToMove.currentSector, targetSector)) return
            
            val occupant = gameState.characters.find { it.currentSector == targetSector && !it.isDead }
            var newTerritories = gameState.territories
            
            if (occupant != null) {
                // If the occupant is on the same team, invalid move (cannot attack ally)
                val occupantPlayer = gameState.players.find { it.id == occupant.playerId }
                if (occupantPlayer?.team == player.team) return
                
                // Otherwise, it's a fight!
                val protection = gameState.territories[targetSector]?.protection ?: (MapData[targetSector]?.protection ?: 0)
                val outcome = resolveFight(charToMove, occupant, protection, strategy, charToMove.siegeWeapons)
                val winner = outcome.winner
                val loserId = outcome.loser.id
                
                // Broadcast fight event with casualties
                val fightEvent = GameEvent.FightOccurred(
                    sectorId = targetSector,
                    winnerId = winner.id,
                    loserId = loserId,
                    winnerLosses = outcome.winnerLosses,
                    loserLosses = outcome.loserLosses,
                    strategy = strategy
                )
                broadcastEvent(fightEvent)
                
                var lootedFood = 0
                var lootedGold = 0
                
                // Collateral damage to territory
                val siegeDamage = if (charToMove.siegeWeapons > 0) 5 else 1
                val oldTerr = newTerritories[targetSector] ?: TerritoryState(sectorId = targetSector, protection = MapData[targetSector]?.protection ?: 5)
                val damagedTerr = oldTerr.copy(
                    protection = (oldTerr.protection - siegeDamage).coerceAtLeast(0),
                    cultivation = (oldTerr.cultivation - siegeDamage).coerceAtLeast(0)
                )
                newTerritories = newTerritories + (targetSector to damagedTerr)
                
                if (outcome.isAttackerWinner) {
                    val captureRes = handleCaptureTerritory(newTerritories, targetSector, player)
                    newTerritories = captureRes.updatedTerritories
                    lootedFood = captureRes.lootedFood
                    lootedGold = captureRes.lootedGold
                }
                
                val newChars = gameState.characters.map {
                    when (it.id) {
                        charToMove.id -> {
                            if (outcome.isAttackerWinner) {
                                it.copy(
                                    currentSector = targetSector,
                                    hasActedThisTurn = true,
                                    army = outcome.winnerRemainingArmy,
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
                        occupant.id -> {
                            if (!outcome.isAttackerWinner) {
                                it.copy(army = outcome.winnerRemainingArmy) // stays where it is, with updated soldier count
                            } else {
                                it.copy(currentSector = null, army = Army(), isDead = true)
                            }
                        }
                        else -> it
                    }
                }
                
                gameState = gameState.copy(characters = newChars, territories = newTerritories)
                
                val redPlayerIds = gameState.players.filter { it.team == Team.RED }.map { it.id }.toSet()
                val bluePlayerIds = gameState.players.filter { it.team == Team.BLUE }.map { it.id }.toSet()
                
                val allRedDead = redPlayerIds.isNotEmpty() && gameState.characters.filter { it.playerId in redPlayerIds }.all { it.isDead }
                val allBlueDead = bluePlayerIds.isNotEmpty() && gameState.characters.filter { it.playerId in bluePlayerIds }.all { it.isDead }
                
                val castleOwner = gameState.teamCastles.entries.find { it.value == targetSector }?.key
                val isCastleCapturedByAttacker = outcome.isAttackerWinner && castleOwner != null && castleOwner != player.team
                
                if (isCastleCapturedByAttacker) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = player.team)
                } else if (allBlueDead) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = Team.RED)
                } else if (allRedDead) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = Team.BLUE)
                }
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
            if (count !in 1..100) return
            
            val char = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && !it.isDead } ?: return
            if (char.isDead) return
            if (char.army.total() + count > 100) return
            
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
            db.GameRepository.saveGameState(state = gameState, trigger = "GAME_OVER")
            return
        }

        // Find all living characters on the board that belong to the active team
        val activeTeamPlayerIds = gameState.players.filter { it.team == gameState.activeTeamTurn }.map { it.id }.toSet()
        val activeTeamChars = gameState.characters.filter { it.playerId in activeTeamPlayerIds && !it.isDead }
        
        if (activeTeamChars.isNotEmpty() && activeTeamChars.all { it.hasActedThisTurn }) {
            // End turn
            val newTeamTurn = if (gameState.activeTeamTurn == Team.RED) Team.BLUE else Team.RED
            val newTurnCount = if (gameState.activeTeamTurn == Team.BLUE) gameState.currentTurn + 1 else gameState.currentTurn
            
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
                    
                    // Only trigger events on territories where characters are present, with a 15% chance
                    if (charsHere.isNotEmpty() && eventCount < 5 && kotlin.random.Random.nextDouble() < 0.15) {
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
                                    val space = 100 - charTarget.army.total()
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
            
            gameState = gameState.copy(
                activeTeamTurn = newTeamTurn,
                currentTurn = newTurnCount,
                characters = finalUpdatedChars,
                territories = updatedTerritories,
                marketRate = newMarketRate
            )
            
            generatedEvents.forEach { broadcastEvent(it) }
            
            if (gameState.currentTurn > gameState.maxTurns) {
                gameState = gameState.copy(status = GameStatus.GAME_OVER)
                db.GameRepository.saveGameState(state = gameState, trigger = "GAME_OVER")
            } else {
                db.GameRepository.saveGameState(state = gameState, trigger = "TURN_END")
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
    
    suspend fun endGame(playerId: String) {
        mutex.withLock {
            val player = gameState.players.find { it.id == playerId }
            if (player?.name != null && player.name == gameState.creatorPlayerId) {
                logger.info("Game forcibly ended by creator ${player.name}")
                gameState = GameState()
                db.GameRepository.saveGameState(state = gameState, trigger = "CREATOR_ENDED")
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
}
