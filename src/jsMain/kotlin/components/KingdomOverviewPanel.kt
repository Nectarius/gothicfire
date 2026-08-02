package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameState
import models.GameAction
import models.MapData
import models.ScrollType

@Composable
fun IComponent.KingdomOverviewPanel(
    playerId: String,
    gameState: GameState?,
    onSelectCharacter: (String) -> Unit,
    sendAction: (GameAction) -> Unit
) {
    if (gameState == null) return

    val myPlayer = gameState.players.find { it.id == playerId }
    val myCharacters = gameState.characters.filter { it.playerId == playerId }
    
    // Territories controlled by player or team
    val myTerritories = gameState.territories.values.filter { terr ->
        terr.ownerPlayerId == playerId || (terr.ownerTeam != null && terr.ownerTeam == myPlayer?.team)
    }.sortedBy { it.sectorId }
    
    val totalTerritoryFood = myTerritories.sumOf { it.food }
    val totalTerritoryGold = myTerritories.sumOf { it.gold }
    val totalTerritoryProtection = myTerritories.sumOf { it.protection }
    val totalArmy = myCharacters.sumOf { it.soldiers }
    val totalScrolls = myCharacters.sumOf { it.scrolls.size }
    
    var activeSubTab by remember { mutableStateOf("territories") } // "territories" or "heroes"

    div(className = "kingdom-overview-panel glass mt-1") {
        // Panel Header & Navigation
        div(className = "d-flex justify-between items-center kingdom-header mb-1") {
            div(className = "d-flex items-center gap-1") {
                h3(className = "m-0") { textNode("👑 Kingdom & Realm Overview") }
                span(className = "text-xs text-gray") {
                    textNode("Holdings of ${myPlayer?.name ?: "Player"}")
                }
            }
            
            div(className = "d-flex gap-05") {
                button("🏰 Controlled Territories (${myTerritories.size})", className = "btn btn-xs ${if (activeSubTab == "territories") "btn-primary" else "glass"}") {
                    onClick { activeSubTab = "territories" }
                }
                button("🧙 Heroes & Scrolls ($totalScrolls 📜)", className = "btn btn-xs ${if (activeSubTab == "heroes") "btn-primary" else "glass"}") {
                    onClick { activeSubTab = "heroes" }
                }
            }
        }
        
        // Summary Metrics Bar
        div(className = "kingdom-summary-bar mb-1") {
            div(className = "summary-metric") {
                span(className = "metric-label") { textNode("🏰 Territories") }
                span(className = "metric-value") { textNode("${myTerritories.size}") }
            }
            div(className = "summary-metric") {
                span(className = "metric-label") { textNode("🌾 Territory Food") }
                span(className = "metric-value text-primary") { textNode("$totalTerritoryFood") }
            }
            div(className = "summary-metric") {
                span(className = "metric-label") { textNode("🪙 Territory Gold") }
                span(className = "metric-value text-warning") { textNode("$totalTerritoryGold") }
            }
            div(className = "summary-metric") {
                span(className = "metric-label") { textNode("🛡️ Total Defense") }
                span(className = "metric-value") { textNode("+$totalTerritoryProtection") }
            }
            div(className = "summary-metric") {
                span(className = "metric-label") { textNode("⚔️ Total Army") }
                span(className = "metric-value text-warning") { textNode("$totalArmy") }
            }
            div(className = "summary-metric") {
                span(className = "metric-label") { textNode("📜 Found Scrolls") }
                span(className = "metric-value") { textNode("$totalScrolls") }
            }
        }
        
        // Sub-Tab 1: Controlled Territories
        if (activeSubTab == "territories") {
            if (myTerritories.isNotEmpty()) {
                div(className = "territories-overview-grid") {
                    for (terr in myTerritories) {
                        val territoryData = MapData[terr.sectorId]
                        val isCastle = territoryData?.isCastle == true
                        val stationedHero = gameState.characters.find { it.currentSector == terr.sectorId && !it.isDead }
                        val isMyStationedHero = stationedHero?.playerId == playerId
                        
                        div(className = "territory-overview-card glass ${if (isCastle) "castle-card" else ""}") {
                            div(className = "d-flex justify-between items-center border-b pb-05 mb-05") {
                                div(className = "d-flex items-center gap-05") {
                                    if (isCastle) {
                                        img(src = "/Castle_icon.png?v=2", alt = "Castle", className = "territory-mini-icon")
                                    } else {
                                        span(className = "territory-code-badge") { textNode(terr.sectorId) }
                                    }
                                    span(className = "font-600 text-sm") {
                                        textNode(territoryData?.name ?: "Sector ${terr.sectorId}")
                                    }
                                }
                                if (terr.protection > 0) {
                                    span(className = "protection-badge text-xs") {
                                        textNode("🛡️ +${terr.protection}")
                                    }
                                }
                            }
                            
                            // Resource Production & Storage
                            div(className = "d-flex justify-between items-center text-xs mb-05 text-gray") {
                                span { 
                                    textNode("🌾 Food Yield: ")
                                    span(className = "font-600 text-primary") { textNode("${terr.food}") }
                                }
                                span { 
                                    textNode("🪙 Gold Yield: ")
                                    span(className = "font-600 text-warning") { textNode("${terr.gold}") }
                                }
                            }
                            
                            // Garrison / Stationed Hero Info
                            div(className = "garrison-info text-xs") {
                                span(className = "text-dark-gray") { textNode("Garrison: ") }
                                if (stationedHero != null) {
                                    span(className = if (isMyStationedHero) "text-primary font-600" else "text-gray") {
                                        textNode("🛡️ ${stationedHero.name} (⚔️${stationedHero.soldiers})")
                                    }
                                } else {
                                    span(className = "text-dark-gray italic") { textNode("Ungarrisoned") }
                                }
                            }
                        }
                    }
                }
            } else {
                div(className = "empty-overview-card text-center p-2") {
                    p(className = "text-gray m-0") {
                        textNode("🏰 You have not conquered any territories yet. Move your heroes to adjacent sectors to claim lands and harvest their resources!")
                    }
                }
            }
        }
        
        // Sub-Tab 2: Heroes, Armies & Discovered Scrolls
        if (activeSubTab == "heroes") {
            if (myCharacters.isNotEmpty()) {
                div(className = "heroes-overview-grid") {
                    for (char in myCharacters) {
                        div(className = "hero-overview-card glass ${if (char.isDead) "hero-dead" else ""}") {
                            // Header
                            div(className = "d-flex justify-between items-center border-b pb-05 mb-05") {
                                div(className = "d-flex items-center gap-05") {
                                    img(src = "/knight_icon.png?v=4", alt = "Knight", className = "hero-mini-icon")
                                    span(className = "font-600 text-sm ${if (char.isDead) "text-red" else "text-primary"}") {
                                        textNode(char.name)
                                        if (char.isDead) textNode(" 💀 (Defeated)")
                                    }
                                }
                                span(className = "text-xs ${if (char.isDead) "text-red" else if (char.hasActedThisTurn) "text-dark-gray" else "text-success"}") {
                                    textNode(
                                        when {
                                            char.isDead -> "Defeated"
                                            char.hasActedThisTurn -> "Acted"
                                            char.currentSector != null -> "At ${char.currentSector}"
                                            else -> "Unplaced"
                                        }
                                    )
                                }
                            }
                            
                            // Stats & Resources Grid
                            div(className = "hero-stats-overview mb-05") {
                                div(className = "d-flex justify-between text-xs text-gray") {
                                    span { textNode("💪 STR: ${char.strength}") }
                                    span { textNode("🏃 AGI: ${char.agility}") }
                                    span { textNode("🧠 WIS: ${char.wisdom}") }
                                }
                                div(className = "d-flex justify-between text-xs mt-03") {
                                    span(className = "text-primary") { textNode("🌾 Bag: ${char.food}") }
                                    span(className = "text-warning") { textNode("🪙 Bag: ${char.gold}") }
                                    span(className = "text-warning font-600") { textNode("⚔️ Army: ${char.soldiers}/100") }
                                }
                                if (char.soldiers > 0) {
                                    div(className = "text-xs text-dark-gray mt-02") {
                                        textNode("Upkeep: ${char.soldiers}🌾/turn")
                                    }
                                }
                            }
                            
                            // Discovered Scrolls Inventory
                            div(className = "hero-scrolls-container") {
                                div(className = "d-flex justify-between items-center mb-03") {
                                    span(className = "font-600 text-xs text-gray") { textNode("📜 Found Scrolls") }
                                    span(className = "text-xs text-dark-gray") { textNode("${char.scrolls.size} scrolls") }
                                }
                                
                                if (char.scrolls.isNotEmpty()) {
                                    div(className = "d-flex flex-col gap-03") {
                                        for (scroll in char.scrolls) {
                                            val (icon, label) = when (scroll.type) {
                                                ScrollType.STRENGTH -> "💪" to "Strength"
                                                ScrollType.AGILITY -> "🏃" to "Agility"
                                                ScrollType.WISDOM -> "🧠" to "Wisdom"
                                            }
                                            div(className = "hero-scroll-row d-flex justify-between items-center") {
                                                span(className = "text-xs") {
                                                    textNode("$icon $label Scroll (+${scroll.boostAmount})")
                                                }
                                                if (!char.isDead) {
                                                    button("Use", className = "btn btn-xs btn-outline scroll-apply-btn") {
                                                        title("Use scroll now to boost ${char.name}'s $label by +${scroll.boostAmount}")
                                                        onClick {
                                                            sendAction(GameAction.UseScroll(scroll.id, char.id))
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    p(className = "text-xs text-dark-gray m-0 italic") {
                                        textNode("No scrolls found yet.")
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                div(className = "empty-overview-card text-center p-2") {
                    p(className = "text-gray m-0") {
                        textNode("No heroes selected.")
                    }
                }
            }
        }
    }
}
