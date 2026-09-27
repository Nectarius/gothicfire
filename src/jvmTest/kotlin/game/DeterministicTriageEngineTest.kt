package game

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue
import models.*

class DeterministicTriageEngineTest {

    @Test
    fun testCastleUnderImmediateAttackTriggersRecruitOverride() {
        val botPlayer = Player(id = "bot_1", name = "Bot", team = Team.YELLOW, isBot = true)
        val enemyPlayer = Player(id = "enemy_1", name = "Human", team = Team.RED, isBot = false)

        // Castle Khorinis is Sector 14. Adjacent is Sector 11.
        val botChar = Character(
            id = "bot_char_1",
            playerId = "bot_1",
            name = "Garrison Commander",
            gold = 100,
            food = 50,
            army = Army(heavyInfantry = 0),
            currentSector = "14"
        )
        val enemyChar = Character(
            id = "enemy_char_1",
            playerId = "enemy_1",
            name = "Enemy Raider",
            army = Army(lightInfantry = 20),
            currentSector = "11"
        )

        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            players = listOf(botPlayer, enemyPlayer),
            characters = listOf(botChar, enemyChar),
            currentTurn = 2,
            teamCastles = mapOf(Team.YELLOW to "14", Team.RED to "23"),
            territories = mapOf("14" to TerritoryState(sectorId = "14", protection = 20, ownerPlayerId = "bot_1", ownerTeam = Team.YELLOW))
        )

        val snapshot = BotGameStateSnapshot(
            gameState = gameState,
            botTeam = Team.YELLOW,
            botCharacters = listOf(botChar),
            botPlayers = listOf(botPlayer)
        )

        // Castle is under immediate threat and garrison has 0 troops
        val overrideAction = DeterministicTriageEngine.evaluateCriticalStateOverride(botChar, snapshot, mustStayAtCastle = true)
        assertNotNull(overrideAction, "Emergency castle threat should trigger deterministic override")
        assertTrue(overrideAction is BotAction.Recruit, "Should recruit defenders immediately: $overrideAction")
        assertEquals(ArmyType.HEAVY_INFANTRY, overrideAction.unitType)
    }

    @Test
    fun testFoodStarvationEmergencyTriggersResourceCollection() {
        val botPlayer = Player(id = "bot_1", name = "Bot", team = Team.YELLOW, isBot = true)
        // Army has 20 units (needs 20 food/turn), but character only has 5 food!
        val botChar = Character(
            id = "bot_char_1",
            playerId = "bot_1",
            name = "Starving General",
            gold = 50,
            food = 5,
            army = Army(heavyInfantry = 20),
            currentSector = "16"
        )

        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            players = listOf(botPlayer),
            characters = listOf(botChar),
            currentTurn = 5,
            teamCastles = mapOf(Team.YELLOW to "14"),
            territories = mapOf("16" to TerritoryState(sectorId = "16", food = 30, gold = 10, ownerPlayerId = "bot_1", ownerTeam = Team.YELLOW))
        )

        val snapshot = BotGameStateSnapshot(
            gameState = gameState,
            botTeam = Team.YELLOW,
            botCharacters = listOf(botChar),
            botPlayers = listOf(botPlayer)
        )

        val overrideAction = DeterministicTriageEngine.evaluateCriticalStateOverride(botChar, snapshot, mustStayAtCastle = false)
        assertNotNull(overrideAction, "Food deficit with stored food must trigger emergency harvest override")
        assertTrue(overrideAction is BotAction.CollectResources)
        assertEquals("16", overrideAction.sectorId)
    }

    @Test
    fun testSoleCastleGuardianForbiddenFromLeaving() {
        val botPlayer = Player(id = "bot_1", name = "Bot", team = Team.YELLOW, isBot = true)
        val botChar = Character(
            id = "bot_char_1",
            playerId = "bot_1",
            name = "Sole Guardian",
            gold = 10,
            food = 50,
            army = Army(heavyInfantry = 15),
            currentSector = "14"
        )

        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            players = listOf(botPlayer),
            characters = listOf(botChar),
            currentTurn = 4,
            teamCastles = mapOf(Team.YELLOW to "14"),
            territories = mapOf("14" to TerritoryState(sectorId = "14", protection = 20, ownerPlayerId = "bot_1", ownerTeam = Team.YELLOW))
        )

        val snapshot = BotGameStateSnapshot(
            gameState = gameState,
            botTeam = Team.YELLOW,
            botCharacters = listOf(botChar),
            botPlayers = listOf(botPlayer)
        )

        val overrideAction = DeterministicTriageEngine.evaluateCriticalStateOverride(botChar, snapshot, mustStayAtCastle = true)
        assertNotNull(overrideAction, "Sole castle guardian must have deterministic override")
        assertTrue(overrideAction is BotAction.Skip, "Guardian should hold position on castle walls")
    }

    @Test
    fun testStableStateReturnsNullForStrategicLLM() {
        val botPlayer = Player(id = "bot_1", name = "Bot", team = Team.YELLOW, isBot = true)
        val botChar = Character(
            id = "bot_char_1",
            playerId = "bot_1",
            name = "Expeditionary Force",
            gold = 100,
            food = 80,
            army = Army(heavyInfantry = 10, mages = 5),
            currentSector = "15" // Not castle, ample food, no immediate adjacent threat
        )

        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            players = listOf(botPlayer),
            characters = listOf(botChar),
            currentTurn = 6,
            teamCastles = mapOf(Team.YELLOW to "14"),
            territories = mapOf("15" to TerritoryState(sectorId = "15", ownerPlayerId = "bot_1", ownerTeam = Team.YELLOW))
        )

        val snapshot = BotGameStateSnapshot(
            gameState = gameState,
            botTeam = Team.YELLOW,
            botCharacters = listOf(botChar),
            botPlayers = listOf(botPlayer)
        )

        val overrideAction = DeterministicTriageEngine.evaluateCriticalStateOverride(botChar, snapshot, mustStayAtCastle = false)
        assertNull(overrideAction, "Stable board state must return null to allow LLM strategic decision")
    }
}
