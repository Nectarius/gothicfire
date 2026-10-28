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
    
    div(className = "turn-hud glass gothic-turn-hud d-flex justify-between items-center mb-2") {
        // --- Left: Turn Counter with Gothic Crest ---
        div(className = "hud-turn-badge d-flex items-center gap-1") {
            div(className = "turn-indicator ${if (isMyTurn) "turn-active" else "turn-waiting"}")
            div(className = "d-flex flex-col text-left") {
                span(className = "hud-turn-label") { textNode("WAR TURN") }
                h2(className = "hud-turn-number m-0") { 
                    textNode("${gameState.currentTurn} / ${gameState.maxTurns}") 
                }
            }
        }
        
        // --- Center: Turn Status Banner ---
        div(className = "hud-status-center text-center") {
            if (gameState.status == GameStatus.GAME_OVER) {
                val winningTeamName = gameState.winningTeam?.let { gameState.teamInfos[it]?.name } ?: gameState.winningTeam?.name ?: "Nobody"
                div(className = "hud-victory-banner") {
                    span(className = "hud-victory-crown") { textNode("👑") }
                    h3(className = "m-0 text-red") { textNode(t("hud.game_over_win", winningTeamName)) }
                }
            } else {
                if (myPlayer == null) {
                    div(className = "hud-observer-pill") {
                        span(className = "text-yellow font-600") { textNode("👁️ " + t("lobby.observing_notice")) }
                    }
                } else if (isMyTurn) {
                    val teamName = gameState.teamInfos[myPlayer.team]?.name ?: t("hud.your_team")
                    val teamColor = gameState.teamInfos[myPlayer.team]?.color ?: "#fbbf24"
                    div(className = "hud-active-turn-banner") {
                        span(className = "hud-sword-icon") { textNode("⚔️") }
                        span(className = "hud-active-turn-text") { 
                            style("color", teamColor)
                            style("text-shadow", "0 0 12px ${teamColor}66")
                            textNode(t("hud.your_turn", teamName)) 
                        }
                    }
                } else {
                    val isAiTurn = models.GothicIndicators.isComputerTurn(gameState)
                    val aiTurnCount = gameState.currentTurn

                    if (isAiTurn) {
                        div(className = "ai-turn-hud-status") {
                            // Colony Chat Log ("Small Talk" Overlay - triggers every 3rd computer turn)
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
                        div(className = "hud-waiting-turn-banner") {
                            span(className = "hud-hourglass-icon") { textNode("⏳") }
                            span(className = "text-gray") { textNode(t("hud.waiting_team", activeTeamName)) }
                        }
                    }
                }
            }
        }
        
        // --- Right: In-Game Action Menu (Advisor, Market, Recruitment, Leave/End) ---
        div(className = "hud-actions-menu d-flex gap-1 items-center") {
            if (myPlayer != null) {
                val advisorId = myPlayer.advisorId.ifBlank { "ZORAX" }
                val advisor = models.PredefinedAdvisors.find { it.id == advisorId } ?: models.PredefinedAdvisors[0]
                val isZorax = advisor.id == "ZORAX"
                val badgeColor = if (isZorax) "#eab308" else "#c084fc"

                // Advisor Action Button
                button(className = "hud-action-btn hud-btn-advisor") {
                    style("--advisor-glow", badgeColor)
                    title("Consult your Advisor (${advisor.name})")

                    div(className = "hud-advisor-avatar-wrapper") {
                        img(src = advisor.iconUrl, alt = advisor.name, className = "hud-advisor-avatar") {
                            style("border-color", badgeColor)
                            style("box-shadow", "0 0 10px ${badgeColor}66")
                        }
                        span(className = "hud-advisor-magic-sparkle") { textNode("🔮") }
                    }
                    div(className = "d-flex flex-col text-left") {
                        span(className = "hud-btn-title") { textNode("Advisor") }
                        span(className = "hud-btn-sub") { 
                            style("color", badgeColor)
                            textNode(advisor.name.split(" ")[0]) 
                        }
                    }
                    onClick { onOpenAdvisor() }
                }

                // Market Action Button
                button(className = "hud-action-btn hud-btn-market") {
                    title(t("hud.market_tip"))
                    span(className = "hud-btn-icon") { textNode("⚖️") }
                    div(className = "d-flex flex-col text-left") {
                        span(className = "hud-btn-title") { textNode(t("hud.market")) }
                        span(className = "hud-btn-sub text-warning") { textNode("Provisions") }
                    }
                    onClick { onOpenMarket() }
                }

                // Army Recruitment Action Button
                button(className = "hud-action-btn hud-btn-recruit") {
                    title(t("hud.recruit_tip"))
                    span(className = "hud-btn-icon") { textNode("🛡️") }
                    div(className = "d-flex flex-col text-left") {
                        span(className = "hud-btn-title") { textNode(t("hud.recruit")) }
                        span(className = "hud-btn-sub text-primary") { textNode("Levy Troops") }
                    }
                    onClick { onOpenRecruitment() }
                }

                // Finish Game Button (Host Creator only)
                if (myPlayer.name == gameState.creatorPlayerId) {
                    button(className = "hud-action-btn hud-btn-danger") {
                        title(t("hud.finish_game_tip"))
                        span(className = "hud-btn-icon") { textNode("👑") }
                        div(className = "d-flex flex-col text-left") {
                            span(className = "hud-btn-title text-red") { textNode(t("hud.finish_game")) }
                        }
                        onClick { sendAction(GameAction.EndGame) }
                    }
                }

                // Leave Match Button
                button(className = "hud-action-btn hud-btn-leave") {
                    title(t("hud.leave_game_tip"))
                    span(className = "hud-btn-icon") { textNode("🚪") }
                    div(className = "d-flex flex-col text-left") {
                        span(className = "hud-btn-title text-gray") { textNode(t("hud.leave_game")) }
                    }
                    onClick { sendAction(GameAction.LeaveGame) }
                }
            }
            
            // Auto-turn notice pill
            div(className = "hud-auto-end-pill") {
                span(className = "hud-auto-end-icon") { textNode("⏳") }
                span(className = "hud-auto-end-text") { textNode(t("hud.turns_end_auto")) }
            }
        }
    }
}
