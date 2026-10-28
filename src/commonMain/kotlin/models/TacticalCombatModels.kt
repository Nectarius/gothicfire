package models

import kotlinx.serialization.Serializable
import kotlin.math.ceil
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt

@Serializable
enum class TacticalTileType {
    PLAIN,          // Traversable (1 move cost)
    FOREST,         // Impassable obstacle (blocks movement & non-mage line of sight)
    RIVER,          // Impassable water obstacle (traversable only via BRIDGE tiles)
    BRIDGE,         // Traversable choke point over RIVER tiles
    CLIFF_ROCK,     // Impassable mountain/boulder obstacle
    FORTRESS_WALL,  // Impassable structure (unless destroyed by Siege Weapons)
    FORTRESS_GATE   // Traversable or destructible choke point for defenders
}

val TacticalTileType.isTraversable: Boolean
    get() = this == TacticalTileType.PLAIN || this == TacticalTileType.BRIDGE || this == TacticalTileType.FORTRESS_GATE

val TacticalTileType.blocksLineOfSight: Boolean
    get() = this == TacticalTileType.FOREST || this == TacticalTileType.CLIFF_ROCK || this == TacticalTileType.FORTRESS_WALL

@Serializable
enum class TacticalUnitType {
    WARRIOR_HERO,
    ARCHER_HERO,
    MAGE_HERO,
    ARCHER,
    HEAVY_INFANTRY,
    LIGHT_INFANTRY,
    MAGE
}

val TacticalUnitType.isHero: Boolean
    get() = this == TacticalUnitType.WARRIOR_HERO || this == TacticalUnitType.ARCHER_HERO || this == TacticalUnitType.MAGE_HERO

val TacticalUnitType.defaultMoves: Int
    get() = when (this) {
        TacticalUnitType.WARRIOR_HERO -> 2
        TacticalUnitType.ARCHER_HERO -> 3
        TacticalUnitType.MAGE_HERO -> 2
        TacticalUnitType.ARCHER -> 2
        TacticalUnitType.HEAVY_INFANTRY -> 2
        TacticalUnitType.LIGHT_INFANTRY -> 3
        TacticalUnitType.MAGE -> 2
    }

val TacticalUnitType.baseHp: Int
    get() = when (this) {
        TacticalUnitType.WARRIOR_HERO -> 36
        TacticalUnitType.ARCHER_HERO -> 30
        TacticalUnitType.MAGE_HERO -> 28
        TacticalUnitType.ARCHER -> 6
        TacticalUnitType.HEAVY_INFANTRY -> 9
        TacticalUnitType.LIGHT_INFANTRY -> 7
        TacticalUnitType.MAGE -> 5
    }

val TacticalUnitType.baseAttack: Int
    get() = when (this) {
        TacticalUnitType.WARRIOR_HERO -> 8
        TacticalUnitType.ARCHER_HERO -> 7
        TacticalUnitType.MAGE_HERO -> 8
        TacticalUnitType.ARCHER -> 5
        TacticalUnitType.HEAVY_INFANTRY -> 6
        TacticalUnitType.LIGHT_INFANTRY -> 5
        TacticalUnitType.MAGE -> 7
    }

val TacticalUnitType.baseDefense: Int
    get() = when (this) {
        TacticalUnitType.WARRIOR_HERO -> 4
        TacticalUnitType.ARCHER_HERO -> 3
        TacticalUnitType.MAGE_HERO -> 2
        TacticalUnitType.ARCHER -> 2
        TacticalUnitType.HEAVY_INFANTRY -> 6
        TacticalUnitType.LIGHT_INFANTRY -> 3
        TacticalUnitType.MAGE -> 2
    }

val TacticalUnitType.defaultIcon: String
    get() = when (this) {
        TacticalUnitType.WARRIOR_HERO -> "/tactical/hero_warrior.jpg"
        TacticalUnitType.ARCHER_HERO -> "/tactical/hero_archer.jpg"
        TacticalUnitType.MAGE_HERO -> "/tactical/hero_mage.jpg"
        TacticalUnitType.ARCHER -> "/tactical/unit_archer.jpg"
        TacticalUnitType.HEAVY_INFANTRY -> "/tactical/unit_heavy_infantry.jpg"
        TacticalUnitType.LIGHT_INFANTRY -> "/tactical/unit_light_infantry.jpg"
        TacticalUnitType.MAGE -> "/tactical/unit_mage.jpg"
    }

@Serializable
data class TacticalUnit(
    val id: String,
    val ownerPlayerId: String,
    val ownerTeam: Team = Team.RED,
    val unitType: TacticalUnitType,
    val x: Int,
    val y: Int,
    val currentHp: Int,
    val maxHp: Int,
    val attack: Int,
    val defense: Int,
    val maxMoves: Int,
    val movesRemaining: Int,
    val hasAttackedThisTurn: Boolean = false,
    val initialSquadCount: Int = 1,
    val isPrevalentUnit: Boolean = false,
    val name: String = "",
    val iconUrl: String = "",
    val characterId: String? = null
) {
    val isAlive: Boolean
        get() = currentHp > 0
}

@Serializable
data class TacticalBattleState(
    val battleId: String,
    val sectorId: String,
    val gridWidth: Int = 10,
    val gridHeight: Int = 8,
    val tiles: List<List<TacticalTileType>>,
    val attackerPlayerId: String,
    val defenderPlayerId: String,
    val attackerCharId: String,
    val defenderCharId: String,
    val attackerStrategy: BattleStrategy = BattleStrategy.NONE,
    val activeUnitOwnerId: String, // Alternating team phase (attackerPlayerId or defenderPlayerId)
    val roundNumber: Int = 1,
    val units: List<TacticalUnit>,
    val battleLog: List<String> = emptyList(),
    val isFinished: Boolean = false,
    val winnerPlayerId: String? = null,
    val mageAttackedTargetIds: Set<String> = emptySet(),
    val targetsHitThisRound: Set<String> = emptySet()
)

object TacticalRules {

    fun deriveHeroArchetype(char: Character): TacticalUnitType {
        val w = char.warlord
        val v = char.vanguard
        val m = char.archon + (char.intellect / 2)
        return when {
            w >= v && w >= m -> TacticalUnitType.WARRIOR_HERO
            v >= w && v >= m -> TacticalUnitType.ARCHER_HERO
            else -> TacticalUnitType.MAGE_HERO
        }
    }

    /**
     * Computes the Prevalence Bonus:
     * - +25% to ATK and DEF for the single highest troop type count
     * - +15% to ATK and DEF if tied for most prevalent
     * - 1.0 (no bonus) otherwise
     */
    fun calculatePrevalenceMultiplier(type: TacticalUnitType, army: Army): Pair<Double, Boolean> {
        val counts = listOf(
            TacticalUnitType.ARCHER to army.archers,
            TacticalUnitType.HEAVY_INFANTRY to army.heavyInfantry,
            TacticalUnitType.LIGHT_INFANTRY to army.lightInfantry,
            TacticalUnitType.MAGE to army.mages
        )
        val maxCount = counts.maxOf { it.second }
        if (maxCount <= 0) return 1.0 to false

        val thisCount = counts.find { it.first == type }?.second ?: 0
        if (thisCount < maxCount) return 1.0 to false

        val tiedCount = counts.count { it.second == maxCount }
        return if (tiedCount == 1) {
            1.25 to true
        } else {
            1.15 to true
        }
    }

    /**
     * Builds hero unit for tactical combat based on character attributes.
     */
    fun createHeroUnit(
        battleId: String,
        char: Character,
        playerId: String,
        team: Team,
        spawnX: Int,
        spawnY: Int
    ): TacticalUnit {
        val archetype = deriveHeroArchetype(char)
        val maxHp = when (archetype) {
            TacticalUnitType.WARRIOR_HERO -> 56 + char.warlord * 4
            TacticalUnitType.ARCHER_HERO -> 50 + char.vanguard * 4
            TacticalUnitType.MAGE_HERO -> 46 + (char.archon + char.intellect) * 3
            else -> 50
        }
        val atk = when (archetype) {
            TacticalUnitType.WARRIOR_HERO -> 8 + char.warlord
            TacticalUnitType.ARCHER_HERO -> 7 + char.vanguard
            TacticalUnitType.MAGE_HERO -> 8 + char.archon
            else -> 8
        }
        val def = when (archetype) {
            TacticalUnitType.WARRIOR_HERO -> 6 + (char.warlord / 2)
            TacticalUnitType.ARCHER_HERO -> 5 + (char.vanguard / 3)
            TacticalUnitType.MAGE_HERO -> 4 + (char.archon / 3)
            else -> 4
        }
        val moves = archetype.defaultMoves

        return TacticalUnit(
            id = "${battleId}_hero_${char.id}",
            ownerPlayerId = playerId,
            ownerTeam = team,
            unitType = archetype,
            x = spawnX,
            y = spawnY,
            currentHp = maxHp,
            maxHp = maxHp,
            attack = atk,
            defense = def,
            maxMoves = moves,
            movesRemaining = moves,
            initialSquadCount = 1,
            isPrevalentUnit = false,
            name = char.name,
            iconUrl = archetype.defaultIcon,
            characterId = char.id
        )
    }

    /**
     * Builds troop figurine unit scaled with headcount and prevalence bonus.
     */
    fun createTroopUnit(
        battleId: String,
        type: TacticalUnitType,
        count: Int,
        army: Army,
        playerId: String,
        team: Team,
        spawnX: Int,
        spawnY: Int
    ): TacticalUnit {
        val (prevalenceMult, isPrevalent) = calculatePrevalenceMultiplier(type, army)
        val maxHp = type.baseHp * count
        val rawAtk = type.baseAttack + (count * 0.5).toInt()
        val rawDef = type.baseDefense + (count * 0.3).toInt()

        val atk = (rawAtk * prevalenceMult).roundToInt()
        val def = (rawDef * prevalenceMult).roundToInt()
        val moves = type.defaultMoves

        val name = when (type) {
            TacticalUnitType.ARCHER -> "Archers ($count)"
            TacticalUnitType.HEAVY_INFANTRY -> "Heavy Infantry ($count)"
            TacticalUnitType.LIGHT_INFANTRY -> "Light Infantry ($count)"
            TacticalUnitType.MAGE -> "Battle Mages ($count)"
            else -> type.name
        }

        return TacticalUnit(
            id = "${battleId}_troop_${type.name}_${playerId}",
            ownerPlayerId = playerId,
            ownerTeam = team,
            unitType = type,
            x = spawnX,
            y = spawnY,
            currentHp = maxHp,
            maxHp = maxHp,
            attack = atk,
            defense = def,
            maxMoves = moves,
            movesRemaining = moves,
            initialSquadCount = count,
            isPrevalentUnit = isPrevalent,
            name = name,
            iconUrl = type.defaultIcon
        )
    }

    /**
     * Maps remaining HP ratio back to strategic squad headcount:
     * N_surviving = ceil(N_initial * (CurrentHP / MaxHP))
     */
    fun calculateSurvivingCount(initialCount: Int, currentHp: Int, maxHp: Int): Int {
        if (currentHp <= 0 || maxHp <= 0 || initialCount <= 0) return 0
        val ratio = currentHp.toDouble() / maxHp.toDouble()
        return ceil(initialCount * ratio).toInt().coerceIn(1, initialCount)
    }

    /**
     * Maps surviving units back to an Army object for a character.
     */
    fun mapSurvivingArmy(units: List<TacticalUnit>, playerId: String): Army {
        var archers = 0
        var heavy = 0
        var light = 0
        var mages = 0

        for (u in units.filter { it.ownerPlayerId == playerId && it.isAlive }) {
            val surviving = calculateSurvivingCount(u.initialSquadCount, u.currentHp, u.maxHp)
            when (u.unitType) {
                TacticalUnitType.ARCHER -> archers = surviving
                TacticalUnitType.HEAVY_INFANTRY -> heavy = surviving
                TacticalUnitType.LIGHT_INFANTRY -> light = surviving
                TacticalUnitType.MAGE -> mages = surviving
                else -> {}
            }
        }
        return Army(mages = mages, heavyInfantry = heavy, lightInfantry = light, archers = archers)
    }

    /**
     * Returns valid movement coordinates using Breadth-First Search (BFS).
     */
    fun findValidMoves(unit: TacticalUnit, state: TacticalBattleState): Set<Pair<Int, Int>> {
        if (unit.movesRemaining <= 0 || !unit.isAlive) return emptySet()

        val occupied = state.units.filter { it.isAlive && it.id != unit.id }.associateBy { it.x to it.y }
        val visited = mutableMapOf<Pair<Int, Int>, Int>()
        val queue = ArrayDeque<Pair<Pair<Int, Int>, Int>>()

        val start = unit.x to unit.y
        visited[start] = 0
        queue.add(start to 0)

        val result = mutableSetOf<Pair<Int, Int>>()
        val directions = listOf(0 to 1, 0 to -1, 1 to 0, -1 to 0)

        while (queue.isNotEmpty()) {
            val (current, dist) = queue.removeFirst()
            if (dist < unit.movesRemaining) {
                for ((dx, dy) in directions) {
                    val nx = current.first + dx
                    val ny = current.second + dy
                    if (nx in 0 until state.gridWidth && ny in 0 until state.gridHeight) {
                        val nextTile = state.tiles[ny][nx]
                        if (nextTile.isTraversable) {
                            val nextPos = nx to ny
                            if (!occupied.containsKey(nextPos)) {
                                val nextDist = dist + 1
                                if (!visited.containsKey(nextPos) || visited[nextPos]!! > nextDist) {
                                    visited[nextPos] = nextDist
                                    queue.add(nextPos to nextDist)
                                    result.add(nextPos)
                                }
                            }
                        }
                    }
                }
            }
        }
        return result
    }

    /**
     * Validates whether a tile line of sight is clear between two positions.
     */
    fun isLineOfSightClear(x1: Int, y1: Int, x2: Int, y2: Int, tiles: List<List<TacticalTileType>>): Boolean {
        val dx = x2 - x1
        val dy = y2 - y1
        val steps = max(kotlin.math.abs(dx), kotlin.math.abs(dy))
        if (steps <= 1) return true

        for (step in 1 until steps) {
            val checkX = x1 + (dx * step) / steps
            val checkY = y1 + (dy * step) / steps
            if (tiles[checkY][checkX].blocksLineOfSight) {
                return false
            }
        }
        return true
    }

    /**
     * Checks if attacker unit can attack target unit under the Unit Rules Matrix.
     */
    fun canAttackTarget(
        attacker: TacticalUnit,
        target: TacticalUnit,
        state: TacticalBattleState
    ): Boolean {
        if (!attacker.isAlive || !target.isAlive) return false
        if (attacker.ownerPlayerId == target.ownerPlayerId) return false
        if (attacker.hasAttackedThisTurn) return false

        val dx = kotlin.math.abs(target.x - attacker.x)
        val dy = kotlin.math.abs(target.y - attacker.y)

        return when (attacker.unitType) {
            TacticalUnitType.WARRIOR_HERO,
            TacticalUnitType.HEAVY_INFANTRY,
            TacticalUnitType.LIGHT_INFANTRY -> {
                // Any adjacent (Chebyshev distance = 1)
                max(dx, dy) == 1
            }
            TacticalUnitType.ARCHER_HERO -> {
                // Horizontal or Vertical, Range 1..2
                val isOrthogonal = (dx == 0 && dy in 1..2) || (dy == 0 && dx in 1..2)
                isOrthogonal && isLineOfSightClear(attacker.x, attacker.y, target.x, target.y, state.tiles)
            }
            TacticalUnitType.MAGE_HERO -> {
                // Any direction, Range 1..3, bypasses line-of-sight obstacles
                max(dx, dy) in 1..3
            }
            TacticalUnitType.ARCHER -> {
                // Diagonal or Vertical, Range 1..2
                val isDiagOrVert = (dx == dy && dx in 1..2) || (dx == 0 && dy in 1..2)
                isDiagOrVert && isLineOfSightClear(attacker.x, attacker.y, target.x, target.y, state.tiles)
            }
            TacticalUnitType.MAGE -> {
                // Any direction, Range 1..2, bypasses line-of-sight obstacles
                max(dx, dy) in 1..2
            }
        }
    }

    /**
     * Calculates combat damage considering prevalence, strategy buffs, and armor bypass.
     */
    fun calculateDamage(
        attacker: TacticalUnit,
        target: TacticalUnit,
        state: TacticalBattleState,
        rngVariance: Int = 0
    ): Int {
        var effectiveAtk = attacker.attack
        var effectiveDef = target.defense

        // Strategy Buffs
        val isAttackerTeam = attacker.ownerPlayerId == state.attackerPlayerId
        if (isAttackerTeam) {
            when (state.attackerStrategy) {
                BattleStrategy.ARCANE_PHALANX -> {
                    // Check if adjacent to ally Mage or Heavy Infantry
                    val adjacentAllies = state.units.filter {
                        it.isAlive && it.ownerPlayerId == attacker.ownerPlayerId &&
                                max(kotlin.math.abs(it.x - attacker.x), kotlin.math.abs(it.y - attacker.y)) == 1
                    }
                    val hasPhalanxSynergy = adjacentAllies.any {
                        it.unitType == TacticalUnitType.MAGE || it.unitType == TacticalUnitType.HEAVY_INFANTRY
                    }
                    if (hasPhalanxSynergy && (attacker.unitType == TacticalUnitType.HEAVY_INFANTRY || attacker.unitType == TacticalUnitType.MAGE)) {
                        effectiveDef += 2
                    }
                }
                BattleStrategy.HAMMER_AND_SPELL -> {
                    // Warrior Hero and Heavy Infantry gain +2 Attack after a Mage attacks a target
                    if (state.mageAttackedTargetIds.contains(target.id) &&
                        (attacker.unitType == TacticalUnitType.WARRIOR_HERO || attacker.unitType == TacticalUnitType.HEAVY_INFANTRY)
                    ) {
                        effectiveAtk += 2
                    }
                }
                BattleStrategy.SPELL_INFUSED_VOLLEY -> {
                    // Archer and Mage units gain +2 Attack when targeting the same enemy in a round
                    if (state.targetsHitThisRound.contains(target.id) &&
                        (attacker.unitType == TacticalUnitType.ARCHER || attacker.unitType == TacticalUnitType.MAGE || attacker.unitType == TacticalUnitType.ARCHER_HERO)
                    ) {
                        effectiveAtk += 2
                    }
                }
                BattleStrategy.NONE -> {}
            }
        }

        // Troop Bodyguard Aura: If target is a Hero and has living friendly troops, troops guard the commander
        if (target.unitType.isHero) {
            val hasAllyTroops = state.units.any { it.isAlive && it.ownerPlayerId == target.ownerPlayerId && !it.unitType.isHero }
            if (hasAllyTroops) {
                effectiveDef += 3
            }
        }

        // Mage bypasses physical armor
        if (attacker.unitType == TacticalUnitType.MAGE || attacker.unitType == TacticalUnitType.MAGE_HERO) {
            effectiveDef = min(effectiveDef, 1)
        }

        val baseDamage = max(1, effectiveAtk - (effectiveDef / 2))
        return max(1, baseDamage + rngVariance)
    }
}
