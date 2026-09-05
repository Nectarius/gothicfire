package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameState
import models.GameAction
import models.GameStatus
import models.Team
import i18n.t

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
                textNode(t("hud.turn", gameState.currentTurn, gameState.maxTurns)) 
            }
        }
        
        div(className = "text-center") {
            if (gameState.status == GameStatus.GAME_OVER) {
                val winningTeamName = gameState.winningTeam?.let { gameState.teamInfos[it]?.name } ?: gameState.winningTeam?.name ?: "Nobody"
                h3(className = "m-0 text-red") { textNode(t("hud.game_over_win", winningTeamName)) }
            } else {
                p(className = "m-0 text-md") { 
                    if (myPlayer == null) {
                        span(className = "text-yellow font-600") { textNode("👁️ " + t("lobby.observing_notice")) }
                    } else if (isMyTurn) {
                        val teamName = myPlayer.team?.let { gameState.teamInfos[it]?.name } ?: t("hud.your_team")
                        val teamColor = myPlayer.team?.let { gameState.teamInfos[it]?.color } ?: "var(--primary)"
                        span(className = "font-600") { 
                            style("color", teamColor)
                            textNode(t("hud.your_turn", teamName)) 
                        }
                    } else {
                        val enemyTeamEnum = if (myPlayer.team == Team.RED) Team.BLUE else Team.RED
                        val enemyTeam = gameState.teamInfos[enemyTeamEnum]?.name ?: t("hud.enemy_team")
                        span(className = "text-gray") { textNode(t("hud.waiting_team", enemyTeam)) }
                    }
                }
            }
        }
        
        div(className = "d-flex gap-05 items-center") {
            if (myPlayer != null) {
                button(t("hud.market"), className = "btn btn-sm btn-outline text-warning") {
                    title(t("hud.market_tip"))
                    onClick { onOpenMarket() }
                }
                button(t("hud.recruit"), className = "btn btn-sm btn-outline text-primary") {
                    title(t("hud.recruit_tip"))
                    onClick { onOpenRecruitment() }
                }
                if (myPlayer.name == gameState.creatorPlayerId) {
                    button(t("hud.finish_game"), className = "btn btn-sm btn-outline text-red ml-1") {
                        title(t("hud.finish_game_tip"))
                        onClick { sendAction(GameAction.EndGame) }
                    }
                }
                button(t("hud.leave_game"), className = "btn btn-sm btn-outline text-gray ml-05") {
                    title(t("hud.leave_game_tip"))
                    onClick { sendAction(GameAction.LeaveGame) }
                }
            }
            p(className = "m-0 text-sm text-gray ml-1") { textNode(t("hud.turns_end_auto")) }
        }
    }
}
