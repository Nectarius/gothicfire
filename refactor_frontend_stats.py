import re

# 1. GameLobby.kt
with open("src/jsMain/kotlin/components/GameLobby.kt", "r") as f:
    content = f.read()

content = content.replace('span(className = "hero-stat-pill text-red") { textNode("STR: ${hero.strength}") }', 'span(className = "hero-stat-pill text-red") { textNode("WAR: ${hero.warlord}") }')
content = content.replace('span(className = "hero-stat-pill text-green") { textNode("AGI: ${hero.agility}") }', 'span(className = "hero-stat-pill text-green") { textNode("VAN: ${hero.vanguard}") }')
content = content.replace('span(className = "hero-stat-pill text-blue") { textNode("WIS: ${hero.wisdom}") }', 'span(className = "hero-stat-pill text-blue") { textNode("INT: ${hero.intellect}") }')
# Add Archon somehow? Let's just use regex to replace the whole block if possible, or just add it.
old_stats_pill = """                                span(className = "hero-stat-pill text-red") { textNode("STR: ${hero.strength}") }
                                span(className = "hero-stat-pill text-green") { textNode("AGI: ${hero.agility}") }
                                span(className = "hero-stat-pill text-blue") { textNode("WIS: ${hero.wisdom}") }"""

new_stats_pill = """                                span(className = "hero-stat-pill text-red") { textNode("WAR: ${hero.warlord}") }
                                span(className = "hero-stat-pill text-blue") { textNode("INT: ${hero.intellect}") }
                                span(className = "hero-stat-pill text-green") { textNode("VAN: ${hero.vanguard}") }
                                span(className = "hero-stat-pill text-purple") { textNode("ARC: ${hero.archon}") }"""
content = content.replace(old_stats_pill, new_stats_pill)

# Small text representation
content = content.replace('textNode("⚔️ ${mc.strength} | 🏹 ${mc.agility} | 🔮 ${mc.wisdom}")', 'textNode("⚔️${mc.warlord} | 🧠${mc.intellect} | 🛡️${mc.vanguard} | 🔮${mc.archon}")')

with open("src/jsMain/kotlin/components/GameLobby.kt", "w") as f:
    f.write(content)

# 2. CharacterPanel.kt
with open("src/jsMain/kotlin/components/CharacterPanel.kt", "r") as f:
    content = f.read()

old_cp_stats = """                    div(className = "d-flex gap-1 text-sm mt-05 text-gray") {
                        span { textNode("STR: ${activeChar.strength}") }
                        span { textNode("AGI: ${activeChar.agility}") }
                        span { textNode("WIS: ${activeChar.wisdom}") }
                    }"""
new_cp_stats = """                    div(className = "d-flex gap-1 text-sm mt-05 text-gray flex-wrap") {
                        span { textNode("⚔️ WAR: ${activeChar.warlord}") }
                        span { textNode("🧠 INT: ${activeChar.intellect}") }
                        span { textNode("🛡️ VAN: ${activeChar.vanguard}") }
                        span { textNode("🔮 ARC: ${activeChar.archon}") }
                    }"""
content = content.replace(old_cp_stats, new_cp_stats)

old_scrolls = """                                        val (icon, label) = when (scroll.type) {
                                            ScrollType.STRENGTH -> "💪" to "Strength"
                                            ScrollType.AGILITY -> "🏃" to "Agility"
                                            ScrollType.WISDOM -> "🧠" to "Wisdom"
                                        }"""
new_scrolls = """                                        val (icon, label) = when (scroll.type) {
                                            ScrollType.WARLORD -> "⚔️" to "Warlord"
                                            ScrollType.INTELLECT -> "🧠" to "Intellect"
                                            ScrollType.VANGUARD -> "🛡️" to "Vanguard"
                                            ScrollType.ARCHON -> "🔮" to "Archon"
                                        }"""
content = content.replace(old_scrolls, new_scrolls)

with open("src/jsMain/kotlin/components/CharacterPanel.kt", "w") as f:
    f.write(content)

# 3. KingdomOverviewPanel.kt
with open("src/jsMain/kotlin/components/KingdomOverviewPanel.kt", "r") as f:
    content = f.read()

old_kop_stats = """                                div(className = "d-flex gap-1 text-xs text-dark-gray mt-02") {
                                    span { textNode("💪 STR: ${char.strength}") }
                                    span { textNode("🏃 AGI: ${char.agility}") }
                                    span { textNode("🧠 WIS: ${char.wisdom}") }
                                }"""
new_kop_stats = """                                div(className = "d-flex gap-1 text-xs text-dark-gray mt-02 flex-wrap") {
                                    span { textNode("⚔️ WAR: ${char.warlord}") }
                                    span { textNode("🧠 INT: ${char.intellect}") }
                                    span { textNode("🛡️ VAN: ${char.vanguard}") }
                                    span { textNode("🔮 ARC: ${char.archon}") }
                                }"""
content = content.replace(old_kop_stats, new_kop_stats)
with open("src/jsMain/kotlin/components/KingdomOverviewPanel.kt", "w") as f:
    f.write(content)


# 4. StrategicMap.kt
with open("src/jsMain/kotlin/components/StrategicMap.kt", "r") as f:
    content = f.read()

# Replace tooltip in StrategicMap
content = re.sub(r'\(STR:\$\{char\.strength\} AGI:\$\{char\.agility\} WIS:\$\{char\.wisdom\} \| Army:', r'(WAR:${char.warlord} INT:${char.intellect} VAN:${char.vanguard} ARC:${char.archon} | Army:', content)

# Replace battle logs stats in StrategicMap
old_battle_logs_a = """                                        span { textNode("${battleChar.strength}") }
                                        span { textNode("${battleChar.agility}") }
                                        span { textNode("${battleChar.wisdom}") }"""
new_battle_logs_a = """                                        span { textNode("${battleChar.warlord}") }
                                        span { textNode("${battleChar.intellect}") }
                                        span { textNode("${battleChar.vanguard}") }
                                        span { textNode("${battleChar.archon}") }"""
content = content.replace(old_battle_logs_a, new_battle_logs_a)

old_battle_logs_b = """                                        span { textNode("${enemyChar.strength}") }
                                        span { textNode("${enemyChar.agility}") }
                                        span { textNode("${enemyChar.wisdom}") }"""
new_battle_logs_b = """                                        span { textNode("${enemyChar.warlord}") }
                                        span { textNode("${enemyChar.intellect}") }
                                        span { textNode("${enemyChar.vanguard}") }
                                        span { textNode("${enemyChar.archon}") }"""
content = content.replace(old_battle_logs_b, new_battle_logs_b)

old_th_stats = """                                        th { textNode("STR") }
                                        th { textNode("AGI") }
                                        th { textNode("WIS") }"""
new_th_stats = """                                        th { textNode("WAR") }
                                        th { textNode("INT") }
                                        th { textNode("VAN") }
                                        th { textNode("ARC") }"""
content = content.replace(old_th_stats, new_th_stats)

with open("src/jsMain/kotlin/components/StrategicMap.kt", "w") as f:
    f.write(content)


print("Frontend UI updated")
