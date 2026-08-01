package game

import io.ktor.websocket.*
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import models.*
import java.util.UUID


class GameSession {
    private val mutex = Mutex()
    var gameState = GameState()
    
    // WebSockets connected to this session
    val connections = mutableMapOf<String, DefaultWebSocketSession>()
    
    suspend fun joinTeam(playerId: String, playerName: String, team: Team, session: DefaultWebSocketSession) {
        mutex.withLock {
            if (gameState.status != GameStatus.LOBBY) {
                return@withLock
            }
            
            val teamCount = gameState.players.count { it.team == team }
            if (teamCount >= 5) {
                // Return an error for this player (but session is not added to connections yet, so we just add it to broadcast error)
                connections[playerId] = session
                return@withLock
            }
            
            // If player already exists, they might be rejoining, otherwise add them
            if (gameState.players.none { it.id == playerId }) {
                val newPlayer = Player(id = playerId, name = playerName, team = team)
                gameState = gameState.copy(players = gameState.players + newPlayer)
            }
            connections[playerId] = session
        }
        
        // Broadcast error if team was full (handled by checking if player was actually added)
        if (gameState.players.none { it.id == playerId }) {
            broadcastError(playerId, "Team $team is full.")
            connections.remove(playerId)
        } else {
            broadcastState()
        }
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
            gameState = gameState.copy(status = GameStatus.IN_PROGRESS, activeTeamTurn = Team.RED, currentTurn = 1)
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
    
    suspend fun createCharacter(playerId: String, name: String, strength: Int, agility: Int, wisdom: Int) {
        mutex.withLock {
            if (gameState.status != GameStatus.LOBBY) return
            
            // Check if player already has a character
            if (gameState.characters.any { it.playerId == playerId }) {
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
             broadcastError(playerId, "You already have a character.")
        } else {
             broadcastState()
        }
    }
    
    suspend fun placeCharacter(playerId: String, targetSector: String) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return
            
            // Validate target sector is on the map
            if (!MapData.containsKey(targetSector)) return
            
            // Validate target sector is empty or occupied by enemy
            val occupant = gameState.characters.find { it.currentSector == targetSector }
            if (occupant != null) {
                val occupantPlayer = gameState.players.find { it.id == occupant.playerId }
                if (occupantPlayer?.team == player.team) return
            }
            
            val charToPlace = gameState.characters.find { it.playerId == playerId } ?: return
            if (charToPlace.currentSector != null) return // Already on the board
            if (charToPlace.hasActedThisTurn) return
            
            if (occupant != null) {
                // It's a fight!
                val territory = MapData[targetSector]
                val protection = territory?.protection ?: 0
                val winner = calculateFightResult(charToPlace, occupant, protection)
                val loserId = if (winner.id == charToPlace.id) occupant.id else charToPlace.id
                
                // Broadcast fight event
                val fightEvent = GameEvent.FightOccurred(targetSector, winner.id, loserId)
                broadcastEvent(fightEvent)
                
                val newChars = gameState.characters.map {
                    when (it.id) {
                        charToPlace.id -> {
                            if (winner.id == charToPlace.id) {
                                it.copy(currentSector = targetSector, hasActedThisTurn = true)
                            } else {
                                it.copy(currentSector = null, hasActedThisTurn = true, isDead = true)
                            }
                        }
                        occupant.id -> {
                            if (winner.id == occupant.id) {
                                it // stays where it is
                            } else {
                                it.copy(currentSector = null, isDead = true)
                            }
                        }
                        else -> it
                    }
                }
                gameState = gameState.copy(characters = newChars)
                
                val redPlayerIds = gameState.players.filter { it.team == Team.RED }.map { it.id }.toSet()
                val bluePlayerIds = gameState.players.filter { it.team == Team.BLUE }.map { it.id }.toSet()
                
                val allRedDead = redPlayerIds.isNotEmpty() && gameState.characters.filter { it.playerId in redPlayerIds }.all { it.isDead }
                val allBlueDead = bluePlayerIds.isNotEmpty() && gameState.characters.filter { it.playerId in bluePlayerIds }.all { it.isDead }
                
                val isCastleCapturedByAttacker = winner.id == charToPlace.id && territory?.isCastle == true && territory.owningTeam != null && territory.owningTeam != player.team
                
                if (isCastleCapturedByAttacker || allBlueDead) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = Team.RED)
                } else if (allRedDead) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = Team.BLUE)
                }
            } else {
                val newChars = gameState.characters.map {
                    if (it.playerId == playerId) it.copy(currentSector = targetSector, hasActedThisTurn = true) else it
                }
                gameState = gameState.copy(characters = newChars)
                
                val territory = MapData[targetSector]
                val isCastleCaptured = territory?.isCastle == true && territory.owningTeam != null && territory.owningTeam != player.team
                if (isCastleCaptured) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = player.team)
                }
            }
            
            checkTurnEnd()
        }
        broadcastState()
    }
    
    suspend fun moveCharacter(playerId: String, targetSector: String) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            
            val player = gameState.players.find { it.id == playerId } ?: return
            if (gameState.activeTeamTurn != player.team) return
            
            // Validate target sector is on the map
            if (!MapData.containsKey(targetSector)) return
            
            val charToMove = gameState.characters.find { it.playerId == playerId } ?: return
            if (charToMove.currentSector == null) return
            if (charToMove.hasActedThisTurn) return
            
            if (!isAdjacentSector(charToMove.currentSector!!, targetSector)) return
            
            val occupant = gameState.characters.find { it.currentSector == targetSector }
            if (occupant != null) {
                // If the occupant is on the same team, invalid move
                val occupantPlayer = gameState.players.find { it.id == occupant.playerId }
                if (occupantPlayer?.team == player.team) return
                
                // Otherwise, it's a fight!
                val territory = MapData[targetSector]
                val protection = territory?.protection ?: 0
                val winner = calculateFightResult(charToMove, occupant, protection)
                val loserId = if (winner.id == charToMove.id) occupant.id else charToMove.id
                
                // Broadcast fight event
                val fightEvent = GameEvent.FightOccurred(targetSector, winner.id, loserId)
                broadcastEvent(fightEvent)
                
                val newChars = gameState.characters.map {
                    when (it.id) {
                        charToMove.id -> {
                            if (winner.id == charToMove.id) {
                                it.copy(currentSector = targetSector, hasActedThisTurn = true)
                            } else {
                                it.copy(currentSector = null, hasActedThisTurn = true, isDead = true)
                            }
                        }
                        occupant.id -> {
                            if (winner.id == occupant.id) {
                                it // stays where it is
                            } else {
                                it.copy(currentSector = null, isDead = true)
                            }
                        }
                        else -> it
                    }
                }
                gameState = gameState.copy(characters = newChars)
                
                val redPlayerIds = gameState.players.filter { it.team == Team.RED }.map { it.id }.toSet()
                val bluePlayerIds = gameState.players.filter { it.team == Team.BLUE }.map { it.id }.toSet()
                
                val allRedDead = redPlayerIds.isNotEmpty() && gameState.characters.filter { it.playerId in redPlayerIds }.all { it.isDead }
                val allBlueDead = bluePlayerIds.isNotEmpty() && gameState.characters.filter { it.playerId in bluePlayerIds }.all { it.isDead }
                
                val isCastleCapturedByAttacker = winner.id == charToMove.id && territory?.isCastle == true && territory.owningTeam != null && territory.owningTeam != player.team
                
                if (isCastleCapturedByAttacker || allBlueDead) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = Team.RED)
                } else if (allRedDead) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = Team.BLUE)
                }
            } else {
                val newChars = gameState.characters.map {
                    if (it.playerId == playerId) it.copy(currentSector = targetSector, hasActedThisTurn = true) else it
                }
                gameState = gameState.copy(characters = newChars)
                
                val territory = MapData[targetSector]
                val isCastleCaptured = territory?.isCastle == true && territory.owningTeam != null && territory.owningTeam != player.team
                if (isCastleCaptured) {
                    gameState = gameState.copy(status = GameStatus.GAME_OVER, winningTeam = player.team)
                }
            }
            checkTurnEnd()
        }
        broadcastState()
    }
    
    private fun checkTurnEnd() {
        // Find all characters on the board that belong to the active team
        val activeTeamPlayerIds = gameState.players.filter { it.team == gameState.activeTeamTurn }.map { it.id }.toSet()
        val activeTeamCharsOnBoard = gameState.characters.filter { it.playerId in activeTeamPlayerIds && it.currentSector != null }
        
        // If there are no characters on the board for this team, or all of them have acted, end turn
        // Wait, if they haven't placed their character, they should be able to place it.
        // So we just check ALL characters belonging to the team.
        val activeTeamChars = gameState.characters.filter { it.playerId in activeTeamPlayerIds }
        
        if (activeTeamChars.isNotEmpty() && activeTeamChars.all { it.hasActedThisTurn }) {
            // End turn
            val newTeamTurn = if (gameState.activeTeamTurn == Team.RED) Team.BLUE else Team.RED
            val newTurnCount = if (gameState.activeTeamTurn == Team.BLUE) gameState.currentTurn + 1 else gameState.currentTurn
            
            val resetChars = gameState.characters.map { it.copy(hasActedThisTurn = false) }
            
            gameState = gameState.copy(
                activeTeamTurn = newTeamTurn,
                currentTurn = newTurnCount,
                characters = resetChars
            )
            
            if (gameState.currentTurn > gameState.maxTurns) {
                gameState = gameState.copy(status = GameStatus.GAME_OVER)
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
            println("Error sending to $playerId: ${e.message}")
        }
    }
    
    suspend fun broadcastState() {
        val json = Json { encodeDefaults = true }
        connections.forEach { (playerId, session) ->
            val event = GameEvent.GameStateUpdated(gameState, playerId)
            val eventStr = json.encodeToString<GameEvent>(event)
            try {
                session.send(Frame.Text(eventStr))
            } catch (e: Exception) {
                println("Error broadcasting to $playerId: ${e.message}")
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
                println("Error broadcasting event to $playerId: ${e.message}")
            }
        }
    }
}
