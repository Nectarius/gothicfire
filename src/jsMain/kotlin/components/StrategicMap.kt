package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameState
import models.isAdjacentSector
import models.isCharacterVisibleToPlayer
import models.GameAction
import models.MapData
import models.Team
import models.ScrollType
import models.estimateWinChance

data class PendingBattle(
    val targetSector: String,
    val characterId: String,
    val isPlacement: Boolean
)

@Composable
fun IComponent.StrategicMap(
    playerId: String,
    gameState: GameState?,
    selectedCharacterId: String?,
    onSelectCharacter: (String) -> Unit,
    activeFight: models.GameEvent.FightOccurred? = null,
    sendAction: (GameAction) -> Unit
) {
    var openedTerritoryId by remember { mutableStateOf<String?>(null) }
    var pendingBattle by remember { mutableStateOf<PendingBattle?>(null) }
    
    val myPlayer = gameState?.players?.find { it.id == playerId }
    val myCharacters = gameState?.characters?.filter { it.playerId == playerId } ?: emptyList()
    val isMyTurn = gameState?.activeTeamTurn == myPlayer?.team
    
    val activeChar = myCharacters.find { it.id == selectedCharacterId }
        ?: myCharacters.find { !it.hasActedThisTurn && !it.isDead }
        ?: myCharacters.firstOrNull()

    div(className = "strategic-map-container") {
        // The background map image
        img(src = "/gothic_fire_map.png", alt = "Gothic Strategic Map", className = "strategic-map-image")

        // The Territory Nodes Overlay
        div(className = "strategic-map-grid") {
            for ((sector, territory) in MapData) {
                val terrState = gameState?.territories?.get(sector)
                val terrOwnerTeam = terrState?.ownerTeam ?: terrState?.ownerPlayerId?.let { opId -> gameState?.players?.find { it.id == opId }?.team }
                
                val sectorOccupiedBy = gameState?.characters?.find { it.currentSector == sector && !it.isDead }
                val isSectorSelected = activeChar != null && activeChar.currentSector == sector
                
                val occupantPlayer = sectorOccupiedBy?.let { occ -> gameState?.players?.find { it.id == occ.playerId } }
                val isEnemySector = occupantPlayer != null && occupantPlayer.team != myPlayer?.team
                
                // Valid move target if active character is placed, alive, hasn't acted, it's my turn, and target is adjacent and (empty or enemy)
                val isValidMoveTarget = isMyTurn && activeChar != null && !activeChar.hasActedThisTurn && !activeChar.isDead &&
                    activeChar.currentSector != null && (sectorOccupiedBy == null || isEnemySector) &&
                    isAdjacentSector(activeChar.currentSector, sector)
                
                // Valid placement target if active character is unplaced, alive, hasn't acted, it's my turn, and target is empty or enemy
                val isValidPlacementTarget = isMyTurn && activeChar != null && !activeChar.hasActedThisTurn && !activeChar.isDead &&
                    activeChar.currentSector == null && (sectorOccupiedBy == null || isEnemySector)

                val leftPerc = (territory.x / 1205.0) * 100
                val topPerc = (territory.y / 1095.0) * 100

                val cellClasses = mutableListOf("territory-node")
                if (terrOwnerTeam == Team.RED) cellClasses.add("territory-node-owned-red")
                if (terrOwnerTeam == Team.BLUE) cellClasses.add("territory-node-owned-blue")
                if (isSectorSelected) cellClasses.add("territory-node-selected")
                if (isValidMoveTarget) cellClasses.add("territory-node-valid-move")
                if (isValidPlacementTarget) cellClasses.add("territory-node-valid-place")
                if (activeFight?.sectorId == sector) cellClasses.add("territory-node-fight")

                div(className = cellClasses.joinToString(" ")) {
                    style("left", "$leftPerc%")
                    style("top", "$topPerc%")
                    style("position", "absolute")
                    style("transform", "translate(-50%, -50%)")
                    
                    if (territory.isCastle) {
                        img(src = "/Castle_icon.png?v=2", alt = "Castle", className = "territory-castle-icon")
                    } else {
                        span(className = "territory-label") {
                            textNode(sector)
                        }
                    }

                    if (territory.name != null) {
                        div(className = "territory-name-label") {
                            textNode(territory.name)
                        }
                    }
                    
                    if (terrState != null && (terrState.food > 0 || terrState.gold > 0)) {
                        div(className = "territory-res-pill") {
                            if (terrState.food > 0) span(className = "res-tag") { textNode("🌾${terrState.food}") }
                            if (terrState.gold > 0) span(className = "res-tag") { textNode("🪙${terrState.gold}") }
                        }
                    }
                    
                    if (activeFight?.sectorId == sector) {
                        div(className = "fight-overlay") {
                            textNode("⚔️")
                        }
                    }

                    // Handle clicks
                    onClick {
                        if (gameState == null || myPlayer == null) return@onClick
                        
                        // Priority 1: Unplaced active character places onto board
                        if (isValidPlacementTarget && activeChar != null) {
                            if (isEnemySector) {
                                pendingBattle = PendingBattle(sector, activeChar.id, isPlacement = true)
                            } else {
                                sendAction(GameAction.PlaceCharacter(sector, activeChar.id))
                            }
                            return@onClick
                        }
                        
                        // Priority 2: Move active character to valid adjacent target
                        if (isValidMoveTarget && activeChar != null) {
                            if (isEnemySector) {
                                pendingBattle = PendingBattle(sector, activeChar.id, isPlacement = false)
                            } else {
                                sendAction(GameAction.MoveCharacter(sector, activeChar.id))
                            }
                            return@onClick
                        }
                        
                        // Priority 3: Click on my own character's sector
                        val myOccChar = myCharacters.find { it.currentSector == sector && !it.isDead }
                        if (myOccChar != null) {
                            onSelectCharacter(myOccChar.id)
                            openedTerritoryId = sector
                            return@onClick
                        }
                        
                        // Priority 4: Open territory inspection modal
                        openedTerritoryId = sector
                    }
                }
            }
        }

        // Render Unit Markers
        if (gameState != null) {
            for (char in gameState.characters) {
                if (char.isDead) continue
                if (!isCharacterVisibleToPlayer(char, playerId, gameState)) continue
                val sector = char.currentSector ?: continue
                val territory = MapData[sector]
                if (territory != null) {
                    val leftPerc = (territory.x / 1205.0) * 100
                    val topPerc = (territory.y / 1095.0) * 100
                    
                    val owner = gameState.players.find { it.id == char.playerId }
                    val isRed = owner?.team == Team.RED
                    val isMine = char.playerId == playerId
                    val isSelected = activeChar?.id == char.id
                    
                    val markerClass = if (isRed) "unit-marker-p1" else "unit-marker-p2"
                    val selectedClass = if (isSelected) "unit-marker-selected" else ""
                    val actedClass = if (char.hasActedThisTurn) "unit-marker-acted" else ""

                    div(className = "unit-marker $markerClass $selectedClass $actedClass") {
                        style("left", "$leftPerc%")
                        style("top", "$topPerc%")
                        title("${char.name} [${owner?.name ?: "Unknown"}] (STR:${char.strength} AGI:${char.agility} WIS:${char.wisdom} | Army: ⚔️${char.soldiers} | Bag: 🌾${char.food} 🪙${char.gold})${if (char.hasActedThisTurn) " [ACTED]" else ""}")
                        img(src = "/knight_icon.png?v=4", alt = "Knight", className = "unit-marker-img")
                        if (char.soldiers > 0) {
                            span(className = "unit-marker-army-badge") {
                                textNode("${char.soldiers}")
                            }
                        }
                        
                        onClick {
                            if (isMine) {
                                onSelectCharacter(char.id)
                            }
                            openedTerritoryId = sector
                        }
                    }
                }
            }
        }
        
        // Render TerritoryCard modal if a territory is inspected
        if (openedTerritoryId != null) {
            TerritoryCard(
                sectorId = openedTerritoryId!!,
                playerId = playerId,
                gameState = gameState,
                selectedCharacterId = activeChar?.id,
                onClose = { openedTerritoryId = null },
                sendAction = sendAction
            )
        }
        
        // Pre-Battle Estimation & Preparation Popup
        if (pendingBattle != null && gameState != null) {
            val pb = pendingBattle!!
            val battleChar = myCharacters.find { it.id == pb.characterId }
            val enemyChar = gameState.characters.find { it.currentSector == pb.targetSector && !it.isDead }
            val enemyPlayer = gameState.players.find { it.id == enemyChar?.playerId }
            val territoryData = MapData[pb.targetSector]
            val terrState = gameState.territories[pb.targetSector]
            val locationProtection = terrState?.protection ?: (territoryData?.protection ?: 0)
            
            if (battleChar != null && enemyChar != null) {
                val winChance = estimateWinChance(battleChar, enemyChar, locationProtection)
                val chanceClass = when {
                    winChance >= 70 -> "chance-high"
                    winChance >= 40 -> "chance-med"
                    else -> "chance-low"
                }
                
                val isAttacker10x = battleChar.soldiers > enemyChar.soldiers * 10 && battleChar.soldiers > 0
                val isDefender10x = enemyChar.soldiers > battleChar.soldiers * 10 && enemyChar.soldiers > 0
                
                div(className = "territory-modal-backdrop") {
                    onClick { pendingBattle = null }
                    
                    div(className = "territory-modal-card glass battle-prep-modal") {
                        onClick { it.stopPropagation() }
                        
                        // Header
                        div(className = "d-flex justify-between items-center mb-1") {
                            h3(className = "m-0") { 
                                textNode("⚔️ Battle Estimation: Sector ${pb.targetSector}")
                                if (territoryData?.name != null) textNode(" (${territoryData.name})")
                            }
                            button("✕", className = "btn-modal-close") {
                                onClick { pendingBattle = null }
                            }
                        }
                        
                        // Win Chance Banner
                        div(className = "battle-win-chance-banner $chanceClass mb-1") {
                            div(className = "d-flex justify-between items-center") {
                                span(className = "font-600 text-sm") { textNode("Estimated Win Probability") }
                                span(className = "win-chance-value") { textNode("$winChance%") }
                            }
                            if (isAttacker10x) {
                                div(className = "army-domination-tag mt-03 text-xs") {
                                    textNode("⚡ Overwhelming Army (10x+ Soldiers): 100% Guaranteed Victory with minimal casualties (<5%)!")
                                }
                            } else if (isDefender10x) {
                                div(className = "army-domination-tag-danger mt-03 text-xs") {
                                    textNode("💀 Overwhelming Enemy Army (10x+ Soldiers): Certain Defeat!")
                                }
                            } else {
                                val casualtyEstimate = when {
                                    winChance >= 75 -> "🛡️ Light casualties expected (~5-15% soldier losses)"
                                    winChance >= 45 -> "⚔️ Heavy battle: Contested clash (~20-40% soldier losses)"
                                    else -> "⚠️ Brutal battle: Extreme danger of heavy army losses or defeat"
                                }
                                div(className = "mt-03 text-xs text-gray") {
                                    textNode(casualtyEstimate)
                                }
                            }
                        }
                        
                        // Combatant Comparison Cards
                        div(className = "battle-comparison-grid mb-1") {
                            // Attacker Box
                            div(className = "combatant-card attacker-card glass") {
                                div(className = "combatant-header") {
                                    span(className = "font-600 text-primary") { textNode(battleChar.name) }
                                    span(className = "text-xs text-gray") { textNode("Attacker (You)") }
                                }
                                div(className = "combatant-stats mt-05") {
                                    div(className = "stat-row") {
                                        span { textNode("💪 STR") }
                                        span { textNode("${battleChar.strength}") }
                                    }
                                    div(className = "stat-row") {
                                        span { textNode("🏃 AGI") }
                                        span { textNode("${battleChar.agility}") }
                                    }
                                    div(className = "stat-row") {
                                        span { textNode("🧠 WIS") }
                                        span { textNode("${battleChar.wisdom}") }
                                    }
                                    div(className = "stat-row font-600 text-warning") {
                                        span { textNode("⚔️ Army") }
                                        span { textNode("${battleChar.soldiers}") }
                                    }
                                }
                            }
                            
                            // Defender Box
                            div(className = "combatant-card defender-card glass") {
                                div(className = "combatant-header") {
                                    span(className = "font-600 text-red") { textNode(enemyChar.name) }
                                    span(className = "text-xs text-gray") { textNode(enemyPlayer?.name ?: "Enemy") }
                                }
                                div(className = "combatant-stats mt-05") {
                                    div(className = "stat-row") {
                                        span { textNode("💪 STR") }
                                        span { textNode("${enemyChar.strength}") }
                                    }
                                    div(className = "stat-row") {
                                        span { textNode("🏃 AGI") }
                                        span { textNode("${enemyChar.agility}") }
                                    }
                                    div(className = "stat-row") {
                                        span { textNode("🧠 WIS") }
                                        span { textNode("${enemyChar.wisdom}") }
                                    }
                                    div(className = "stat-row font-600 text-warning") {
                                        span { textNode("⚔️ Army") }
                                        span { textNode("${enemyChar.soldiers}") }
                                    }
                                    if (locationProtection > 0) {
                                        div(className = "stat-row text-xs text-gray") {
                                            span { textNode("🛡️ Protection") }
                                            span { textNode("+$locationProtection") }
                                        }
                                    }
                                }
                            }
                        }
                        
                        // Scrolls Section
                        div(className = "battle-scrolls-section mb-1") {
                            div(className = "d-flex justify-between items-center mb-05") {
                                span(className = "font-600 text-xs text-gray") { textNode("📜 Available Scrolls (Boost stats before fight)") }
                                span(className = "text-xs text-dark-gray") { textNode("${battleChar.scrolls.size} in bag") }
                            }
                            
                            if (battleChar.scrolls.isNotEmpty()) {
                                div(className = "d-flex flex-col gap-03") {
                                    for (scroll in battleChar.scrolls) {
                                        val (icon, label) = when (scroll.type) {
                                            ScrollType.STRENGTH -> "💪" to "Strength"
                                            ScrollType.AGILITY -> "🏃" to "Agility"
                                            ScrollType.WISDOM -> "🧠" to "Wisdom"
                                        }
                                        div(className = "battle-scroll-row d-flex justify-between items-center") {
                                            span(className = "text-xs") { textNode("$icon $label Scroll (+${scroll.boostAmount})") }
                                            button("Apply (+${scroll.boostAmount})", className = "btn btn-xs btn-outline scroll-apply-btn") {
                                                title("Consume scroll to immediately boost ${battleChar.name}'s $label by +${scroll.boostAmount}")
                                                onClick {
                                                    sendAction(GameAction.UseScroll(scroll.id, battleChar.id))
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                p(className = "text-xs text-dark-gray m-0") {
                                    textNode("No scrolls available to boost stats.")
                                }
                            }
                        }
                        
                        // Action Buttons
                        div(className = "d-flex gap-1 mt-1") {
                            button("🏳️ Retreat / Cancel", className = "btn btn-outline flex-1") {
                                title("Do not attack. Any scrolls already consumed will remain used.")
                                onClick {
                                    pendingBattle = null
                                }
                            }
                            button("⚔️ Confirm Attack", className = "btn btn-primary flex-1") {
                                title("Engage in battle at Sector ${pb.targetSector}!")
                                onClick {
                                    if (pb.isPlacement) {
                                        sendAction(GameAction.PlaceCharacter(pb.targetSector, battleChar.id))
                                    } else {
                                        sendAction(GameAction.MoveCharacter(pb.targetSector, battleChar.id))
                                    }
                                    pendingBattle = null
                                }
                            }
                        }
                    }
                }
            } else {
                pendingBattle = null
            }
        }
    }
}

