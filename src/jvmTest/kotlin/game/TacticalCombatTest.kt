package game

import models.*
import kotlin.test.*
import kotlinx.coroutines.runBlocking

class TacticalCombatTest {

    @Test
    fun testSquadLimitConstantAndRecruitmentEnforcement() = runBlocking {
        assertEquals(20, MAX_SQUAD_SIZE)

        val session = GameSession()
        session.startPvEGame(
            playerId = "player1",
            gameName = "Test Game",
            allowSecondPlayer = false,
            playerTeam = Team.RED,
            playerTeamColor = "#D32F2F",
            playerTeamName = "Red Clan",
            chosenHeroes = listOf(PredefinedCharacters[0].templateId, PredefinedCharacters[1].templateId),
            chosenCastle = "14"
        )

        val char = session.gameState.characters.find { it.playerId == "player1" && !it.isDead }!!
        
        // Place character at castle sector "14" (protection 20) with sufficient gold
        session.gameState = session.gameState.copy(
            characters = session.gameState.characters.map {
                if (it.id == char.id) it.copy(currentSector = "14", gold = 1000, food = 500) else it
            }
        )

        // Try recruiting more than MAX_SQUAD_SIZE (20)
        session.recruitArmy("player1", unitType = ArmyType.ARCHERS, count = 25, characterId = char.id)
        val charAfter = session.gameState.characters.find { it.id == char.id }!!
        // Should be rejected because char.army.total() + 25 > 20
        assertEquals(0, charAfter.army.archers)

        // Recruit exactly 15 troops (valid: 15 <= 20)
        session.recruitArmy("player1", unitType = ArmyType.ARCHERS, count = 15, characterId = char.id)
        val charRecruited = session.gameState.characters.find { it.id == char.id }!!
        assertEquals(15, charRecruited.army.archers)
        assertEquals(15, charRecruited.army.total())

        // Try adding 10 more (15 + 10 = 25 > 20, rejected)
        session.recruitArmy("player1", unitType = ArmyType.ARCHERS, count = 10, characterId = char.id)
        val charRejected = session.gameState.characters.find { it.id == char.id }!!
        assertEquals(15, charRejected.army.archers)
    }

    @Test
    fun testHeroArchetypeDerivation() {
        val warriorChar = Character(
            id = "w1", playerId = "p1", name = "Gorn",
            warlord = 8, vanguard = 3, archon = 2, intellect = 2
        )
        val warriorArchetype = TacticalRules.deriveHeroArchetype(warriorChar)
        assertEquals(TacticalUnitType.WARRIOR_HERO, warriorArchetype)
        val warriorUnit = TacticalRules.createHeroUnit("b1", warriorChar, "p1", Team.RED, 0, 3)
        assertEquals(TacticalUnitType.WARRIOR_HERO, warriorUnit.unitType)
        assertEquals(2, warriorUnit.maxMoves)
        assertEquals(16, warriorUnit.attack) // base 8 + 8 warlord = 16

        val archerChar = Character(
            id = "a1", playerId = "p1", name = "Diego",
            warlord = 3, vanguard = 9, archon = 1, intellect = 4
        )
        val archerArchetype = TacticalRules.deriveHeroArchetype(archerChar)
        assertEquals(TacticalUnitType.ARCHER_HERO, archerArchetype)
        val archerUnit = TacticalRules.createHeroUnit("b1", archerChar, "p1", Team.RED, 0, 3)
        assertEquals(TacticalUnitType.ARCHER_HERO, archerUnit.unitType)
        assertEquals(3, archerUnit.maxMoves)
        assertEquals(16, archerUnit.attack) // base 7 + 9 vanguard = 16

        val mageChar = Character(
            id = "m1", playerId = "p1", name = "Milten",
            warlord = 2, vanguard = 2, archon = 10, intellect = 7
        )
        val mageArchetype = TacticalRules.deriveHeroArchetype(mageChar)
        assertEquals(TacticalUnitType.MAGE_HERO, mageArchetype)
        val mageUnit = TacticalRules.createHeroUnit("b1", mageChar, "p1", Team.RED, 0, 3)
        assertEquals(TacticalUnitType.MAGE_HERO, mageUnit.unitType)
        assertEquals(2, mageUnit.maxMoves)
        assertEquals(18, mageUnit.attack) // base 8 + 10 archon = 18
    }

    @Test
    fun testPrevalenceBasedStrengthScaling() {
        // Army with 10 heavy infantry, 4 archers, 2 mages -> Heavy infantry is dominant
        val army = Army(heavyInfantry = 10, archers = 4, mages = 2, lightInfantry = 0)
        
        val (multiplierHeavy, isPrevalentHeavy) = TacticalRules.calculatePrevalenceMultiplier(TacticalUnitType.HEAVY_INFANTRY, army)
        assertEquals(1.25, multiplierHeavy)
        assertTrue(isPrevalentHeavy)

        val (multiplierArcher, isPrevalentArcher) = TacticalRules.calculatePrevalenceMultiplier(TacticalUnitType.ARCHER, army)
        assertEquals(1.0, multiplierArcher)
        assertFalse(isPrevalentArcher)

        // Test tied prevalence
        val tiedArmy = Army(heavyInfantry = 5, archers = 5, mages = 0, lightInfantry = 0)
        val (multiplierTied, isPrevalentTied) = TacticalRules.calculatePrevalenceMultiplier(TacticalUnitType.HEAVY_INFANTRY, tiedArmy)
        assertEquals(1.15, multiplierTied)
        assertTrue(isPrevalentTied)

        // Spawning troop figurine for Heavy Infantry (10 fighters)
        val heavyUnit = TacticalRules.createTroopUnit(
            battleId = "b1",
            type = TacticalUnitType.HEAVY_INFANTRY,
            count = 10,
            army = army,
            playerId = "p1",
            team = Team.RED,
            spawnX = 1,
            spawnY = 2
        )
        assertTrue(heavyUnit.isPrevalentUnit)
        assertEquals(10, heavyUnit.initialSquadCount)
        assertEquals(90, heavyUnit.maxHp) // BaseHP (9) * 10 = 90
        // Attack: (BaseATK 6 + (10 * 0.5).toInt() = 11) * 1.25 = 13.75 -> 14
        assertEquals(14, heavyUnit.attack)
        // Defense: (BaseDEF 6 + (10 * 0.3).toInt() = 9) * 1.25 = 11.25 -> 11
        assertEquals(11, heavyUnit.defense)
    }

    @Test
    fun testTacticalMapGenerationAndBiomes() {
        // Test deterministic generation
        val (biome1, tiles1) = TacticalMapGenerator.generateMap("1")
        val (biome2, tiles2) = TacticalMapGenerator.generateMap("1")
        assertEquals(tiles1, tiles2)
        assertEquals(biome1, biome2)

        // Test Forest sector (Sector 1 Northern Grimwald)
        val forestBiome = TacticalMapGenerator.detectBiome("1")
        assertEquals(TacticalBiome.FOREST, forestBiome)
        assertTrue(tiles1.any { row -> row.any { it == TacticalTileType.FOREST } })

        // Test River sector (Sector 16 Erol's Bridge)
        val riverBiome = TacticalMapGenerator.detectBiome("16")
        assertEquals(TacticalBiome.RIVER, riverBiome)
        val (_, riverTiles) = TacticalMapGenerator.generateMap("16")
        assertTrue(riverTiles.any { row -> row.any { it == TacticalTileType.RIVER } })
        assertTrue(riverTiles.any { row -> row.any { it == TacticalTileType.BRIDGE } })

        // Test Canyon sector (Sector 8 Snapper Gorge)
        val canyonBiome = TacticalMapGenerator.detectBiome("8")
        assertEquals(TacticalBiome.CANYON, canyonBiome)
        val (_, canyonTiles) = TacticalMapGenerator.generateMap("8")
        assertTrue(canyonTiles.any { row -> row.any { it == TacticalTileType.CLIFF_ROCK } })

        // Test Fortress / Castle sector (Sector 14 Khorinis City)
        val castleBiome = TacticalMapGenerator.detectBiome("14")
        assertEquals(TacticalBiome.FORTRESS, castleBiome)
        val (_, castleTiles) = TacticalMapGenerator.generateMap("14")
        assertTrue(castleTiles.any { row -> row.any { it == TacticalTileType.FORTRESS_WALL } })
        assertTrue(castleTiles.any { row -> row.any { it == TacticalTileType.FORTRESS_GATE } })
    }

    @Test
    fun testMovementAndAttackVectors() {
        val tiles = List(8) { List(10) { TacticalTileType.PLAIN } }
        val warriorHero = TacticalUnit(
            id = "w_hero", ownerPlayerId = "p1", unitType = TacticalUnitType.WARRIOR_HERO,
            x = 2, y = 2, currentHp = 100, maxHp = 100, attack = 15, defense = 8,
            maxMoves = 2, movesRemaining = 2
        )
        val enemyInfantry = TacticalUnit(
            id = "e_inf", ownerPlayerId = "p2", unitType = TacticalUnitType.HEAVY_INFANTRY,
            x = 2, y = 3, currentHp = 50, maxHp = 50, attack = 10, defense = 5,
            maxMoves = 2, movesRemaining = 2
        )
        val state = TacticalBattleState(
            battleId = "b1", sectorId = "0", tiles = tiles,
            attackerPlayerId = "p1", defenderPlayerId = "p2",
            attackerCharId = "c1", defenderCharId = "c2",
            attackerStrategy = BattleStrategy.NONE,
            activeUnitOwnerId = "p1", roundNumber = 1,
            units = listOf(warriorHero, enemyInfantry)
        )

        // Warrior can attack adjacent enemy at (2, 3)
        assertTrue(TacticalRules.canAttackTarget(warriorHero, enemyInfantry, state))

        // Archer Hero: orthogonal horizontal or vertical range 1-2
        val archerHero = TacticalUnit(
            id = "a_hero", ownerPlayerId = "p1", unitType = TacticalUnitType.ARCHER_HERO,
            x = 2, y = 2, currentHp = 80, maxHp = 80, attack = 14, defense = 5,
            maxMoves = 3, movesRemaining = 3
        )
        val enemyOrthogonal = TacticalUnit(
            id = "e_orth", ownerPlayerId = "p2", unitType = TacticalUnitType.LIGHT_INFANTRY,
            x = 4, y = 2, currentHp = 40, maxHp = 40, attack = 8, defense = 3,
            maxMoves = 3, movesRemaining = 3
        )
        val enemyDiagonal = TacticalUnit(
            id = "e_diag", ownerPlayerId = "p2", unitType = TacticalUnitType.LIGHT_INFANTRY,
            x = 3, y = 3, currentHp = 40, maxHp = 40, attack = 8, defense = 3,
            maxMoves = 3, movesRemaining = 3
        )
        val archerState = state.copy(units = listOf(archerHero, enemyOrthogonal, enemyDiagonal))

        // Archer Hero can attack orthogonal (dx=2, dy=0)
        assertTrue(TacticalRules.canAttackTarget(archerHero, enemyOrthogonal, archerState))
        // Archer Hero CANNOT attack diagonal
        assertFalse(TacticalRules.canAttackTarget(archerHero, enemyDiagonal, archerState))

        // Regular Archer: diagonal or vertical range 1-2
        val regularArcher = TacticalUnit(
            id = "arch", ownerPlayerId = "p1", unitType = TacticalUnitType.ARCHER,
            x = 2, y = 2, currentHp = 50, maxHp = 50, attack = 10, defense = 4,
            maxMoves = 2, movesRemaining = 2
        )
        val regularArcherState = state.copy(units = listOf(regularArcher, enemyOrthogonal, enemyDiagonal))
        // Regular Archer CAN attack diagonal
        assertTrue(TacticalRules.canAttackTarget(regularArcher, enemyDiagonal, regularArcherState))
        // Regular Archer CANNOT attack purely horizontal (dx=2, dy=0)
        assertFalse(TacticalRules.canAttackTarget(regularArcher, enemyOrthogonal, regularArcherState))
    }

    @Test
    fun testDamageCalculationAndCasualtyMapping() {
        val attacker = TacticalUnit(
            id = "u1", ownerPlayerId = "p1", unitType = TacticalUnitType.WARRIOR_HERO,
            x = 1, y = 1, currentHp = 100, maxHp = 100, attack = 20, defense = 10,
            maxMoves = 2, movesRemaining = 2
        )
        val defender = TacticalUnit(
            id = "u2", ownerPlayerId = "p2", unitType = TacticalUnitType.HEAVY_INFANTRY,
            x = 1, y = 2, currentHp = 100, maxHp = 100, attack = 10, defense = 8,
            maxMoves = 2, movesRemaining = 2, initialSquadCount = 10
        )
        val state = TacticalBattleState(
            battleId = "b1", sectorId = "0",
            tiles = List(8) { List(10) { TacticalTileType.PLAIN } },
            attackerPlayerId = "p1", defenderPlayerId = "p2",
            attackerCharId = "c1", defenderCharId = "c2",
            attackerStrategy = BattleStrategy.NONE,
            activeUnitOwnerId = "p1", units = listOf(attacker, defender)
        )

        // Damage = max(1, 20 - (8 / 2)) = 16
        val damage = TacticalRules.calculateDamage(attacker, defender, state)
        assertEquals(16, damage)

        // Mage unit bypasses physical armor (effectiveDef min 1)
        val mageAttacker = attacker.copy(unitType = TacticalUnitType.MAGE, attack = 18)
        val mageDamage = TacticalRules.calculateDamage(mageAttacker, defender, state)
        // effectiveDef = min(8, 1) = 1 -> damage = 18 - (1 / 2) = 18
        assertEquals(18, mageDamage)

        // Casualty conversion: initial squad = 10, maxHp = 100.
        // If currentHp drops to 50: ceil(10 * 50 / 100) = 5
        assertEquals(5, TacticalRules.calculateSurvivingCount(10, 50, 100))
        // If currentHp drops to 1: ceil(10 * 1 / 100) = 1
        assertEquals(1, TacticalRules.calculateSurvivingCount(10, 1, 100))
        // If currentHp drops to 0: 0
        assertEquals(0, TacticalRules.calculateSurvivingCount(10, 0, 100))
    }

    @Test
    fun testTacticalAiAutoResolve() {
        val attackerHero = TacticalUnit(
            id = "a1", ownerPlayerId = "p1", unitType = TacticalUnitType.WARRIOR_HERO,
            x = 1, y = 3, currentHp = 120, maxHp = 120, attack = 25, defense = 12,
            maxMoves = 2, movesRemaining = 2
        )
        val defenderHero = TacticalUnit(
            id = "d1", ownerPlayerId = "p2", unitType = TacticalUnitType.WARRIOR_HERO,
            x = 8, y = 3, currentHp = 80, maxHp = 80, attack = 15, defense = 8,
            maxMoves = 2, movesRemaining = 2
        )
        val battle = TacticalBattleState(
            battleId = "b_auto", sectorId = "0",
            tiles = List(8) { List(10) { TacticalTileType.PLAIN } },
            attackerPlayerId = "p1", defenderPlayerId = "p2",
            attackerCharId = "c1", defenderCharId = "c2",
            attackerStrategy = BattleStrategy.NONE,
            activeUnitOwnerId = "p1", units = listOf(attackerHero, defenderHero)
        )

        val (resolvedBattle, winnerId) = TacticalAiService.autoResolve(battle)
        assertTrue(resolvedBattle.isFinished)
        assertNotNull(winnerId)
        assertTrue(winnerId == "p1" || winnerId == "p2")
        assertTrue(resolvedBattle.units.any { !it.isAlive })
    }

    @Test
    fun testAttackAndMoveFlow() = runBlocking {
        val session = GameSession()
        session.gameState = session.gameState.copy(
            players = listOf(
                Player(id = "player1", name = "player1", team = Team.RED),
                Player(id = "bot_1", name = "Computer", team = Team.YELLOW, isBot = true)
            )
        )
        val attackerUnit = TacticalUnit(
            id = "atk_1", ownerPlayerId = "player1", unitType = TacticalUnitType.WARRIOR_HERO,
            x = 2, y = 2, currentHp = 100, maxHp = 100, attack = 15, defense = 8,
            maxMoves = 2, movesRemaining = 2
        )
        val defenderUnit = TacticalUnit(
            id = "def_1", ownerPlayerId = "bot_1", unitType = TacticalUnitType.HEAVY_INFANTRY,
            x = 2, y = 3, currentHp = 50, maxHp = 50, attack = 10, defense = 5,
            maxMoves = 2, movesRemaining = 2
        )
        val battle = TacticalBattleState(
            battleId = "b_test", sectorId = "14",
            tiles = List(8) { List(10) { TacticalTileType.PLAIN } },
            attackerPlayerId = "player1", defenderPlayerId = "bot_1",
            attackerCharId = "c1", defenderCharId = "c2",
            attackerStrategy = BattleStrategy.NONE,
            activeUnitOwnerId = "player1", roundNumber = 1,
            units = listOf(attackerUnit, defenderUnit)
        )
        session.gameState = session.gameState.copy(activeTacticalBattle = battle)

        // Attacker attacks defender
        session.tacticalAttackUnit("player1", "b_test", "atk_1", "def_1")

        val battleAfterAttack = session.gameState.activeTacticalBattle!!
        val freshAttacker = battleAfterAttack.units.find { it.id == "atk_1" }!!
        assertTrue(freshAttacker.hasAttackedThisTurn)
        println("Fresh attacker movesRemaining: ${freshAttacker.movesRemaining}")

        // Now try to move to (2, 1)
        val validMoves = TacticalRules.findValidMoves(freshAttacker, battleAfterAttack)
        println("Valid moves after attack: $validMoves")
        session.tacticalMoveUnit("player1", "b_test", "atk_1", 2, 1)

        val battleAfterMove = session.gameState.activeTacticalBattle!!
        val freshAttackerAfterMove = battleAfterMove.units.find { it.id == "atk_1" }!!
        println("Fresh attacker position after move: (${freshAttackerAfterMove.x}, ${freshAttackerAfterMove.y})")
    }

    @Test
    fun testTacticalCombatTriggerFromMoveCharacterAndAutoResolve() = runBlocking {
        val session = GameSession()
        session.startPvEGame(
            playerId = "player1",
            gameName = "Tactical Test Game",
            allowSecondPlayer = false,
            playerTeam = Team.RED,
            playerTeamColor = "#D32F2F",
            playerTeamName = "Red Clan",
            chosenHeroes = listOf(PredefinedCharacters[0].templateId, PredefinedCharacters[1].templateId),
            chosenCastle = "14"
        )

        val humanChars = session.gameState.characters.filter { it.playerId == "player1" }
        val botPlayer = session.gameState.players.find { it.isBot }!!
        val botChars = session.gameState.characters.filter { it.playerId == botPlayer.id }

        val humanHero = humanChars[0]
        val otherHuman = humanChars[1]
        val botHero = botChars[0]
        val otherBot = botChars[1]

        // Sector 14 (Khorinis City) is adjacent to Sector 11 (Khorinis East Gate)
        // Position humanHero on sector "14", and botHero on adjacent sector "11"
        // Move other characters out of the way
        session.gameState = session.gameState.copy(
            status = GameStatus.IN_PROGRESS,
            activeTeamTurn = Team.RED,
            characters = listOf(
                humanHero.copy(currentSector = "14", hasActedThisTurn = false, army = Army(heavyInfantry = 5)),
                otherHuman.copy(currentSector = "25", hasActedThisTurn = true),
                botHero.copy(currentSector = "11", hasActedThisTurn = false, army = Army(lightInfantry = 5)),
                otherBot.copy(currentSector = "23", hasActedThisTurn = false)
            )
        )

        // Move humanHero into adjacent sector 11 where botHero is located -> triggers tactical combat
        session.moveCharacter("player1", targetSector = "11", characterId = humanHero.id)

        val activeBattle = session.gameState.activeTacticalBattle
        assertNotNull(activeBattle, "Tactical battle should be active after moving into enemy territory")
        assertEquals("11", activeBattle.sectorId)
        assertEquals("player1", activeBattle.attackerPlayerId)
        assertEquals(botPlayer.id, activeBattle.defenderPlayerId)
        assertTrue(activeBattle.units.isNotEmpty(), "Battle should have spawned figurines")

        // Auto resolve tactical battle
        session.tacticalAutoResolve("player1", activeBattle.battleId)

        // Active battle should now be concluded and cleared
        assertNull(session.gameState.activeTacticalBattle, "Battle should be cleared after auto-resolution")
    }

    @Test
    fun testTacticalCombatTriggerFromPlaceCharacter() = runBlocking {
        val session = GameSession()
        session.startPvEGame(
            playerId = "player1",
            gameName = "Tactical Place Test",
            allowSecondPlayer = false,
            playerTeam = Team.RED,
            playerTeamColor = "#D32F2F",
            playerTeamName = "Red Clan",
            chosenHeroes = listOf(PredefinedCharacters[0].templateId, PredefinedCharacters[1].templateId),
            chosenCastle = "14"
        )

        val humanChars = session.gameState.characters.filter { it.playerId == "player1" }
        val botPlayer = session.gameState.players.find { it.isBot }!!
        val botChars = session.gameState.characters.filter { it.playerId == botPlayer.id }

        val humanHero = humanChars[0]
        val otherHuman = humanChars[1]
        val botHero = botChars[0]
        val otherBot = botChars[1]

        // Human is in reserve (currentSector == null), enemy bot is alone in sector 11
        session.gameState = session.gameState.copy(
            status = GameStatus.IN_PROGRESS,
            activeTeamTurn = Team.RED,
            characters = listOf(
                humanHero.copy(currentSector = null, hasActedThisTurn = false, army = Army(heavyInfantry = 8)),
                otherHuman.copy(currentSector = "14", hasActedThisTurn = true),
                botHero.copy(currentSector = "11", hasActedThisTurn = false, army = Army(archers = 4)),
                otherBot.copy(currentSector = "23", hasActedThisTurn = false)
            )
        )

        // Place humanHero into sector 11 -> triggers tactical combat
        session.placeCharacter("player1", targetSector = "11", characterId = humanHero.id)

        val activeBattle = session.gameState.activeTacticalBattle
        assertNotNull(activeBattle, "Tactical battle should be active after placeCharacter into enemy sector")
        assertEquals("11", activeBattle.sectorId)

        // Retreat from tactical battle
        session.tacticalRetreat("player1", activeBattle.battleId)
        assertNull(session.gameState.activeTacticalBattle, "Battle should be concluded after retreat")
    }
}
