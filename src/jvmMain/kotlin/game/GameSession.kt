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
    
    // WebSockets connected to this session
    val connections = mutableMapOf<String, DefaultWebSocketSession>()
    
    suspend fun joinTeam(incomingPlayerId: String, playerName: String, team: Team, session: DefaultWebSocketSession): String? {
        var effectivePlayerId = incomingPlayerId
        var success = false
        
        mutex.withLock {
            if (gameState.status == GameStatus.IN_PROGRESS) {
                // If game is already in progress, allow reconnecting matching player
                val existingPlayer = gameState.players.find { it.name.equals(playerName, ignoreCase = true) && it.team == team }
                    ?: gameState.players.find { it.team == team }
                    ?: gameState.players.find { it.id == incomingPlayerId }
                
                if (existingPlayer != null) {
                    effectivePlayerId = existingPlayer.id
                    connections[effectivePlayerId] = session
                    success = true
                    logger.info("Reconnected player '{}' (id={}) to active game.", existingPlayer.name, effectivePlayerId)
                } else {
                    connections[incomingPlayerId] = session
                    broadcastError(incomingPlayerId, "Game is currently in progress.")
                    connections.remove(incomingPlayerId)
                    return@withLock
                }
            } else {
                val teamCount = gameState.players.count { it.team == team }
                if (teamCount >= 5) {
                    connections[incomingPlayerId] = session
                    broadcastError(incomingPlayerId, "Team $team is full.")
                    connections.remove(incomingPlayerId)
                    return@withLock
                }
                
                // If player already exists, they might be rejoining, otherwise add them
                if (gameState.players.none { it.id == incomingPlayerId }) {
                    val newPlayer = Player(id = incomingPlayerId, name = playerName, team = team)
                    gameState = gameState.copy(players = gameState.players + newPlayer)
                }
                connections[incomingPlayerId] = session
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
            if (gameState.status == GameStatus.LOBBY) {
                gameState = gameState.copy(
                    players = gameState.players.filter { it.id != playerId },
                    characters = gameState.characters.filter { it.playerId != playerId }
                )
            }
        }
        broadcastState()
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
                    protection = if (territory.isCastle) territory.protection else 10,
                    food = 0,
                    gold = 0
                )
            }.toMutableMap()

            // Automatically place player characters into their team's castle
            val updatedCharacters = gameState.characters.map { char ->
                val player = gameState.players.find { it.id == char.playerId }
                val team = player?.team ?: Team.RED
                val defaultCastles = MapData.values.filter { it.isCastle }.map { it.id }
                val castleSector = gameState.teamCastles[team] ?: if (team == Team.RED) (defaultCastles.getOrNull(0) ?: "1") else (defaultCastles.getOrNull(1) ?: "40")
                
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
                    strength = template.strength,
                    agility = template.agility,
                    wisdom = template.wisdom
                )
            }
            
            gameState = gameState.copy(characters = otherChars + newChars)
        }
        broadcastState()
    }

    suspend fun createCharacter(playerId: String, name: String, strength: Int, agility: Int, wisdom: Int) {
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
                strength = strength,
                agility = agility,
                wisdom = wisdom
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
            protection = MapData[sectorId]?.protection ?: 10
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
                protection = if (currentTerr.protection > 10) 10 else currentTerr.protection,
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

    suspend fun placeCharacter(playerId: String, targetSector: String, characterId: String? = null) {
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
                val outcome = resolveFight(charToPlace, occupant, protection)
                val winner = outcome.winner
                val loserId = outcome.loser.id
                
                // Broadcast fight event with casualties
                val fightEvent = GameEvent.FightOccurred(
                    sectorId = targetSector,
                    winnerId = winner.id,
                    loserId = loserId,
                    winnerLosses = outcome.winnerLosses,
                    loserLosses = outcome.loserLosses
                )
                broadcastEvent(fightEvent)
                
                var lootedFood = 0
                var lootedGold = 0
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
                                    soldiers = outcome.winnerRemainingSoldiers,
                                    food = it.food + lootedFood,
                                    gold = it.gold + lootedGold
                                )
                            } else {
                                it.copy(
                                    currentSector = null,
                                    hasActedThisTurn = true,
                                    soldiers = 0,
                                    isDead = true
                                )
                            }
                        }
                        occupant.id -> {
                            if (!outcome.isAttackerWinner) {
                                it.copy(soldiers = outcome.winnerRemainingSoldiers) // stays where it is, with updated army count
                            } else {
                                it.copy(currentSector = null, soldiers = 0, isDead = true)
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
    
    suspend fun moveCharacter(playerId: String, targetSector: String, characterId: String? = null) {
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
                val outcome = resolveFight(charToMove, occupant, protection)
                val winner = outcome.winner
                val loserId = outcome.loser.id
                
                // Broadcast fight event with casualties
                val fightEvent = GameEvent.FightOccurred(
                    sectorId = targetSector,
                    winnerId = winner.id,
                    loserId = loserId,
                    winnerLosses = outcome.winnerLosses,
                    loserLosses = outcome.loserLosses
                )
                broadcastEvent(fightEvent)
                
                var lootedFood = 0
                var lootedGold = 0
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
                                    soldiers = outcome.winnerRemainingSoldiers,
                                    food = it.food + lootedFood,
                                    gold = it.gold + lootedGold
                                )
                            } else {
                                it.copy(
                                    currentSector = null,
                                    hasActedThisTurn = true,
                                    soldiers = 0,
                                    isDead = true
                                )
                            }
                        }
                        occupant.id -> {
                            if (!outcome.isAttackerWinner) {
                                it.copy(soldiers = outcome.winnerRemainingSoldiers) // stays where it is, with updated soldier count
                            } else {
                                it.copy(currentSector = null, soldiers = 0, isDead = true)
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
            val newTerritory = when (upgradeType.uppercase()) {
                "CULTIVATION" -> territory.copy(cultivation = territory.cultivation + 2)
                "PROTECTION" -> territory.copy(protection = territory.protection + 2)
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
    
    suspend fun hireSoldiers(playerId: String, count: Int, characterId: String? = null) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            if (count !in 1..100) return
            
            val char = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && !it.isDead } ?: return
            if (char.isDead) return
            if (char.soldiers + count > 100) return
            
            val cost = count * 10
            if (char.gold < cost) return
            
            val newChars = gameState.characters.map {
                if (it.id == char.id) {
                    it.copy(gold = it.gold - cost, soldiers = it.soldiers + count)
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
                    val boosted = when (scroll.type) {
                        ScrollType.STRENGTH -> it.copy(strength = it.strength + scroll.boostAmount)
                        ScrollType.AGILITY -> it.copy(agility = it.agility + scroll.boostAmount)
                        ScrollType.WISDOM -> it.copy(wisdom = it.wisdom + scroll.boostAmount)
                    }
                    boosted.copy(scrolls = boosted.scrolls.filter { s -> s.id != scrollId })
                } else it
            }
            
            gameState = gameState.copy(characters = newChars)
        }
        broadcastState()
    }
    
    private fun checkTurnEnd() {
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
                    if (!char.isDead && char.soldiers > 0) {
                        val foodNeeded = char.soldiers // 1 food per soldier per turn, no gold
                        val (newFood, remainingSoldiers) = if (char.food >= foodNeeded) {
                            (char.food - foodNeeded) to char.soldiers
                        } else {
                            // Ran out of food: only feed as many soldiers as available food
                            0 to char.food
                        }
                        
                        char.copy(
                            food = newFood,
                            soldiers = remainingSoldiers,
                            hasActedThisTurn = false
                        )
                    } else {
                        char.copy(hasActedThisTurn = false)
                    }
                } else {
                    char
                }
            }
            
            // Produce food and gold for all owned territories
            val updatedTerritories = gameState.territories.mapValues { (_, terr) ->
                if (terr.ownerPlayerId != null || terr.ownerTeam != null) {
                    terr.copy(food = terr.food + 1, gold = terr.gold + 1)
                } else {
                    terr
                }
            }
            
            gameState = gameState.copy(
                activeTeamTurn = newTeamTurn,
                currentTurn = newTurnCount,
                characters = updatedChars,
                territories = updatedTerritories
            )
            
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
    
    suspend fun broadcastState() {
        val json = Json { encodeDefaults = true }
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
        connections.forEach { (playerId, session) ->
            try {
                session.send(Frame.Text(eventStr))
            } catch (e: Exception) {
                logger.error("Error broadcasting event to {}: {}", playerId, e.message)
            }
        }
    }
}
