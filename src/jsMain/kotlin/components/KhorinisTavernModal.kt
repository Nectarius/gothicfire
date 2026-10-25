package components

import androidx.compose.runtime.Composable
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameEvent
import models.HideType
import models.KhorinisTavernPatrons
import models.SectorSubLocation
import models.getSubLocationForSector
import i18n.t

@Composable
fun IComponent.KhorinisTavernModal(
    characterId: String,
    activeDialogue: GameEvent.TavernDialogueReceived?,
    activeHunterIntel: GameEvent.HunterIntelReceived? = null,
    subLocation: SectorSubLocation? = getSubLocationForSector("14"),
    commanderName: String? = null,
    onClose: () -> Unit,
    onTalk: (patronId: String) -> Unit,
    onAskHunter: (patronId: String, hideType: HideType) -> Unit = { _, _ -> }
) {
    div(className = "territory-modal-backdrop tavern-dialogue-backdrop") {
        onClick { onClose() }

        div(className = "territory-modal-card glass tavern-modal-container") {
            onClick { it.stopPropagation() }

            val modalTitle = subLocation?.modalTitle ?: t("tavern.title", "🍺 The Harbor Tavern of Khorinis")
            val modalSubtitle = subLocation?.modalSubtitle ?: t("tavern.subtitle", "Kardif's drinking den in the harbor quarter")
            val bannerImage = subLocation?.bannerImageUrl ?: "/tavern_khorinis.png"
            val patrons = subLocation?.patrons?.takeIf { it.isNotEmpty() } ?: KhorinisTavernPatrons

            // Header with Location Title
            div(className = "tavern-header d-flex justify-between items-center mb-1") {
                div {
                    h2(className = "m-0 text-gold text-lg") { textNode(modalTitle) }
                    p(className = "text-xs text-gray m-0 mt-02") { textNode(modalSubtitle) }
                }
                button("✕", className = "btn-modal-close") { onClick { onClose() } }
            }

            // Location Atmosphere Artwork (displayed when opened by player)
            div(className = "tavern-banner-container mb-1") {
                img(
                    src = bannerImage,
                    alt = modalTitle,
                    className = "tavern-banner-img"
                )
            }

            // Hunter Intel Box (shown when asking a Hunter NPC about game locations)
            if (activeHunterIntel != null) {
                div(className = "hunter-intel-box glass p-1 mb-1 border border-warning rounded") {
                    div(className = "d-flex items-center gap-1 mb-05 border-b border-warning-dim pb-05") {
                        span(className = "text-2xl") { textNode(activeHunterIntel.hideType.emoji) }
                        div {
                            h4(className = "m-0 text-warning text-sm") {
                                textNode("🏹 ${activeHunterIntel.patronName}'s Tracking Intel: ${activeHunterIntel.hideType.displayName}")
                            }
                            span(className = "text-xxs text-gray") {
                                textNode("Habitats and known roaming sectors across Khorinis")
                            }
                        }
                    }

                    div(className = "d-flex flex-col gap-05") {
                        for (ground in activeHunterIntel.grounds) {
                            div(className = "hunting-ground-card bg-black-30 p-05 rounded border-left-gold") {
                                div(className = "d-flex justify-between items-center mb-02") {
                                    span(className = "font-600 text-xs text-gold") {
                                        textNode(ground.title)
                                    }
                                    div(className = "d-flex gap-02") {
                                        for (s in ground.sectorIds) {
                                            span(className = "badge badge-outline text-xxs") {
                                                textNode("Sector $s")
                                            }
                                        }
                                    }
                                }
                                p(className = "m-0 text-xs text-light-gray line-height-relaxed") {
                                    textNode(ground.description)
                                }
                            }
                        }
                    }
                }
            }

            // Dialogue Box (shown when talking to a character inside the sublocation)
            if (activeDialogue != null) {
                val speakingPatron = patrons.find { it.id == activeDialogue.patronId }
                    ?: KhorinisTavernPatrons.find { it.id == activeDialogue.patronId }
                div(className = "tavern-dialogue-box glass p-1 mb-1 border border-gold rounded") {
                    // Two interlocutors header: Stationed Commander & Local Patron
                    div(className = "d-flex items-center justify-between gap-1 mb-1 pb-05 border-b border-gold-dim") {
                        // Left: Commander speaking
                        div(className = "d-flex items-center gap-05") {
                            img(
                                src = "/characters/commander.jpg",
                                alt = commanderName ?: "Commander",
                                className = "commander-dialogue-avatar"
                            )
                            div {
                                div(className = "font-600 text-sm text-primary") {
                                    textNode(commanderName ?: "Commander")
                                }
                                span(className = "text-xxs text-light-gray") {
                                    textNode("Stationed Hero")
                                }
                            }
                        }

                        // Conversational link badge
                        div(className = "text-center") {
                            span(className = "text-gold font-600 text-xs px-05 py-02 bg-gold-dim rounded") {
                                textNode("In Audience 💬")
                            }
                        }

                        // Right: Patron speaking
                        div(className = "d-flex items-center gap-05") {
                            div(className = "text-right") {
                                h4(className = "m-0 text-gold text-sm") {
                                    textNode(activeDialogue.patronName)
                                }
                                if (speakingPatron != null) {
                                    span(className = "text-xxs text-gray") { textNode(speakingPatron.role) }
                                }
                            }
                            if (speakingPatron != null) {
                                img(
                                    src = speakingPatron.iconUrl,
                                    alt = activeDialogue.patronName,
                                    className = "patron-dialogue-avatar"
                                )
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
            val patronsHeading = if (subLocation?.sectorId == "14" || subLocation == null) {
                t("tavern.patrons_title", "Patrons at the Tables:")
            } else {
                "Notable Figures & Inhabitants:"
            }
            p(className = "text-xs font-600 text-primary mb-05") { textNode(patronsHeading) }
            div(className = "d-flex flex-col gap-05 mb-1 tavern-patron-list") {
                for (patron in patrons) {
                    val isTalkingToThis = activeDialogue?.patronId == patron.id
                    div(className = "glass p-1 d-flex flex-col gap-05 patron-row ${if (isTalkingToThis) "patron-active" else ""}") {
                        div(className = "d-flex justify-between items-center") {
                            div(className = "d-flex items-center gap-1 flex-1") {
                                img(src = patron.iconUrl, alt = patron.name, className = "patron-avatar-img")
                                div {
                                    div(className = "font-600 text-sm text-gold") { textNode(patron.name) }
                                    div(className = "text-xs text-gray") { textNode(patron.role) }
                                    if (patron.topicDescription.isNotEmpty()) {
                                        div(className = "text-xs text-dark-gray mt-02") { textNode(patron.topicDescription) }
                                    }
                                }
                            }
                            button(t("tavern.talk_btn", "Talk"), className = "btn btn-xs btn-primary ml-1") {
                                onClick { onTalk(patron.id) }
                            }
                        }

                        if (patron.isHunter) {
                            div(className = "hunter-inquiry-box mt-02 pt-05 border-top-dark") {
                                span(className = "text-xxs text-warning font-600 d-block mb-02") {
                                    textNode("🏹 " + t("hunting.ask_hunter_title", "Where can I hunt pelts?"))
                                }
                                div(className = "d-flex flex-wrap gap-02") {
                                    for (hide in HideType.entries) {
                                        button(
                                            "${hide.emoji} ${hide.displayName}",
                                            className = "btn btn-xxs btn-outline text-warning"
                                        ) {
                                            title(t("hunting.ask_hunter_tip", patron.name, hide.displayName))
                                            onClick { onAskHunter(patron.id, hide) }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Close / Leave button
            val leaveBtnText = if (subLocation?.sectorId == "14" || subLocation == null) {
                t("tavern.leave_btn", "Leave Tavern")
            } else {
                "Leave Location"
            }
            div(className = "d-flex justify-center mt-1") {
                button(leaveBtnText, className = "btn btn-outline text-gold w-full") {
                    onClick { onClose() }
                }
            }
        }
    }
}
