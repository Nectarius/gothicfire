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
    onOpenMarket: () -> Unit,
    onOpenRecruitment: () -> Unit,
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
                val winningTeamName = gameState.winningTeam?.let { gameState.teamInfos[it]?.name } ?: gameState.winningTeam?.name ?: "Nobody"
                h3(className = "m-0 text-red") { textNode("Game Over! $winningTeamName Wins!") }
            } else {
                p(className = "m-0 text-md") { 
                    if (isMyTurn) {
                        val teamName = myPlayer?.team?.let { gameState.teamInfos[it]?.name } ?: "Your Team"
                        val teamColor = myPlayer?.team?.let { gameState.teamInfos[it]?.color } ?: "var(--primary)"
                        span(className = "font-600") { 
                            style("color", teamColor)
                            textNode("Your Team's Turn ($teamName)") 
                        }
                    } else {
                        val enemyTeamEnum = if (myPlayer?.team == Team.RED) Team.BLUE else Team.RED
                        val enemyTeam = gameState.teamInfos[enemyTeamEnum]?.name ?: "Enemy Team"
                        span(className = "text-gray") { textNode("Waiting for $enemyTeam...") }
                    }
                }
            }
        }
        
        div(className = "d-flex gap-05 items-center") {
            button("⚖️ Market", className = "btn btn-sm btn-outline text-warning") {
                title("Trade gold for food, or food for gold.")
                onClick { onOpenMarket() }
            }
            button("⚔️ Recruit Army", className = "btn btn-sm btn-outline text-primary") {
                title("Hire soldiers to join your heroes.")
                onClick { onOpenRecruitment() }
            }
            if (myPlayer?.name == gameState.creatorPlayerId) {
                button("🛑 Finish Game", className = "btn btn-sm btn-outline text-red ml-1") {
                    title("End and reset the game for everyone.")
                    onClick { sendAction(GameAction.EndGame) }
                }
            }
            p(className = "m-0 text-sm text-gray ml-1") { textNode("Turns end automatically.") }
        }
    }
}
