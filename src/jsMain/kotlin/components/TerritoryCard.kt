package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.*

@Composable
fun IComponent.TerritoryCard(
    sectorId: String,
    playerId: String,
    gameState: GameState?,
    selectedCharacterId: String? = null,
    onClose: () -> Unit,
    sendAction: (GameAction) -> Unit
) {
    if (gameState == null) return
    
    val territoryDef = MapData[sectorId]
    val territoryState = gameState.territories[sectorId] ?: TerritoryState(
        sectorId = sectorId,
        cultivation = 10,
        protection = territoryDef?.protection ?: 10
    )
    
    val myPlayer = gameState.players.find { it.id == playerId }
    val myCharacters = gameState.characters.filter { it.playerId == playerId }
    val charAtLocation = myCharacters.find { it.currentSector == sectorId && !it.isDead }
    
    val activeChar = myCharacters.find { it.id == selectedCharacterId && !it.isDead }
        ?: charAtLocation
        ?: myCharacters.find { !it.hasActedThisTurn && !it.isDead }
        ?: myCharacters.firstOrNull()
        
    val isMyTurn = gameState.activeTeamTurn == myPlayer?.team
    val isOwner = territoryState.ownerPlayerId == playerId
    
    val ownerPlayer = gameState.players.find { it.id == territoryState.ownerPlayerId }
    val ownerTeam = territoryState.ownerTeam ?: ownerPlayer?.team
    val isTeamOwner = ownerTeam == myPlayer?.team
    
    val canAct = isMyTurn && activeChar != null && !activeChar.hasActedThisTurn && !activeChar.isDead
    val hasResources = territoryState.food > 0 || territoryState.gold > 0
    val canCollect = (isOwner || isTeamOwner) && charAtLocation != null && hasResources

    div(className = "territory-modal-backdrop") {
        onClick { onClose() }
        
        div(className = "territory-modal-card glass") {
            // Prevent click inside modal from closing
            onClick { it.stopPropagation() }
            
            div(className = "d-flex justify-between items-center mb-1") {
                div(className = "d-flex items-center gap-1") {
                    if (territoryDef?.isCastle == true) {
                        img(src = "/Castle_icon.png?v=2", alt = "Castle", className = "territory-modal-icon")
                    }
                    div {
                        h3(className = "m-0") {
                            textNode(territoryDef?.name ?: "Sector $sectorId")
                        }
                        span(className = "text-sm text-dark-gray") {
                            textNode("Sector #$sectorId")
                        }
                    }
                }
                button("✕", className = "btn-modal-close") {
                    onClick { onClose() }
                }
            }
            
            // Ownership Status Banner
            val myTeamName = myPlayer?.team?.let { gameState.teamInfos[it]?.name } ?: "Your Team"
            val ownerTeamName = ownerTeam?.let { gameState.teamInfos[it]?.name } ?: "Enemy Team"
            
            val ownerText = when {
                isOwner -> "Owned by You ($myTeamName)"
                ownerPlayer != null && ownerPlayer.team == myPlayer?.team -> "Owned by Ally (${ownerPlayer.name})"
                ownerPlayer != null -> "Controlled by Enemy (${ownerPlayer.name} - $ownerTeamName)"
                else -> "Unclaimed Wilderness"
            }
            
            val ownerClass = if (ownerTeam == null) "owner-banner-neutral" else ""
            div(className = "owner-banner $ownerClass mb-1") {
                if (ownerTeam != null) {
                    val teamColor = gameState.teamInfos[ownerTeam]?.color
                    if (teamColor != null) {
                        style("background", "${teamColor}1a") // 10% opacity
                        style("borderLeft", "4px solid $teamColor")
                        style("color", teamColor)
                    }
                }
                span(className = "font-600 text-sm") { textNode(ownerText) }
            }
            
            // Stats Grid
            div(className = "territory-stats-grid mb-1") {
                div(className = "stat-box") {
                    span(className = "stat-label") { textNode("🌱 Cultivation") }
                    span(className = "stat-value text-primary font-600") { textNode("${territoryState.cultivation}") }
                }
                div(className = "stat-box") {
                    span(className = "stat-label") { textNode("🛡️ Protection") }
                    span(className = "stat-value text-warning font-600") { textNode("${territoryState.protection}") }
                }
                div(className = "stat-box") {
                    span(className = "stat-label") { textNode("🌾 Stored Food") }
                    span(className = "stat-value font-600") { textNode("${territoryState.food}") }
                }
                div(className = "stat-box") {
                    span(className = "stat-label") { textNode("🪙 Stored Gold") }
                    span(className = "stat-value font-600") { textNode("${territoryState.gold}") }
                }
            }
            
            // Actions Section
            if (isOwner || isTeamOwner) {
                h4(className = "m-0 mb-05 text-sm text-gray") { textNode("Territory Management Actions") }
                
                div(className = "d-flex flex-col gap-05") {
                    val boostAmount = if (activeChar != null) activeChar.intellect.coerceIn(2, 7) else 2
                    div(className = "d-flex gap-1") {
                        button("🌱 Cultivate (+$boostAmount)", className = "btn btn-outline flex-1 ${if (!canAct) "btn-disabled" else ""}") {
                            val heroName = activeChar?.name ?: "Hero"
                            title("Spends $heroName's turn to increase Cultivation by +$boostAmount")
                            onClick {
                                if (canAct && activeChar != null) {
                                    sendAction(GameAction.UpgradeTerritory(sectorId, "CULTIVATION", activeChar.id))
                                }
                            }
                        }
                        button("🛡️ Fortify (+$boostAmount)", className = "btn btn-outline flex-1 ${if (!canAct) "btn-disabled" else ""}") {
                            val heroName = activeChar?.name ?: "Hero"
                            title("Spends $heroName's turn to increase Protection by +$boostAmount")
                            onClick {
                                if (canAct && activeChar != null) {
                                    sendAction(GameAction.UpgradeTerritory(sectorId, "PROTECTION", activeChar.id))
                                }
                            }
                        }
                    }
                    
                    // Search for Scrolls button
                    val canSearch = canAct && activeChar != null && activeChar.currentSector != null &&
                        (activeChar.currentSector == sectorId || isAdjacentSector(activeChar.currentSector!!, sectorId))
                    button("🔍 Search for Scrolls (25% chance)", className = "btn btn-outline ${if (!canSearch) "btn-disabled" else ""}") {
                        val heroName = activeChar?.name ?: "Hero"
                        title("$heroName spends their turn searching this territory for ancient scrolls. 25% chance to find one!")
                        onClick {
                            if (canSearch && activeChar != null) {
                                sendAction(GameAction.SearchScroll(sectorId, activeChar.id))
                            }
                        }
                    }
                    
                    val collectTitle = when {
                        charAtLocation == null -> "One of your heroes must be at this location to collect accumulated resources"
                        !hasResources -> "No stored resources available to collect"
                        else -> "Transfers stored Food and Gold to ${charAtLocation.name}'s inventory"
                    }
                    button(
                        if (charAtLocation != null) "💰 Collect All Resources (${territoryState.food}🌾, ${territoryState.gold}🪙) -> ${charAtLocation.name}" 
                        else "💰 Collect Resources (Hero Must Be Here)", 
                        className = "btn btn-primary ${if (!canCollect) "btn-disabled" else ""}"
                    ) {
                        title(collectTitle)
                        onClick {
                            if (canCollect && charAtLocation != null) {
                                sendAction(GameAction.CollectResources(sectorId, charAtLocation.id))
                            }
                        }
                    }
                    
                    if (charAtLocation == null && hasResources) {
                        p(className = "text-xs text-warning m-0 text-center") {
                            textNode("📍 Move a hero here to collect stored resources (${territoryState.food}🌾, ${territoryState.gold}🪙).")
                        }
                    }
                    
                    if (!canAct && isMyTurn) {
                        p(className = "text-xs text-red m-0 mt-05 text-center") {
                            textNode("${activeChar?.name ?: "Hero"} has already acted this turn.")
                        }
                    } else if (!isMyTurn) {
                        p(className = "text-xs text-dark-gray m-0 mt-05 text-center") {
                            textNode("Wait for your team's turn to spend actions.")
                        }
                    }
                }
            } else {
                p(className = "text-sm text-dark-gray text-center m-0 mb-1") {
                    textNode("Capture this territory by moving your hero into it.")
                }
            }
            
            // Army Recruitment Section
            if (activeChar != null && !activeChar.isDead) {
                div(className = "recruitment-section mt-1 pt-1") {
                    div(className = "d-flex justify-between items-center mb-05") {
                        h4(className = "m-0 text-sm") { textNode("⚔️ Recruit Army for ${activeChar.name}") }
                        span(className = "text-xs text-primary font-600") {
                            textNode("Army: ${activeChar.army.total()}/100 | Gold: ${activeChar.gold}🪙")
                        }
                    }
                    p(className = "text-xs text-dark-gray m-0 mb-05 text-center") {
                        textNode("Use the Character Panel to recruit your army.")
                    }
                    
                    if (territoryDef?.isCastle == true) {
                        // Siege Weapon Section
                        div(className = "d-flex justify-between items-center mt-1 mb-05 pt-05 border-t") {
                            h4(className = "m-0 text-sm") { textNode("🏹 Buy Siege Weapons") }
                            span(className = "text-xs text-primary font-600") {
                                textNode("Siege Weapons: ${activeChar.siegeWeapons}")
                            }
                        }
                        
                        p(className = "text-xs text-dark-gray m-0 mb-05") {
                            textNode("Cost: 50🪙 each | Spends turn | Negates high protection (20+)")
                        }
                        
                        val canAffordSiege = activeChar.gold >= 50 && !activeChar.hasActedThisTurn
                        button("+1 Siege Weapon (50🪙)", className = "btn btn-sm btn-outline w-full ${if (!canAffordSiege) "btn-disabled" else ""}") {
                            title(if (activeChar.hasActedThisTurn) "Already acted this turn" else "Buy 1 Siege Weapon for 50 gold. Spends your turn.")
                            onClick {
                                if (canAffordSiege) {
                                    sendAction(GameAction.BuySiegeWeapon(activeChar.id))
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

