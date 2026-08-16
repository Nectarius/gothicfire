import re

# CharacterPanel.kt
with open("src/jsMain/kotlin/components/CharacterPanel.kt", "r") as f:
    content = f.read()

# Replace soldiers with army.total()
content = content.replace("activeChar.soldiers", "activeChar.army.total()")

# Replace old Army display with detailed one
old_army_display = """                    div(className = "d-flex justify-between items-center text-sm mt-05") {
                        span(className = "font-600 text-warning") { textNode("⚔️ Army: ${activeChar.army.total()}/100") }
                        if (activeChar.army.total() > 0) {
                            span(className = "text-xs text-dark-gray") {
                                textNode("Upkeep: ${activeChar.army.total()}🌾/turn")
                            }
                        }
                    }"""

new_army_display = """                    div(className = "d-flex justify-between items-center text-sm mt-05") {
                        span(className = "font-600 text-warning") { textNode("⚔️ Army: ${activeChar.army.total()}/100") }
                        if (activeChar.army.total() > 0) {
                            span(className = "text-xs text-dark-gray") {
                                textNode("Upkeep: ${activeChar.army.total()}🌾/turn")
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
                    }"""
content = content.replace(old_army_display, new_army_display)


# Replace recruitment buttons
old_recruit = """                    if (!activeChar.isDead && activeChar.army.total() < 100 && activeChar.gold >= 10) {
                        div(className = "d-flex gap-05 mt-05 flex-wrap") {
                            val maxAffordable = kotlin.math.min(100 - activeChar.army.total(), activeChar.gold / 10)
                            for (count in listOf(1, 5, 10)) {
                                val cost = count * 10
                                if (activeChar.gold >= cost && activeChar.army.total() + count <= 100) {
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
                    }"""

new_recruit = """                    var isRecruitmentModalOpen by remember { mutableStateOf(false) }
                    if (!activeChar.isDead && activeChar.currentSector != null && isMyTurn) {
                        div(className = "mt-05") {
                            button("Recruit Army", className = "btn btn-xs btn-outline w-full") {
                                onClick { isRecruitmentModalOpen = true }
                            }
                        }
                        
                        if (isRecruitmentModalOpen) {
                            RecruitmentModal(
                                character = activeChar,
                                gameState = gameState,
                                onClose = { isRecruitmentModalOpen = false },
                                onRecruit = { unitType, count -> 
                                    sendAction(GameAction.RecruitArmy(count, activeChar.id, unitType))
                                    isRecruitmentModalOpen = false
                                }
                            )
                        }
                    }"""
content = content.replace(old_recruit, new_recruit)

with open("src/jsMain/kotlin/components/CharacterPanel.kt", "w") as f:
    f.write(content)

# TerritoryCard.kt
with open("src/jsMain/kotlin/components/TerritoryCard.kt", "r") as f:
    content2 = f.read()

content2 = content2.replace("activeChar.soldiers", "activeChar.army.total()")

# Replace recruitment buttons in TerritoryCard
old_t_recruit = """                            if (activeChar.army.total() < 100 && activeChar.gold >= 10) {
                                div(className = "d-flex gap-05 mt-05 flex-wrap") {
                                    val maxPossible = kotlin.math.min(100 - activeChar.army.total(), activeChar.gold / 10)
                                    for (count in listOf(1, 5, 10)) {
                                        val cost = count * 10
                                        if (activeChar.gold >= cost && activeChar.army.total() + count <= 100) {
                                            button("+$count Men", className = "btn btn-xs btn-outline flex-1") {
                                                onClick {
                                                    sendAction(GameAction.HireSoldiers(count, activeChar.id))
                                                }
                                            }
                                        }
                                    }
                                    if (maxPossible > 0) {
                                        button("Max ($maxPossible)", className = "btn btn-xs btn-primary flex-1") {
                                            onClick {
                                                sendAction(GameAction.HireSoldiers(maxPossible, activeChar.id))
                                            }
                                        }
                                    }
                                }
                            }"""

new_t_recruit = """                            div(className = "mt-05") {
                                p(className = "text-xs text-dark-gray m-0") {
                                    textNode("Use Character Panel to Recruit Army")
                                }
                            }"""
content2 = content2.replace(old_t_recruit, new_t_recruit)

with open("src/jsMain/kotlin/components/TerritoryCard.kt", "w") as f:
    f.write(content2)

print("Frontend components refactored.")
