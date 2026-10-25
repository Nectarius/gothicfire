package components

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.LocationInfo
import models.getLocationInfo
import models.getSubLocationForSector
import i18n.t
import i18n.I18n

/**
 * Lore codex modal opened from the "Info" button of a map location.
 * Shows a painted illustration of the location, its history across the Gothic series
 * and the characters associated with it. Content is loaded dynamically from external
 * JSON files and updates when language changes.
 */
@Composable
fun IComponent.LocationInfoModal(
    sectorId: String,
    fallbackName: String,
    onClose: () -> Unit
) {
    val currentLang = I18n.currentLanguage.value.code
    LaunchedEffect(currentLang) {
        LocationInfoLoader.loadLanguage(currentLang)
    }
    // Recompose when new catalog data arrives over the network
    val _version = LocationInfoLoader.catalogVersion.value

    val info: LocationInfo? = getLocationInfo(sectorId, currentLang)
    // If the dedicated artwork is missing, the sub-location banner shows through as a fallback layer.
    val fallbackImage = getSubLocationForSector(sectorId)?.bannerImageUrl ?: "/gothic_map.jpg"

    div(className = "territory-modal-backdrop location-info-backdrop") {
        id("location-info-backdrop-$sectorId")
        onClick {
            it.stopPropagation()
            onClose()
        }

        div(className = "territory-modal-card glass location-info-card") {
            id("location-info-modal-$sectorId")
            role("dialog")
            ariaLabel(info?.title ?: fallbackName)
            onClick { it.stopPropagation() }

            // Hero artwork with title overlay
            div(className = "location-info-hero") {
                div(className = "location-info-hero-img") {
                    role("img")
                    ariaLabel("Illustration of ${info?.title ?: fallbackName}")
                    val primary = info?.imageUrl
                    val bg = if (primary != null) "url('$primary'), url('$fallbackImage')" else "url('$fallbackImage')"
                    style("background-image", bg)
                }
                div(className = "location-info-hero-shade") {}
                button("✕", className = "btn-modal-close location-info-close") {
                    id("location-info-close-$sectorId")
                    title(t("location_info.close"))
                    onClick { onClose() }
                }
                div(className = "location-info-hero-text") {
                    span(className = "location-info-region") {
                        textNode("📍 ${info?.region ?: "Khorinis"} • Sector #$sectorId")
                    }
                    h2(className = "location-info-title") { textNode(info?.title ?: fallbackName) }
                    if (info != null) {
                        p(className = "location-info-tagline") { textNode(info.tagline) }
                    }
                }
            }

            div(className = "location-info-body") {
                if (info == null) {
                    p(className = "location-info-paragraph") {
                        textNode(t("location_info.unknown"))
                    }
                } else {
                    // Game appearance badges
                    div(className = "location-info-games") {
                        span(className = "location-info-games-label") { textNode(t("location_info.lore_from")) }
                        for (game in info.appearsIn) {
                            span(className = "location-info-game-badge") { textNode(game) }
                        }
                    }

                    section(className = "location-info-section") {
                        h3(className = "location-info-heading") { textNode("🏞️ " + t("location_info.about")) }
                        p(className = "location-info-paragraph") { textNode(info.description) }
                    }

                    section(className = "location-info-section") {
                        h3(className = "location-info-heading") { textNode("📜 " + t("location_info.history")) }
                        p(className = "location-info-paragraph") { textNode(info.history) }
                    }

                    if (info.characters.isNotEmpty()) {
                        section(className = "location-info-section") {
                            h3(className = "location-info-heading") { textNode("👥 " + t("location_info.characters")) }
                            div(className = "location-info-characters") {
                                for (character in info.characters) {
                                    div(className = "location-info-character") {
                                        div(className = "location-info-character-initial") {
                                            textNode(character.name.first().uppercase())
                                        }
                                        div(className = "location-info-character-text") {
                                            div(className = "location-info-character-name") { textNode(character.name) }
                                            div(className = "location-info-character-role") { textNode(character.role) }
                                            p(className = "location-info-character-desc") { textNode(character.description) }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (info.facts.isNotEmpty()) {
                        section(className = "location-info-section") {
                            h3(className = "location-info-heading") { textNode("✨ " + t("location_info.facts")) }
                            ul(className = "location-info-facts") {
                                for (fact in info.facts) {
                                    li { textNode(fact) }
                                }
                            }
                        }
                    }
                }

                div(className = "d-flex justify-center mt-1") {
                    button(t("location_info.close_btn"), className = "btn btn-outline text-gold w-full") {
                        id("location-info-close-btn-$sectorId")
                        onClick { onClose() }
                    }
                }
            }
        }
    }
}
