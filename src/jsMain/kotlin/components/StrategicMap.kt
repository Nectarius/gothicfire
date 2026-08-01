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
                            sendAction(GameAction.PlaceCharacter(sector, activeChar.id))
                            return@onClick
                        }
                        
                        // Priority 2: Move active character to valid adjacent target
                        if (isValidMoveTarget && activeChar != null) {
                            sendAction(GameAction.MoveCharacter(sector, activeChar.id))
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
    }
}

