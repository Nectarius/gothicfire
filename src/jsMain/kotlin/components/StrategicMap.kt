package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameState
import models.isAdjacentSector
import models.GameAction
import models.MapData
import models.Team

@Composable
fun IComponent.StrategicMap(
    playerId: String,
    gameState: GameState?,
    sendAction: (GameAction) -> Unit
) {
    var selectedBoardCharacterId by remember { mutableStateOf<String?>(null) }
    
    val myPlayer = gameState?.players?.find { it.id == playerId }
    val myCharacter = gameState?.characters?.find { it.playerId == playerId }
    val isMyTurn = gameState?.activeTeamTurn == myPlayer?.team

    div(className = "strategic-map-container") {
        // The background map image
        img(src = "/gothic_fire_map.png", alt = "Gothic Strategic Map", className = "strategic-map-image")

        // The Territory Nodes Overlay
        div(className = "strategic-map-grid") {
            for ((sector, territory) in MapData) {
                
                val sectorOccupiedBy = gameState?.characters?.find { it.currentSector == sector }
                val isSectorSelected = myCharacter != null && myCharacter.currentSector == sector && selectedBoardCharacterId == myCharacter.id
                
                // Valid move target if I have my character selected, it's my turn, and it's empty and adjacent
                val isValidMoveTarget = isMyTurn && selectedBoardCharacterId == myCharacter?.id && myCharacter?.currentSector != null &&
                    sectorOccupiedBy == null && isAdjacentSector(myCharacter.currentSector!!, sector)
                
                // Valid placement target if it's my turn, my character is unplaced, and sector is empty
                val isValidPlacementTarget = isMyTurn && myCharacter != null && myCharacter.currentSector == null && sectorOccupiedBy == null

                val leftPerc = (territory.x / 1205.0) * 100
                val topPerc = (territory.y / 1095.0) * 100

                val cellClasses = mutableListOf("territory-node")
                if (isSectorSelected) cellClasses.add("territory-node-selected")
                if (isValidMoveTarget) cellClasses.add("territory-node-valid-move")
                if (isValidPlacementTarget) cellClasses.add("territory-node-valid-place")

                div(className = cellClasses.joinToString(" ")) {
                    style("left", "$leftPerc%")
                    style("top", "$topPerc%")
                    style("position", "absolute")
                    style("transform", "translate(-50%, -50%)")
                    
                    span(className = "territory-label") {
                        textNode(sector)
                    }

                    // Handle clicks
                    onClick {
                        if (gameState == null || myPlayer == null || myCharacter == null || !isMyTurn) return@onClick
                        
                        // Priority 1: Unplaced character wants to place
                        if (myCharacter.currentSector == null) {
                            if (sectorOccupiedBy == null) {
                                sendAction(GameAction.PlaceCharacter(sector))
                            }
                            return@onClick
                        }
                        
                        // Priority 2: Click on my own placed character to select it
                        if (sectorOccupiedBy?.id == myCharacter.id) {
                            if (!myCharacter.hasActedThisTurn) {
                                selectedBoardCharacterId = myCharacter.id
                            }
                            return@onClick
                        }
                        
                        // Priority 3: Character selected, click empty adjacent space to move
                        if (selectedBoardCharacterId == myCharacter.id && sectorOccupiedBy == null) {
                            if (isAdjacentSector(myCharacter.currentSector!!, sector)) {
                                sendAction(GameAction.MoveCharacter(sector))
                                selectedBoardCharacterId = null
                            }
                            return@onClick
                        }
                        
                        // Clicked somewhere invalid or empty
                        selectedBoardCharacterId = null
                    }
                }
            }
        }

        // Render Unit Markers
        if (gameState != null) {
            for (char in gameState.characters) {
                val sector = char.currentSector ?: continue
                val territory = MapData[sector]
                if (territory != null) {
                    val leftPerc = (territory.x / 1205.0) * 100
                    val topPerc = (territory.y / 1095.0) * 100
                    
                    val owner = gameState.players.find { it.id == char.playerId }
                    val isRed = owner?.team == Team.RED
                    
                    val markerClass = if (isRed) "unit-marker-p1" else "unit-marker-p2"
                    val selectedClass = if (selectedBoardCharacterId == char.id) "unit-marker-selected" else ""
                    val actedClass = if (char.hasActedThisTurn) "unit-marker-acted" else ""

                    div(className = "unit-marker $markerClass $selectedClass $actedClass") {
                        style("left", "$leftPerc%")
                        style("top", "$topPerc%")
                        title("${char.name} (STR:${char.strength} AGI:${char.agility} WIS:${char.wisdom})${if (char.hasActedThisTurn) " [ACTED]" else ""}")
                    }
                }
            }
        }
    }
}
