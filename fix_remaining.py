import re

# StrategicMap.kt
with open("src/jsMain/kotlin/components/StrategicMap.kt", "r") as f:
    content = f.read()

content = content.replace("occupant.soldiers", "occupant.army.total()")
content = content.replace("c.soldiers", "c.army.total()")
content = content.replace("char.soldiers", "char.army.total()")

with open("src/jsMain/kotlin/components/StrategicMap.kt", "w") as f:
    f.write(content)

# TerritoryCard.kt
with open("src/jsMain/kotlin/components/TerritoryCard.kt", "r") as f:
    content2 = f.read()

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
# If the regex replacement didn't work before, let's just do a brute force replacement of any HireSoldiers in TerritoryCard since it shouldn't exist anymore.
content2 = re.sub(r'if \(activeChar.army.total\(\) < 100 && activeChar\.gold >= 10\) \{[\s\S]*?HireSoldiers[\s\S]*?\}[\s\S]*?\}[\s\S]*?\}[\s\S]*?\}[\s\S]*?\}[\s\S]*?\}', new_t_recruit, content2)

with open("src/jsMain/kotlin/components/TerritoryCard.kt", "w") as f:
    f.write(content2)
print("Fixed remaining frontend compilation errors.")
