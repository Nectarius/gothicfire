package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameState
import models.GameAction
import models.isAdjacentSector
import models.MapData
import dev.kilua.form.text.text
import dev.kilua.form.select.*
import models.ScrollType

@Composable
fun IComponent.CharacterPanel(
    playerId: String,
    gameState: GameState?,
    selectedCharacterId: String?,
    onSelectCharacter: (String) -> Unit,
    sendAction: (GameAction) -> Unit
) {
    val myPlayer = gameState?.players?.find { it.id == playerId }
    val myCharacters = gameState?.characters?.filter { it.playerId == playerId } ?: emptyList()
    
    val isMyTurn = gameState?.activeTeamTurn == myPlayer?.team
    
    val activeChar = myCharacters.find { it.id == selectedCharacterId } 
        ?: myCharacters.find { !it.hasActedThisTurn && !it.isDead } 
        ?: myCharacters.firstOrNull()
    
    div(className = "character-panel glass flex-col gap-1") {
        div(className = "d-flex justify-between items-center") {
            h3(className = "m-0") { textNode("Your Heroes") }
            span(className = "text-xs text-gray") {
                val livingCount = myCharacters.count { !it.isDead }
                val actedCount = myCharacters.count { it.hasActedThisTurn && !it.isDead }
                textNode("$actedCount/$livingCount Acted")
            }
        }
        
        if (myCharacters.isNotEmpty()) {
            // Character Selector Tabs
            div(className = "character-tabs") {
                for ((index, char) in myCharacters.withIndex()) {
                    val isSelected = char.id == activeChar?.id
                    val tabClasses = mutableListOf("char-tab-btn")
                    if (isSelected) tabClasses.add("active")
                    if (char.hasActedThisTurn) tabClasses.add("acted")
                    if (char.isDead) tabClasses.add("dead")
                    
                    div(className = tabClasses.joinToString(" ")) {
                        span(className = "font-600 text-sm") {
                            textNode("${index + 1}. ${char.name}")
                            if (char.isDead) textNode(" 💀")
                        }
                        span(className = "text-xs mt-05 ${if (char.isDead) "text-red" else if (char.hasActedThisTurn) "text-dark-gray" else "text-primary"}") {
                            textNode(
                                when {
                                    char.isDead -> "Defeated"
                                    char.hasActedThisTurn -> "Acted"
                                    char.currentSector != null -> "Sector ${char.currentSector}"
                                    else -> "Unplaced"
                                }
                            )
                        }
                        
                        onClick {
                            onSelectCharacter(char.id)
                        }
                    }
                }
            }
            
            // Active Character Details Card
            if (activeChar != null) {
                val isUnplaced = activeChar.currentSector == null
                val hasActed = activeChar.hasActedThisTurn
                
                val cardClasses = mutableListOf("char-card", "glass")
                if (hasActed || activeChar.isDead) cardClasses.add("char-card-acted")
                if (isUnplaced && isMyTurn && !hasActed && !activeChar.isDead) cardClasses.add("char-card-clickable")
                
                div(className = cardClasses.joinToString(" ")) {
                    div(className = "d-flex justify-between items-center") {
                        span(className = "font-600 ${if (activeChar.isDead) "text-red" else "text-primary"}") { 
                            textNode(activeChar.name)
                            if (activeChar.isDead) textNode(" 💀 (Defeated)")
                        }
                        span(className = "text-sm ${if (hasActed || activeChar.isDead) "text-red" else "text-dark-gray"}") { 
                            textNode(
                                when {
                                    activeChar.isDead -> "Defeated"
                                    hasActed && isUnplaced -> "Acted"
                                    activeChar.currentSector != null -> "At Sector ${activeChar.currentSector}"
                                    else -> "Unplaced (Click map to place)"
                                }
                            )
                        }
                    }
                    div(className = "d-flex gap-1 text-sm mt-05 text-gray") {
                        span { textNode("STR: ${activeChar.strength}") }
                        span { textNode("AGI: ${activeChar.agility}") }
                        span { textNode("WIS: ${activeChar.wisdom}") }
                    }
                    div(className = "d-flex gap-1 text-sm mt-05 text-primary font-600") {
                        span { textNode("🌾 Food: ${activeChar.food}") }
                        span { textNode("🪙 Gold: ${activeChar.gold}") }
                    }
                    div(className = "d-flex justify-between items-center text-sm mt-05") {
                        span(className = "font-600 text-warning") { textNode("⚔️ Army: ${activeChar.soldiers}/100") }
                        if (activeChar.soldiers > 0) {
                            span(className = "text-xs text-dark-gray") {
                                textNode("Upkeep: ${activeChar.soldiers}🌾/turn")
                            }
                        }
                    }
                    
                    if (activeChar.food < activeChar.soldiers && activeChar.soldiers > 0 && !activeChar.isDead) {
                        div(className = "mt-05 p-05 bg-red-100 text-red border border-red rounded text-sm font-600 text-center") {
                            textNode("⚠️ Starvation Warning: Your army will suffer desertion next turn!")
                        }
                    }
                    
                    if (!activeChar.isDead && !activeChar.hasActedThisTurn && isMyTurn) {
                        var isTransferOpen by remember { mutableStateOf(false) }
                        
                        div(className = "d-flex gap-05 mt-1") {
                            button("Rest (Skip Action)", className = "btn btn-sm btn-primary flex-1") {
                                onClick { sendAction(GameAction.SkipTurn(activeChar.id)) }
                            }
                            if (myCharacters.count { !it.isDead } > 1 && !isTransferOpen) {
                                button("Send Resources", className = "btn btn-sm btn-outline flex-1") {
                                    title("Send Resources (1 Action)")
                                    onClick { isTransferOpen = true }
                                }
                            }
                        }
                        
                        if (isTransferOpen) {
                            var transferTargetId by remember { mutableStateOf(myCharacters.first { it.id != activeChar.id && !it.isDead }.id) }
                            var transferFood by remember { mutableStateOf("") }
                            var transferGold by remember { mutableStateOf("") }
                            
                            div(className = "mt-1 p-1 border border-primary rounded bg-primary-100") {
                                h4(className = "m-0 text-sm") { textNode("Transfer Resources") }
                                
                                div(className = "d-flex flex-col gap-05 mt-05 text-sm") {
                                    select(className = "stat-input w-full") {
                                        myCharacters.filter { it.id != activeChar.id && !it.isDead }.forEach { target ->
                                            option(value = target.id, label = target.name, selected = target.id == transferTargetId)
                                        }
                                        onChange { e ->
                                            transferTargetId = e.target.asDynamic().value as String
                                        }
                                    }
                                    
                                    div(className = "d-flex gap-05") {
                                        text(value = transferFood, placeholder = "🌾 Food", className = "flex-1 w-full") {
                                            onChange { e -> transferFood = e.target.asDynamic().value as String }
                                        }
                                        text(value = transferGold, placeholder = "💰 Gold", className = "flex-1 w-full") {
                                            onChange { e -> transferGold = e.target.asDynamic().value as String }
                                        }
                                    }
                                    
                                    div(className = "d-flex gap-05 mt-05") {
                                        button("Cancel", className = "btn btn-xs btn-outline flex-1") {
                                            onClick { isTransferOpen = false }
                                        }
                                        button("Send", className = "btn btn-xs btn-primary flex-2") {
                                            onClick {
                                                val f = transferFood.toIntOrNull() ?: 0
                                                val g = transferGold.toIntOrNull() ?: 0
                                                if ((f > 0 || g > 0) && f <= activeChar.food && g <= activeChar.gold) {
                                                    sendAction(GameAction.TransferResources(activeChar.id, transferTargetId, f, g))
                                                    isTransferOpen = false
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (!activeChar.isDead && activeChar.soldiers < 100 && activeChar.gold >= 10) {
                        div(className = "d-flex gap-05 mt-05 flex-wrap") {
                            val maxAffordable = kotlin.math.min(100 - activeChar.soldiers, activeChar.gold / 10)
                            for (count in listOf(1, 5, 10)) {
                                val cost = count * 10
                                if (activeChar.gold >= cost && activeChar.soldiers + count <= 100) {
                                    button("+$count Men", className = "btn btn-xs btn-outline flex-1") {
                                        title("Recruit $count soldiers for $cost gold for ${activeChar.name}")
                                        onClick {
                                            sendAction(GameAction.HireSoldiers(count, activeChar.id))
                                        }
                                    }
                                }
                            }
                            if (maxAffordable > 0) {
                                button("Max ($maxAffordable)", className = "btn btn-xs btn-primary flex-1") {
                                    title("Recruit $maxAffordable soldiers for ${maxAffordable * 10} gold for ${activeChar.name}")
                                    onClick {
                                        sendAction(GameAction.HireSoldiers(maxAffordable, activeChar.id))
                                    }
                                }
                            }
                        }
                    }
                    
                    // Market Section
                    if (!activeChar.isDead && isMyTurn) {
                        div(className = "market-section mt-05 pt-05") {
                            val marketRate = gameState?.marketRate ?: 3.0f
                            val displayRate = marketRate.asDynamic().toFixed(1) as String
                            div(className = "d-flex justify-between items-center") {
                                span(className = "font-600 text-sm") { textNode("⚖️ Market (Free Action)") }
                                span(className = "text-xs text-primary") { 
                                    textNode("Rate: 1💰 = $displayRate🌾")
                                }
                            }
                            
                            var tradeGoldAmount by remember { mutableStateOf("1") }
                            
                            div(className = "d-flex gap-05 mt-05 items-center") {
                                text(value = tradeGoldAmount, placeholder = "Gold", className = "stat-input w-full flex-1") {
                                    onChange { e -> tradeGoldAmount = e.target.asDynamic().value as String }
                                }
                                
                                val goldVal = tradeGoldAmount.toIntOrNull() ?: 0
                                val foodVal = (goldVal * marketRate).toInt()
                                
                                button("Buy Food", className = "btn btn-xs btn-primary flex-1") {
                                    title("Spend $goldVal💰 to gain $foodVal🌾")
                                    onClick {
                                        if (goldVal > 0 && activeChar.gold >= goldVal) {
                                            sendAction(GameAction.MarketTrade(activeChar.id, true, goldVal))
                                        }
                                    }
                                }
                                button("Sell Food", className = "btn btn-xs btn-outline flex-1") {
                                    title("Spend $foodVal🌾 to gain $goldVal💰")
                                    onClick {
                                        if (goldVal > 0 && activeChar.food >= foodVal) {
                                            sendAction(GameAction.MarketTrade(activeChar.id, false, goldVal))
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    // Scroll Inventory Section
                    if (!activeChar.isDead) {
                        div(className = "scroll-section mt-05 pt-05") {
                            div(className = "d-flex justify-between items-center") {
                                span(className = "font-600 text-sm") { textNode("📜 Scrolls") }
                                span(className = "text-xs text-dark-gray") { 
                                    textNode("${activeChar.scrolls.size} held")
                                }
                            }
                            
                            if (activeChar.scrolls.isNotEmpty()) {
                                div(className = "d-flex flex-col gap-02 mt-03") {
                                    for (scroll in activeChar.scrolls) {
                                        val (icon, label) = when (scroll.type) {
                                            ScrollType.STRENGTH -> "💪" to "Strength"
                                            ScrollType.AGILITY -> "🏃" to "Agility"
                                            ScrollType.WISDOM -> "🧠" to "Wisdom"
                                        }
                                        div(className = "scroll-item d-flex justify-between items-center") {
                                            span(className = "text-xs") {
                                                textNode("$icon $label +${scroll.boostAmount}")
                                            }
                                            button("Use", className = "btn btn-xs btn-outline scroll-use-btn") {
                                                title("Permanently boost ${activeChar.name}'s $label by +${scroll.boostAmount}")
                                                onClick {
                                                    sendAction(GameAction.UseScroll(scroll.id, activeChar.id))
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                p(className = "text-xs text-dark-gray m-0 mt-03") {
                                    textNode("No scrolls. Search territories to find them!")
                                }
                            }
                        }
                    }
                }
            }
        } else {
            p(className = "text-sm text-dark-gray") { textNode("You haven't selected any heroes.") }
        }
    }
}
