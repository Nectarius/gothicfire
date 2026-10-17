package components

import androidx.compose.runtime.Composable
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameEvent
import models.getCastleLordForSector
import i18n.t

@Composable
fun IComponent.CastleDialogueModal(
    dialogue: GameEvent.CastleDialogueReceived,
    onClose: () -> Unit
) {
    val castleLord = getCastleLordForSector(dialogue.sectorId)
    val portraitUrl = castleLord?.portraitUrl ?: "/Castle_icon.png"
    val lordTitle = castleLord?.title ?: "Castle Commander"
    val faction = castleLord?.faction ?: "Sovereign Stronghold"

    div(className = "territory-modal-backdrop castle-dialogue-backdrop") {
        onClick { onClose() }

        div(className = "territory-modal-card glass castle-dialogue-card") {
            onClick { it.stopPropagation() }

            // Header with Lord Identity
            div(className = "castle-dialogue-header d-flex justify-between items-center mb-1") {
                div(className = "d-flex items-center gap-1") {
                    img(src = portraitUrl, alt = dialogue.lordName, className = "castle-dialogue-portrait")
                    div {
                        h3(className = "m-0 castle-lord-dialogue-name") {
                            textNode(dialogue.lordName)
                        }
                        div(className = "text-xs text-primary font-600") {
                            textNode(lordTitle)
                        }
                        div(className = "text-xs text-gray") {
                            textNode(faction)
                        }
                    }
                }
                button("✕", className = "btn-modal-close") {
                    onClick { onClose() }
                }
            }

            // Inquiry banner
            div(className = "castle-inquiry-bubble mb-1") {
                span(className = "text-xs text-gray font-italic") {
                    textNode(t("castle.inquiry_label") + " ")
                }
                span(className = "text-xs font-600 text-light") {
                    textNode(t("castle.inquiry_text"))
                }
            }

            // Lord's Gothic Speech
            div(className = "castle-speech-parchment mb-1") {
                p(className = "castle-speech-text m-0") {
                    textNode(dialogue.speech)
                }
            }

            // Key Tactical Insights
            if (dialogue.keyPoints.isNotEmpty()) {
                div(className = "castle-keypoints-box mb-1") {
                    div(className = "text-xs font-600 text-warning mb-05") {
                        textNode(t("castle.directives_title"))
                    }
                    div(className = "d-flex flex-col gap-03") {
                        for (point in dialogue.keyPoints) {
                            div(className = "d-flex items-center gap-05") {
                                span(className = "text-primary text-xs") { textNode("•") }
                                span(className = "text-xs text-gray") { textNode(point) }
                            }
                        }
                    }
                }
            }

            // Action Button
            div(className = "d-flex justify-center mt-1") {
                button(t("castle.farewell_btn"), className = "btn btn-primary w-full") {
                    onClick { onClose() }
                }
            }
        }
    }
}
