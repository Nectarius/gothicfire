package models

import kotlin.random.Random

/**
 * Calculates the result of a fight between an attacker and a defender.
 * Score = (Strength * 2) + Agility + (Wisdom * 0.5) + Random(1..20).
 * Returns the winning Character. In case of a tie, the defender wins.
 */
fun calculateFightResult(attacker: Character, defender: Character, locationProtection: Int = 0): Character {
    val attackerScore = (attacker.strength * 2) + attacker.agility + (attacker.wisdom * 0.5) + Random.nextInt(1, 21)
    val defenderScore = (defender.strength * 2) + defender.agility + (defender.wisdom * 0.5) + locationProtection + Random.nextInt(1, 21)
    
    return if (attackerScore > defenderScore) {
        attacker
    } else {
        defender
    }
}
