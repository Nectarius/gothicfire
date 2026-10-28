package models

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/**
 * Balance attributes for a single tactical unit type.
 * Includes distinct defense types: Weapon Defense (physical), Arrow Defense (ranged), and Magic Defense.
 */
@Serializable
data class TacticalUnitBalance(
    val unitType: TacticalUnitType,
    val name: String,
    val baseHp: Int,
    val baseAttack: Int,
    val baseDefense: Int,
    val defaultMoves: Int,
    val iconUrl: String,
    val minRange: Int = 1,
    val maxRange: Int = 1,
    val attackPattern: String = "MELEE", // MELEE, ORTHOGONAL, DIAGONAL_OR_VERTICAL, ANY_DIRECTION
    val requiresLineOfSight: Boolean = false,
    val bypassesArmor: Boolean = false,
    // Damage type dealt by this unit
    val damageType: String = "WEAPON", // WEAPON (physical melee), ARROW (ranged), MAGIC (elemental/arcane)
    // Distinct defense categories
    val weaponDefense: Int = baseDefense, // vs physical melee damage
    val arrowDefense: Int = baseDefense,  // vs ranged arrow damage
    val magicDefense: Int = baseDefense,  // vs magical damage
    // Troop-specific scaling
    val attackPerCount: Double = 0.5,
    val defensePerCount: Double = 0.3,
    val weaponDefensePerCount: Double = defensePerCount,
    val arrowDefensePerCount: Double = defensePerCount,
    val magicDefensePerCount: Double = 0.1,
    // Hero-specific scaling
    val hpScalingStat: String = "",
    val hpScalingFactor: Int = 0,
    val attackScalingFactor: Double = 0.0,
    val defenseScalingDivisor: Int = 1,
    val weaponDefenseScalingDivisor: Int = defenseScalingDivisor,
    val arrowDefenseScalingDivisor: Int = defenseScalingDivisor,
    val magicDefenseScalingDivisor: Int = defenseScalingDivisor
)

/**
 * Global balance modifiers and multipliers for tactical combat.
 */
@Serializable
data class TacticalRulesBalance(
    val prevalenceBonusSingle: Double = 1.25,
    val prevalenceBonusTied: Double = 1.15,
    val bodyguardDefenseBonus: Int = 3,
    val mageBypassDefenseCap: Int = 1,
    val strategyArcanePhalanxDefenseBonus: Int = 2,
    val strategyHammerAndSpellAttackBonus: Int = 2,
    val strategySpellInfusedVolleyAttackBonus: Int = 2,
    val flankAttackBonus: Double = 1.5,
    val rearAttackBonus: Double = 2.0
)

/**
 * Complete root tactical combat balance configuration model.
 */
@Serializable
data class TacticalBalanceConfig(
    val version: String = "1.0",
    val description: String = "Gothic Fire Tactical Combat Balance Settings",
    val units: Map<TacticalUnitType, TacticalUnitBalance> = emptyMap(),
    val rules: TacticalRulesBalance = TacticalRulesBalance()
)

/**
 * Built-in default configuration matching standard Gothic Fire tactical combat balance.
 */
object DefaultTacticalBalanceConfig {
    val HEAVY_INFANTRY = TacticalUnitBalance(
        unitType = TacticalUnitType.HEAVY_INFANTRY,
        name = "Heavy Infantry",
        baseHp = 9,
        baseAttack = 6,
        baseDefense = 6,
        damageType = "WEAPON",
        weaponDefense = 8,
        arrowDefense = 8,
        magicDefense = 4,
        defaultMoves = 2,
        iconUrl = "/tactical/unit_heavy_infantry.jpg",
        minRange = 1,
        maxRange = 1,
        attackPattern = "MELEE",
        requiresLineOfSight = false,
        bypassesArmor = false,
        attackPerCount = 0.5,
        defensePerCount = 0.3,
        weaponDefensePerCount = 0.3,
        arrowDefensePerCount = 0.3,
        magicDefensePerCount = 0.1
    )

    val LIGHT_INFANTRY = TacticalUnitBalance(
        unitType = TacticalUnitType.LIGHT_INFANTRY,
        name = "Light Infantry",
        baseHp = 7,
        baseAttack = 5,
        baseDefense = 3,
        damageType = "WEAPON",
        weaponDefense = 4,
        arrowDefense = 3,
        magicDefense = 2,
        defaultMoves = 3,
        iconUrl = "/tactical/unit_light_infantry.jpg",
        minRange = 1,
        maxRange = 1,
        attackPattern = "MELEE",
        requiresLineOfSight = false,
        bypassesArmor = false,
        attackPerCount = 0.5,
        defensePerCount = 0.3,
        weaponDefensePerCount = 0.2,
        arrowDefensePerCount = 0.2,
        magicDefensePerCount = 0.1
    )

    val ARCHER = TacticalUnitBalance(
        unitType = TacticalUnitType.ARCHER,
        name = "Archers",
        baseHp = 6,
        baseAttack = 5,
        baseDefense = 2,
        damageType = "ARROW",
        weaponDefense = 2,
        arrowDefense = 3,
        magicDefense = 2,
        defaultMoves = 2,
        iconUrl = "/tactical/unit_archer.jpg",
        minRange = 1,
        maxRange = 2,
        attackPattern = "ORTHOGONAL",
        requiresLineOfSight = true,
        bypassesArmor = false,
        attackPerCount = 0.5,
        defensePerCount = 0.3,
        weaponDefensePerCount = 0.1,
        arrowDefensePerCount = 0.2,
        magicDefensePerCount = 0.1
    )

    val MAGE = TacticalUnitBalance(
        unitType = TacticalUnitType.MAGE,
        name = "Battle Mages",
        baseHp = 5,
        baseAttack = 7,
        baseDefense = 2,
        damageType = "MAGIC",
        weaponDefense = 1,
        arrowDefense = 4,
        magicDefense = 8,
        defaultMoves = 2,
        iconUrl = "/tactical/unit_mage.jpg",
        minRange = 1,
        maxRange = 2,
        attackPattern = "ANY_DIRECTION",
        requiresLineOfSight = false,
        bypassesArmor = true,
        attackPerCount = 0.5,
        defensePerCount = 0.3,
        weaponDefensePerCount = 0.1,
        arrowDefensePerCount = 0.1,
        magicDefensePerCount = 0.3
    )

    val WARRIOR_HERO = TacticalUnitBalance(
        unitType = TacticalUnitType.WARRIOR_HERO,
        name = "Warrior Hero",
        baseHp = 58,
        baseAttack = 8,
        baseDefense = 9,
        damageType = "WEAPON",
        weaponDefense = 9,
        arrowDefense = 7,
        magicDefense = 4,
        defaultMoves = 2,
        iconUrl = "/tactical/hero_warrior.jpg",
        minRange = 1,
        maxRange = 1,
        attackPattern = "MELEE",
        requiresLineOfSight = false,
        bypassesArmor = false,
        hpScalingStat = "warlord",
        hpScalingFactor = 4,
        attackScalingFactor = 1.0,
        defenseScalingDivisor = 2,
        weaponDefenseScalingDivisor = 2,
        arrowDefenseScalingDivisor = 3,
        magicDefenseScalingDivisor = 4
    )

    val ARCHER_HERO = TacticalUnitBalance(
        unitType = TacticalUnitType.ARCHER_HERO,
        name = "Archer Hero",
        baseHp = 52,
        baseAttack = 7,
        baseDefense = 5,
        damageType = "ARROW",
        weaponDefense = 5,
        arrowDefense = 7,
        magicDefense = 4,
        defaultMoves = 3,
        iconUrl = "/tactical/hero_archer.jpg",
        minRange = 1,
        maxRange = 2,
        attackPattern = "ORTHOGONAL",
        requiresLineOfSight = true,
        bypassesArmor = false,
        hpScalingStat = "vanguard",
        hpScalingFactor = 4,
        attackScalingFactor = 1.0,
        defenseScalingDivisor = 3,
        weaponDefenseScalingDivisor = 3,
        arrowDefenseScalingDivisor = 2,
        magicDefenseScalingDivisor = 4
    )

    val MAGE_HERO = TacticalUnitBalance(
        unitType = TacticalUnitType.MAGE_HERO,
        name = "Mage Hero",
        baseHp = 46,
        baseAttack = 12,
        baseDefense = 5,
        damageType = "MAGIC",
        weaponDefense = 4,
        arrowDefense = 4,
        magicDefense = 9,
        defaultMoves = 2,
        iconUrl = "/tactical/hero_mage.jpg",
        minRange = 1,
        maxRange = 3,
        attackPattern = "ANY_DIRECTION",
        requiresLineOfSight = false,
        bypassesArmor = true,
        hpScalingStat = "archon_plus_intellect",
        hpScalingFactor = 3,
        attackScalingFactor = 1.0,
        defenseScalingDivisor = 3,
        weaponDefenseScalingDivisor = 4,
        arrowDefenseScalingDivisor = 4,
        magicDefenseScalingDivisor = 2
    )

    val DEFAULT_UNITS: Map<TacticalUnitType, TacticalUnitBalance> = mapOf(
        TacticalUnitType.HEAVY_INFANTRY to HEAVY_INFANTRY,
        TacticalUnitType.LIGHT_INFANTRY to LIGHT_INFANTRY,
        TacticalUnitType.ARCHER to ARCHER,
        TacticalUnitType.MAGE to MAGE,
        TacticalUnitType.WARRIOR_HERO to WARRIOR_HERO,
        TacticalUnitType.ARCHER_HERO to ARCHER_HERO,
        TacticalUnitType.MAGE_HERO to MAGE_HERO
    )

    val CONFIG = TacticalBalanceConfig(
        version = "1.0",
        description = "Default in-memory tactical combat balance configuration",
        units = DEFAULT_UNITS,
        rules = TacticalRulesBalance()
    )
}

/**
 * In-memory repository keeping tactical combat balance settings in memory.
 * Loaded on startup from the dedicated JSON file.
 */
object TacticalBalanceRepository {
    private val json = Json {
        ignoreUnknownKeys = true
        isLenient = true
        prettyPrint = true
    }

    private var activeConfig: TacticalBalanceConfig = DefaultTacticalBalanceConfig.CONFIG

    /**
     * Gets the full active configuration.
     */
    fun getConfig(): TacticalBalanceConfig = activeConfig

    /**
     * Retrieves the balance settings for a specific unit type.
     */
    fun getBalance(type: TacticalUnitType): TacticalUnitBalance {
        return activeConfig.units[type] ?: DefaultTacticalBalanceConfig.DEFAULT_UNITS[type]
            ?: TacticalUnitBalance(
                unitType = type,
                name = type.name,
                baseHp = 10,
                baseAttack = 5,
                baseDefense = 2,
                defaultMoves = 2,
                iconUrl = ""
            )
    }

    /**
     * Retrieves global combat rules and multipliers.
     */
    fun getRules(): TacticalRulesBalance = activeConfig.rules

    /**
     * Parses a JSON string into a TacticalBalanceConfig.
     */
    fun parseConfig(jsonString: String): TacticalBalanceConfig {
        return json.decodeFromString<TacticalBalanceConfig>(jsonString)
    }

    /**
     * Serializes a configuration object to a JSON string.
     */
    fun toJson(config: TacticalBalanceConfig = activeConfig): String {
        return json.encodeToString(config)
    }

    /**
     * Loads and replaces the active in-memory balance configuration from a JSON string.
     */
    fun loadFromJson(jsonString: String): TacticalBalanceConfig {
        val parsed = parseConfig(jsonString)
        // Ensure all default unit types are present by merging with defaults if missing
        val mergedUnits = DefaultTacticalBalanceConfig.DEFAULT_UNITS.toMutableMap()
        mergedUnits.putAll(parsed.units)

        activeConfig = parsed.copy(units = mergedUnits)
        return activeConfig
    }

    /**
     * Resets active configuration back to default values.
     */
    fun resetToDefaults() {
        activeConfig = DefaultTacticalBalanceConfig.CONFIG
    }
}
