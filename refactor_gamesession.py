import re

with open("src/jvmMain/kotlin/game/GameSession.kt", "r") as f:
    content = f.read()

# selectCharacters
old_newChars = """            val newChars = chosenTemplates.map { template ->
                Character(
                    id = UUID.randomUUID().toString(),
                    playerId = playerId,
                    name = template.name,
                    strength = template.strength,
                    agility = template.agility,
                    wisdom = template.wisdom
                )
            }"""

new_newChars = """            val newChars = chosenTemplates.map { template ->
                Character(
                    id = UUID.randomUUID().toString(),
                    playerId = playerId,
                    name = template.name,
                    warlord = template.warlord,
                    intellect = template.intellect,
                    vanguard = template.vanguard,
                    archon = template.archon
                )
            }"""
content = content.replace(old_newChars, new_newChars)


# createCharacter method
old_cc_sig = "suspend fun createCharacter(playerId: String, name: String, strength: Int, agility: Int, wisdom: Int) {"
new_cc_sig = "suspend fun createCharacter(playerId: String, name: String, warlord: Int, intellect: Int, vanguard: Int, archon: Int) {"
content = content.replace(old_cc_sig, new_cc_sig)

old_cc_inst = """            val char = Character(
                id = UUID.randomUUID().toString(),
                playerId = playerId,
                name = name,
                strength = strength,
                agility = agility,
                wisdom = wisdom
            )"""
new_cc_inst = """            val char = Character(
                id = UUID.randomUUID().toString(),
                playerId = playerId,
                name = name,
                warlord = warlord,
                intellect = intellect,
                vanguard = vanguard,
                archon = archon
            )"""
content = content.replace(old_cc_inst, new_cc_inst)


# upgradeTerritory
old_upgrade = "val boostAmount = 1 + (char.wisdom / 2)"
new_upgrade = "val boostAmount = char.intellect.coerceIn(2, 7)"
content = content.replace(old_upgrade, new_upgrade)


# useScroll
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

print("GameSession.kt updated")
