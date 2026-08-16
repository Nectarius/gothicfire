package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameEvent
import models.NatureEventType
import models.GameState

@Composable
fun IComponent.NatureEventModal(
    event: GameEvent.NatureEventOccurred,
    gameState: GameState?,
    onClose: () -> Unit
) {
    val territoryName = gameState?.territories?.get(event.sectorId)?.let { gameState.teamCastles.entries.find { c -> c.value == event.sectorId }?.key?.name + " Castle" } ?: "Sector ${event.sectorId}"
    
    val (icon, title, description, colorClass) = when (event.eventType) {
        NatureEventType.ABUNDANT_HARVEST -> listOf("🌾", "Abundant Harvest", "A bountiful harvest has occurred! Food production in this territory is greatly increased for the turn.", "text-green")
        NatureEventType.VOLUNTEERS -> listOf("🎺", "Volunteers", "Brave locals have taken up arms! Light Infantry has joined the local army.", "text-primary")
        NatureEventType.HURRICANE -> listOf("🌪️", "Hurricane", "A devastating hurricane has struck! Buildings are damaged and protection is reduced.", "text-warning")
        NatureEventType.FLOOD -> listOf("🌊", "Flood", "Severe flooding has ruined the fields! Stored food in this territory has been washed away.", "text-red")
    }

    div(className = "modal-overlay glass") {
        div(className = "modal-content d-flex flex-col items-center justify-center text-center p-2") {
            span(className = "text-5xl mb-1") { textNode(icon) }
            h2(className = "m-0 mb-05 $colorClass") { textNode(title) }
            h4(className = "m-0 mb-1 text-gray") { textNode(territoryName) }
            
            p(className = "text-base text-dark-gray mb-2") {
                textNode(description)
            }
            
            button("Acknowledge", className = "btn btn-primary w-full") {
                onClick { onClose() }
            }
        }
    }
}
