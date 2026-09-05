package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameState
import i18n.t

@Composable
fun IComponent.VictoryPopupModal(
    gameState: GameState,
    onClose: () -> Unit
) {
    val winningTeamInfo = gameState.winningTeam?.let { gameState.teamInfos[it] }
    val winningTeamName = winningTeamInfo?.name ?: gameState.winningTeam?.name ?: "Nobody"
    val winningColor = winningTeamInfo?.color ?: "gold"

    div(className = "modal-overlay glass") {
        div(className = "modal-content victory-popup-content d-flex flex-col items-center justify-center text-center") {
            span(className = "victory-icon mb-2") { textNode("🏆") }
            h1(className = "m-0 mb-1") { 
                style("color", winningColor)
                style("font-size", "3rem")
                textNode(t("victory.title")) 
            }
            h2(className = "m-0 mb-3 text-gray") {
                textNode(t("victory.subtitle", winningTeamName))
            }
            
            p(className = "text-lg text-gray mb-3") {
                textNode(t("victory.desc"))
            }
            
            button(t("victory.return_map"), className = "btn btn-primary w-full p-2 text-lg") {
                onClick { onClose() }
            }
        }
    }
}
