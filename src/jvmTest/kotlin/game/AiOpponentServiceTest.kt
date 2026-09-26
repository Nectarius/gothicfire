package game

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlinx.coroutines.runBlocking

class AiOpponentServiceTest {

    @Test
    fun testFallbackOnUnreachableServer() = runBlocking {
        // Points to an unused port to simulate agent service offline
        val httpClient = HttpClient(CIO)
        val service = AiOpponentService(httpClient, agentUrl = "http://127.0.0.1:59999", timeoutMillis = 5000L)

        val legalMoves = listOf("RECRUIT_LIGHT_INFANTRY", "MOVE_TO_15", "WAIT")
        val chosenMove = service.requestComputerMove(
            gameId = "test_game_1",
            turn = 1,
            playerId = "bot_player_1",
            summary = "Garrison empty, treasury has 50 gold.",
            legalMoves = legalMoves
        )

        // Resilient fallback should return the first legal move
        assertEquals("RECRUIT_LIGHT_INFANTRY", chosenMove)
    }

    @Test
    fun testEmptyLegalMovesHandledGracefully() = runBlocking {
        val httpClient = HttpClient(CIO)
        val service = AiOpponentService(httpClient, agentUrl = "http://127.0.0.1:59999", timeoutMillis = 5000L)

        val chosenMove = service.requestComputerMove(
            gameId = "test_game_2",
            turn = 1,
            playerId = "bot_player_1",
            summary = "No moves available.",
            legalMoves = emptyList()
        )

        assertEquals("WAIT", chosenMove)
    }

    @Test
    fun testFallbackOnTimeout() = runBlocking {
        // With an ultra-short 1ms timeout, network calls will reliably timeout
        val httpClient = HttpClient(CIO)
        val service = AiOpponentService(httpClient, agentUrl = "http://127.0.0.1:8000", timeoutMillis = 1L)

        val legalMoves = listOf("DEFENSIVE_GARRISON", "COUNTER_ATTACK", "WAIT")
        val chosenMove = service.requestComputerMove(
            gameId = "test_game_timeout",
            turn = 3,
            playerId = "bot_player_1",
            summary = "Large army approaching castle walls.",
            legalMoves = legalMoves
        )

        // Should cleanly catch timeout and return fallback move
        assertEquals("DEFENSIVE_GARRISON", chosenMove)
    }

    @Test
    fun testLiveIntegrationWithRunningFastApiServer() = runBlocking {
        val httpClient = HttpClient(CIO)
        val service = AiOpponentService(httpClient, agentUrl = "http://127.0.0.1:8000", timeoutMillis = 15000L)

        val legalMoves = listOf("RECRUIT_HEAVY_INFANTRY", "WAIT")
        val chosenMove = service.requestComputerMove(
            gameId = "test_live_game",
            turn = 1,
            playerId = "bot_player_1",
            summary = "Castle Khorinis has 150 gold and no garrison soldiers.",
            legalMoves = legalMoves
        )

        assertTrue(
            chosenMove in legalMoves,
            "Chosen move '$chosenMove' should be one of legal moves: $legalMoves"
        )
    }
}
