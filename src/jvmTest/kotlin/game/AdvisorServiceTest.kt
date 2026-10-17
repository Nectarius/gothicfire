package game

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlinx.coroutines.runBlocking
import models.*

class AdvisorServiceTest {

    private fun createTestGameState(): GameState {
        val player = Player(id = "player_1", name = "Commander Alice", team = Team.RED, advisorId = "ZORAX")
        val bot = Player(id = "bot_1", name = "Computer", team = Team.YELLOW, isBot = true, advisorId = "ZORAX")
        val char1 = Character(id = "char_1", playerId = "player_1", name = "Milten", warlord = 5, army = Army(heavyInfantry = 6), gold = 100)
        val char2 = Character(id = "char_2", playerId = "bot_1", name = "Gorn", warlord = 6, army = Army(lightInfantry = 10), gold = 40)
        return GameState(
            status = GameStatus.IN_PROGRESS,
            gameName = "Test Campaign",
            players = listOf(player, bot),
            characters = listOf(char1, char2),
            currentTurn = 3,
            teamCastles = mapOf(Team.RED to "14", Team.YELLOW to "23")
        )
    }

    @Test
    fun testAdvisorOfflineFallbackForZorax() = runBlocking {
        val httpClient = HttpClient(CIO)
        val advisorService = AdvisorService(httpClient, agentUrl = "http://127.0.0.1:59999", timeoutMillis = 1000L)
        val gameState = createTestGameState()

        val statusResponse = advisorService.consultAdvisor(gameState, "player_1", "ZORAX", "STATUS")
        assertEquals("Zorax the Mighty", statusResponse.advisorName)
        assertTrue(statusResponse.advice.isNotBlank())
        assertTrue(statusResponse.keyPoints.isNotEmpty())
        assertTrue(statusResponse.advice.contains("Commander") || statusResponse.advice.contains("ranks"))

        val nextMoveResponse = advisorService.consultAdvisor(gameState, "player_1", "ZORAX", "NEXT_MOVE")
        assertTrue(nextMoveResponse.advice.contains("Heavy Infantry") || nextMoveResponse.advice.contains("vanguard"))

        val strategyResponse = advisorService.consultAdvisor(gameState, "player_1", "ZORAX", "STRATEGY")
        assertTrue(strategyResponse.advice.contains("castle") || strategyResponse.advice.contains("force"))
    }

    @Test
    fun testAdvisorOfflineFallbackForJade() = runBlocking {
        val httpClient = HttpClient(CIO)
        val advisorService = AdvisorService(httpClient, agentUrl = "http://127.0.0.1:59999", timeoutMillis = 1000L)
        val gameState = createTestGameState()

        val statusResponse = advisorService.consultAdvisor(gameState, "player_1", "JADE", "STATUS")
        assertEquals("Jade the Enlightened", statusResponse.advisorName)
        assertTrue(statusResponse.advice.isNotBlank())
        assertTrue(statusResponse.advice.contains("arcane") || statusResponse.advice.contains("ether") || statusResponse.advice.contains("Lord"))

        val strategyResponse = advisorService.consultAdvisor(gameState, "player_1", "JADE", "STRATEGY")
        assertTrue(strategyResponse.advice.contains("Mages") || strategyResponse.advice.contains("cultivation"))
    }

    @Test
    fun testJsonDeserializationWithSnakeCase() {
        val json = kotlinx.serialization.json.Json { ignoreUnknownKeys = true }
        val snakeCasePayload = """
            {
                "advisor_name": "Jade the Enlightened",
                "question_type": "STATUS",
                "advice": "The arcane tides flow with our colors.",
                "key_points": ["Conserve ether", "Expand cultivation"]
            }
        """.trimIndent()

        val decoded = json.decodeFromString<AdvisorConsultationResponse>(snakeCasePayload)
        assertEquals("Jade the Enlightened", decoded.advisorName)
        assertEquals("STATUS", decoded.questionType)
        assertEquals("The arcane tides flow with our colors.", decoded.advice)
        assertEquals(2, decoded.keyPoints.size)
        assertEquals("Conserve ether", decoded.keyPoints[0])
    }

    @Test
    fun testJsonDeserializationWithCamelCase() {
        val json = kotlinx.serialization.json.Json { ignoreUnknownKeys = true }
        val camelCasePayload = """
            {
                "advisorName": "Zorax the Mighty",
                "questionType": "NEXT_MOVE",
                "advice": "Hold the line, Commander.",
                "keyPoints": ["Recruit Heavy Infantry"]
            }
        """.trimIndent()

        val decoded = json.decodeFromString<AdvisorConsultationResponse>(camelCasePayload)
        assertEquals("Zorax the Mighty", decoded.advisorName)
        assertEquals("NEXT_MOVE", decoded.questionType)
        assertEquals("Hold the line, Commander.", decoded.advice)
        assertEquals(1, decoded.keyPoints.size)
    }

    @Test
    fun testCastleLordOfflineFallbacksForAllFourCastles() = runBlocking {
        val httpClient = HttpClient(CIO)
        val advisorService = AdvisorService(httpClient, agentUrl = "http://127.0.0.1:59999", timeoutMillis = 1000L)
        val gameState = createTestGameState()

        // Sector 14: Lord Hagen
        val hagenResp = advisorService.consultCastleLord(gameState, "player_1", "14", "char_1")
        assertEquals("LORD_HAGEN", hagenResp.lordId)
        assertEquals("Lord Hagen", hagenResp.lordName)
        assertEquals("14", hagenResp.castleSectorId)
        assertTrue(hagenResp.speech.contains("royal forces") && hagenResp.speech.contains("disciplined"))
        assertTrue(hagenResp.keyPoints.isNotEmpty())

        // Sector 23: Onar
        val onarResp = advisorService.consultCastleLord(gameState, "player_1", "23", "char_1")
        assertEquals("ONAR", onarResp.lordId)
        assertEquals("Onar", onarResp.lordName)
        assertEquals("23", onarResp.castleSectorId)
        assertTrue(onarResp.speech.contains("ledgers") && onarResp.speech.contains("mercenaries"))

        // Sector 7: Pyrokar
        val pyrokarResp = advisorService.consultCastleLord(gameState, "player_1", "7", "char_1")
        assertEquals("PYROKAR", pyrokarResp.lordId)
        assertEquals("Pyrokar", pyrokarResp.lordName)
        assertEquals("7", pyrokarResp.castleSectorId)
        assertTrue(pyrokarResp.speech.contains("Eye of Innos") && pyrokarResp.speech.contains("magic"))

        // Sector 52: Commander Garond
        val garondResp = advisorService.consultCastleLord(gameState, "player_1", "52", "char_1")
        assertEquals("GAROND", garondResp.lordId)
        assertEquals("Commander Garond", garondResp.lordName)
        assertEquals("52", garondResp.castleSectorId)
        assertTrue(garondResp.speech.contains("sword and ration") && garondResp.speech.contains("godforsaken place"))
    }

    @Test
    fun testCastleDialogueJsonDeserialization() {
        val json = kotlinx.serialization.json.Json { ignoreUnknownKeys = true }
        val snakeCasePayload = """
            {
                "lord_id": "LORD_HAGEN",
                "lord_name": "Lord Hagen",
                "castle_sector_id": "14",
                "speech": "In the name of the King!",
                "key_points": ["Guard the gate", "Hold the city"]
            }
        """.trimIndent()

        val decoded = json.decodeFromString<CastleDialogueResponse>(snakeCasePayload)
        assertEquals("LORD_HAGEN", decoded.lordId)
        assertEquals("Lord Hagen", decoded.lordName)
        assertEquals("14", decoded.castleSectorId)
        assertEquals("In the name of the King!", decoded.speech)
        assertEquals(2, decoded.keyPoints.size)
    }
}

