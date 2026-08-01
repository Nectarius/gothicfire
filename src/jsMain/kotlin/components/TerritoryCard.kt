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
            val (ownerText, ownerClass) = when {
                isOwner -> "Owned by You (${myPlayer?.team?.name ?: ""})" to (if (myPlayer?.team == Team.RED) "owner-banner-red" else "owner-banner-blue")
                ownerPlayer != null && ownerPlayer.team == myPlayer?.team -> "Owned by Ally (${ownerPlayer.name})" to (if (ownerPlayer.team == Team.RED) "owner-banner-red" else "owner-banner-blue")
                ownerPlayer != null -> "Controlled by Enemy (${ownerPlayer.name} - ${ownerTeam?.name ?: ""})" to (if (ownerTeam == Team.RED) "owner-banner-red" else "owner-banner-blue")
                else -> "Unclaimed Wilderness" to "owner-banner-neutral"
            }
            div(className = "owner-banner $ownerClass mb-1") {
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
                    div(className = "d-flex gap-1") {
                        button("🌱 Cultivate (+2)", className = "btn btn-outline flex-1 ${if (!canAct) "btn-disabled" else ""}") {
                            val heroName = activeChar?.name ?: "Hero"
                            title("Spends $heroName's turn to increase Cultivation by +2")
                            onClick {
                                if (canAct && activeChar != null) {
                                    sendAction(GameAction.UpgradeTerritory(sectorId, "CULTIVATION", activeChar.id))
                                }
                            }
                        }
                        button("🛡️ Fortify (+2)", className = "btn btn-outline flex-1 ${if (!canAct) "btn-disabled" else ""}") {
                            val heroName = activeChar?.name ?: "Hero"
                            title("Spends $heroName's turn to increase Protection by +2")
                            onClick {
                                if (canAct && activeChar != null) {
                                    sendAction(GameAction.UpgradeTerritory(sectorId, "PROTECTION", activeChar.id))
                                }
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
                            textNode("Army: ${activeChar.soldiers}/100 | Gold: ${activeChar.gold}🪙")
                        }
                    }
                    
                    p(className = "text-xs text-dark-gray m-0 mb-05") {
                        textNode("Cost: 10🪙 per soldier | Upkeep: 5🌾 & 1🪙 per soldier/turn")
                    }
                    
                    val maxPossible = kotlin.math.min(100 - activeChar.soldiers, activeChar.gold / 10)
                    
                    div(className = "d-flex gap-05 flex-wrap") {
                        for (count in listOf(1, 5, 10, 25)) {
                            val cost = count * 10
                            val canAfford = activeChar.gold >= cost && activeChar.soldiers + count <= 100
                            button("+$count (${cost}🪙)", className = "btn btn-sm btn-outline flex-1 ${if (!canAfford) "btn-disabled" else ""}") {
                                title("Recruit $count soldiers for $cost gold for ${activeChar.name}")
                                onClick {
                                    if (canAfford) {
                                        sendAction(GameAction.HireSoldiers(count, activeChar.id))
                                    }
                                }
                            }
                        }
                        
                        if (maxPossible > 0 && maxPossible !in listOf(1, 5, 10, 25)) {
                            val maxCost = maxPossible * 10
                            button("Max +$maxPossible (${maxCost}🪙)", className = "btn btn-sm btn-primary flex-1") {
                                title("Recruit maximum affordable ($maxPossible) soldiers for $maxCost gold for ${activeChar.name}")
                                onClick {
                                    sendAction(GameAction.HireSoldiers(maxPossible, activeChar.id))
                                }
                            }
                        }
                    }
                    
                    if (activeChar.soldiers >= 100) {
                        p(className = "text-xs text-warning m-0 mt-05 text-center") {
                            textNode("Maximum army capacity reached (100 soldiers).")
                        }
                    } else if (activeChar.gold < 10) {
                        p(className = "text-xs text-dark-gray m-0 mt-05 text-center") {
                            textNode("Need at least 10 Gold in ${activeChar.name}'s bag to recruit soldiers.")
                        }
                    }
                }
            }
        }
    }
}

