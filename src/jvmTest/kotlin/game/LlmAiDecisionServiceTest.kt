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
}
