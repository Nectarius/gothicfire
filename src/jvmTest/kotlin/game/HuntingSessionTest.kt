package game

import kotlin.test.*
import kotlinx.coroutines.runBlocking
import models.*

class HuntingSessionTest {

    private fun createTestSession(): Pair<GameSession, Character> {
        val playerRed = Player(id = "player_red", name = "Alice", team = Team.RED)
        val playerBlue = Player(id = "player_blue", name = "Bob", team = Team.BLUE)

        val charRed = Character(
            id = "char_red",
            playerId = "player_red",
            name = "Milten",
            currentSector = "1", // Northern Grimwald (Wolves & Shadowbeast)
            army = Army(lightInfantry = 2),
            food = 20,
            gold = 50,
            hides = emptyMap()
        )

        val charRed2 = Character(
            id = "char_red_2",
            playerId = "player_red",
            name = "Diego",
            currentSector = "14",
            army = Army(archers = 2),
            food = 20,
            gold = 50
        )

        val charBlue = Character(
            id = "char_blue",
            playerId = "player_blue",
            name = "Gorn",
            currentSector = "23",
            army = Army(lightInfantry = 2),
            food = 20,
            gold = 50
        )

        val grimwaldTerr = TerritoryState(
            sectorId = "1",
            ownerPlayerId = "player_red",
            ownerTeam = Team.RED,
            protection = 10,
            cultivation = 10
        )

        val onarTerr = TerritoryState(
            sectorId = "23",
            ownerPlayerId = "player_blue",
            ownerTeam = Team.BLUE,
            protection = 20,
            cultivation = 14
        )

        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            gameName = "Hunting Test Game",
            players = listOf(playerRed, playerBlue),
            characters = listOf(charRed, charRed2, charBlue),
            activeTeamTurn = Team.RED,
            territories = mapOf("1" to grimwaldTerr, "23" to onarTerr),
            teamCastles = mapOf(Team.RED to "14", Team.BLUE to "23")
        )

        val session = GameSession(gameState = gameState, gameId = "test_hunting_session")
        return session to charRed
    }

    @Test
    fun testCriterion1_CampSetupCheck() = runBlocking {
        val (session, char) = createTestSession()

        // 1. Successful camp setup with >= 20 gold
        session.pitchHuntingCamp("player_red", char.id)
        val updatedChar = session.gameState.characters.find { it.id == char.id }!!
        assertEquals(30, updatedChar.gold, "Pitching camp must deduct exactly 20 gold")

        val camps = session.gameState.huntingCamps
        assertEquals(1, camps.size)
        val camp = camps.first()
        assertEquals("1", camp.sectorId, "Camp must be bound to current sector")
        assertEquals("player_red", camp.ownerPlayerId)

        // 2. Fails if player has less than 20 gold
        // Create poor character with 15 gold in sector 30 (Onar's Wheatfields)
        val poorChar = Character(
            id = "char_poor",
            playerId = "player_red",
            name = "PoorHunter",
            currentSector = "30",
            gold = 15
        )
        session.gameState = session.gameState.copy(characters = session.gameState.characters + poorChar)
        session.pitchHuntingCamp("player_red", "char_poor")

        val unchangedPoorChar = session.gameState.characters.find { it.id == "char_poor" }!!
        assertEquals(15, unchangedPoorChar.gold, "Gold must not be deducted on failure")
        assertEquals(1, session.gameState.huntingCamps.size, "No new camp should be pitched")
    }

    @Test
    fun testCriterion2_TurnConsumption() = runBlocking {
        val (session, char) = createTestSession()

        // Pitch camp first
        session.pitchHuntingCamp("player_red", char.id)

        // Harvest Wolf Fur
        session.harvestHide("player_red", char.id, HideType.WOLF)

        val charAfterHarvest = session.gameState.characters.find { it.id == char.id }!!
        assertEquals(1, charAfterHarvest.hides[HideType.WOLF], "Harvesting should add 1 Wolf Fur to inventory")
        assertTrue(charAfterHarvest.hasActedThisTurn, "Harvesting an animal hide must consume exactly 1 turn")

        // Second harvest in same turn should fail because hasActedThisTurn is true
        session.harvestHide("player_red", char.id, HideType.WOLF)
        val charAfterSecondHarvest = session.gameState.characters.find { it.id == char.id }!!
        assertEquals(1, charAfterSecondHarvest.hides[HideType.WOLF], "Second harvest attempt must be blocked")
    }

    @Test
    fun testCriterion3_SectorWhitelisting() = runBlocking {
        val (session, char) = createTestSession()
        session.pitchHuntingCamp("player_red", char.id)

        // In Sector 1, Black Troll Fur is NOT allowed (only in Sector 2)
        session.harvestHide("player_red", char.id, HideType.BLACK_TROLL)

        val charState = session.gameState.characters.find { it.id == char.id }!!
        assertEquals(0, charState.hides[HideType.BLACK_TROLL] ?: 0, "Harvesting non-whitelisted pelt must fail")
        assertFalse(charState.hasActedThisTurn, "Failed harvest must not consume the turn")
    }

    @Test
    fun testCriterion4_DialogueDataAccuracy() = runBlocking {
        val (session, char) = createTestSession()

        // Ask Bartok in Sector 1 about Troll Fur
        session.askHunterAboutHide("player_red", "1", "bartok", HideType.TROLL, char.id)

        val grounds = HuntingCatalog.groundsFor(HideType.TROLL)
        assertEquals(3, grounds.size)
        val groundSectors = grounds.flatMap { it.sectorIds }.toSet()
        assertTrue(groundSectors.containsAll(listOf("39", "2", "40")), "Troll fur habitats must include 39, 2, and 40")

        // Black Troll Fur should only return Sector 2
        val blackTrollGrounds = HuntingCatalog.groundsFor(HideType.BLACK_TROLL)
        assertEquals(1, blackTrollGrounds.size)
        assertEquals(listOf("2"), blackTrollGrounds.first().sectorIds)
    }

    @Test
    fun testCriterion5_TradeEnforcement() = runBlocking {
        val (session, char) = createTestSession()

        // Give char 2 Wolf furs
        session.gameState = session.gameState.copy(
            characters = session.gameState.characters.map {
                if (it.id == char.id) it.copy(hides = mapOf(HideType.WOLF to 2)) else it
            }
        )

        // First sale: Wolf Fur
        val initialGold = session.gameState.characters.find { it.id == char.id }!!.gold
        val wolfPrice = FurMarket.effectivePrice(HideType.WOLF, session.gameState.furMarket[HideType.WOLF]!!.multiplier)

        session.sellHide("player_red", char.id, HideType.WOLF)
        val charAfter1stSale = session.gameState.characters.find { it.id == char.id }!!
        assertEquals(1, charAfter1stSale.hides[HideType.WOLF], "1 pelt should be sold")
        assertEquals(initialGold + wolfPrice, charAfter1stSale.gold, "Gold should increase by pelt price")

        // Second sale of same type in same turn must be blocked
        session.sellHide("player_red", char.id, HideType.WOLF)
        val charAfter2ndSale = session.gameState.characters.find { it.id == char.id }!!
        assertEquals(1, charAfter2ndSale.hides[HideType.WOLF], "Second pelt sale in same turn must be blocked")
        assertEquals(initialGold + wolfPrice, charAfter2ndSale.gold, "Gold must not increase on blocked sale")

        // Reset turn quota (turn advances)
        session.gameState = session.gameState.copy(furSalesThisTurn = emptyMap())

        // Third sale after turn advance: should now succeed!
        session.sellHide("player_red", char.id, HideType.WOLF)
        val charAfterTurnSale = session.gameState.characters.find { it.id == char.id }!!
        assertEquals(0, charAfterTurnSale.hides[HideType.WOLF] ?: 0, "Pelt should be sold after turn advances")
    }

    @Test
    fun testCriterion6_ValueBoundaries() = runBlocking {
        val (session, char) = createTestSession()

        // Test with minimum multiplier (0.50)
        session.gameState = session.gameState.copy(
            furMarket = mapOf(HideType.TROLL to FurMarketEntry(multiplier = 0.50, trendUp = true)),
            characters = session.gameState.characters.map {
                if (it.id == char.id) it.copy(gold = 0, hides = mapOf(HideType.TROLL to 1)) else it
            }
        )
        session.sellHide("player_red", char.id, HideType.TROLL)
        val trollMinChar = session.gameState.characters.find { it.id == char.id }!!
        val expectedMin = kotlin.math.round(30 * 0.50).toInt() // 15
        assertEquals(expectedMin, trollMinChar.gold, "Payout must match minimum boundary (50%)")

        // Reset turn and test with maximum multiplier (2.00)
        session.gameState = session.gameState.copy(
            furSalesThisTurn = emptyMap(),
            furMarket = mapOf(HideType.TROLL to FurMarketEntry(multiplier = 2.00, trendUp = false)),
            characters = session.gameState.characters.map {
                if (it.id == char.id) it.copy(gold = 0, hides = mapOf(HideType.TROLL to 1)) else it
            }
        )
        session.sellHide("player_red", char.id, HideType.TROLL)
        val trollMaxChar = session.gameState.characters.find { it.id == char.id }!!
        val expectedMax = kotlin.math.round(30 * 2.00).toInt() // 60
        assertEquals(expectedMax, trollMaxChar.gold, "Payout must match maximum boundary (200%)")
    }
}
