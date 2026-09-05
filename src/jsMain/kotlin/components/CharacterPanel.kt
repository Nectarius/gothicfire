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
import i18n.t

@Composable
fun IComponent.CharacterPanel(
    playerId: String,
    gameState: GameState?,
    selectedCharacterId: String?,
    onSelectCharacter: (String) -> Unit,
    sendAction: (GameAction) -> Unit,
    panelOpen: Boolean = false
) {
    val myPlayer = gameState?.players?.find { it.id == playerId }
    val myCharacters = gameState?.characters?.filter { it.playerId == playerId } ?: emptyList()
    
    val isMyTurn = gameState?.activeTeamTurn == myPlayer?.team
    
    val activeChar = myCharacters.find { it.id == selectedCharacterId } 
        ?: myCharacters.find { !it.hasActedThisTurn && !it.isDead } 
        ?: myCharacters.firstOrNull()
    
    val panelClass = "character-panel glass flex-col gap-1${if (panelOpen) " panel-visible" else ""}"
    div(className = panelClass) {
        div(className = "d-flex justify-between items-center") {
            h3(className = "m-0") { textNode(t("char.your_heroes")) }
            span(className = "text-xs text-gray") {
                val livingCount = myCharacters.count { !it.isDead }
                val actedCount = myCharacters.count { it.hasActedThisTurn && !it.isDead }
                textNode(t("char.acted_count", actedCount, livingCount))
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
                                    char.isDead -> t("char.status_defeated")
                                    char.hasActedThisTurn -> t("char.status_acted")
                                    char.currentSector != null -> t("char.status_sector", char.currentSector)
                                    else -> t("char.status_unplaced")
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
                            if (activeChar.isDead) textNode(" 💀 (${t("char.status_defeated")})")
                        }
                        span(className = "text-sm ${if (hasActed || activeChar.isDead) "text-red" else "text-dark-gray"}") { 
                            textNode(
                                when {
                                    activeChar.isDead -> t("char.status_defeated")
                                    hasActed && isUnplaced -> t("char.status_acted")
                                    activeChar.currentSector != null -> t("char.status_at_sector", activeChar.currentSector)
                                    else -> t("char.status_unplaced_click")
                                }
                            )
                        }
                    }
                    div(className = "d-flex gap-1 text-sm mt-05 text-gray flex-wrap") {
                        span { textNode("⚔️ ${t("char.stat_war")}: ${activeChar.warlord}") }
                        span { textNode("🧠 ${t("char.stat_int")}: ${activeChar.intellect}") }
                        span { textNode("🛡️ ${t("char.stat_van")}: ${activeChar.vanguard}") }
                        span { textNode("🔮 ${t("char.stat_arc")}: ${activeChar.archon}") }
                    }
                    div(className = "d-flex gap-1 text-sm mt-05 text-primary font-600") {
                        span { textNode(t("char.res_food", activeChar.food)) }
                        span { textNode(t("char.res_gold", activeChar.gold)) }
                    }
                    div(className = "d-flex justify-between items-center text-sm mt-05") {
                        span(className = "font-600 text-warning") { textNode(t("char.army_count", activeChar.army.total())) }
                        if (activeChar.army.total() > 0) {
                            span(className = "text-xs text-dark-gray") {
                                textNode(t("char.upkeep", activeChar.army.total()))
                            }
                        }
                    }
                    if (activeChar.army.total() > 0) {
                        div(className = "d-flex gap-1 text-xs text-gray mt-02") {
                            span { textNode("L: ${activeChar.army.lightInfantry}") }
                            span { textNode("A: ${activeChar.army.archers}") }
                            span { textNode("H: ${activeChar.army.heavyInfantry}") }
                            span { textNode("M: ${activeChar.army.mages}") }
                        }
                    }
                    
                    if (activeChar.food < activeChar.army.total() && activeChar.army.total() > 0 && !activeChar.isDead) {
                        div(className = "mt-05 p-05 bg-red-100 text-red border border-red rounded text-sm font-600 text-center") {
                            textNode(t("char.starvation_warning"))
                        }
                    }
                    
                    if (!activeChar.isDead && !activeChar.hasActedThisTurn && isMyTurn) {
                        var isTransferOpen by remember { mutableStateOf(false) }
                        
                        div(className = "d-flex gap-05 mt-1") {
                            button(t("char.rest_skip"), className = "btn btn-sm btn-primary flex-1") {
                                onClick { sendAction(GameAction.SkipTurn(activeChar.id)) }
                            }
                            if (myCharacters.count { !it.isDead } > 1 && !isTransferOpen) {
                                button(t("char.send_resources"), className = "btn btn-sm btn-outline flex-1") {
                                    title(t("char.send_resources_tip"))
                                    onClick { isTransferOpen = true }
                                }
                            }
                        }
                        
                        if (isTransferOpen) {
                            var transferTargetId by remember { mutableStateOf(myCharacters.first { it.id != activeChar.id && !it.isDead }.id) }
                            var transferFood by remember { mutableStateOf("") }
                            var transferGold by remember { mutableStateOf("") }
                            
                            div(className = "mt-1 p-1 border border-primary rounded bg-primary-100") {
                                h4(className = "m-0 text-sm") { textNode(t("char.transfer_title")) }
                                
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
                                        text(value = transferFood, placeholder = t("char.transfer_food_placeholder"), className = "flex-1 w-full") {
                                            onChange { e -> transferFood = e.target.asDynamic().value as String }
                                        }
                                        text(value = transferGold, placeholder = t("char.transfer_gold_placeholder"), className = "flex-1 w-full") {
                                            onChange { e -> transferGold = e.target.asDynamic().value as String }
                                        }
                                    }
                                    
                                    div(className = "d-flex gap-05 mt-05") {
                                        button(t("char.transfer_cancel"), className = "btn btn-xs btn-outline flex-1") {
                                            onClick { isTransferOpen = false }
                                        }
                                        button(t("char.transfer_send"), className = "btn btn-xs btn-primary flex-2") {
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

                    // Scroll Inventory Section
                    if (!activeChar.isDead) {
                        div(className = "scroll-section mt-05 pt-05") {
                            div(className = "d-flex justify-between items-center") {
                                span(className = "font-600 text-sm") { textNode(t("char.scrolls_title")) }
                                span(className = "text-xs text-dark-gray") { 
                                    textNode(t("char.scrolls_held", activeChar.scrolls.size))
                                }
                            }
                            
                            if (activeChar.scrolls.isNotEmpty()) {
                                div(className = "d-flex flex-col gap-02 mt-03") {
                                    for (scroll in activeChar.scrolls) {
                                        val (icon, label) = when (scroll.type) {
                                            ScrollType.WARLORD -> "⚔️" to t("scroll.warlord")
                                            ScrollType.INTELLECT -> "🧠" to t("scroll.intellect")
                                            ScrollType.VANGUARD -> "🛡️" to t("scroll.vanguard")
                                            ScrollType.ARCHON -> "🔮" to t("scroll.archon")
                                        }
                                        div(className = "scroll-item d-flex justify-between items-center") {
                                            span(className = "text-xs") {
                                                textNode("$icon $label +${scroll.boostAmount}")
                                            }
                                            button(t("char.scroll_use"), className = "btn btn-xs btn-outline scroll-use-btn") {
                                                title(t("char.scroll_use_tip", activeChar.name, label, scroll.boostAmount))
                                                onClick {
                                                    sendAction(GameAction.UseScroll(scroll.id, activeChar.id))
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                p(className = "text-xs text-dark-gray m-0 mt-03") {
                                    textNode(t("char.scrolls_empty"))
                                }
                            }
                        }
                    }
                }
            }
        } else {
            p(className = "text-sm text-dark-gray") { textNode(t("char.no_heroes")) }
        }
    }
}

