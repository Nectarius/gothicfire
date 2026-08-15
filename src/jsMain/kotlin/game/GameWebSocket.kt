package game

import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import models.*
import org.w3c.dom.WebSocket
import org.w3c.dom.MessageEvent

class GameWebSocket(
    private val onStateUpdated: (GameState, String) -> Unit,
    private val onError: (String) -> Unit,
    private val onFightOccurred: (GameEvent.FightOccurred) -> Unit = {},
    private val onScrollFound: (GameEvent.ScrollFound) -> Unit = {},
    private val onScrollSearchFailed: (GameEvent.ScrollSearchFailed) -> Unit = {},
    private val onNatureEvent: (GameEvent.NatureEventOccurred) -> Unit = {},
    private val onResourceTransferred: (GameEvent.ResourceTransferred) -> Unit = {}
) {
    private var ws: WebSocket? = null
    private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }

    fun connect(onConnected: () -> Unit = {}) {
        if (ws != null) return
        
        val protocol = if (kotlinx.browser.window.location.protocol == "https:") "wss:" else "ws:"
        val host = kotlinx.browser.window.location.host
        val url = "$protocol//$host/game-socket"
        
        ws = WebSocket(url)
        
        ws?.onopen = {
            onConnected()
        }
        
        ws?.onmessage = { event ->
            val msgEvent = event as MessageEvent
            val data = msgEvent.data as String
            try {
                val gameEvent = json.decodeFromString<GameEvent>(data)
                when (gameEvent) {
                    is GameEvent.GameStateUpdated -> onStateUpdated(gameEvent.gameState, gameEvent.yourPlayerId)
                    is GameEvent.Error -> onError(gameEvent.message)
                    is GameEvent.WaitingForOpponent -> {}
                    is GameEvent.FightOccurred -> onFightOccurred(gameEvent)
                    is GameEvent.ScrollFound -> onScrollFound(gameEvent)
                    is GameEvent.ScrollSearchFailed -> onScrollSearchFailed(gameEvent)
                    is GameEvent.NatureEventOccurred -> onNatureEvent(gameEvent)
                    is GameEvent.ResourceTransferred -> onResourceTransferred(gameEvent)
                }
            } catch (e: Exception) {
                console.error("Failed to parse event: $data", e)
            }
        }
        
        ws?.onerror = { event ->
            console.error("WebSocket error", event)
            onError("Connection error")
        }
        
        ws?.onclose = { event ->
            console.log("WebSocket closed")
            ws = null
        }
    }
    
    fun sendAction(action: GameAction) {
        val w = ws
        if (w != null && w.readyState == WebSocket.OPEN) {
            val text = json.encodeToString<GameAction>(action)
            w.send(text)
        } else {
            onError("Not connected to server")
        }
    }
    
    fun disconnect() {
        ws?.close()
        ws = null
    }
}
