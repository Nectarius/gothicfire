package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.form.number.range
import dev.kilua.html.*
import models.GameAction
import models.GameState

@Composable
fun IComponent.MarketPanel(
    playerId: String,
    gameState: GameState,
    selectedCharacterId: String?,
    onClose: () -> Unit,
    sendAction: (GameAction) -> Unit
) {
    val myCharacters = gameState.characters.filter { it.playerId == playerId && !it.isDead }
    var tradeCharId by remember { mutableStateOf(selectedCharacterId ?: myCharacters.firstOrNull()?.id) }
    
    // Ensure we have a valid selected character
    if (tradeCharId == null && myCharacters.isNotEmpty()) {
        tradeCharId = myCharacters.first().id
    }
    
    val selectedChar = myCharacters.find { it.id == tradeCharId }
    
    var tradeMode by remember { mutableStateOf("BUY_FOOD") } // "BUY_FOOD" or "SELL_FOOD"
    var goldAmount by remember { mutableStateOf(1) }

    div(className = "modal-overlay") {
        div(className = "modal-content glass p-4 max-w-md") {
            div(className = "d-flex justify-between items-center mb-2") {
                h2(className = "m-0 text-warning") { textNode("⚖️ Merchant Caravan") }
                button("✖", className = "btn btn-xs btn-outline") {
                    onClick { onClose() }
                }
            }
            
            p(className = "text-gray text-sm") {
                textNode("Trade resources with the traveling merchants. The exchange rates are fixed.")
            }
            
            if (myCharacters.isEmpty()) {
                p(className = "text-red text-center") { textNode("You have no living heroes to trade with.") }
                return@div
            }
            
            // Character Selection
            div(className = "mb-2") {
                label(className = "text-sm text-gray block mb-05") { textNode("Trading Hero:") }
                div(className = "d-flex gap-05") {
                    for (char in myCharacters) {
                        button(char.name, className = "btn btn-sm ${if (tradeCharId == char.id) "btn-primary" else "glass"}") {
                            onClick { tradeCharId = char.id }
                        }
                    }
                }
            }
            
            if (selectedChar != null) {
                div(className = "d-flex justify-between items-center bg-black-20 p-2 mb-2 rounded") {
                    span { textNode("Your Wealth:") }
                    div(className = "d-flex gap-1") {
                        span(className = "text-primary font-600") { textNode("${selectedChar.food} 🌾") }
                        span(className = "text-warning font-600") { textNode("${selectedChar.gold} 🪙") }
                    }
                }
                
                // Trade Mode Toggle
                div(className = "d-flex justify-center gap-1 mb-2") {
                    button("Buy Food", className = "btn ${if (tradeMode == "BUY_FOOD") "btn-primary" else "glass"}") {
                        onClick { tradeMode = "BUY_FOOD" }
                    }
                    button("Sell Food", className = "btn ${if (tradeMode == "SELL_FOOD") "btn-primary" else "glass"}") {
                        onClick { tradeMode = "SELL_FOOD" }
                    }
                }
                
                // Trade Calculator
                div(className = "trade-calculator text-center") {
                    if (tradeMode == "BUY_FOOD") {
                        p(className = "text-sm text-gray") { textNode("Rate: 1 Gold = 1 Food") }
                        
                        val maxAffordable = selectedChar.gold
                        val actualGold = goldAmount.coerceIn(1, if (maxAffordable > 0) maxAffordable else 1)
                        val foodGained = actualGold
                        
                        div(className = "d-flex justify-center items-center gap-1 mb-1") {
                            span(className = "text-warning text-md") { textNode("-$actualGold 🪙") }
                            span { textNode(" ➡️ ") }
                            span(className = "text-primary text-md font-600") { textNode("+$foodGained 🌾") }
                        }
                        
                        range(value = actualGold, min = 1, max = if (maxAffordable > 0) maxAffordable else 1, className = "w-full mb-1") {
                            onInput { goldAmount = this.value?.toInt() ?: 1 }
                        }
                        
                        val canAfford = maxAffordable > 0
                        button("Complete Trade", className = "btn btn-primary w-full ${if (!canAfford) "opacity-50 pointer-events-none" else ""}") {
                            onClick {
                                if (canAfford && selectedChar != null) {
                                    sendAction(GameAction.MarketTrade(selectedChar.id, true, actualGold))
                                }
                            }
                        }
                    } else {
                        p(className = "text-sm text-gray") { textNode("Rate: 2 Food = 1 Gold") }
                        
                        // When selling food, goldAmount represents the gold we WANT. Food cost is gold * 2
                        val maxGoldPossible = selectedChar.food / 2
                        val actualGold = goldAmount.coerceIn(1, if (maxGoldPossible > 0) maxGoldPossible else 1)
                        val foodCost = actualGold * 2
                        
                        div(className = "d-flex justify-center items-center gap-1 mb-1") {
                            span(className = "text-primary text-md") { textNode("-$foodCost 🌾") }
                            span { textNode(" ➡️ ") }
                            span(className = "text-warning text-md font-600") { textNode("+$actualGold 🪙") }
                        }
                        
                        range(value = actualGold, min = 1, max = if (maxGoldPossible > 0) maxGoldPossible else 1, className = "w-full mb-1") {
                            onInput { goldAmount = this.value?.toInt() ?: 1 }
                        }
                        
                        val canAfford = maxGoldPossible > 0
                        button("Complete Trade", className = "btn btn-primary w-full ${if (!canAfford) "opacity-50 pointer-events-none" else ""}") {
                            onClick {
                                if (canAfford && selectedChar != null) {
                                    sendAction(GameAction.MarketTrade(selectedChar.id, false, actualGold))
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
