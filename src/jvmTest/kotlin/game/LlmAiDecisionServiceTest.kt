package game

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import kotlinx.coroutines.runBlocking
import models.*

class LlmAiDecisionServiceTest {

    @Test
    fun testMinisterScoringAndFallbackExecution() = runBlocking {
        val httpClient = HttpClient(CIO)
        // Point to offline port to test Minister's fallback action handling
        val opponentService = AiOpponentService(httpClient, agentUrl = "http://127.0.0.1:59999", timeoutMillis = 1000L)
        val llmDecisionService = LlmAiDecisionService(opponentService, HeuristicAiService())

        val botPlayer = Player(id = "bot_1", name = "Computer", team = Team.YELLOW, isBot = true)
        val botChar = Character(
            id = "bot_char_1",
            playerId = "bot_1",
            name = "Thorus",
            warlord = 7,
            gold = 100,
            food = 50,
            army = Army(heavyInfantry = 0, lightInfantry = 0),
            currentSector = "14"
        )
        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            gameName = "Test Minister Game",
            players = listOf(botPlayer),
            characters = listOf(botChar),
            currentTurn = 1,
            teamCastles = mapOf(Team.YELLOW to "14"),
            territories = mapOf("14" to TerritoryState(sectorId = "14", protection = 25, cultivation = 20, ownerPlayerId = "bot_1", ownerTeam = Team.YELLOW))
        )

        val snapshot = BotGameStateSnapshot(
            gameState = gameState,
            botTeam = Team.YELLOW,
            botCharacters = listOf(botChar),
            botPlayers = listOf(botPlayer)
        )

        val actions = llmDecisionService.decideTurn(snapshot)
        assertTrue(actions.isNotEmpty(), "Decision service should generate an action")

        val action = actions.first()
        // The commander has 0 troops and 100 gold with warlord=7 at a protected territory (>=20)
        // Minister evaluates Heavy Infantry (with Warlord synergy) as top priority
        assertTrue(
            action is BotAction.Recruit || action is BotAction.Skip,
            "Action should be Recruit or Skip garrison: $action"
        )
    }

    @Test
    fun testSuicidalMovePruningExcludesSevereDisadvantage() = runBlocking {
        val httpClient = HttpClient(CIO)
        val opponentService = AiOpponentService(httpClient, agentUrl = "http://127.0.0.1:59999", timeoutMillis = 1000L)
        val llmDecisionService = LlmAiDecisionService(opponentService, HeuristicAiService())

        val botPlayer = Player(id = "bot_1", name = "Computer", team = Team.YELLOW, isBot = true)
        val enemyPlayer = Player(id = "enemy_1", name = "Human", team = Team.RED, isBot = false)

        // Bot has 2 light infantry at sector 23 (adjacent to 22)
        val botChar = Character(
            id = "bot_char_1",
            playerId = "bot_1",
            name = "Weak Scout",
            warlord = 1,
            gold = 0,
            food = 20,
            army = Army(lightInfantry = 2),
            currentSector = "23"
        )
        // Enemy has huge army of 50 heavy infantry at sector 22
        val enemyChar = Character(
            id = "enemy_char_1",
            playerId = "enemy_1",
            name = "Enemy Titan",
            warlord = 10,
            army = Army(heavyInfantry = 50),
            currentSector = "22"
        )

        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            gameName = "Pruning Test",
            players = listOf(botPlayer, enemyPlayer),
            characters = listOf(botChar, enemyChar),
            currentTurn = 5,
            teamCastles = mapOf(Team.YELLOW to "24", Team.RED to "14"),
            territories = mapOf(
                "23" to TerritoryState(sectorId = "23", ownerPlayerId = "bot_1", ownerTeam = Team.YELLOW),
                "22" to TerritoryState(sectorId = "22", protection = 30, ownerPlayerId = "enemy_1", ownerTeam = Team.RED)
            )
        )

        val snapshot = BotGameStateSnapshot(
            gameState = gameState,
            botTeam = Team.YELLOW,
            botCharacters = listOf(botChar),
            botPlayers = listOf(botPlayer)
        )

        val actions = llmDecisionService.decideTurn(snapshot)
        assertTrue(actions.isNotEmpty())
        val action = actions.first()

        // The attack on sector 22 would be suicidal (win chance < 40%), so it must be pruned
        if (action is BotAction.Move) {
            assertTrue(action.targetSector != "22", "Suicidal attack on Sector 22 must be pruned!")
        }
    }

    @Test
    fun testAgentResponseUsedWhenHealthyAndHeuristicNotCalled() = runBlocking {
        val fakeOpponent = FakeAiOpponentService(Result.success("WAIT (Conserve Strength, Safe)"))
        val trackingHeuristic = TrackingHeuristicAiService()
        val llmService = LlmAiDecisionService(fakeOpponent, trackingHeuristic)

        val botPlayer = Player(id = "bot_1", name = "Computer", team = Team.YELLOW, isBot = true)
        val botChar = Character(
            id = "bot_char_1",
            playerId = "bot_1",
            name = "Gorn",
            warlord = 5,
            gold = 100,
            food = 50,
            army = Army(heavyInfantry = 10),
            currentSector = "14"
        )
        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            gameName = "Healthy Agent Game",
            players = listOf(botPlayer),
            characters = listOf(botChar),
            currentTurn = 1,
            teamCastles = mapOf(Team.YELLOW to "14"),
            territories = mapOf("14" to TerritoryState(sectorId = "14", protection = 25, ownerPlayerId = "bot_1", ownerTeam = Team.YELLOW))
        )
        val snapshot = BotGameStateSnapshot(
            gameState = gameState,
            botTeam = Team.YELLOW,
            botCharacters = listOf(botChar),
            botPlayers = listOf(botPlayer)
        )

        val actions = llmService.decideTurn(snapshot)
        assertEquals(1, fakeOpponent.callCount, "Python agent should be queried for character decision")
        assertEquals(0, trackingHeuristic.decideForCharacterCalls, "HeuristicAiService should NOT be used when agent succeeds")
        assertEquals(1, actions.size)
        assertTrue(actions.first() is BotAction.Skip, "Should execute the agent's chosen move")
    }

    @Test
    fun testFallbackToHeuristicOnAgentTimeout() = runBlocking {
        val fakeOpponent = FakeAiOpponentService(Result.failure(java.util.concurrent.TimeoutException("Agent not responding after 60000ms")))
        val trackingHeuristic = TrackingHeuristicAiService()
        val llmService = LlmAiDecisionService(fakeOpponent, trackingHeuristic)

        val botPlayer = Player(id = "bot_1", name = "Computer", team = Team.YELLOW, isBot = true)
        val botChar = Character(
            id = "bot_char_1",
            playerId = "bot_1",
            name = "Thorus",
            warlord = 7,
            gold = 100,
            food = 50,
            army = Army(heavyInfantry = 0, lightInfantry = 0),
            currentSector = "14"
        )
        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            gameName = "Timeout Test Game",
            players = listOf(botPlayer),
            characters = listOf(botChar),
            currentTurn = 1,
            teamCastles = mapOf(Team.YELLOW to "14"),
            territories = mapOf("14" to TerritoryState(sectorId = "14", protection = 25, cultivation = 20, ownerPlayerId = "bot_1", ownerTeam = Team.YELLOW))
        )
        val snapshot = BotGameStateSnapshot(
            gameState = gameState,
            botTeam = Team.YELLOW,
            botCharacters = listOf(botChar),
            botPlayers = listOf(botPlayer)
        )

        val actions = llmService.decideTurn(snapshot)
        assertEquals(1, fakeOpponent.callCount, "Python agent should be attempted first")
        assertEquals(1, trackingHeuristic.decideForCharacterCalls, "HeuristicAiService must be called on agent timeout")
        assertEquals(1, actions.size)
        assertTrue(actions.first() is BotAction.Recruit, "Heuristic fallback should recruit for 0-army commander")
    }

    @Test
    fun testFallbackToHeuristicOnAgentErrorMessages() = runBlocking {
        val fakeOpponent = FakeAiOpponentService(Result.failure(IllegalStateException("HTTP 500 Internal Server Error from Python agent")))
        val trackingHeuristic = TrackingHeuristicAiService()
        val llmService = LlmAiDecisionService(fakeOpponent, trackingHeuristic)

        val botPlayer = Player(id = "bot_1", name = "Computer", team = Team.YELLOW, isBot = true)
        val botChar = Character(
            id = "bot_char_1",
            playerId = "bot_1",
            name = "Milten",
            archon = 8,
            gold = 100,
            food = 50,
            army = Army(heavyInfantry = 0),
            currentSector = "14"
        )
        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            gameName = "Error Test Game",
            players = listOf(botPlayer),
            characters = listOf(botChar),
            currentTurn = 1,
            teamCastles = mapOf(Team.YELLOW to "14"),
            territories = mapOf("14" to TerritoryState(sectorId = "14", protection = 30, ownerPlayerId = "bot_1", ownerTeam = Team.YELLOW))
        )
        val snapshot = BotGameStateSnapshot(
            gameState = gameState,
            botTeam = Team.YELLOW,
            botCharacters = listOf(botChar),
            botPlayers = listOf(botPlayer)
        )

        val actions = llmService.decideTurn(snapshot)
        assertEquals(1, fakeOpponent.callCount, "Python agent should be attempted first")
        assertEquals(1, trackingHeuristic.decideForCharacterCalls, "HeuristicAiService must be called on agent error messages")
        assertEquals(1, actions.size)
        assertTrue(actions.first() is BotAction.Recruit, "Heuristic fallback should recruit army for defenseless character")
    }

    private class FakeAiOpponentService(
        private val decisionToReturn: Result<String>
    ) : AiOpponentService(HttpClient(CIO)) {
        var callCount = 0
        override suspend fun requestDecision(
            gameId: String,
            turn: Int,
            playerId: String,
            summary: String,
            legalMoves: List<String>
        ): Result<String> {
            callCount++
            return decisionToReturn
        }
    }

    private class TrackingHeuristicAiService : HeuristicAiService() {
        var decideForCharacterCalls = 0
        override fun decideForCharacter(
            char: Character,
            snapshot: BotGameStateSnapshot,
            mustStayAtCastle: Boolean
        ): BotAction {
            decideForCharacterCalls++
            return super.decideForCharacter(char, snapshot, mustStayAtCastle)
        }
    }
}
