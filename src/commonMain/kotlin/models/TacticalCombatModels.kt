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
    get() = TacticalBalanceRepository.getBalance(this).defaultMoves

val TacticalUnitType.baseHp: Int
    get() = TacticalBalanceRepository.getBalance(this).baseHp

val TacticalUnitType.baseAttack: Int
    get() = TacticalBalanceRepository.getBalance(this).baseAttack

val TacticalUnitType.baseDefense: Int
    get() = TacticalBalanceRepository.getBalance(this).baseDefense

val TacticalUnitType.weaponDefense: Int
    get() = TacticalBalanceRepository.getBalance(this).weaponDefense

val TacticalUnitType.arrowDefense: Int
    get() = TacticalBalanceRepository.getBalance(this).arrowDefense

val TacticalUnitType.magicDefense: Int
    get() = TacticalBalanceRepository.getBalance(this).magicDefense

val TacticalUnitType.damageType: String
    get() = TacticalBalanceRepository.getBalance(this).damageType

val TacticalUnitType.defaultIcon: String
    get() = TacticalBalanceRepository.getBalance(this).iconUrl

@Serializable
enum class UnitFacing {
    NORTH,
    SOUTH,
    EAST,
    WEST
}

@Serializable
enum class TacticalAttackAngle {
    FRONT,
    FLANK,
    REAR
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
    val maxMoves: Int = 2,
    val movesRemaining: Int = 2,
    val hasAttackedThisTurn: Boolean = false,
    val initialSquadCount: Int = 1,
    val isPrevalentUnit: Boolean = false,
    val name: String = "",
    val iconUrl: String = "",
    val characterId: String? = null,
    val damageType: String = "",
    val weaponDefense: Int = defense,
    val arrowDefense: Int = defense,
    val magicDefense: Int = defense,
    val facing: UnitFacing = UnitFacing.EAST
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
        val rules = TacticalBalanceRepository.getRules()
        return if (tiedCount == 1) {
            rules.prevalenceBonusSingle to true
        } else {
            rules.prevalenceBonusTied to true
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
        val balance = TacticalBalanceRepository.getBalance(archetype)
        val maxHp = when (archetype) {
            TacticalUnitType.WARRIOR_HERO -> balance.baseHp + char.warlord * balance.hpScalingFactor
            TacticalUnitType.ARCHER_HERO -> balance.baseHp + char.vanguard * balance.hpScalingFactor
            TacticalUnitType.MAGE_HERO -> balance.baseHp + (char.archon + char.intellect) * balance.hpScalingFactor
            else -> balance.baseHp
        }
        val atk = when (archetype) {
            TacticalUnitType.WARRIOR_HERO -> balance.baseAttack + (char.warlord * balance.attackScalingFactor).toInt()
            TacticalUnitType.ARCHER_HERO -> balance.baseAttack + (char.vanguard * balance.attackScalingFactor).toInt()
            TacticalUnitType.MAGE_HERO -> balance.baseAttack + (char.archon * balance.attackScalingFactor).toInt()
            else -> balance.baseAttack
        }
        val statForScaling = when (archetype) {
            TacticalUnitType.WARRIOR_HERO -> char.warlord
            TacticalUnitType.ARCHER_HERO -> char.vanguard
            TacticalUnitType.MAGE_HERO -> char.archon
            else -> 0
        }
        val weaponDef = balance.weaponDefense + (if (balance.weaponDefenseScalingDivisor > 0) statForScaling / balance.weaponDefenseScalingDivisor else 0)
        val arrowDef = balance.arrowDefense + (if (balance.arrowDefenseScalingDivisor > 0) statForScaling / balance.arrowDefenseScalingDivisor else 0)
        val magicDef = balance.magicDefense + (if (balance.magicDefenseScalingDivisor > 0) statForScaling / balance.magicDefenseScalingDivisor else 0)
        val generalDef = weaponDef
        val moves = balance.defaultMoves

        val initialFacing = if (spawnX <= 4) UnitFacing.EAST else UnitFacing.WEST

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
            defense = generalDef,
            maxMoves = moves,
            movesRemaining = moves,
            initialSquadCount = 1,
            isPrevalentUnit = false,
            name = char.name,
            iconUrl = balance.iconUrl,
            characterId = char.id,
            damageType = balance.damageType,
            weaponDefense = weaponDef,
            arrowDefense = arrowDef,
            magicDefense = magicDef,
            facing = initialFacing
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
        val balance = TacticalBalanceRepository.getBalance(type)
        val (prevalenceMult, isPrevalent) = calculatePrevalenceMultiplier(type, army)
        val maxHp = balance.baseHp * count
        val rawAtk = balance.baseAttack + (count * balance.attackPerCount).toInt()
        val rawWeaponDef = balance.weaponDefense + (count * balance.weaponDefensePerCount).toInt()
        val rawArrowDef = balance.arrowDefense + (count * balance.arrowDefensePerCount).toInt()
        val rawMagicDef = balance.magicDefense + (count * balance.magicDefensePerCount).toInt()

        val atk = (rawAtk * prevalenceMult).roundToInt()
        val weaponDef = (rawWeaponDef * prevalenceMult).roundToInt()
        val arrowDef = (rawArrowDef * prevalenceMult).roundToInt()
        val magicDef = (rawMagicDef * prevalenceMult).roundToInt()
        val generalDef = weaponDef
        val moves = balance.defaultMoves

        val name = when (type) {
            TacticalUnitType.ARCHER -> "Archers ($count)"
            TacticalUnitType.HEAVY_INFANTRY -> "Heavy Infantry ($count)"
            TacticalUnitType.LIGHT_INFANTRY -> "Light Infantry ($count)"
            TacticalUnitType.MAGE -> "Battle Mages ($count)"
            else -> balance.name.ifBlank { type.name }
        }

        val initialFacing = if (spawnX <= 4) UnitFacing.EAST else UnitFacing.WEST

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
            defense = generalDef,
            maxMoves = moves,
            movesRemaining = moves,
            initialSquadCount = count,
            isPrevalentUnit = isPrevalent,
            name = name,
            iconUrl = balance.iconUrl,
            damageType = balance.damageType,
            weaponDefense = weaponDef,
            arrowDefense = arrowDef,
            magicDefense = magicDef,
            facing = initialFacing
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

        val balance = TacticalBalanceRepository.getBalance(attacker.unitType)
        val dx = kotlin.math.abs(target.x - attacker.x)
        val dy = kotlin.math.abs(target.y - attacker.y)
        val chebyshevDist = max(dx, dy)

        if (chebyshevDist < balance.minRange || chebyshevDist > balance.maxRange) {
            return false
        }

        val patternMatches = when (balance.attackPattern) {
            "MELEE", "ADJACENT" -> max(dx, dy) == 1
            "ORTHOGONAL" -> (dx == 0 && dy in balance.minRange..balance.maxRange) || (dy == 0 && dx in balance.minRange..balance.maxRange)
            "DIAGONAL_OR_VERTICAL" -> (dx == dy && dx in balance.minRange..balance.maxRange) || (dx == 0 && dy in balance.minRange..balance.maxRange)
            "ANY_DIRECTION" -> true
            else -> chebyshevDist in balance.minRange..balance.maxRange
        }
        if (!patternMatches) return false

        if (balance.requiresLineOfSight && !isLineOfSightClear(attacker.x, attacker.y, target.x, target.y, state.tiles)) {
            return false
        }

        return true
    }

    /**
     * Determines whether an attack strikes the target from FRONT, FLANK, or REAR based on target's facing.
     */
    fun determineAttackAngle(attacker: TacticalUnit, target: TacticalUnit): TacticalAttackAngle {
        val dx = attacker.x - target.x
        val dy = attacker.y - target.y
        if (dx == 0 && dy == 0) return TacticalAttackAngle.FRONT

        val forward = when (target.facing) {
            UnitFacing.EAST -> dx
            UnitFacing.WEST -> -dx
            UnitFacing.SOUTH -> dy
            UnitFacing.NORTH -> -dy
        }
        val lateral = when (target.facing) {
            UnitFacing.EAST, UnitFacing.WEST -> kotlin.math.abs(dy)
            UnitFacing.SOUTH, UnitFacing.NORTH -> kotlin.math.abs(dx)
        }

        return when {
            forward < 0 && lateral < -forward -> TacticalAttackAngle.REAR
            forward > 0 && lateral < forward -> TacticalAttackAngle.FRONT
            else -> TacticalAttackAngle.FLANK
        }
    }

    /**
     * Calculates combat damage considering prevalence, strategy buffs, armor bypass, and flank/rear attack angles.
     */
    fun calculateDamage(
        attacker: TacticalUnit,
        target: TacticalUnit,
        state: TacticalBattleState,
        rngVariance: Int = 0,
        attackAngleOverride: TacticalAttackAngle? = null
    ): Int {
        val rules = TacticalBalanceRepository.getRules()
        val attackerBalance = TacticalBalanceRepository.getBalance(attacker.unitType)
        var effectiveAtk = attacker.attack

        // Determine defense stat based on attacker's damage type:
        // WEAPON (physical melee) -> target.weaponDefense
        // ARROW (ranged piercing) -> target.arrowDefense
        // MAGIC (magical) -> target.magicDefense
        val intrinsicDamageType = attackerBalance.damageType
        val effectiveDamageType = when {
            attacker.damageType.isNotBlank() && attacker.damageType.equals(intrinsicDamageType, ignoreCase = true) -> attacker.damageType
            attacker.damageType.isNotBlank() && attacker.damageType != "WEAPON" -> attacker.damageType
            else -> intrinsicDamageType
        }.ifBlank { "WEAPON" }.uppercase()
        var effectiveDef = when (effectiveDamageType) {
            "WEAPON", "PHYSICAL", "MELEE" -> target.weaponDefense
            "ARROW", "RANGED" -> target.arrowDefense
            "MAGIC", "MAGICAL" -> target.magicDefense
            else -> target.defense
        }

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
                        effectiveDef += rules.strategyArcanePhalanxDefenseBonus
                    }
                }
                BattleStrategy.HAMMER_AND_SPELL -> {
                    // Warrior Hero and Heavy Infantry gain attack buff after a Mage attacks a target
                    if (state.mageAttackedTargetIds.contains(target.id) &&
                        (attacker.unitType == TacticalUnitType.WARRIOR_HERO || attacker.unitType == TacticalUnitType.HEAVY_INFANTRY)
                    ) {
                        effectiveAtk += rules.strategyHammerAndSpellAttackBonus
                    }
                }
                BattleStrategy.SPELL_INFUSED_VOLLEY -> {
                    // Archer and Mage units gain attack buff when targeting the same enemy in a round
                    if (state.targetsHitThisRound.contains(target.id) &&
                        (attacker.unitType == TacticalUnitType.ARCHER || attacker.unitType == TacticalUnitType.MAGE || attacker.unitType == TacticalUnitType.ARCHER_HERO)
                    ) {
                        effectiveAtk += rules.strategySpellInfusedVolleyAttackBonus
                    }
                }
                BattleStrategy.NONE -> {}
            }
        }

        // Troop Bodyguard Aura: If target is a Hero and has living friendly troops, troops guard the commander
        if (target.unitType.isHero) {
            val hasAllyTroops = state.units.any { it.isAlive && it.ownerPlayerId == target.ownerPlayerId && !it.unitType.isHero }
            if (hasAllyTroops) {
                effectiveDef += rules.bodyguardDefenseBonus
            }
        }

        // Armor bypass fallback if target had identical default defense across all types
        if (attackerBalance.bypassesArmor && effectiveDamageType == "MAGIC" && target.magicDefense == target.defense && target.defense > rules.mageBypassDefenseCap) {
            effectiveDef = min(effectiveDef, rules.mageBypassDefenseCap)
        }

        val baseDamage = max(1, effectiveAtk - (effectiveDef / 2))

        // Positional modifiers: Flank (+50%) and Rear (x2.0 double bonus)
        val attackAngle = attackAngleOverride ?: determineAttackAngle(attacker, target)
        val angleMultiplier = when (attackAngle) {
            TacticalAttackAngle.REAR -> rules.rearAttackBonus
            TacticalAttackAngle.FLANK -> rules.flankAttackBonus
            TacticalAttackAngle.FRONT -> 1.0
        }
        val damageWithBonus = (baseDamage * angleMultiplier).roundToInt()

        return max(1, damageWithBonus + rngVariance)
    }
}
