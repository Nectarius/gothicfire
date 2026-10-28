package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.form.number.range
import dev.kilua.html.*
import models.*
import i18n.t

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
    
    var activeTab by remember { mutableStateOf("GRAIN") } // "GRAIN" or "FURS"
    var tradeMode by remember { mutableStateOf("BUY_FOOD") } // "BUY_FOOD" or "SELL_FOOD"
    var goldAmount by remember { mutableStateOf(1) }

    div(className = "modal-overlay") {
        div(className = "modal-content glass p-4 max-w-lg") {
            div(className = "d-flex justify-between items-center mb-1") {
                h2(className = "m-0 text-warning d-flex items-center gap-05") { 
                    span { textNode("⚖️") }
                    textNode(t("market.title")) 
                }
                button("✖", className = "btn btn-xs btn-outline") {
                    onClick { onClose() }
                }
            }
            
            p(className = "text-gray text-sm mb-1") {
                textNode(t("market.desc"))
            }

            // Market Navigation Tabs
            div(className = "d-flex gap-1 mb-2") {
                button(
                    "🌾 " + t("market.tab_grain", "Grain & Provisions"),
                    className = "btn flex-1 ${if (activeTab == "GRAIN") "btn-primary" else "glass"}"
                ) {
                    onClick { activeTab = "GRAIN" }
                }
                button(
                    "🦊 " + t("market.tab_furs", "Fur Exchange"),
                    className = "btn flex-1 ${if (activeTab == "FURS") "btn-primary" else "glass"}"
                ) {
                    onClick { activeTab = "FURS" }
                }
            }
            
            if (myCharacters.isEmpty()) {
                p(className = "text-red text-center") { textNode(t("market.no_heroes")) }
                return@div
            }
            
            // Character Selection
            div(className = "mb-2") {
                label(className = "text-sm text-gray block mb-05") { textNode(t("market.trading_hero")) }
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
                    span { textNode(t("market.your_wealth")) }
                    div(className = "d-flex gap-1 items-center") {
                        span(className = "text-primary font-600") { textNode("${selectedChar.food} 🌾") }
                        span(className = "text-warning font-600") { textNode("${selectedChar.gold} 🪙") }
                        val totalHides = selectedChar.hides.values.sum()
                        if (totalHides > 0) {
                            span(className = "badge badge-outline text-xs") { textNode("🏷️ $totalHides") }
                        }
                    }
                }

                if (activeTab == "GRAIN") {
                    // Trade Mode Toggle
                    div(className = "d-flex justify-center gap-1 mb-2") {
                        button(className = "btn trade-mode-btn ${if (tradeMode == "BUY_FOOD") "active" else "glass"} flex-1 d-flex flex-col items-center p-2") {
                            onClick { tradeMode = "BUY_FOOD" }
                            span(className = "text-2xl mb-05") { textNode("🌾") }
                            span(className = "font-600") { textNode(t("market.buy_food")) }
                        }
                        button(className = "btn trade-mode-btn ${if (tradeMode == "SELL_FOOD") "active" else "glass"} flex-1 d-flex flex-col items-center p-2") {
                            onClick { tradeMode = "SELL_FOOD" }
                            span(className = "text-2xl mb-05") { textNode("🪙") }
                            span(className = "font-600") { textNode(t("market.sell_food")) }
                        }
                    }
                    
                    // Trade Calculator
                    div(className = "trade-calculator text-center") {
                        if (tradeMode == "BUY_FOOD") {
                            p(className = "text-sm text-gray") { textNode(t("market.rate_buy")) }
                            
                            val maxAffordable = selectedChar.gold
                            val actualGold = goldAmount.coerceIn(1, if (maxAffordable > 0) maxAffordable else 1)
                            val foodGained = actualGold
                            
                            div(className = "trade-exchange-box glass p-2 mb-2 d-flex justify-center items-center gap-2") {
                                div(className = "text-center") {
                                    span(className = "text-warning text-xl font-600 d-block") { textNode("-$actualGold") }
                                    span(className = "text-sm text-gray") { textNode(t("market.gold")) }
                                }
                                span(className = "text-2xl") { textNode("➡️") }
                                div(className = "text-center") {
                                    span(className = "text-primary text-xl font-600 d-block") { textNode("+$foodGained") }
                                    span(className = "text-sm text-gray") { textNode(t("market.food")) }
                                }
                            }
                            
                            range(value = actualGold, min = 1, max = if (maxAffordable > 0) maxAffordable else 1, className = "w-full mb-1") {
                                onInput { goldAmount = this.value?.toInt() ?: 1 }
                            }
                            
                            val canAfford = maxAffordable > 0
                            button(t("market.complete_trade"), className = "btn btn-primary w-full ${if (!canAfford) "opacity-50 pointer-events-none" else ""}") {
                                onClick {
                                    if (canAfford && selectedChar != null) {
                                        sendAction(GameAction.MarketTrade(selectedChar.id, true, actualGold))
                                    }
                                }
                            }
                        } else {
                            p(className = "text-sm text-gray") { textNode(t("market.rate_sell")) }
                            
                            val maxGoldPossible = selectedChar.food / 2
                            val actualGold = goldAmount.coerceIn(1, if (maxGoldPossible > 0) maxGoldPossible else 1)
                            val foodCost = actualGold * 2
                            
                            div(className = "trade-exchange-box glass p-2 mb-2 d-flex justify-center items-center gap-2") {
                                div(className = "text-center") {
                                    span(className = "text-primary text-xl font-600 d-block") { textNode("-$foodCost") }
                                    span(className = "text-sm text-gray") { textNode(t("market.food")) }
                                }
                                span(className = "text-2xl") { textNode("➡️") }
                                div(className = "text-center") {
                                    span(className = "text-warning text-xl font-600 d-block") { textNode("+$actualGold") }
                                    span(className = "text-sm text-gray") { textNode(t("market.gold")) }
                                }
                            }
                            
                            range(value = actualGold, min = 1, max = if (maxGoldPossible > 0) maxGoldPossible else 1, className = "w-full mb-1") {
                                onInput { goldAmount = this.value?.toInt() ?: 1 }
                            }
                            
                            val canAfford = maxGoldPossible > 0
                            button(t("market.complete_trade"), className = "btn btn-primary w-full ${if (!canAfford) "opacity-50 pointer-events-none" else ""}") {
                                onClick {
                                    if (canAfford && selectedChar != null) {
                                        sendAction(GameAction.MarketTrade(selectedChar.id, false, actualGold))
                                    }
                                }
                            }
                        }
                    }
                } else {
                    // Fur Exchange Tab
                    div(className = "fur-exchange-container") {
                        p(className = "text-xs text-gray mb-1") {
                            textNode(t("market.fur_desc", "Local commodity fur trading. Prices fluctuate each turn. Merchants buy at most 1 pelt of each type per turn."))
                        }

                        div(className = "d-flex flex-col gap-05") {
                            for (hide in HideType.entries) {
                                val entry = gameState.furMarket[hide] ?: FurMarketEntry(1.0)
                                val currentPrice = FurMarket.effectivePrice(hide, entry.multiplier)
                                val multPercent = (entry.multiplier * 100).toInt()
                                val trendIcon = if (entry.trendUp) "▲" else "▼"
                                val trendClass = if (entry.trendUp) "text-success" else "text-danger"
                                val ownedCount = selectedChar.hides[hide] ?: 0
                                val alreadySoldThisTurn = gameState.furSalesThisTurn[playerId]?.contains(hide) == true

                                div(className = "glass p-1 d-flex justify-between items-center rounded fur-row") {
                                    div(className = "d-flex items-center gap-1 flex-1") {
                                        span(className = "text-2xl") { textNode(hide.emoji) }
                                        div {
                                            div(className = "font-600 text-sm") { textNode(hide.displayName) }
                                            div(className = "text-xxs text-gray") {
                                                textNode("Base: ${hide.basePrice}🪙 | Code: ${hide.itemId}")
                                            }
                                        }
                                    }

                                    div(className = "text-center px-1") {
                                        div(className = "font-600 text-sm text-warning") {
                                            textNode("$currentPrice 🪙")
                                        }
                                        div(className = "text-xxs font-600 $trendClass") {
                                            textNode("$trendIcon $multPercent%")
                                        }
                                    }

                                    div(className = "d-flex items-center gap-1") {
                                        div(className = "text-right") {
                                            span(className = "badge ${if (ownedCount > 0) "badge-primary" else "badge-outline"} text-xs") {
                                                textNode("x$ownedCount")
                                            }
                                        }

                                        val canSell = ownedCount > 0 && !alreadySoldThisTurn
                                        button(
                                            if (alreadySoldThisTurn) t("market.quota_reached", "Sold Out") else t("market.sell_one", "Sell 1"),
                                            className = "btn btn-xs btn-primary ${if (!canSell) "btn-disabled opacity-50" else ""}"
                                        ) {
                                            title(
                                                when {
                                                    alreadySoldThisTurn -> t("market.quota_tooltip", "The merchant has bought their fill of this pelt for now. Check back next turn.")
                                                    ownedCount <= 0 -> t("market.no_stock_tooltip", "You do not have any ${hide.displayName} to sell.")
                                                    else -> t("market.sell_tooltip", "Sell 1 ${hide.displayName} for $currentPrice gold")
                                                }
                                            )
                                            onClick {
                                                if (canSell) {
                                                    sendAction(GameAction.SellHide(selectedChar.id, hide))
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
