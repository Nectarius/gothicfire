package game

import io.ktor.websocket.*
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import models.Team
import models.GameStatus
import java.util.UUID

object GameSessionManager {
    private val mutex = Mutex()
    private var globalSession = GameSession()
    
    // Map of WebSocket session to its GameSession and playerId
    val connectionToGame = mutableMapOf<DefaultWebSocketSession, Pair<GameSession, String>>()

    suspend fun joinTeam(playerName: String, team: Team, wsSession: DefaultWebSocketSession) {
        val playerId = UUID.randomUUID().toString()
        val gameToJoin = mutex.withLock {
            if (globalSession.gameState.status == GameStatus.GAME_OVER) {
                globalSession = GameSession()
            }
            connectionToGame[wsSession] = Pair(globalSession, playerId)
            globalSession
        }
        gameToJoin.joinTeam(playerId, playerName, team, wsSession)
    }
    
    suspend fun disconnect(wsSession: DefaultWebSocketSession) {
        val (game, playerId) = mutex.withLock {
            connectionToGame.remove(wsSession)
        } ?: return
        
        game.leave(playerId)
    }
}
