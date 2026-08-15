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
import models.BattleStrategy
import models.canUseStrategy
import models.strategyBonus

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
    activeNatureEvents: List<models.GameEvent.NatureEventOccurred> = emptyList(),
    activeTransfers: List<models.GameEvent.ResourceTransferred> = emptyList(),
    sendAction: (GameAction) -> Unit
) {
    var openedTerritoryId by remember { mutableStateOf<String?>(null) }
    var pendingBattle by remember { mutableStateOf<PendingBattle?>(null) }
    var selectedStrategy by remember { mutableStateOf(BattleStrategy.NONE) }
    
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
                if (activeFight?.sectorId == sector) {
                    cellClasses.add("territory-node-fight")
                    when (activeFight?.strategy) {
                        BattleStrategy.ARCANE_PHALANX -> cellClasses.add("fight-strategy-phalanx")
                        BattleStrategy.HAMMER_AND_SPELL -> cellClasses.add("fight-strategy-hammer")
                        BattleStrategy.SPELL_INFUSED_VOLLEY -> cellClasses.add("fight-strategy-volley")
                        else -> {}
                    }
                }
                
                if (terrState != null && terrState.protection > 20) {
                    cellClasses.add("territory-node-high-protection")
                }
                if (terrState != null && terrState.cultivation > 30) {
                    cellClasses.add("territory-node-high-cultivation")
                }

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
                    
                    // Render active nature events for this sector
                    val natureEvent = activeNatureEvents.find { it.sectorId == sector }
                    if (natureEvent != null) {
                        val isPositive = natureEvent.type == models.NatureEventType.ABUNDANT_HARVEST || natureEvent.type == models.NatureEventType.VOLUNTEERS
                        val toastClass = if (isPositive) "nature-event-positive" else "nature-event-negative"
                        val eventText = when (natureEvent.type) {
                            models.NatureEventType.ABUNDANT_HARVEST -> "🌾 Abundant Harvest!"
                            models.NatureEventType.VOLUNTEERS -> "🎺 Volunteers!"
                            models.NatureEventType.HURRICANE -> "🌪️ Hurricane!"
                            models.NatureEventType.FLOOD -> "🌊 Flood!"
                        }
                        div(className = "nature-event-toast $toastClass") {
                            textNode(eventText)
                        }
                    }
                    
                    // Render resource transfers for this sector
                    val transferOut = activeTransfers.find { it.fromSectorId == sector }
                    if (transferOut != null) {
                        val parts = mutableListOf<String>()
                        if (transferOut.food > 0) parts.add("-${transferOut.food}🌾")
                        if (transferOut.gold > 0) parts.add("-${transferOut.gold}💰")
                        div(className = "nature-event-toast nature-event-negative") {
                            textNode(parts.joinToString(" "))
                        }
                    }
                    val transferIn = activeTransfers.find { it.toSectorId == sector && it.fromSectorId != sector }
                    if (transferIn != null) {
                        val parts = mutableListOf<String>()
                        if (transferIn.food > 0) parts.add("+${transferIn.food}🌾")
                        if (transferIn.gold > 0) parts.add("+${transferIn.gold}💰")
                        div(className = "nature-event-toast nature-event-positive") {
                            textNode(parts.joinToString(" "))
                        }
                    }
                    
                    if (terrState != null && (terrState.food > 0 || terrState.gold > 0)) {
                        div(className = "territory-res-pill") {
                            if (terrState.food > 0) span(className = "res-tag") { textNode("🌾${terrState.food}") }
                            if (terrState.gold > 0) span(className = "res-tag") { textNode("🪙${terrState.gold}") }
                        }
                    }
                    
                    if (activeFight?.sectorId == sector) {
                        val fightStrategy = activeFight?.strategy ?: BattleStrategy.NONE
                        val (fightIcon, overlayClass) = when (fightStrategy) {
                            BattleStrategy.ARCANE_PHALANX -> "🛡️" to "fight-overlay fight-overlay-phalanx"
                            BattleStrategy.HAMMER_AND_SPELL -> "⚔️" to "fight-overlay fight-overlay-hammer"
                            BattleStrategy.SPELL_INFUSED_VOLLEY -> "🔥" to "fight-overlay fight-overlay-volley"
                            else -> "⚔️" to "fight-overlay"
                        }
                        div(className = overlayClass) {
                            textNode(fightIcon)
                        }
                        if (fightStrategy != BattleStrategy.NONE) {
                            val stratLabel = when (fightStrategy) {
                                BattleStrategy.ARCANE_PHALANX -> "Arcane Phalanx"
                                BattleStrategy.HAMMER_AND_SPELL -> "Hammer & Spell"
                                BattleStrategy.SPELL_INFUSED_VOLLEY -> "Spell Volley"
                                else -> ""
                            }
                            div(className = "fight-strategy-label fight-strategy-label-${fightStrategy.name.lowercase()}") {
                                textNode(stratLabel)
                            }
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
                val winChance = estimateWinChance(battleChar, enemyChar, locationProtection, selectedStrategy, battleChar.siegeWeapons)
                val chanceClass = when {
                    winChance >= 70 -> "chance-high"
                    winChance >= 40 -> "chance-med"
                    else -> "chance-low"
                }
                
                val isAttacker10x = battleChar.soldiers > enemyChar.soldiers * 10 && battleChar.soldiers > 0
                val isDefender10x = enemyChar.soldiers > battleChar.soldiers * 10 && enemyChar.soldiers > 0
                
                div(className = "territory-modal-backdrop") {
                    onClick {
                        pendingBattle = null
                        selectedStrategy = BattleStrategy.NONE
                    }
                    
                    div(className = "territory-modal-card glass battle-prep-modal") {
                        onClick { it.stopPropagation() }
                        
                        // Header
                        div(className = "d-flex justify-between items-center mb-1") {
                            h3(className = "m-0") { 
                                textNode("⚔️ Battle Estimation: Sector ${pb.targetSector}")
                                if (territoryData?.name != null) textNode(" (${territoryData.name})")
                            }
                            button("✕", className = "btn-modal-close") {
                                onClick {
                                    pendingBattle = null
                                    selectedStrategy = BattleStrategy.NONE
                                }
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
                        
                        // ====== BATTLE STRATEGY PICKER ======
                        div(className = "battle-strategy-section mb-1") {
                            div(className = "d-flex justify-between items-center mb-05") {
                                span(className = "font-600 text-sm") { textNode("🏴 Battle Strategy") }
                                if (selectedStrategy != BattleStrategy.NONE) {
                                    val bonus = strategyBonus(battleChar, selectedStrategy)
                                    span(className = "text-xs text-primary font-600") {
                                        textNode("+${bonus.asDynamic().toFixed(1)} combat bonus")
                                    }
                                } else {
                                    span(className = "text-xs text-dark-gray") { textNode("Select a strategy for a combat bonus") }
                                }
                            }
                            
                            // Strategy cards
                            div(className = "d-flex flex-col gap-04") {
                                // 1. Arcane Phalanx
                                val canPhalanx = canUseStrategy(battleChar, BattleStrategy.ARCANE_PHALANX)
                                val phalanxSelected = selectedStrategy == BattleStrategy.ARCANE_PHALANX
                                div(className = "strategy-card${if (phalanxSelected) " strategy-card-selected" else ""}${if (!canPhalanx) " strategy-card-disabled" else ""}") {
                                    onClick {
                                        if (canPhalanx) {
                                            selectedStrategy = if (phalanxSelected) BattleStrategy.NONE else BattleStrategy.ARCANE_PHALANX
                                        }
                                    }
                                    div(className = "d-flex justify-between items-center") {
                                        div {
                                            span(className = "font-600 text-sm") { textNode("🛡️ Arcane Phalanx") }
                                            if (canPhalanx) {
                                                span(className = "text-xs text-primary ml-05") {
                                                    textNode("+${strategyBonus(battleChar, BattleStrategy.ARCANE_PHALANX).asDynamic().toFixed(1)}")
                                                }
                                            }
                                        }
                                        if (!canPhalanx) {
                                            span(className = "text-xs text-red") { textNode("Need >5 troops") }
                                        }
                                    }
                                    p(className = "text-xs text-gray m-0 mt-02") {
                                        textNode("Heavy infantry locks shields while archers and mages unleash coordinated volleys from behind.")
                                    }
                                }
                                
                                // 2. Hammer and Spell
                                val canHammer = canUseStrategy(battleChar, BattleStrategy.HAMMER_AND_SPELL)
                                val hammerSelected = selectedStrategy == BattleStrategy.HAMMER_AND_SPELL
                                div(className = "strategy-card${if (hammerSelected) " strategy-card-selected" else ""}${if (!canHammer) " strategy-card-disabled" else ""}") {
                                    onClick {
                                        if (canHammer) {
                                            selectedStrategy = if (hammerSelected) BattleStrategy.NONE else BattleStrategy.HAMMER_AND_SPELL
                                        }
                                    }
                                    div(className = "d-flex justify-between items-center") {
                                        div {
                                            span(className = "font-600 text-sm") { textNode("⚔️ Hammer and Spell") }
                                            if (canHammer) {
                                                span(className = "text-xs text-primary ml-05") {
                                                    textNode("+${strategyBonus(battleChar, BattleStrategy.HAMMER_AND_SPELL).asDynamic().toFixed(1)}")
                                                }
                                            }
                                        }
                                        if (!canHammer) {
                                            span(className = "text-xs text-red") { textNode("Need AGI≥6 & >3 troops") }
                                        }
                                    }
                                    p(className = "text-xs text-gray m-0 mt-02") {
                                        textNode("Infantry pins the frontline while battle mages flank and deliver the catastrophic finishing strike.")
                                    }
                                }
                                
                                // 3. Spell-Infused Volley
                                val canVolley = canUseStrategy(battleChar, BattleStrategy.SPELL_INFUSED_VOLLEY)
                                val volleySelected = selectedStrategy == BattleStrategy.SPELL_INFUSED_VOLLEY
                                div(className = "strategy-card${if (volleySelected) " strategy-card-selected" else ""}${if (!canVolley) " strategy-card-disabled" else ""}") {
                                    onClick {
                                        if (canVolley) {
                                            selectedStrategy = if (volleySelected) BattleStrategy.NONE else BattleStrategy.SPELL_INFUSED_VOLLEY
                                        }
                                    }
                                    div(className = "d-flex justify-between items-center") {
                                        div {
                                            span(className = "font-600 text-sm") { textNode("🔥 Spell-Infused Volley") }
                                            if (canVolley) {
                                                span(className = "text-xs text-primary ml-05") {
                                                    textNode("+${strategyBonus(battleChar, BattleStrategy.SPELL_INFUSED_VOLLEY).asDynamic().toFixed(1)}")
                                                }
                                            }
                                        }
                                        if (!canVolley) {
                                            span(className = "text-xs text-red") { textNode("Need WIS≥6 & >5 troops") }
                                        }
                                    }
                                    p(className = "text-xs text-gray m-0 mt-02") {
                                        textNode("Mages enchant arrows with fire and lightning to disintegrate the opposing force before melee.")
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
                                    selectedStrategy = BattleStrategy.NONE
                                }
                            }
                            button("⚔️ Confirm Attack", className = "btn btn-primary flex-1") {
                                title("Engage in battle at Sector ${pb.targetSector}!")
                                onClick {
                                    if (pb.isPlacement) {
                                        sendAction(GameAction.PlaceCharacter(pb.targetSector, battleChar.id, selectedStrategy))
                                    } else {
                                        sendAction(GameAction.MoveCharacter(pb.targetSector, battleChar.id, selectedStrategy))
                                    }
                                    pendingBattle = null
                                    selectedStrategy = BattleStrategy.NONE
                                }
                            }
                        }
                    }
                }
            } else {
                pendingBattle = null
                selectedStrategy = BattleStrategy.NONE
            }
        }
    }
}

