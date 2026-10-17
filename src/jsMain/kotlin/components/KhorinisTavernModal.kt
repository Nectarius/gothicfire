package components

import androidx.compose.runtime.Composable
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameEvent
import models.KhorinisTavernPatrons
import i18n.t

@Composable
fun IComponent.KhorinisTavernModal(
    characterId: String,
    activeDialogue: GameEvent.TavernDialogueReceived?,
    onClose: () -> Unit,
    onTalk: (patronId: String) -> Unit
) {
    div(className = "territory-modal-backdrop tavern-dialogue-backdrop") {
        onClick { onClose() }

        div(className = "territory-modal-card glass tavern-modal-container") {
            onClick { it.stopPropagation() }

            // Header with Tavern Banner
            div(className = "tavern-header d-flex justify-between items-center mb-1") {
                div {
                    h2(className = "m-0 text-gold text-lg") { textNode(t("tavern.title", "🍺 The Harbor Tavern of Khorinis")) }
                    p(className = "text-xs text-gray m-0 mt-02") { textNode(t("tavern.subtitle", "Kardif's drinking den in the harbor quarter")) }
                }
                button("✕", className = "btn-modal-close") { onClick { onClose() } }
            }

            // Tavern Atmosphere Artwork
            div(className = "tavern-banner mb-1") {
                img(
                    src = "/tavern_khorinis.png",
                    alt = "Khorinis Harbor Tavern",
                    className = "tavern-image w-full rounded"
                )
            }

            // Dialogue Box (shown on top of patrons when active for high visibility)
            if (activeDialogue != null) {
                val speakingPatron = KhorinisTavernPatrons.find { it.id == activeDialogue.patronId }
                div(className = "tavern-dialogue-box glass p-1 mb-1 border border-gold rounded") {
                    div(className = "d-flex items-center gap-1 mb-05") {
                        if (speakingPatron != null) {
                            img(src = speakingPatron.iconUrl, alt = activeDialogue.patronName, className = "patron-dialogue-avatar")
                        }
                        div {
                            h4(className = "m-0 text-gold text-sm") {
                                textNode(t("tavern.speaking_with", activeDialogue.patronName))
                            }
                            if (speakingPatron != null) {
                                span(className = "text-xs text-gray") { textNode(speakingPatron.role) }
                            }
                        }
                    }
                    blockquote(className = "m-0 mt-05 text-italic text-sm text-gray") {
                        textNode("\"${activeDialogue.greeting}\"")
                    }
                    div(className = "mt-1 text-sm text-primary font-600 tavern-response-text") {
                        textNode(activeDialogue.responseText)
                    }
                }
            }

            // Patron List Grid
            p(className = "text-xs font-600 text-primary mb-05") { textNode(t("tavern.patrons_title", "Patrons at the Tables:")) }
            div(className = "d-flex flex-col gap-05 mb-1 tavern-patron-list") {
                for (patron in KhorinisTavernPatrons) {
                    val isTalkingToThis = activeDialogue?.patronId == patron.id
                    div(className = "glass p-1 d-flex justify-between items-center patron-row ${if (isTalkingToThis) "patron-active" else ""}") {
                        div(className = "d-flex items-center gap-1 flex-1") {
                            img(src = patron.iconUrl, alt = patron.name, className = "patron-avatar-img")
                            div {
                                div(className = "font-600 text-sm text-gold") { textNode(patron.name) }
                                div(className = "text-xs text-gray") { textNode(patron.role) }
                                div(className = "text-xs text-dark-gray mt-02") { textNode(patron.topicDescription) }
                            }
                        }
                        button(t("tavern.talk_btn", "Talk"), className = "btn btn-xs btn-primary ml-1") {
                            onClick { onTalk(patron.id) }
                        }
                    }
                }
            }

            // Close / Leave button
            div(className = "d-flex justify-center mt-1") {
                button(t("tavern.leave_btn", "Leave Tavern"), className = "btn btn-outline text-gold w-full") {
                    onClick { onClose() }
                }
            }
        }
    }
}
