package models

/**
 * Thematic constants and decision rules for the Gothic AI waiting indicators:
 * 1. The Swamp Camp "Swampweed Exhale" (Smoke Effect)
 * 2. Colony Chat Log ("Small Talk" Overlay)
 */
object GothicIndicators {

    /**
     * Classic Gothic micro-phrases heard throughout the penal colony (Old Camp, New Camp, Swamp Camp).
     */
    val COLONY_PHRASES: List<String> = listOf(
        "Trust no one...",
        "Let's hear it...",
        "Another day, and nothing has changed.",
        "You're talking too much.",
        "If you want to survive here, you'd better pay attention.",
        "Just don't get on their bad side."
    )

    /**
     * Blue-green smoke color hex codes for the Swampweed Exhale: #2d5a4c to #4e9a86.
     */
    val SMOKE_COLOR_RANGE: List<String> = listOf(
        "#2d5a4c", // Murky deep swamp green
        "#3a7d68", // Mystic moss teal
        "#4e9a86"  // Pale ethereal swampweed haze
    )

    /**
     * Classic Gothic UI yellow-orange accent colors.
     */
    const val GOTHIC_UI_YELLOW_ORANGE_PRIMARY = "#D4A017"
    const val GOTHIC_UI_YELLOW_ORANGE_SECONDARY = "#E69A28"

    /**
     * The dialogue snippet should only trigger once every 3rd computer turn (aiTurnCount % 3 === 0).
     */
    fun shouldTriggerDialogue(aiTurnCount: Int): Boolean {
        return aiTurnCount > 0 && (aiTurnCount % 3 == 0)
    }

    /**
     * The smoke effect should run on every computer turn while the computer is calculating its move.
     */
    fun shouldTriggerSmoke(isAiTurn: Boolean): Boolean {
        return isAiTurn
    }

    /**
     * Evaluates whether the game is currently awaiting the computer/AI move calculation.
     */
    fun isComputerTurn(gameState: GameState?): Boolean {
        if (gameState == null || gameState.status != GameStatus.IN_PROGRESS) return false
        val activeTeam = gameState.activeTeamTurn
        val hasBotPlayer = gameState.players.any { it.isBot && it.team == activeTeam }
        val isPvEYellow = gameState.isPvE && activeTeam == Team.YELLOW
        return hasBotPlayer || isPvEYellow
    }
}
