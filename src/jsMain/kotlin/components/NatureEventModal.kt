package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameEvent
import models.NatureEventType
import models.GameState
import models.MapData
import i18n.t

@Composable
fun IComponent.NatureEventModal(
    event: GameEvent.NatureEventOccurred,
    gameState: GameState?,
    onClose: () -> Unit
) {
    val territoryName = MapData[event.sectorId]?.name ?: "Sector ${event.sectorId}"
    
    val (icon, title, description, colorClass) = when (event.eventType) {
        NatureEventType.ABUNDANT_HARVEST -> listOf("🌾", t("nature.harvest_title"), t("nature.harvest_desc"), "text-green")
        NatureEventType.VOLUNTEERS -> listOf("🎺", t("nature.volunteers_title"), t("nature.volunteers_desc"), "text-primary")
        NatureEventType.HURRICANE -> listOf("🌪️", t("nature.hurricane_title"), t("nature.hurricane_desc"), "text-warning")
        NatureEventType.FLOOD -> listOf("🌊", t("nature.flood_title"), t("nature.flood_desc"), "text-red")
    }

    div(className = "modal-overlay glass") {
        div(className = "modal-content d-flex flex-col items-center justify-center text-center p-2") {
            span(className = "text-5xl mb-1") { textNode(icon) }
            h2(className = "m-0 mb-05 $colorClass") { textNode(title) }
            h4(className = "m-0 mb-1 text-gray") { textNode(territoryName) }
            
            p(className = "text-base text-dark-gray mb-2") {
                textNode(description)
            }
            
            button(t("popup.acknowledge"), className = "btn btn-primary w-full") {
                onClick { onClose() }
            }
        }
    }
}
