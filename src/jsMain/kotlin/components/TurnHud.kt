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
    onOpenAdvisor: () -> Unit,
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
                        val isAiTurn = models.GothicIndicators.isComputerTurn(gameState)
                        val aiTurnCount = gameState.currentTurn

                        if (isAiTurn) {
                            div(className = "ai-turn-hud-status") {
                                // Feature 2: Colony Chat Log ("Small Talk" Overlay - triggers every 3rd computer turn)
                                div(className = "hud-colony-chat-wrapper") {
                                    ColonyChatLog(
                                        isThinking = true,
                                        aiTurnCount = aiTurnCount,
                                        arrowPosition = "bottom-center"
                                    )
                                }

                                div(className = "ai-avatar-badge") {
                                    title("Computer Opponent (Raven) calculating move...")
                                    img(src = "/portraits/raven.jpg", alt = "Raven (AI Opponent)", className = "ai-avatar-img")
                                }
                                div(className = "d-flex flex-col text-left") {
                                    val botTeam = gameState.teamInfos[gameState.activeTeamTurn]
                                    val botName = botTeam?.name ?: "Enemy AI"
                                    span(className = "font-600 text-yellow text-sm") {
                                        textNode("$botName's Turn")
                                    }
                                    span(className = "text-xs text-gray d-flex items-center") {
                                        textNode("Calculating move")
                                        span(className = "ai-thinking-dots") {
                                            span(className = "ai-thinking-dot")
                                            span(className = "ai-thinking-dot")
                                            span(className = "ai-thinking-dot")
                                        }
                                    }
                                }
                            }
                        } else {
                            val activeTeamName = gameState.teamInfos[gameState.activeTeamTurn]?.name
                                ?: (if (myPlayer.team == Team.RED) gameState.teamInfos[Team.BLUE]?.name else gameState.teamInfos[Team.RED]?.name)
                                ?: t("hud.enemy_team")
                            span(className = "text-gray") { textNode(t("hud.waiting_team", activeTeamName)) }
                        }
                    }
                }
            }
        }
        
        div(className = "d-flex gap-05 items-center") {
            if (myPlayer != null) {
                val advisorId = myPlayer.advisorId.ifBlank { "ZORAX" }
                val advisor = models.PredefinedAdvisors.find { it.id == advisorId } ?: models.PredefinedAdvisors[0]
                val isZorax = advisor.id == "ZORAX"
                val badgeColor = if (isZorax) "#eab308" else "#c084fc"

                button(className = "btn btn-sm btn-outline d-flex items-center gap-05") {
                    style("border-color", badgeColor)
                    style("color", badgeColor)
                    style("padding", "0.2rem 0.6rem")
                    title("Consult your Advisor (${advisor.name})")

                    img(src = advisor.iconUrl, alt = advisor.name) {
                        style("width", "22px")
                        style("height", "22px")
                        style("border-radius", "50%")
                        style("object-fit", "cover")
                        style("border", "1px solid $badgeColor")
                    }
                    span(className = "font-600") {
                        textNode("Advisor: ${advisor.name.split(" ")[0]}")
                    }
                    onClick { onOpenAdvisor() }
                }

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
