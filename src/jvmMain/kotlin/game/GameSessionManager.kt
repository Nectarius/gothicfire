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
    private var globalSession = initializeSession()
    
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
    
    // Map of WebSocket session to its GameSession and playerId
    val connectionToGame = mutableMapOf<DefaultWebSocketSession, Pair<GameSession, String>>()

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
    
    suspend fun disconnect(wsSession: DefaultWebSocketSession) {
        val (game, playerId) = mutex.withLock {
            connectionToGame.remove(wsSession)
        } ?: return
        
        game.leave(playerId)
    }
}

