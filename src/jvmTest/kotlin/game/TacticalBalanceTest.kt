package game

import config.TacticalBalanceLoader
import models.*
import java.io.File
import kotlin.test.*

class TacticalBalanceTest {

    @BeforeTest
    fun setUp() {
        TacticalBalanceRepository.resetToDefaults()
    }

    @AfterTest
    fun tearDown() {
        TacticalBalanceRepository.resetToDefaults()
    }

    @Test
    fun testJsonFileExistsAndContainsAllSevenUnits() {
        val rootFile = File("tactical_balance.json")
        assertTrue(rootFile.exists(), "tactical_balance.json must exist in root project directory")

        val jsonContent = rootFile.readText(Charsets.UTF_8)
        val config = TacticalBalanceRepository.parseConfig(jsonContent)

        // Verify the 4 troop types
        val expectedTroopTypes = listOf(
            TacticalUnitType.HEAVY_INFANTRY,
            TacticalUnitType.LIGHT_INFANTRY,
            TacticalUnitType.MAGE,
            TacticalUnitType.ARCHER
        )
        for (troopType in expectedTroopTypes) {
            val balance = config.units[troopType]
            assertNotNull(balance, "Unit type $troopType must be defined in tactical_balance.json")
            assertTrue(balance.baseHp > 0, "$troopType must have baseHp > 0 (got ${balance.baseHp})")
            assertTrue(balance.baseAttack > 0, "$troopType must have baseAttack > 0 (got ${balance.baseAttack})")
            assertTrue(balance.baseDefense > 0, "$troopType must have baseDefense > 0 (got ${balance.baseDefense})")
            assertTrue(balance.weaponDefense > 0, "$troopType must have weaponDefense > 0 (got ${balance.weaponDefense})")
            assertTrue(balance.arrowDefense > 0, "$troopType must have arrowDefense > 0 (got ${balance.arrowDefense})")
            assertTrue(balance.magicDefense > 0, "$troopType must have magicDefense > 0 (got ${balance.magicDefense})")
            assertTrue(balance.defaultMoves > 0, "$troopType must have defaultMoves > 0 (got ${balance.defaultMoves})")
            assertTrue(balance.iconUrl.isNotBlank(), "$troopType must have an iconUrl")
            assertTrue(balance.minRange >= 1, "$troopType must have minRange >= 1")
            assertTrue(balance.maxRange >= balance.minRange, "$troopType maxRange must be >= minRange")
            assertTrue(balance.attackPattern.isNotBlank(), "$troopType must specify an attackPattern")
            assertTrue(balance.damageType.isNotBlank(), "$troopType must specify damageType")
        }

        // Verify the 3 hero types
        val expectedHeroTypes = listOf(
            TacticalUnitType.WARRIOR_HERO,
            TacticalUnitType.ARCHER_HERO,
            TacticalUnitType.MAGE_HERO
        )
        for (heroType in expectedHeroTypes) {
            val balance = config.units[heroType]
            assertNotNull(balance, "Hero type $heroType must be defined in tactical_balance.json")
            assertTrue(balance.baseHp >= 40, "$heroType baseHp must be >= 40 (got ${balance.baseHp})")
            assertTrue(balance.baseAttack >= 7, "$heroType baseAttack must be >= 7 (got ${balance.baseAttack})")
            assertTrue(balance.baseDefense >= 4, "$heroType baseDefense must be >= 4 (got ${balance.baseDefense})")
            assertTrue(balance.weaponDefense >= 4, "$heroType weaponDefense must be >= 4 (got ${balance.weaponDefense})")
            assertTrue(balance.arrowDefense >= 4, "$heroType arrowDefense must be >= 4 (got ${balance.arrowDefense})")
            assertTrue(balance.magicDefense >= 4, "$heroType magicDefense must be >= 4 (got ${balance.magicDefense})")
            assertTrue(balance.defaultMoves in 2..3, "$heroType defaultMoves must be 2 or 3 (got ${balance.defaultMoves})")
            assertTrue(balance.hpScalingFactor > 0, "$heroType must have hpScalingFactor > 0")
            assertTrue(balance.attackScalingFactor > 0.0, "$heroType must have attackScalingFactor > 0.0")
            assertTrue(balance.defenseScalingDivisor > 0, "$heroType must have defenseScalingDivisor > 0")
        }

        // Specific baseline assertions including distinct defenses
        val heavy = config.units[TacticalUnitType.HEAVY_INFANTRY]!!
        assertEquals(9, heavy.baseHp)
        assertEquals(6, heavy.baseAttack)
        assertEquals("WEAPON", heavy.damageType)
        assertEquals(9, heavy.weaponDefense)
        assertEquals(8, heavy.arrowDefense)
        assertEquals(4, heavy.magicDefense)
        assertEquals(2, heavy.defaultMoves)

        val light = config.units[TacticalUnitType.LIGHT_INFANTRY]!!
        assertEquals(7, light.baseHp)
        assertEquals(5, light.baseAttack)
        assertEquals("WEAPON", light.damageType)
        assertEquals(4, light.weaponDefense)
        assertEquals(3, light.arrowDefense)
        assertEquals(2, light.magicDefense)
        assertEquals(3, light.defaultMoves)

        val archer = config.units[TacticalUnitType.ARCHER]!!
        assertEquals(6, archer.baseHp)
        assertEquals(5, archer.baseAttack)
        assertEquals("ARROW", archer.damageType)
        assertEquals(2, archer.weaponDefense)
        assertEquals(3, archer.arrowDefense)
        assertEquals(2, archer.magicDefense)
        assertEquals(2, archer.defaultMoves)
        assertEquals("ORTHOGONAL", archer.attackPattern)
        assertTrue(archer.requiresLineOfSight)

        val mage = config.units[TacticalUnitType.MAGE]!!
        assertEquals(5, mage.baseHp)
        assertEquals(7, mage.baseAttack)
        assertEquals("MAGIC", mage.damageType)
        assertEquals(1, mage.weaponDefense)
        assertEquals(4, mage.arrowDefense)
        assertEquals(8, mage.magicDefense)
        assertEquals(2, mage.defaultMoves)
        assertTrue(mage.bypassesArmor)

        val warriorHero = config.units[TacticalUnitType.WARRIOR_HERO]!!
        assertEquals(58, warriorHero.baseHp)
        assertEquals(8, warriorHero.baseAttack)
        assertEquals(9, warriorHero.weaponDefense)
        assertEquals(7, warriorHero.arrowDefense)
        assertEquals(4, warriorHero.magicDefense)
        assertEquals(2, warriorHero.defaultMoves)

        val archerHero = config.units[TacticalUnitType.ARCHER_HERO]!!
        assertEquals(52, archerHero.baseHp)
        assertEquals(7, archerHero.baseAttack)
        assertEquals(5, archerHero.weaponDefense)
        assertEquals(7, archerHero.arrowDefense)
        assertEquals(4, archerHero.magicDefense)
        assertEquals(3, archerHero.defaultMoves)

        val mageHero = config.units[TacticalUnitType.MAGE_HERO]!!
        assertEquals(46, mageHero.baseHp)
        assertEquals(12, mageHero.baseAttack)
        assertEquals(4, mageHero.weaponDefense)
        assertEquals(4, mageHero.arrowDefense)
        assertEquals(9, mageHero.magicDefense)
        assertEquals(2, mageHero.defaultMoves)

        // Rules assertions including flank and rear attack bonuses
        assertEquals(1.5, config.rules.flankAttackBonus)
        assertEquals(2.0, config.rules.rearAttackBonus)
    }

    @Test
    fun testTacticalBalanceLoaderLoadsFileAndClasspath() {
        val loadedConfig = TacticalBalanceLoader.loadBalanceSettings()
        assertNotNull(loadedConfig)
        assertEquals(7, loadedConfig.units.size)

        // Verify in-memory repository holds the loaded settings
        assertEquals(loadedConfig, TacticalBalanceRepository.getConfig())
        assertEquals(9, TacticalBalanceRepository.getBalance(TacticalUnitType.HEAVY_INFANTRY).baseHp)
        assertEquals(58, TacticalBalanceRepository.getBalance(TacticalUnitType.WARRIOR_HERO).baseHp)
        assertEquals(9, TacticalBalanceRepository.getBalance(TacticalUnitType.WARRIOR_HERO).weaponDefense)
    }

    @Test
    fun testDistinctDefensesMitigateMatchingDamageTypes() {
        TacticalBalanceLoader.loadBalanceSettings()

        // Defender: Heavy Infantry with weaponDefense=6, arrowDefense=6, magicDefense=1, facing WEST
        val defenderHeavy = TacticalUnit(
            id = "d1", name = "Heavy Guard", unitType = TacticalUnitType.HEAVY_INFANTRY,
            ownerPlayerId = "p2", ownerTeam = Team.BLUE,
            x = 2, y = 2, currentHp = 50, maxHp = 50, attack = 10, defense = 6,
            weaponDefense = 6, arrowDefense = 6, magicDefense = 1,
            maxMoves = 2, movesRemaining = 2,
            facing = UnitFacing.WEST
        )

        val battleState = TacticalBattleState(
            battleId = "b1", sectorId = "1",
            attackerPlayerId = "p1", defenderPlayerId = "p2",
            attackerCharId = "a1", defenderCharId = "d1",
            activeUnitOwnerId = "p1",
            tiles = emptyList(),
            units = listOf(defenderHeavy)
        )

        // 1. Physical Weapon Attack (Attack 20) -> Mitigated by weaponDefense (6)
        // Expected damage = 20 - (6 / 2) = 20 - 3 = 17
        val weaponAttacker = TacticalUnit(
            id = "w1", name = "Swordsman", unitType = TacticalUnitType.LIGHT_INFANTRY,
            ownerPlayerId = "p1", ownerTeam = Team.RED,
            x = 1, y = 2, currentHp = 30, maxHp = 30, attack = 20, defense = 3,
            maxMoves = 2, movesRemaining = 2,
            damageType = "WEAPON"
        )
        val weaponDmg = TacticalRules.calculateDamage(weaponAttacker, defenderHeavy, battleState, rngVariance = 0)
        assertEquals(17, weaponDmg)

        // 2. Arrow Attack (Attack 20) -> Mitigated by arrowDefense (6)
        // Expected damage = 20 - (6 / 2) = 20 - 3 = 17
        val arrowAttacker = TacticalUnit(
            id = "arr1", name = "Ranger", unitType = TacticalUnitType.ARCHER,
            ownerPlayerId = "p1", ownerTeam = Team.RED,
            x = 0, y = 2, currentHp = 30, maxHp = 30, attack = 20, defense = 2,
            maxMoves = 2, movesRemaining = 2,
            damageType = "ARROW"
        )
        val arrowDmg = TacticalRules.calculateDamage(arrowAttacker, defenderHeavy, battleState, rngVariance = 0)
        assertEquals(17, arrowDmg)

        // 3. Magic Attack (Attack 20) -> Mitigated by magicDefense (1)
        // Expected damage = 20 - (1 / 2) = 20 - 0 = 20 (Severe vulnerability to magic!)
        val magicAttacker = TacticalUnit(
            id = "m1", name = "Mage", unitType = TacticalUnitType.MAGE,
            ownerPlayerId = "p1", ownerTeam = Team.RED,
            x = 0, y = 2, currentHp = 30, maxHp = 30, attack = 20, defense = 2,
            maxMoves = 2, movesRemaining = 2,
            damageType = "MAGIC"
        )
        val magicDmg = TacticalRules.calculateDamage(magicAttacker, defenderHeavy, battleState, rngVariance = 0)
        assertEquals(20, magicDmg)

        // Now test against Battle Mage defender (weaponDefense=1, arrowDefense=2, magicDefense=6, facing WEST)
        val defenderMage = TacticalUnit(
            id = "d2", name = "Archmage", unitType = TacticalUnitType.MAGE,
            ownerPlayerId = "p2", ownerTeam = Team.BLUE,
            x = 2, y = 2, currentHp = 40, maxHp = 40, attack = 12, defense = 1,
            maxMoves = 2, movesRemaining = 2,
            weaponDefense = 1, arrowDefense = 2, magicDefense = 6,
            facing = UnitFacing.WEST
        )

        // Physical melee attack hits weaponDefense (1): 20 - (1 / 2) = 20 (Squishy against swords!)
        val physicalOnMage = TacticalRules.calculateDamage(weaponAttacker, defenderMage, battleState, rngVariance = 0)
        assertEquals(20, physicalOnMage)

        // Magic attack hits magicDefense (6): 20 - (6 / 2) = 17 (Resists magic!)
        val magicOnMage = TacticalRules.calculateDamage(magicAttacker, defenderMage, battleState, rngVariance = 0)
        assertEquals(17, magicOnMage)
    }

    @Test
    fun testFlankAndRearAttackAngleDamageScaling() {
        TacticalBalanceLoader.loadBalanceSettings()

        val defender = TacticalUnit(
            id = "def", name = "Target Guard", unitType = TacticalUnitType.HEAVY_INFANTRY,
            ownerPlayerId = "p2", ownerTeam = Team.BLUE,
            x = 3, y = 3, currentHp = 100, maxHp = 100, attack = 10, defense = 4,
            weaponDefense = 4, arrowDefense = 4, magicDefense = 4,
            maxMoves = 2, movesRemaining = 2,
            facing = UnitFacing.EAST
        )
        val battleState = TacticalBattleState(
            battleId = "b_flank", sectorId = "1",
            attackerPlayerId = "p1", defenderPlayerId = "p2",
            attackerCharId = "a1", defenderCharId = "d1",
            activeUnitOwnerId = "p1", tiles = emptyList(), units = listOf(defender)
        )

        // Attacker with attack = 22 vs defense = 4
        // Base damage = 22 - (4 / 2) = 20

        // 1. FRONT ATTACK (Attacker is to the EAST, where defender is facing)
        val frontAttacker = TacticalUnit(
            id = "atk_front", ownerPlayerId = "p1", unitType = TacticalUnitType.WARRIOR_HERO,
            x = 4, y = 3, currentHp = 50, maxHp = 50, attack = 22, defense = 4
        )
        assertEquals(TacticalAttackAngle.FRONT, TacticalRules.determineAttackAngle(frontAttacker, defender))
        val frontDmg = TacticalRules.calculateDamage(frontAttacker, defender, battleState, rngVariance = 0)
        assertEquals(20, frontDmg) // Base 20 * 1.0 = 20

        // 2. FLANK ATTACK (Attacker is to the SOUTH, 90 degrees to defender's facing)
        val flankAttacker = TacticalUnit(
            id = "atk_flank", ownerPlayerId = "p1", unitType = TacticalUnitType.WARRIOR_HERO,
            x = 3, y = 4, currentHp = 50, maxHp = 50, attack = 22, defense = 4
        )
        assertEquals(TacticalAttackAngle.FLANK, TacticalRules.determineAttackAngle(flankAttacker, defender))
        val flankDmg = TacticalRules.calculateDamage(flankAttacker, defender, battleState, rngVariance = 0)
        assertEquals(30, flankDmg) // Base 20 * 1.5 = 30 (+50% bonus!)

        // 3. REAR ATTACK (Attacker is to the WEST, directly behind defender)
        val rearAttacker = TacticalUnit(
            id = "atk_rear", ownerPlayerId = "p1", unitType = TacticalUnitType.WARRIOR_HERO,
            x = 2, y = 3, currentHp = 50, maxHp = 50, attack = 22, defense = 4
        )
        assertEquals(TacticalAttackAngle.REAR, TacticalRules.determineAttackAngle(rearAttacker, defender))
        val rearDmg = TacticalRules.calculateDamage(rearAttacker, defender, battleState, rngVariance = 0)
        assertEquals(40, rearDmg) // Base 20 * 2.0 = 40 (Double bonus / x2.0!)

        // Test cardinal directions when defender faces NORTH
        val defenderNorth = defender.copy(facing = UnitFacing.NORTH)
        val northAttacker = TacticalUnit(id = "a_n", ownerPlayerId = "p1", unitType = TacticalUnitType.WARRIOR_HERO, x = 3, y = 2, currentHp = 50, maxHp = 50, attack = 22, defense = 4)
        val southAttacker = TacticalUnit(id = "a_s", ownerPlayerId = "p1", unitType = TacticalUnitType.WARRIOR_HERO, x = 3, y = 4, currentHp = 50, maxHp = 50, attack = 22, defense = 4)
        val eastAttacker = TacticalUnit(id = "a_e", ownerPlayerId = "p1", unitType = TacticalUnitType.WARRIOR_HERO, x = 4, y = 3, currentHp = 50, maxHp = 50, attack = 22, defense = 4)

        assertEquals(TacticalAttackAngle.FRONT, TacticalRules.determineAttackAngle(northAttacker, defenderNorth))
        assertEquals(TacticalAttackAngle.REAR, TacticalRules.determineAttackAngle(southAttacker, defenderNorth))
        assertEquals(TacticalAttackAngle.FLANK, TacticalRules.determineAttackAngle(eastAttacker, defenderNorth))

        assertEquals(20, TacticalRules.calculateDamage(northAttacker, defenderNorth, battleState, rngVariance = 0))
        assertEquals(40, TacticalRules.calculateDamage(southAttacker, defenderNorth, battleState, rngVariance = 0))
        assertEquals(30, TacticalRules.calculateDamage(eastAttacker, defenderNorth, battleState, rngVariance = 0))
    }

    @Test
    fun testDynamicBalanceUpdateReflectsInMemory() {
        val customJson = """
        {
          "version": "2.0-custom",
          "description": "Custom balance test",
          "units": {
            "HEAVY_INFANTRY": {
              "unitType": "HEAVY_INFANTRY",
              "name": "Super Juggernaut",
              "baseHp": 25,
              "baseAttack": 15,
              "baseDefense": 12,
              "weaponDefense": 14,
              "arrowDefense": 12,
              "magicDefense": 4,
              "defaultMoves": 4,
              "iconUrl": "/tactical/unit_heavy_infantry.jpg",
              "minRange": 1,
              "maxRange": 1,
              "attackPattern": "MELEE",
              "requiresLineOfSight": false,
              "bypassesArmor": false,
              "attackPerCount": 0.5,
              "defensePerCount": 0.3,
              "weaponDefensePerCount": 0.4,
              "arrowDefensePerCount": 0.3,
              "magicDefensePerCount": 0.1
            },
            "WARRIOR_HERO": {
              "unitType": "WARRIOR_HERO",
              "name": "Ascended Warrior",
              "baseHp": 100,
              "baseAttack": 20,
              "baseDefense": 15,
              "weaponDefense": 18,
              "arrowDefense": 12,
              "magicDefense": 8,
              "defaultMoves": 5,
              "iconUrl": "/tactical/hero_warrior.jpg",
              "minRange": 1,
              "maxRange": 1,
              "attackPattern": "MELEE",
              "requiresLineOfSight": false,
              "bypassesArmor": false,
              "hpScalingStat": "warlord",
              "hpScalingFactor": 10,
              "attackScalingFactor": 2.0,
              "defenseScalingDivisor": 1,
              "weaponDefenseScalingDivisor": 1,
              "arrowDefenseScalingDivisor": 2,
              "magicDefenseScalingDivisor": 3
            }
          },
          "rules": {
            "prevalenceBonusSingle": 1.5,
            "prevalenceBonusTied": 1.25,
            "bodyguardDefenseBonus": 6
          }
        }
        """.trimIndent()

        // Load custom JSON into memory
        TacticalBalanceRepository.loadFromJson(customJson)

        // Verify property extensions read from in-memory balance
        assertEquals(25, TacticalUnitType.HEAVY_INFANTRY.baseHp)
        assertEquals(15, TacticalUnitType.HEAVY_INFANTRY.baseAttack)
        assertEquals(14, TacticalUnitType.HEAVY_INFANTRY.weaponDefense)
        assertEquals(12, TacticalUnitType.HEAVY_INFANTRY.arrowDefense)
        assertEquals(4, TacticalUnitType.HEAVY_INFANTRY.magicDefense)
        assertEquals(4, TacticalUnitType.HEAVY_INFANTRY.defaultMoves)

        assertEquals(100, TacticalUnitType.WARRIOR_HERO.baseHp)
        assertEquals(20, TacticalUnitType.WARRIOR_HERO.baseAttack)
        assertEquals(18, TacticalUnitType.WARRIOR_HERO.weaponDefense)
        assertEquals(12, TacticalUnitType.WARRIOR_HERO.arrowDefense)
        assertEquals(8, TacticalUnitType.WARRIOR_HERO.magicDefense)
        assertEquals(5, TacticalUnitType.WARRIOR_HERO.defaultMoves)

        // Verify createHeroUnit uses the updated balance and distinct defenses
        val char = Character(
            id = "w1", playerId = "p1", name = "Gorn",
            warlord = 6, vanguard = 1, archon = 1, intellect = 1
        )
        val hero = TacticalRules.createHeroUnit("b1", char, "p1", Team.RED, 0, 0)
        // maxHp = baseHp(100) + warlord(6) * hpScalingFactor(10) = 160
        assertEquals(160, hero.maxHp)
        // atk = baseAttack(20) + (warlord(6) * attackScalingFactor(2.0)) = 32
        assertEquals(32, hero.attack)
        // weaponDef = baseWeaponDefense(18) + (warlord(6) / weaponDefenseScalingDivisor(1)) = 24
        assertEquals(24, hero.weaponDefense)
        // arrowDef = baseArrowDefense(12) + (warlord(6) / arrowDefenseScalingDivisor(2)) = 15
        assertEquals(15, hero.arrowDefense)
        // magicDef = baseMagicDefense(8) + (warlord(6) / magicDefenseScalingDivisor(3)) = 10
        assertEquals(10, hero.magicDefense)
        assertEquals(5, hero.maxMoves)

        // Verify createTroopUnit uses the updated balance
        val army = Army(heavyInfantry = 10)
        val troop = TacticalRules.createTroopUnit("b1", TacticalUnitType.HEAVY_INFANTRY, 10, army, "p1", Team.RED, 0, 0)
        assertEquals(250, troop.maxHp)
        assertEquals(4, troop.maxMoves)
        // Prevalence multiplier single dominant = 1.5
        val (mult, isPrev) = TacticalRules.calculatePrevalenceMultiplier(TacticalUnitType.HEAVY_INFANTRY, army)
        assertEquals(1.5, mult)
        assertTrue(isPrev)

        // Reset and verify return to default
        TacticalBalanceRepository.resetToDefaults()
        assertEquals(9, TacticalUnitType.HEAVY_INFANTRY.baseHp)
        assertEquals(6, TacticalUnitType.HEAVY_INFANTRY.baseAttack)
        assertEquals(58, TacticalUnitType.WARRIOR_HERO.baseHp)
        assertEquals(9, TacticalUnitType.WARRIOR_HERO.weaponDefense)
    }

    @Test
    fun testCombatRulesMatrixAndDamageCalculationWithBalance() {
        TacticalBalanceLoader.loadBalanceSettings()

        val archerHero = TacticalUnit(
            id = "ah1", name = "Diego", unitType = TacticalUnitType.ARCHER_HERO,
            ownerPlayerId = "p1", ownerTeam = Team.RED,
            x = 2, y = 2, currentHp = 50, maxHp = 50, attack = 15, defense = 5,
            movesRemaining = 3, maxMoves = 3
        )

        val targetOrthogonal = TacticalUnit(
            id = "t1", name = "Target 1", unitType = TacticalUnitType.LIGHT_INFANTRY,
            ownerPlayerId = "p2", ownerTeam = Team.BLUE,
            x = 2, y = 4, currentHp = 20, maxHp = 20, attack = 5, defense = 3,
            arrowDefense = 3,
            movesRemaining = 3, maxMoves = 3,
            facing = UnitFacing.NORTH
        )

        val targetDiagonal = TacticalUnit(
            id = "t2", name = "Target 2", unitType = TacticalUnitType.LIGHT_INFANTRY,
            ownerPlayerId = "p2", ownerTeam = Team.BLUE,
            x = 3, y = 3, currentHp = 20, maxHp = 20, attack = 5, defense = 3,
            arrowDefense = 3,
            movesRemaining = 3, maxMoves = 3
        )

        val battleState = TacticalBattleState(
            battleId = "b1",
            sectorId = "1",
            gridWidth = 10,
            gridHeight = 8,
            tiles = List(8) { List(10) { TacticalTileType.PLAIN } },
            attackerPlayerId = "p1",
            defenderPlayerId = "p2",
            attackerCharId = "ah1",
            defenderCharId = "t1",
            activeUnitOwnerId = "p1",
            units = listOf(archerHero, targetOrthogonal, targetDiagonal)
        )

        // Archer Hero has ORTHOGONAL range 1..2
        assertTrue(TacticalRules.canAttackTarget(archerHero, targetOrthogonal, battleState))
        assertFalse(TacticalRules.canAttackTarget(archerHero, targetDiagonal, battleState))

        // Regular Archer has ORTHOGONAL range 1..2 (as configured in balance)
        val regularArcher = TacticalUnit(
            id = "ra1", name = "Archer Squad", unitType = TacticalUnitType.ARCHER,
            ownerPlayerId = "p1", ownerTeam = Team.RED,
            x = 2, y = 2, currentHp = 30, maxHp = 30, attack = 10, defense = 3,
            damageType = "ARROW",
            movesRemaining = 2, maxMoves = 2
        )
        val archerState = battleState.copy(units = listOf(regularArcher, targetOrthogonal, targetDiagonal))
        assertTrue(TacticalRules.canAttackTarget(regularArcher, targetOrthogonal, archerState)) // vertical (dx=0, dy=2)

        // Damage calculation: effectiveAtk(10) - arrowDef(3 / 2 = 1) = 9
        val damage = TacticalRules.calculateDamage(regularArcher, targetOrthogonal, archerState, rngVariance = 0)
        assertEquals(9, damage)
    }
}
