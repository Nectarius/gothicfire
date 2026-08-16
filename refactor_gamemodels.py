import re

with open("src/commonMain/kotlin/models/GameModels.kt", "r") as f:
    content = f.read()

# Replace fields in Character
old_char = """    val strength: Int,
    val agility: Int,
    val wisdom: Int,"""
new_char = """    val warlord: Int,
    val intellect: Int,
    val vanguard: Int,
    val archon: Int,"""
content = content.replace(old_char, new_char)

# Update strategies
old_strategies = """fun canUseStrategy(character: Character, strategy: BattleStrategy): Boolean = when (strategy) {
    BattleStrategy.NONE -> true
    BattleStrategy.ARCANE_PHALANX -> character.army.total() > 5
    BattleStrategy.HAMMER_AND_SPELL -> character.agility >= 6 && character.army.total() > 3
    BattleStrategy.SPELL_INFUSED_VOLLEY -> character.wisdom >= 6 && character.army.total() > 5
}

/**
 * Returns the combat score bonus for the chosen strategy.
 * The bonus scales slightly with the relevant stat so investing in stats still matters.
 *
 * ARCANE_PHALANX:       +3 base + (strength * 0.3)  — rewards tanky frontline builds
 * HAMMER_AND_SPELL:     +3 base + (agility * 0.3)   — rewards mobile flanking builds
 * SPELL_INFUSED_VOLLEY: +3 base + (wisdom * 0.3)    — rewards magical ranged builds
 */
fun strategyBonus(character: Character, strategy: BattleStrategy): Double = when (strategy) {
    BattleStrategy.NONE -> 0.0
    BattleStrategy.ARCANE_PHALANX -> 3.0 + (character.strength * 0.3)
    BattleStrategy.HAMMER_AND_SPELL -> 3.0 + (character.agility * 0.3)
    BattleStrategy.SPELL_INFUSED_VOLLEY -> 3.0 + (character.wisdom * 0.3)
}"""

new_strategies = """fun canUseStrategy(character: Character, strategy: BattleStrategy): Boolean = when (strategy) {
    BattleStrategy.NONE -> true
    BattleStrategy.ARCANE_PHALANX -> character.archon >= 6 && character.army.total() > 5
    BattleStrategy.HAMMER_AND_SPELL -> character.warlord >= 6 && character.army.total() > 3
    BattleStrategy.SPELL_INFUSED_VOLLEY -> character.vanguard >= 6 && character.army.total() > 5
}

/**
 * Returns the combat score bonus for the chosen strategy.
 */
fun strategyBonus(character: Character, strategy: BattleStrategy): Double = when (strategy) {
    BattleStrategy.NONE -> 0.0
    BattleStrategy.ARCANE_PHALANX -> 3.0 + (character.archon * 0.3)
    BattleStrategy.HAMMER_AND_SPELL -> 3.0 + (character.warlord * 0.3)
    BattleStrategy.SPELL_INFUSED_VOLLEY -> 3.0 + (character.vanguard * 0.3)
}"""
content = content.replace(old_strategies, new_strategies)

with open("src/commonMain/kotlin/models/GameModels.kt", "w") as f:
    f.write(content)

print("GameModels updated")
