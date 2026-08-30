package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.form.number.range
import dev.kilua.html.*
import models.ArmyType
import models.GameAction
import models.GameState
import models.MapData

@Composable
fun IComponent.ArmyRecruitmentPanel(
    playerId: String,
    gameState: GameState,
    selectedCharacterId: String?,
    onClose: () -> Unit,
    sendAction: (GameAction) -> Unit
) {
    val myCharacters = gameState.characters.filter { it.playerId == playerId && !it.isDead }
    var recruitCharId by remember { mutableStateOf(selectedCharacterId ?: myCharacters.firstOrNull()?.id) }
    
    // Ensure we have a valid selected character
    if (recruitCharId == null && myCharacters.isNotEmpty()) {
        recruitCharId = myCharacters.first().id
    }
    
    val selectedChar = myCharacters.find { it.id == recruitCharId }
    val sectorId = selectedChar?.currentSector
    val territory = sectorId?.let { gameState.territories[it] }
    val currentProtection = territory?.protection ?: 0
    
    var selectedUnitType by remember { mutableStateOf(ArmyType.LIGHT_INFANTRY) }
    var recruitAmount by remember { mutableStateOf(1) }

    div(className = "modal-overlay") {
        div(className = "modal-content glass p-4 max-w-lg") {
            div(className = "d-flex justify-between items-center mb-2") {
                h2(className = "m-0 text-warning") { textNode("⚔️ Army Recruitment") }
                button("✖", className = "btn btn-xs btn-outline") {
                    onClick { onClose() }
                }
            }
            
            if (myCharacters.isEmpty()) {
                p(className = "text-red text-center") { textNode("You have no living heroes to recruit for.") }
                return@div
            }
            
            // Character Selection
            div(className = "mb-2") {
                label(className = "text-sm text-gray block mb-05") { textNode("Recruiting Hero:") }
                div(className = "d-flex gap-05") {
                    for (char in myCharacters) {
                        button(char.name, className = "btn btn-sm ${if (recruitCharId == char.id) "btn-primary" else "glass"}") {
                            onClick { recruitCharId = char.id }
                        }
                    }
                }
            }
            
            if (selectedChar != null) {
                div(className = "d-flex justify-between items-center bg-black-20 p-2 mb-2 rounded") {
                    span { textNode("Current Wealth:") }
                    span(className = "text-warning font-600") { textNode("${selectedChar.gold} 🪙") }
                }
                
                div(className = "d-flex justify-between items-center bg-black-20 p-2 mb-2 rounded") {
                    span { textNode("Sector Protection Level:") }
                    span(className = "text-primary font-600") { textNode("$currentProtection 🛡️") }
                }
                
                // Unit Selection
                val unitOptions = listOf(
                    Triple(ArmyType.LIGHT_INFANTRY, "Light Infantry" to "🗡️", 30 to 0), // Type, Name/Icon, Cost to Protection
                    Triple(ArmyType.ARCHERS, "Archers" to "🏹", 40 to 10),
                    Triple(ArmyType.HEAVY_INFANTRY, "Heavy Infantry" to "🛡️", 50 to 20),
                    Triple(ArmyType.MAGES, "Mages" to "🔮", 80 to 30)
                )
                
                div(className = "d-flex flex-col gap-1 mb-2") {
                    for ((type, info, reqs) in unitOptions) {
                        val (name, icon) = info
                        val (cost, reqProtection) = reqs
                        val canRecruitType = currentProtection >= reqProtection
                        val isSelected = selectedUnitType == type
                        
                        div(className = "unit-card glass p-2 d-flex align-items-center justify-between ${if (isSelected) "active" else ""} ${if (!canRecruitType) "opacity-50" else "cursor-pointer"}") {
                            onClick {
                                if (canRecruitType) {
                                    selectedUnitType = type
                                    recruitAmount = 1
                                }
                            }
                            
                            // Left side: Icon & Name
                            div(className = "d-flex align-items-center gap-1") {
                                span(className = "unit-icon text-3xl") { textNode(icon) }
                                div(className = "d-flex flex-col") {
                                    h4(className = "m-0 text-md ${if (isSelected) "text-primary" else ""}") { textNode(name) }
                                    if (isSelected) {
                                        span(className = "text-xs text-primary font-600") { textNode("Selected") }
                                    }
                                }
                            }
                            
                            // Right side: Cost & Reqs
                            div(className = "text-right d-flex flex-col justify-center") {
                                p(className = "m-0 text-sm text-warning font-600") { textNode("$cost 🪙") }
                                if (!canRecruitType) {
                                    p(className = "m-0 text-xs text-red font-600") { textNode("Requires $reqProtection 🛡️") }
                                } else if (reqProtection > 0) {
                                    p(className = "m-0 text-xs text-gray") { textNode("Req: $reqProtection 🛡️") }
                                }
                            }
                        }
                    }
                }
                
                // Recruitment Slider
                val selectedUnitCost = unitOptions.find { it.first == selectedUnitType }?.third?.first ?: 30
                val maxAffordable = (selectedChar.gold / selectedUnitCost)
                val spaceLeft = 100 - selectedChar.army.total()
                val maxRecruit = kotlin.math.min(maxAffordable, spaceLeft)
                
                if (maxRecruit > 0) {
                    val actualRecruit = recruitAmount.coerceIn(1, maxRecruit)
                    val totalCost = actualRecruit * selectedUnitCost
                    
                    div(className = "text-center mb-1") {
                        p(className = "m-0 mb-1") {
                            textNode("Recruit ")
                            span(className = "text-primary font-600") { textNode("$actualRecruit") }
                            textNode(" units for ")
                            span(className = "text-warning font-600") { textNode("$totalCost 🪙") }
                        }
                        
                        range(value = actualRecruit, min = 1, max = maxRecruit, className = "w-full mb-1") {
                            onInput { recruitAmount = this.value?.toInt() ?: 1 }
                        }
                        
                        button("Confirm Recruitment", className = "btn btn-primary w-full") {
                            onClick {
                                sendAction(GameAction.RecruitArmy(actualRecruit, selectedChar.id, selectedUnitType))
                                onClose()
                            }
                        }
                    }
                } else if (spaceLeft <= 0) {
                    p(className = "text-center text-red mt-2") { textNode("Army is full (100/100).") }
                } else {
                    p(className = "text-center text-red mt-2") { textNode("Not enough gold to recruit this unit.") }
                }
            }
        }
    }
}
