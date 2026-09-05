package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.*
import i18n.t

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
            val myTeamName = myPlayer?.team?.let { gameState.teamInfos[it]?.name } ?: t("hud.your_team")
            val ownerTeamName = ownerTeam?.let { gameState.teamInfos[it]?.name } ?: t("hud.enemy_team")
            
            val ownerText = when {
                isOwner -> t("territory.owned_you", myTeamName)
                ownerPlayer != null && ownerPlayer.team == myPlayer?.team -> t("territory.owned_ally", ownerPlayer.name)
                ownerPlayer != null -> t("territory.controlled_enemy", ownerPlayer.name, ownerTeamName)
                else -> t("territory.wilderness")
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
                    span(className = "stat-label") { textNode(t("territory.cultivation")) }
                    span(className = "stat-value text-primary font-600") { textNode("${territoryState.cultivation}") }
                }
                div(className = "stat-box") {
                    span(className = "stat-label") { textNode(t("territory.protection")) }
                    span(className = "stat-value text-warning font-600") { textNode("${territoryState.protection}") }
                }
                div(className = "stat-box") {
                    span(className = "stat-label") { textNode(t("territory.stored_food")) }
                    span(className = "stat-value font-600") { textNode("${territoryState.food}") }
                }
                div(className = "stat-box") {
                    span(className = "stat-label") { textNode(t("territory.stored_gold")) }
                    span(className = "stat-value font-600") { textNode("${territoryState.gold}") }
                }
            }
            
            // Actions Section
            if (isOwner || isTeamOwner) {
                h4(className = "m-0 mb-05 text-sm text-gray") { textNode(t("territory.actions_title")) }
                
                div(className = "d-flex flex-col gap-05") {
                    val boostAmount = if (activeChar != null) activeChar.intellect.coerceIn(2, 7) else 2
                    val heroName = activeChar?.name ?: "Hero"
                    div(className = "d-flex gap-1") {
                        button(t("territory.cultivate", boostAmount), className = "btn btn-outline flex-1 ${if (!canAct) "btn-disabled" else ""}") {
                            title(t("territory.cultivate_tip", heroName, boostAmount))
                            onClick {
                                if (canAct && activeChar != null) {
                                    sendAction(GameAction.UpgradeTerritory(sectorId, "CULTIVATION", activeChar.id))
                                }
                            }
                        }
                        button(t("territory.fortify", boostAmount), className = "btn btn-outline flex-1 ${if (!canAct) "btn-disabled" else ""}") {
                            title(t("territory.fortify_tip", heroName, boostAmount))
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
                    button(t("territory.search_scrolls"), className = "btn btn-outline ${if (!canSearch) "btn-disabled" else ""}") {
                        title(t("territory.search_scrolls_tip", heroName))
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
                        if (charAtLocation != null) t("territory.collect_all", territoryState.food, territoryState.gold, charAtLocation.name)
                        else t("territory.collect_need_hero"), 
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
                            textNode(t("territory.move_hero_collect", territoryState.food, territoryState.gold))
                        }
                    }
                    
                    if (!canAct && isMyTurn) {
                        p(className = "text-xs text-red m-0 mt-05 text-center") {
                            textNode(t("territory.already_acted", activeChar?.name ?: "Hero"))
                        }
                    } else if (!isMyTurn) {
                        p(className = "text-xs text-dark-gray m-0 mt-05 text-center") {
                            textNode(t("territory.wait_team_turn"))
                        }
                    }
                }
            } else {
                p(className = "text-sm text-dark-gray text-center m-0 mb-1") {
                    textNode(t("territory.capture_tip"))
                }
            }
            
            // Army Recruitment Section
            if (activeChar != null && !activeChar.isDead) {
                div(className = "recruitment-section mt-1 pt-1") {
                    div(className = "d-flex justify-between items-center mb-05") {
                        h4(className = "m-0 text-sm") { textNode(t("territory.recruit_army_for", activeChar.name)) }
                        span(className = "text-xs text-primary font-600") {
                            textNode("Army: ${activeChar.army.total()}/100 | Gold: ${activeChar.gold}🪙")
                        }
                    }
                    p(className = "text-xs text-dark-gray m-0 mb-05 text-center") {
                        textNode(t("territory.use_char_panel_recruit"))
                    }
                    
                    if (territoryDef?.isCastle == true) {
                        // Siege Weapon Section
                        div(className = "d-flex justify-between items-center mt-1 mb-05 pt-05 border-t") {
                            h4(className = "m-0 text-sm") { textNode(t("territory.buy_siege")) }
                            span(className = "text-xs text-primary font-600") {
                                textNode(t("territory.siege_count", activeChar.siegeWeapons))
                            }
                        }
                        
                        p(className = "text-xs text-dark-gray m-0 mb-05") {
                            textNode(t("territory.siege_desc"))
                        }
                        
                        val canAffordSiege = activeChar.gold >= 50 && !activeChar.hasActedThisTurn
                        button(t("territory.buy_siege_btn"), className = "btn btn-sm btn-outline w-full ${if (!canAffordSiege) "btn-disabled" else ""}") {
                            title(if (activeChar.hasActedThisTurn) t("territory.siege_acted") else t("territory.siege_buy_tip"))
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

