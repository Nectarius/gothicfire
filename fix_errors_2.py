import re

# KingdomOverviewPanel.kt
with open("src/jsMain/kotlin/components/KingdomOverviewPanel.kt", "r") as f:
    content = f.read()
# Replace remaining 'wisdom' references
content = content.replace('span { textNode("💪 STR: ${char.strength}") }', 'span { textNode("⚔️ WAR: ${char.warlord}") }')
content = content.replace('span { textNode("🏃 AGI: ${char.agility}") }', 'span { textNode("🛡️ VAN: ${char.vanguard}") }')
content = content.replace('span { textNode("🧠 WIS: ${char.wisdom}") }', 'span { textNode("🧠 INT: ${char.intellect}") }')

old_kop_scroll = """                                        val (icon, label) = when (scroll.type) {
                                            ScrollType.STRENGTH -> "💪" to "Strength"
                                            ScrollType.AGILITY -> "🏃" to "Agility"
                                            ScrollType.WISDOM -> "🧠" to "Wisdom"
                                        }"""
new_kop_scroll = """                                        val (icon, label) = when (scroll.type) {
                                            ScrollType.WARLORD -> "⚔️" to "Warlord"
                                            ScrollType.INTELLECT -> "🧠" to "Intellect"
                                            ScrollType.VANGUARD -> "🛡️" to "Vanguard"
                                            ScrollType.ARCHON -> "🔮" to "Archon"
                                        }"""
content = content.replace(old_kop_scroll, new_kop_scroll)
with open("src/jsMain/kotlin/components/KingdomOverviewPanel.kt", "w") as f:
    f.write(content)

# StrategicMap.kt
with open("src/jsMain/kotlin/components/StrategicMap.kt", "r") as f:
    content = f.read()

content = content.replace('span { textNode("${battleChar.strength}") }', 'span { textNode("${battleChar.warlord}") }')
content = content.replace('span { textNode("${battleChar.agility}") }', 'span { textNode("${battleChar.vanguard}") }')
content = content.replace('span { textNode("${battleChar.wisdom}") }', 'span { textNode("${battleChar.intellect}") }')

content = content.replace('span { textNode("${enemyChar.strength}") }', 'span { textNode("${enemyChar.warlord}") }')
content = content.replace('span { textNode("${enemyChar.agility}") }', 'span { textNode("${enemyChar.vanguard}") }')
content = content.replace('span { textNode("${enemyChar.wisdom}") }', 'span { textNode("${enemyChar.intellect}") }')

old_sm_scroll = """                                            val (icon, label) = when (scroll.type) {
                                                ScrollType.STRENGTH -> "💪" to "Strength"
                                                ScrollType.AGILITY -> "🏃" to "Agility"
                                                ScrollType.WISDOM -> "🧠" to "Wisdom"
                                            }"""
new_sm_scroll = """                                            val (icon, label) = when (scroll.type) {
                                                ScrollType.WARLORD -> "⚔️" to "Warlord"
                                                ScrollType.INTELLECT -> "🧠" to "Intellect"
                                                ScrollType.VANGUARD -> "🛡️" to "Vanguard"
                                                ScrollType.ARCHON -> "🔮" to "Archon"
                                            }"""
content = content.replace(old_sm_scroll, new_sm_scroll)
with open("src/jsMain/kotlin/components/StrategicMap.kt", "w") as f:
    f.write(content)

# TerritoryCard.kt
with open("src/jsMain/kotlin/components/TerritoryCard.kt", "r") as f:
    content = f.read()
content = content.replace("val boostAmount = if (activeChar != null) 1 + (activeChar.wisdom / 2) else 2", "val boostAmount = if (activeChar != null) activeChar.intellect.coerceIn(2, 7) else 2")
with open("src/jsMain/kotlin/components/TerritoryCard.kt", "w") as f:
    f.write(content)

print("Errors fixed")
