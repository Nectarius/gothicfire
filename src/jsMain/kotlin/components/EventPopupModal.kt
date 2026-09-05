package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import PopupEvent
import i18n.t

@Composable
fun IComponent.EventPopupModal(
    event: PopupEvent,
    onClose: () -> Unit
) {
    div(className = "modal-overlay glass event-popup-overlay") {
        div(className = "modal-content event-popup-content d-flex flex-col items-center justify-center text-center p-2") {
            span(className = "text-6xl mb-2 event-popup-icon") { textNode(event.icon) }
            h2(className = "m-0 mb-1 ${event.colorClass} event-popup-title") { textNode(event.title) }
            
            p(className = "text-lg text-gray mb-3 event-popup-message") {
                textNode(event.message)
            }
            
            button(t("popup.acknowledge"), className = "btn btn-primary w-full event-popup-btn") {
                onClick { onClose() }
            }
        }
    }
}
