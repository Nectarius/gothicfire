package game

import models.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals
import kotlin.test.assertTrue
import kotlinx.coroutines.runBlocking

class PvESessionTest {

    @Test
    fun testIndependentPvESessions() = runBlocking {
        val session1 = GameSession()
        val session2 = GameSession()

        val heroes1 = listOf(PredefinedCharacters[0].templateId, PredefinedCharacters[1].templateId)
        val heroes2 = listOf(PredefinedCharacters[2].templateId, PredefinedCharacters[3].templateId)

        session1.startPvEGame(
            playerId = "player_alice",
            gameName = "Alice Campaign",
            allowSecondPlayer = false,
            playerTeam = Team.RED,
            playerTeamColor = "#D32F2F",
            playerTeamName = "Red Eagles",
            chosenHeroes = heroes1,
            chosenCastle = "14"
        )

        session2.startPvEGame(
            playerId = "player_bob",
            gameName = "Bob Campaign",
            allowSecondPlayer = false,
            playerTeam = Team.BLUE,
            playerTeamColor = "#1976D2",
            playerTeamName = "Blue Hawks",
            chosenHeroes = heroes2,
            chosenCastle = "15"
        )

        assertEquals(GameStatus.IN_PROGRESS, session1.gameState.status)
        assertEquals(GameStatus.IN_PROGRESS, session2.gameState.status)

        // Ensure session 1 and session 2 are completely isolated
        assertEquals("Alice Campaign", session1.gameState.gameName)
        assertEquals("Bob Campaign", session2.gameState.gameName)
        assertEquals("player_alice", session1.gameState.creatorPlayerId)
        assertEquals("player_bob", session2.gameState.creatorPlayerId)

        assertTrue(session1.gameState.players.any { it.id == "player_alice" })
        assertTrue(session1.gameState.players.none { it.id == "player_bob" })

        assertTrue(session2.gameState.players.any { it.id == "player_bob" })
        assertTrue(session2.gameState.players.none { it.id == "player_alice" })

        // Check teams
        assertEquals(Team.RED, session1.gameState.players.first { it.id == "player_alice" }.team)
        assertEquals(Team.BLUE, session2.gameState.players.first { it.id == "player_bob" }.team)

        // Check characters
        val chars1 = session1.gameState.characters.filter { it.playerId == "player_alice" }
        val chars2 = session2.gameState.characters.filter { it.playerId == "player_bob" }
        assertEquals(2, chars1.size)
        assertEquals(2, chars2.size)
        assertNotEquals(chars1.map { it.name }, chars2.map { it.name })
    }

    @Test
    fun testLeaveGameBehavior() = runBlocking {
        val session = GameSession()
        val heroes = listOf(PredefinedCharacters[0].templateId, PredefinedCharacters[1].templateId)

        session.startPvEGame(
            playerId = "player_carol",
            gameName = "Carol Campaign",
            allowSecondPlayer = false,
            playerTeam = Team.RED,
            playerTeamColor = "#D32F2F",
            playerTeamName = "Crimson",
            chosenHeroes = heroes,
            chosenCastle = "14"
        )

        assertEquals(GameStatus.IN_PROGRESS, session.gameState.status)
        assertTrue(session.gameState.players.any { it.id == "player_carol" })

        session.leave("player_carol")
        // Player should be removed from active game players
        assertTrue(session.gameState.players.none { it.id == "player_carol" })
    }
}
