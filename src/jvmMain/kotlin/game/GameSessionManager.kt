package game

import db.GameRepository
import io.ktor.websocket.*
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import models.*
import org.slf4j.LoggerFactory
import java.util.UUID

object GameSessionManager {
    private val logger = LoggerFactory.getLogger(GameSessionManager::class.java)
    private val mutex = Mutex()
    
    // The shared multiplayer game / lobby
    private var globalSession = initializeSession()
    
    // Active independent PvE games (gameId -> GameSession)
    private val pveSessions = mutableMapOf<String, GameSession>()
    
    // Map of WebSocket session to its GameSession and playerId
    val connectionToGame = mutableMapOf<DefaultWebSocketSession, Pair<GameSession, String>>()

    private fun initializeSession(): GameSession {
        return try {
            val saved = GameRepository.loadActiveGame()
            if (saved != null && saved.status == GameStatus.IN_PROGRESS) {
                logger.info("Restored active in-progress game from database.")
                GameSession(saved)
            } else {
                GameSession()
            }
        } catch (e: Exception) {
            logger.warn("Could not restore game from DB: {}", e.message, e)
            GameSession()
        }
    }

    suspend fun createGame(playerName: String, gameName: String, wsSession: DefaultWebSocketSession) {
        mutex.withLock {
            if (globalSession.gameState.status == GameStatus.GAME_OVER || globalSession.gameState.status == GameStatus.NOT_CREATED) {
                val oldObservers = globalSession.observers.toMap()
                val oldConnections = globalSession.connections.toMap()
                
                globalSession = GameSession()
                globalSession.observers.putAll(oldObservers)
                oldConnections.forEach { (_, session) ->
                    globalSession.observers[UUID.randomUUID().toString()] = session
                }
                
                globalSession.createGame(playerName, gameName)
            }
        }
    }
    
    suspend fun cancelGame(playerName: String, wsSession: DefaultWebSocketSession) {
        val gameToJoin = mutex.withLock { globalSession }
        gameToJoin.cancelGame(playerName)
    }
    
    suspend fun createTeam(team: Team, name: String, color: String, playerName: String, wsSession: DefaultWebSocketSession) {
        val incomingId = UUID.randomUUID().toString()
        val gameToJoin = mutex.withLock { globalSession }
        
        val effectivePlayerId = gameToJoin.createTeamAndJoin(incomingId, team, name, color, playerName, wsSession)
        if (effectivePlayerId != null) {
            mutex.withLock {
                connectionToGame[wsSession] = Pair(gameToJoin, effectivePlayerId)
            }
        }
    }
    
    suspend fun joinTeam(playerName: String, team: Team, wsSession: DefaultWebSocketSession) {
        val incomingId = UUID.randomUUID().toString()
        val gameToJoin = mutex.withLock {
            if (globalSession.gameState.status == GameStatus.GAME_OVER) {
                globalSession = GameSession()
            }
            globalSession
        }
        
        val effectivePlayerId = gameToJoin.joinTeam(incomingId, playerName, team, wsSession)
        if (effectivePlayerId != null) {
            mutex.withLock {
                connectionToGame[wsSession] = Pair(gameToJoin, effectivePlayerId)
            }
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
        wsSession: DefaultWebSocketSession,
        userId: String? = null
    ) {
        val pveGame = mutex.withLock {
            // Detach wsSession from globalSession observers/connections if present
            val obsKey = globalSession.observers.entries.find { it.value == wsSession }?.key
            if (obsKey != null) {
                globalSession.observers.remove(obsKey)
            }
            val existing = connectionToGame.remove(wsSession)
            if (existing != null) {
                existing.first.connections.remove(existing.second)
            }
            
            val pveKey = userId ?: playerId
            val gameId = "pve_$pveKey"
            // Create a dedicated GameSession for this PvE match with persistent gameId
            val newSession = GameSession(gameId = gameId, ownerUserId = userId)
            pveSessions[gameId] = newSession
            connectionToGame[wsSession] = Pair(newSession, playerId)
            newSession
        }
        
        // Start the PvE match on the isolated session with wsSession attached
        pveGame.startPvEGame(playerId, gameName, allowSecondPlayer, playerTeam, playerTeamColor, playerTeamName, chosenHeroes, chosenCastle, wsSession)
        logger.info("Started new independent PvE game '{}' for player '{}'", pveGame.gameId, playerId)
    }

    suspend fun findAndAttachActivePvEGame(
        userId: String?,
        userName: String?,
        wsSession: DefaultWebSocketSession
    ): Pair<GameSession, String>? {
        val reconnected = mutex.withLock {
            // 1. Check in-memory active PvE sessions
            val inMemoryEntry = pveSessions.entries.find { (_, session) ->
                session.gameState.isPvE &&
                session.gameState.status == GameStatus.IN_PROGRESS &&
                ((!userId.isNullOrBlank() && session.ownerUserId == userId) ||
                 session.gameState.players.any { p ->
                    !p.isBot && ((!userId.isNullOrBlank() && p.id == userId) || (!userName.isNullOrBlank() && (p.name == userName || p.id == userName)))
                 })
            }
            
            val triple = if (inMemoryEntry != null) {
                val session = inMemoryEntry.value
                val matchedPlayer = session.gameState.players.firstOrNull { p ->
                    !p.isBot && ((!userId.isNullOrBlank() && p.id == userId) || (!userName.isNullOrBlank() && (p.name == userName || p.id == userName)))
                } ?: session.gameState.players.firstOrNull { !it.isBot }
                if (matchedPlayer != null) {
                    Triple(session, inMemoryEntry.key, matchedPlayer.id)
                } else null
            } else {
                // 2. Not in memory, check MongoDB
                val saved = GameRepository.loadActivePvEGame(userId, userName)
                if (saved != null && saved.second.status == GameStatus.IN_PROGRESS) {
                    val (savedGameId, savedState) = saved
                    val matchedPlayer = savedState.players.firstOrNull { p ->
                        !p.isBot && ((!userId.isNullOrBlank() && p.id == userId) || (!userName.isNullOrBlank() && (p.name == userName || p.id == userName)))
                    } ?: savedState.players.firstOrNull { !it.isBot }
                    
                    if (matchedPlayer != null) {
                        val restoredSession = GameSession(savedState, savedGameId, userId ?: userName)
                        pveSessions[savedGameId] = restoredSession
                        Triple(restoredSession, savedGameId, matchedPlayer.id)
                    } else null
                } else null
            }
            
            if (triple != null) {
                val (gameSession, _, playerId) = triple
                // Detach wsSession from global observers if present
                val obsKey = globalSession.observers.entries.find { it.value == wsSession }?.key
                if (obsKey != null) globalSession.observers.remove(obsKey)
                
                connectionToGame[wsSession] = Pair(gameSession, playerId)
                Pair(gameSession, playerId)
            } else null
        }
        
        if (reconnected != null) {
            val (gameSession, playerId) = reconnected
            gameSession.reconnect(playerId, wsSession)
            logger.info("Player '{}' reconnected to active PvE session '{}'", playerId, gameSession.gameId)
            gameSession.broadcastState()
            return reconnected
        }
        return null
    }

    suspend fun joinPvEGame(playerName: String, chosenHeroes: List<String>, wsSession: DefaultWebSocketSession) {
        val incomingId = UUID.randomUUID().toString()
        val gameToJoin = mutex.withLock {
            pveSessions.values.find { it.gameState.isPvE && it.gameState.players.count { p -> !p.isBot } < 2 }
                ?: if (globalSession.gameState.isPvE) globalSession else null
        }
        
        if (gameToJoin != null) {
            val effectivePlayerId = gameToJoin.joinPvEGame(incomingId, playerName, chosenHeroes, wsSession)
            if (effectivePlayerId != null) {
                mutex.withLock {
                    connectionToGame[wsSession] = Pair(gameToJoin, effectivePlayerId)
                }
            }
        }
    }

    suspend fun leaveGame(wsSession: DefaultWebSocketSession) {
        val sessionToObserve = mutex.withLock {
            val prev = connectionToGame.remove(wsSession)
            if (prev != null) {
                val (prevGame, prevPlayerId) = prev
                prevGame.leave(prevPlayerId)
                
                if (prevGame.gameState.isPvE) {
                    // Explicitly leaving a PvE match clears it
                    pveSessions.entries.removeIf { (_, session) -> session == prevGame }
                    GameRepository.clearActiveGame(prevGame.gameId)
                }
            }
            
            // Re-add as observer to global multiplayer session
            val observerId = UUID.randomUUID().toString()
            globalSession to observerId
        }
        sessionToObserve.first.addObserver(sessionToObserve.second, wsSession)
    }
    
    suspend fun addObserver(observerId: String, wsSession: DefaultWebSocketSession) {
        val game = mutex.withLock { globalSession }
        game.addObserver(observerId, wsSession)
    }

    suspend fun removeObserver(observerId: String) {
        mutex.withLock {
            globalSession.removeObserver(observerId)
            pveSessions.values.forEach { it.removeObserver(observerId) }
        }
    }
    
    suspend fun disconnect(wsSession: DefaultWebSocketSession) {
        val (game, playerId) = mutex.withLock {
            val obsKey = globalSession.observers.entries.find { it.value == wsSession }?.key
            if (obsKey != null) {
                globalSession.observers.remove(obsKey)
            }
            pveSessions.values.forEach { pve ->
                val pveObsKey = pve.observers.entries.find { it.value == wsSession }?.key
                if (pveObsKey != null) pve.observers.remove(pveObsKey)
            }
            
            connectionToGame.remove(wsSession)
        } ?: return
        
        game.leave(playerId)
        
        mutex.withLock {
            // Only clean up PvE sessions if they are GAME_OVER or NOT_CREATED.
            // In-progress PvE sessions are retained so the user can reconnect.
            pveSessions.entries.removeIf { (_, session) ->
                session == game && (session.gameState.status == GameStatus.GAME_OVER || session.gameState.status == GameStatus.NOT_CREATED)
            }
        }
    }
}

