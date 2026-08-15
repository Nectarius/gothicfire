package models

import kotlin.random.Random
import kotlin.math.ln

/**
 * Applies diminishing returns to raw protection value.
 * Uses a logarithmic curve so the first ~10 points of protection give good value,
 * but stacking beyond that yields progressively less benefit.
 * The effective protection is capped at [maxEffective] (default 15).
 *
 * Examples (with default scaleFactor=8.0, maxEffective=15):
 *   protection=0  → 0.0
 *   protection=5  → ~5.3
 *   protection=10 → ~7.5
 *   protection=15 → ~9.1
 *   protection=20 → ~10.4
 *   protection=30 → ~12.2
 *   protection=50 → ~14.1
 */
fun effectiveProtection(rawProtection: Int, scaleFactor: Double = 8.0, maxEffective: Double = 25.0): Double {
    if (rawProtection <= 0) return 0.0
    // Below 20, protection is insignificant (e.g. max 1.9 score)
    if (rawProtection < 20) return rawProtection * 0.1
    // At 20+, use logarithmic scaling for significant impact
    val effective = ln(1.0 + rawProtection.toDouble() / scaleFactor) * scaleFactor
    return effective.coerceAtMost(maxEffective)
}

/**
 * Calculates the result of a fight between an attacker and a defender.
 * If a side has more than 10 times more soldiers than the other (and >0 soldiers), they defeat the enemy with 100% certainty.
 * Otherwise, Score = (Strength * 2) + Agility + (Wisdom * 0.5) + (Soldiers * 1.0) + [effectiveProtection if defender] + Random(1..20).
 * Protection uses diminishing returns: first points are valuable, but stacking gives less and less benefit (capped at 15).
 * Returns the winning Character. In case of a tie, the defender wins.
 */
data class FightOutcome(
    val winner: Character,
    val loser: Character,
    val winnerLosses: Int,
    val loserLosses: Int,
    val winnerRemainingSoldiers: Int,
    val loserRemainingSoldiers: Int,
    val isAttackerWinner: Boolean,
    val isOverwhelming: Boolean = false
)

/**
 * Resolves a fight between an attacker and a defender, calculating the winner,
 * loser, and soldier casualties based on battle intensity and scores.
 */
fun resolveFight(attacker: Character, defender: Character, locationProtection: Int = 0, attackerStrategy: BattleStrategy = BattleStrategy.NONE, attackerSiegeWeapons: Int = 0): FightOutcome {
    // 10x soldier overwhelming army rule
    if (attacker.soldiers > defender.soldiers * 10 && attacker.soldiers > 0) {
        val losses = kotlin.math.min(attacker.soldiers, (defender.soldiers * 0.05).toInt())
        val remaining = kotlin.math.max(0, attacker.soldiers - losses)
        val winnerChar = attacker.copy(soldiers = remaining)
        val loserChar = defender.copy(soldiers = 0, isDead = true, currentSector = null)
        return FightOutcome(
            winner = winnerChar,
            loser = loserChar,
            winnerLosses = losses,
            loserLosses = defender.soldiers,
            winnerRemainingSoldiers = remaining,
            loserRemainingSoldiers = 0,
            isAttackerWinner = true,
            isOverwhelming = true
        )
    }
    if (defender.soldiers > attacker.soldiers * 10 && defender.soldiers > 0) {
        val losses = kotlin.math.min(defender.soldiers, (attacker.soldiers * 0.05).toInt())
        val remaining = kotlin.math.max(0, defender.soldiers - losses)
        val winnerChar = defender.copy(soldiers = remaining)
        val loserChar = attacker.copy(soldiers = 0, isDead = true, currentSector = null)
        return FightOutcome(
            winner = winnerChar,
            loser = loserChar,
            winnerLosses = losses,
            loserLosses = attacker.soldiers,
            winnerRemainingSoldiers = remaining,
            loserRemainingSoldiers = 0,
            isAttackerWinner = false,
            isOverwhelming = true
        )
    }
    
    val rollA = Random.nextInt(1, 21)
    val rollD = Random.nextInt(1, 21)
    
    val stratBonus = if (canUseStrategy(attacker, attackerStrategy)) strategyBonus(attacker, attackerStrategy) else 0.0
    val siegeNegation = locationProtection >= 20 && attackerSiegeWeapons > 0
    val defProtection = if (siegeNegation) 0.0 else effectiveProtection(locationProtection)
    
    val attackerScore = (attacker.strength * 2) + attacker.agility + (attacker.wisdom * 0.5) + (attacker.soldiers * 1.0) + stratBonus + rollA
    val defenderScore = (defender.strength * 2) + defender.agility + (defender.wisdom * 0.5) + (defender.soldiers * 1.0) + defProtection + rollD
    
    val isAttackerWinner = attackerScore > defenderScore
    val (rawWinner, rawLoser) = if (isAttackerWinner) (attacker to defender) else (defender to attacker)
    
    val scoreDiff = kotlin.math.abs(attackerScore - defenderScore)
    
    // Battle intensity based on how close the combat scores were
    val closeness = (1.0 - (scoreDiff / 35.0)).coerceIn(0.10, 0.95)
    
    // Enemy army presence factor
    val enemyArmyFactor = if (rawLoser.soldiers > 0) {
        (rawLoser.soldiers.toDouble() / (rawWinner.soldiers + 10).toDouble()).coerceIn(0.15, 1.0)
    } else {
        0.10
    }
    
    // Winner casualties: 5% in decisive fights up to ~45% in brutal, closely contested clashes
    val winnerLossRate = (0.05 + 0.40 * closeness) * (0.35 + 0.65 * enemyArmyFactor)
    val winnerLosses = if (rawWinner.soldiers > 0) {
        val minLoss = if (rawLoser.soldiers > 0 && closeness > 0.4) 1 else 0
        kotlin.math.round(rawWinner.soldiers * winnerLossRate).toInt().coerceIn(minLoss, rawWinner.soldiers)
    } else {
        0
    }
    
    val winnerRemaining = kotlin.math.max(0, rawWinner.soldiers - winnerLosses)
    val loserLosses = rawLoser.soldiers
    
    val winnerChar = rawWinner.copy(soldiers = winnerRemaining)
    val loserChar = rawLoser.copy(soldiers = 0, isDead = true, currentSector = null)
    
    return FightOutcome(
        winner = winnerChar,
        loser = loserChar,
        winnerLosses = winnerLosses,
        loserLosses = loserLosses,
        winnerRemainingSoldiers = winnerRemaining,
        loserRemainingSoldiers = 0,
        isAttackerWinner = isAttackerWinner,
        isOverwhelming = false
    )
}

/**
 * Calculates the winning character of a fight for convenience.
 */
fun calculateFightResult(attacker: Character, defender: Character, locationProtection: Int = 0, attackerStrategy: BattleStrategy = BattleStrategy.NONE, attackerSiegeWeapons: Int = 0): Character {
    return resolveFight(attacker, defender, locationProtection, attackerStrategy, attackerSiegeWeapons).winner
}

/**
 * Calculates the exact probability (0% to 100%) of the attacker winning the battle.
 */
fun estimateWinChance(attacker: Character, defender: Character, locationProtection: Int = 0, attackerStrategy: BattleStrategy = BattleStrategy.NONE, attackerSiegeWeapons: Int = 0): Int {
    if (attacker.soldiers > defender.soldiers * 10 && attacker.soldiers > 0) {
        return 100
    }
    if (defender.soldiers > attacker.soldiers * 10 && defender.soldiers > 0) {
        return 0
    }
    
    val stratBonus = if (canUseStrategy(attacker, attackerStrategy)) strategyBonus(attacker, attackerStrategy) else 0.0
    val siegeNegation = locationProtection >= 20 && attackerSiegeWeapons > 0
    val defProtection = if (siegeNegation) 0.0 else effectiveProtection(locationProtection)
    
    val attackerBase = (attacker.strength * 2) + attacker.agility + (attacker.wisdom * 0.5) + (attacker.soldiers * 1.0) + stratBonus
    val defenderBase = (defender.strength * 2) + defender.agility + (defender.wisdom * 0.5) + (defender.soldiers * 1.0) + defProtection
    
    var wins = 0
    for (a in 1..20) {
        for (d in 1..20) {
            if (attackerBase + a > defenderBase + d) {
                wins++
            }
        }
    }
    return kotlin.math.round((wins.toDouble() / 400.0) * 100.0).toInt().coerceIn(0, 100)
}

