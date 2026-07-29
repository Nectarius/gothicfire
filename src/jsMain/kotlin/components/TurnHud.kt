package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameState
import models.GameAction
import models.GameStatus
import models.Team

@Composable
fun IComponent.TurnHud(
    playerId: String,
    gameState: GameState?,
    sendAction: (GameAction) -> Unit
) {
    if (gameState == null) return
    
    val myPlayer = gameState.players.find { it.id == playerId }
    val isMyTurn = gameState.activeTeamTurn == myPlayer?.team
    
    div(className = "turn-hud glass d-flex justify-between items-center mb-2") {
        div(className = "d-flex items-center gap-1") {
            // Glowing indicator
            div(className = "turn-indicator ${if (isMyTurn) "turn-active" else "turn-waiting"}")
            h2(className = "m-0") { 
                textNode("Turn ${gameState.currentTurn} / ${gameState.maxTurns}") 
            }
        }
        
        div(className = "text-center") {
            if (gameState.status == GameStatus.GAME_OVER) {
                h3(className = "m-0 text-red") { textNode("Game Over!") }
            } else {
                p(className = "m-0 text-md") { 
                    if (isMyTurn) {
                        val teamName = if (myPlayer?.team == Team.RED) "Red Team" else "Blue Team"
                        span(className = "text-primary font-600") { textNode("Your Team's Turn ($teamName)") }
                    } else {
                        val enemyTeam = if (myPlayer?.team == Team.RED) "Blue Team" else "Red Team"
                        span(className = "text-gray") { textNode("Waiting for $enemyTeam...") }
                    }
                }
            }
        }
        
        div(className = "text-right") {
            // No End Turn button as it's automatic
            p(className = "m-0 text-sm text-gray") { textNode("Turns end automatically when all members act.") }
        }
    }
}
