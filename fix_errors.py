import re

# GameSession.kt
with open("src/jvmMain/kotlin/game/GameSession.kt", "r") as f:
    content = f.read()

# Replace useScroll correctly
old_scroll = """                    val updatedChar = when (scroll.type) {
                        ScrollType.STRENGTH -> it.copy(strength = it.strength + scroll.boostAmount)
                        ScrollType.AGILITY -> it.copy(agility = it.agility + scroll.boostAmount)
                        ScrollType.WISDOM -> it.copy(wisdom = it.wisdom + scroll.boostAmount)
                    }"""
new_scroll = """                    val updatedChar = when (scroll.type) {
                        ScrollType.WARLORD -> it.copy(warlord = it.warlord + scroll.boostAmount)
                        ScrollType.INTELLECT -> it.copy(intellect = it.intellect + scroll.boostAmount)
                        ScrollType.VANGUARD -> it.copy(vanguard = it.vanguard + scroll.boostAmount)
                        ScrollType.ARCHON -> it.copy(archon = it.archon + scroll.boostAmount)
                    }"""
content = content.replace(old_scroll, new_scroll)
with open("src/jvmMain/kotlin/game/GameSession.kt", "w") as f:
    f.write(content)

# KingdomOverviewPanel.kt
with open("src/jsMain/kotlin/components/KingdomOverviewPanel.kt", "r") as f:
    content = f.read()
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
# "val boostAmount = 1 + (activeChar.wisdom / 2)" -> "val boostAmount = activeChar.intellect.coerceIn(2, 7)"
content = content.replace("val boostAmount = 1 + (activeChar.wisdom / 2)", "val boostAmount = activeChar.intellect.coerceIn(2, 7)")
with open("src/jsMain/kotlin/components/TerritoryCard.kt", "w") as f:
    f.write(content)

print("Errors fixed")
