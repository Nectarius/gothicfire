package game

import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.channels.consumeEach
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import models.*

fun Route.gameSocket() {
    val json = Json { ignoreUnknownKeys = true }
    
    webSocket("/game-socket") {
        try {
            incoming.consumeEach { frame ->
                if (frame is Frame.Text) {
                    val text = frame.readText()
                    try {
                        val action = json.decodeFromString<GameAction>(text)
                        
                        // Handle join separately
                        if (action is GameAction.JoinTeam) {
                            GameSessionManager.joinTeam(action.playerName, action.team, this)
                            return@consumeEach
                        }
                        
                        // Handle active game actions
                        val (game, playerId) = GameSessionManager.connectionToGame[this] ?: return@consumeEach
                        
                        when (action) {
                            is GameAction.CreateCharacter -> game.createCharacter(playerId, action.name, action.strength, action.agility, action.wisdom)
                            is GameAction.ToggleReady -> game.toggleReady(playerId)
                            is GameAction.StartGame -> game.startGame(playerId)
                            is GameAction.PlaceCharacter -> game.placeCharacter(playerId, action.targetSector)
                            is GameAction.MoveCharacter -> game.moveCharacter(playerId, action.targetSector)
                            is GameAction.JoinTeam -> {} // Handled above
                        }
                    } catch (e: Exception) {
                        println("Error parsing action: ${e.message}")
                    }
                }
            }
        } finally {
            GameSessionManager.disconnect(this)
        }
    }
}
