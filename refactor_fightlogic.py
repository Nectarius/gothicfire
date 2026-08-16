import re

content = """package models

import kotlin.random.Random
import kotlin.math.ln

/**
 * Applies diminishing returns to raw protection value.
 */
fun effectiveProtection(rawProtection: Int, scaleFactor: Double = 8.0, maxEffective: Double = 25.0): Double {
    if (rawProtection <= 0) return 0.0
    if (rawProtection < 20) return rawProtection * 0.1
    val effective = ln(1.0 + rawProtection.toDouble() / scaleFactor) * scaleFactor
    return effective.coerceAtMost(maxEffective)
}

data class FightOutcome(
    val winner: Character,
    val loser: Character,
    val winnerLosses: Int,
    val loserLosses: Int,
    val winnerRemainingArmy: Army,
    val loserRemainingArmy: Army,
    val isAttackerWinner: Boolean,
    val isOverwhelming: Boolean = false
)

fun calculateArmyCombatScore(army: Army): Double {
    return (army.lightInfantry * 1.0) + (army.archers * 1.5) + (army.heavyInfantry * 2.0) + (army.mages * 3.0)
}

fun calculateStatBonus(character: Character): Double {
    var bonus = 0.0
    
    // Warlord: Command heavy/light infantry
    val infantry = character.army.lightInfantry + character.army.heavyInfantry
    bonus += infantry * character.warlord * 0.1
    
    // Archon: Command mages
    bonus += character.army.mages * character.archon * 0.5
    
    // Vanguard: Combat ability
    var vanguardBase = character.vanguard * 2.0
    if (character.army.total() < 10) {
        vanguardBase *= 2.0
    }
    bonus += vanguardBase
    
    if (character.army.archers > 0) {
        bonus += character.vanguard * 1.5
    }
    
    // Intellect: Bonus if having mages
    if (character.army.mages > 0) {
        bonus += character.intellect * 1.0
    }
    
    return bonus
}


fun applyCasualties(army: Army, losses: Int): Army {
    if (losses >= army.total()) return Army()
    if (losses <= 0) return army
    
    val lossRate = losses.toDouble() / army.total()
    val m = kotlin.math.round(army.mages * lossRate).toInt()
    val h = kotlin.math.round(army.heavyInfantry * lossRate).toInt()
    val l = kotlin.math.round(army.lightInfantry * lossRate).toInt()
    val a = kotlin.math.round(army.archers * lossRate).toInt()
    
    return Army(
        mages = kotlin.math.max(0, army.mages - m),
        heavyInfantry = kotlin.math.max(0, army.heavyInfantry - h),
        lightInfantry = kotlin.math.max(0, army.lightInfantry - l),
        archers = kotlin.math.max(0, army.archers - a)
    )
}

fun resolveFight(attacker: Character, defender: Character, locationProtection: Int = 0, attackerStrategy: BattleStrategy = BattleStrategy.NONE, attackerSiegeWeapons: Int = 0): FightOutcome {
    val attackerTotal = attacker.army.total()
    val defenderTotal = defender.army.total()
    
    if (attackerTotal > defenderTotal * 10 && attackerTotal > 0) {
        val losses = kotlin.math.min(attackerTotal, (defenderTotal * 0.05).toInt())
        val remainingArmy = applyCasualties(attacker.army, losses)
        val winnerChar = attacker.copy(army = remainingArmy)
        val loserChar = defender.copy(army = Army(), isDead = true, currentSector = null)
        return FightOutcome(
            winner = winnerChar,
            loser = loserChar,
            winnerLosses = losses,
            loserLosses = defenderTotal,
            winnerRemainingArmy = remainingArmy,
            loserRemainingArmy = Army(),
            isAttackerWinner = true,
            isOverwhelming = true
        )
    }
    if (defenderTotal > attackerTotal * 10 && defenderTotal > 0) {
        val losses = kotlin.math.min(defenderTotal, (attackerTotal * 0.05).toInt())
        val remainingArmy = applyCasualties(defender.army, losses)
        val winnerChar = defender.copy(army = remainingArmy)
        val loserChar = attacker.copy(army = Army(), isDead = true, currentSector = null)
        return FightOutcome(
            winner = winnerChar,
            loser = loserChar,
            winnerLosses = losses,
            loserLosses = attackerTotal,
            winnerRemainingArmy = remainingArmy,
            loserRemainingArmy = Army(),
            isAttackerWinner = false,
            isOverwhelming = true
        )
    }
    
    val rollA = Random.nextInt(1, 21)
    val rollD = Random.nextInt(1, 21)
    
    val stratBonus = if (canUseStrategy(attacker, attackerStrategy)) strategyBonus(attacker, attackerStrategy) else 0.0
    val siegeNegation = locationProtection >= 20 && attackerSiegeWeapons > 0
    val defProtection = if (siegeNegation) 0.0 else effectiveProtection(locationProtection)
    
    val attackerScore = calculateArmyCombatScore(attacker.army) + calculateStatBonus(attacker) + stratBonus + rollA
    val defenderScore = calculateArmyCombatScore(defender.army) + calculateStatBonus(defender) + defProtection + rollD
    
    val isAttackerWinner = attackerScore > defenderScore
    val (rawWinner, rawLoser) = if (isAttackerWinner) (attacker to defender) else (defender to attacker)
    
    val scoreDiff = kotlin.math.abs(attackerScore - defenderScore)
    val closeness = (1.0 - (scoreDiff / 35.0)).coerceIn(0.10, 0.95)
    
    val enemyArmyFactor = if (rawLoser.army.total() > 0) {
        (rawLoser.army.total().toDouble() / (rawWinner.army.total() + 10).toDouble()).coerceIn(0.15, 1.0)
    } else {
        0.10
    }
    
    val winnerLossRate = (0.05 + 0.40 * closeness) * (0.35 + 0.65 * enemyArmyFactor)
    val winnerLosses = if (rawWinner.army.total() > 0) {
        val minLoss = if (rawLoser.army.total() > 0 && closeness > 0.4) 1 else 0
        kotlin.math.round(rawWinner.army.total() * winnerLossRate).toInt().coerceIn(minLoss, rawWinner.army.total())
    } else {
        0
    }
    
    val winnerRemainingArmy = applyCasualties(rawWinner.army, winnerLosses)
    val loserLosses = rawLoser.army.total()
    
    val winnerChar = rawWinner.copy(army = winnerRemainingArmy)
    val loserChar = rawLoser.copy(army = Army(), isDead = true, currentSector = null)
    
    return FightOutcome(
        winner = winnerChar,
        loser = loserChar,
        winnerLosses = winnerLosses,
        loserLosses = loserLosses,
        winnerRemainingArmy = winnerRemainingArmy,
        loserRemainingArmy = Army(),
        isAttackerWinner = isAttackerWinner,
        isOverwhelming = false
    )
}

fun calculateFightResult(attacker: Character, defender: Character, locationProtection: Int = 0, attackerStrategy: BattleStrategy = BattleStrategy.NONE, attackerSiegeWeapons: Int = 0): Character {
    return resolveFight(attacker, defender, locationProtection, attackerStrategy, attackerSiegeWeapons).winner
}

fun estimateWinChance(attacker: Character, defender: Character, locationProtection: Int = 0, attackerStrategy: BattleStrategy = BattleStrategy.NONE, attackerSiegeWeapons: Int = 0): Int {
    val attackerTotal = attacker.army.total()
    val defenderTotal = defender.army.total()
    
    if (attackerTotal > defenderTotal * 10 && attackerTotal > 0) {
        return 100
    }
    if (defenderTotal > attackerTotal * 10 && defenderTotal > 0) {
        return 0
    }
    
    val stratBonus = if (canUseStrategy(attacker, attackerStrategy)) strategyBonus(attacker, attackerStrategy) else 0.0
    val siegeNegation = locationProtection >= 20 && attackerSiegeWeapons > 0
    val defProtection = if (siegeNegation) 0.0 else effectiveProtection(locationProtection)
    
    val attackerBase = calculateArmyCombatScore(attacker.army) + calculateStatBonus(attacker) + stratBonus
    val defenderBase = calculateArmyCombatScore(defender.army) + calculateStatBonus(defender) + defProtection
    
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
"""

with open("src/commonMain/kotlin/models/FightLogic.kt", "w") as f:
    f.write(content)

print("FightLogic.kt updated")
