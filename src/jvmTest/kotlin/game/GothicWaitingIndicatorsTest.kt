package game

import models.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class GothicWaitingIndicatorsTest {

    @Test
    fun testDialogueTriggerRuleOnlyEvery3rdTurn() {
        // Condition: The dialogue snippet should only trigger once every 3rd computer turn (e.g., aiTurnCount % 3 === 0)
        assertFalse(GothicIndicators.shouldTriggerDialogue(0), "Turn 0 should not trigger")
        assertFalse(GothicIndicators.shouldTriggerDialogue(1), "Turn 1 should not trigger")
        assertFalse(GothicIndicators.shouldTriggerDialogue(2), "Turn 2 should not trigger")
        assertTrue(GothicIndicators.shouldTriggerDialogue(3), "Turn 3 should trigger")
        assertFalse(GothicIndicators.shouldTriggerDialogue(4), "Turn 4 should not trigger")
        assertFalse(GothicIndicators.shouldTriggerDialogue(5), "Turn 5 should not trigger")
        assertTrue(GothicIndicators.shouldTriggerDialogue(6), "Turn 6 should trigger")
        assertFalse(GothicIndicators.shouldTriggerDialogue(7), "Turn 7 should not trigger")
        assertFalse(GothicIndicators.shouldTriggerDialogue(8), "Turn 8 should not trigger")
        assertTrue(GothicIndicators.shouldTriggerDialogue(9), "Turn 9 should trigger")
    }

    @Test
    fun testSmokeTriggerRuleEveryTurn() {
        // Condition: The smoke effect should run on every computer turn (while thinking)
        assertTrue(GothicIndicators.shouldTriggerSmoke(isAiTurn = true))
        assertFalse(GothicIndicators.shouldTriggerSmoke(isAiTurn = false))
    }

    @Test
    fun testMicroPhrasesCompleteness() {
        // Verify all required Gothic micro-phrases from the specification are present
        val expectedPhrases = setOf(
            "Trust no one...",
            "Let's hear it...",
            "Another day, and nothing has changed.",
            "You're talking too much.",
            "If you want to survive here, you'd better pay attention.",
            "Just don't get on their bad side."
        )

        val actualPhrases = GothicIndicators.COLONY_PHRASES.toSet()
        assertEquals(expectedPhrases, actualPhrases, "All 6 iconic Gothic micro-phrases must be present")
    }

    @Test
    fun testSmokeColorPalette() {
        // Tech Choice: #2d5a4c to #4e9a86 with low opacity
        assertTrue(GothicIndicators.SMOKE_COLOR_RANGE.contains("#2d5a4c"))
        assertTrue(GothicIndicators.SMOKE_COLOR_RANGE.contains("#4e9a86"))
    }

    @Test
    fun testIsComputerTurnDetection() {
        val botPlayer = Player(id = "bot_1", name = "Computer", team = Team.YELLOW, isBot = true)
        val humanPlayer = Player(id = "human_1", name = "Hero", team = Team.RED, isBot = false)

        val pveStateAiTurn = GameState(
            status = GameStatus.IN_PROGRESS,
            isPvE = true,
            activeTeamTurn = Team.YELLOW,
            currentTurn = 3,
            players = listOf(humanPlayer, botPlayer)
        )
        assertTrue(GothicIndicators.isComputerTurn(pveStateAiTurn), "Should be AI turn when PvE active team is YELLOW")

        val pveStateHumanTurn = GameState(
            status = GameStatus.IN_PROGRESS,
            isPvE = true,
            activeTeamTurn = Team.RED,
            currentTurn = 3,
            players = listOf(humanPlayer, botPlayer)
        )
        assertFalse(GothicIndicators.isComputerTurn(pveStateHumanTurn), "Should NOT be AI turn when human team is active")

        val pvpStateBotTurn = GameState(
            status = GameStatus.IN_PROGRESS,
            isPvE = false,
            activeTeamTurn = Team.YELLOW,
            currentTurn = 6,
            players = listOf(humanPlayer, botPlayer)
        )
        assertTrue(GothicIndicators.isComputerTurn(pvpStateBotTurn), "Should be AI turn in PvP when active team is bot")

        val gameOverState = pveStateAiTurn.copy(status = GameStatus.GAME_OVER)
        assertFalse(GothicIndicators.isComputerTurn(gameOverState), "Should not be active when game is over")
    }
}
