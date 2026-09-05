package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import rpc.AppService
import models.GameResultSummary
import kotlinx.coroutines.launch
import kotlin.js.Date
import i18n.t

@Composable
fun IComponent.GameHistoryPanel(appService: AppService) {
    val scope = remember { kotlinx.coroutines.MainScope() }
    var history by remember { mutableStateOf<List<GameResultSummary>?>(null) }
    var error by remember { mutableStateOf("") }

    LaunchedEffect(Unit) {
        scope.launch {
            try {
                history = appService.getGameHistory()
            } catch (e: Exception) {
                error = e.message ?: t("history.error")
            }
        }
    }

    div(className = "p-2") {
        h2(className = "text-center m-0 mb-2") { textNode(t("history.title")) }
        
        if (error.isNotBlank()) {
            div(className = "glass card text-center p-2") {
                h3(className = "text-red m-0") { textNode(t("history.error")) }
                p { textNode(error) }
            }
        } else if (history == null) {
            p(className = "text-center text-gray") { textNode(t("history.loading")) }
        } else if (history!!.isEmpty()) {
            div(className = "glass card text-center p-4") {
                h3(className = "text-gray m-0") { textNode(t("history.empty")) }
                p(className = "text-dark-gray") { textNode(t("history.empty_desc")) }
            }
        } else {
            div(className = "d-flex flex-col gap-1") {
                for (game in history!!) {
                    div(className = "glass card") {
                        val dateString = Date(game.finishedAt.toDouble()).toLocaleString()
                        
                        div(className = "d-flex justify-between items-center mb-1") {
                            div {
                                if (game.winningTeamName != null) {
                                    val winColor = game.winningTeamColor ?: "var(--primary)"
                                    h3(className = "m-0 font-600") {
                                        style("color", winColor)
                                        textNode(t("history.team_wins", game.winningTeamName.uppercase()))
                                    }
                                } else {
                                    h3(className = "m-0 text-gray") { textNode(t("history.draw")) }
                                }
                                span(className = "text-sm text-dark-gray") { textNode(t("history.ended", dateString)) }
                            }
                            div(className = "text-right") {
                                span(className = "font-600 text-gold") { textNode(t("history.turns", game.totalTurns)) }
                            }
                        }
                        
                        div(className = "d-flex justify-between gap-1 mt-1") {
                            // Team 1
                            div(className = "w-full text-center") {
                                h4(className = "m-0 mb-05") {
                                    textNode(game.redTeamName ?: "Team 1")
                                }
                                if (game.redPlayers.isEmpty()) {
                                    span(className = "text-xs text-dark-gray") { textNode(t("history.no_players")) }
                                } else {
                                    span(className = "text-sm text-gray") {
                                        textNode(game.redPlayers.joinToString(", "))
                                    }
                                }
                            }
                            
                            div(className = "text-dark-gray font-600 self-center") { textNode("VS") }
                            
                            // Team 2
                            div(className = "w-full text-center") {
                                h4(className = "m-0 mb-05") {
                                    textNode(game.blueTeamName ?: "Team 2")
                                }
                                if (game.bluePlayers.isEmpty()) {
                                    span(className = "text-xs text-dark-gray") { textNode(t("history.no_players")) }
                                } else {
                                    span(className = "text-sm text-gray") {
                                        textNode(game.bluePlayers.joinToString(", "))
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
