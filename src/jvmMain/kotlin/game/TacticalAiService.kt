package game

import models.*
import kotlin.math.abs
import kotlin.math.max

sealed class TacticalAiAction {
    data class MoveAndAttack(val unitId: String, val moveX: Int, val moveY: Int, val targetUnitId: String, val score: Int) : TacticalAiAction()
    data class AttackOnly(val unitId: String, val targetUnitId: String, val score: Int) : TacticalAiAction()
    data class MoveOnly(val unitId: String, val moveX: Int, val moveY: Int, val score: Int) : TacticalAiAction()
    data class Pass(val unitId: String) : TacticalAiAction()
}

object TacticalAiService {

    /**
     * Evaluates all legal moves and attacks for an AI unit and returns the highest scoring action.
     */
    fun evaluateBestAction(unit: TacticalUnit, state: TacticalBattleState): TacticalAiAction {
        if (!unit.isAlive) return TacticalAiAction.Pass(unit.id)

        val enemies = state.units.filter { it.isAlive && it.ownerPlayerId != unit.ownerPlayerId }
        if (enemies.isEmpty()) return TacticalAiAction.Pass(unit.id)

        val candidates = mutableListOf<TacticalAiAction>()

        // 1. Direct attack from current position (if hasn't attacked)
        if (!unit.hasAttackedThisTurn) {
            for (enemy in enemies) {
                if (TacticalRules.canAttackTarget(unit, enemy, state)) {
                    val score = scoreAttack(unit, enemy, state)
                    candidates.add(TacticalAiAction.AttackOnly(unit.id, enemy.id, score))
                }
            }
        }

        // 2. Move -> (Optionally Attack)
        val validMoves = TacticalRules.findValidMoves(unit, state)
        for ((mx, my) in validMoves) {
            val movedUnit = unit.copy(x = mx, y = my, movesRemaining = 0)
            val tempState = state.copy(
                units = state.units.map { if (it.id == unit.id) movedUnit else it }
            )

            var bestAttackForMove: TacticalAiAction.MoveAndAttack? = null
            var bestAttackScore = -1

            if (!unit.hasAttackedThisTurn) {
                for (enemy in enemies) {
                    if (TacticalRules.canAttackTarget(movedUnit, enemy, tempState)) {
                        val attackScore = scoreAttack(movedUnit, enemy, tempState)
                        if (attackScore > bestAttackScore) {
                            bestAttackScore = attackScore
                            bestAttackForMove = TacticalAiAction.MoveAndAttack(unit.id, mx, my, enemy.id, attackScore + 10)
                        }
                    }
                }
            }

            if (bestAttackForMove != null) {
                candidates.add(bestAttackForMove)
            } else {
                // Positional move toward closest enemy (or behind cover for ranged)
                val posScore = scorePosition(movedUnit, enemies, state)
                candidates.add(TacticalAiAction.MoveOnly(unit.id, mx, my, posScore))
            }
        }

        return candidates.maxByOrNull {
            when (it) {
                is TacticalAiAction.MoveAndAttack -> it.score
                is TacticalAiAction.AttackOnly -> it.score
                is TacticalAiAction.MoveOnly -> it.score
                is TacticalAiAction.Pass -> 0
            }
        } ?: TacticalAiAction.Pass(unit.id)
    }

    /**
     * Scores an attack from 1 to 100 based on damage, hero priority, low-HP priority.
     */
    private fun scoreAttack(attacker: TacticalUnit, target: TacticalUnit, state: TacticalBattleState): Int {
        val expectedDmg = TacticalRules.calculateDamage(attacker, target, state, rngVariance = 0)
        var score = (expectedDmg * 5).coerceIn(10, 50)

        // Prioritize enemy Hero when vulnerable or wounded
        if (target.unitType.isHero) {
            val hasLivingTroops = state.units.any { it.isAlive && it.ownerPlayerId == target.ownerPlayerId && !it.unitType.isHero }
            if (!hasLivingTroops || target.currentHp <= 30) {
                score += 25
            } else {
                score += 10
            }
        }

        // Prioritize killing low-HP units
        if (expectedDmg >= target.currentHp) {
            score += 25
        } else {
            val hpRatio = target.currentHp.toDouble() / target.maxHp.toDouble()
            score += ((1.0 - hpRatio) * 15).toInt()
        }

        // Synergy bonus
        if (state.attackerStrategy == BattleStrategy.HAMMER_AND_SPELL && state.mageAttackedTargetIds.contains(target.id)) {
            score += 10
        }

        return score.coerceIn(1, 100)
    }

    /**
     * Scores a movement destination based on proximity to enemies and obstacle cover.
     */
    private fun scorePosition(unit: TacticalUnit, enemies: List<TacticalUnit>, state: TacticalBattleState): Int {
        val closestDist = enemies.minOf { max(abs(it.x - unit.x), abs(it.y - unit.y)) }
        var score = (20 - closestDist * 2).coerceIn(1, 30)

        // Ranged units prefer distance 2 or 3 and cover
        val isRanged = unit.unitType == TacticalUnitType.ARCHER ||
                unit.unitType == TacticalUnitType.ARCHER_HERO ||
                unit.unitType == TacticalUnitType.MAGE ||
                unit.unitType == TacticalUnitType.MAGE_HERO

        if (isRanged) {
            if (closestDist in 2..3) score += 20
            // Check adjacent obstacles for cover
            val adjacentHasCover = listOf(0 to 1, 0 to -1, 1 to 0, -1 to 0).any { (dx, dy) ->
                val cx = unit.x + dx
                val cy = unit.y + dy
                cx in 0 until state.gridWidth && cy in 0 until state.gridHeight &&
                        (state.tiles[cy][cx] == TacticalTileType.RIVER || state.tiles[cy][cx] == TacticalTileType.FORTRESS_WALL)
            }
            if (adjacentHasCover) score += 15
        } else {
            // Melee prefers closing in
            if (closestDist == 1) score += 25
        }

        return score.coerceIn(1, 50)
    }

    /**
     * Fast-forwards tactical rounds until a Hero is defeated or one side is wiped out.
     */
    fun autoResolve(initialState: TacticalBattleState): Pair<TacticalBattleState, String> {
        var state = initialState
        var maxRounds = 40

        while (!state.isFinished && maxRounds-- > 0) {
            val currentOwner = state.activeUnitOwnerId
            val myUnits = state.units.filter { it.isAlive && it.ownerPlayerId == currentOwner }

            for (unit in myUnits) {
                if (state.isFinished) break
                val currentUnit = state.units.find { it.id == unit.id } ?: continue
                if (!currentUnit.isAlive) continue

                val action = evaluateBestAction(currentUnit, state)
                when (action) {
                    is TacticalAiAction.MoveAndAttack -> {
                        // Move
                        state = state.copy(
                            units = state.units.map {
                                if (it.id == unit.id) it.copy(x = action.moveX, y = action.moveY, movesRemaining = 0) else it
                            }
                        )
                        // Attack
                        state = executeAttack(state, unit.id, action.targetUnitId)
                    }
                    is TacticalAiAction.AttackOnly -> {
                        state = executeAttack(state, unit.id, action.targetUnitId)
                    }
                    is TacticalAiAction.MoveOnly -> {
                        state = state.copy(
                            units = state.units.map {
                                if (it.id == unit.id) it.copy(x = action.moveX, y = action.moveY, movesRemaining = 0) else it
                            }
                        )
                    }
                    is TacticalAiAction.Pass -> {}
                }
            }

            if (state.isFinished) break

            // End turn
            val nextOwner = if (currentOwner == state.attackerPlayerId) state.defenderPlayerId else state.attackerPlayerId
            val nextRound = if (nextOwner == state.attackerPlayerId) state.roundNumber + 1 else state.roundNumber
            state = state.copy(
                activeUnitOwnerId = nextOwner,
                roundNumber = nextRound,
                units = state.units.map {
                    if (it.ownerPlayerId == nextOwner) it.copy(movesRemaining = it.maxMoves, hasAttackedThisTurn = false) else it
                }
            )
        }

        val winner = state.winnerPlayerId ?: state.attackerPlayerId
        return state to winner
    }

    private fun executeAttack(state: TacticalBattleState, attackerId: String, targetId: String): TacticalBattleState {
        val attacker = state.units.find { it.id == attackerId } ?: return state
        val target = state.units.find { it.id == targetId } ?: return state

        val dmg = TacticalRules.calculateDamage(attacker, target, state, 0)
        val newHp = (target.currentHp - dmg).coerceAtLeast(0)
        val isTargetDead = newHp <= 0

        val updatedUnits = state.units.map {
            when (it.id) {
                attacker.id -> it.copy(hasAttackedThisTurn = true)
                target.id -> it.copy(currentHp = newHp)
                else -> it
            }
        }

        val isHeroKilled = target.unitType.isHero && isTargetDead
        val allTargetOwnerUnitsDead = updatedUnits.none { it.ownerPlayerId == target.ownerPlayerId && it.isAlive }

        val isFinished = isHeroKilled || allTargetOwnerUnitsDead
        val winnerId = if (isFinished) attacker.ownerPlayerId else null

        val mageTargets = if (attacker.unitType == TacticalUnitType.MAGE || attacker.unitType == TacticalUnitType.MAGE_HERO) {
            state.mageAttackedTargetIds + target.id
        } else state.mageAttackedTargetIds

        val targetsHit = state.targetsHitThisRound + target.id

        return state.copy(
            units = updatedUnits,
            isFinished = isFinished,
            winnerPlayerId = winnerId,
            mageAttackedTargetIds = mageTargets,
            targetsHitThisRound = targetsHit
        )
    }
}
