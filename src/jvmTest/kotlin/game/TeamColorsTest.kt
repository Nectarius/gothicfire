package game

import models.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import kotlinx.coroutines.runBlocking

class TeamColorsTest {

    @Test
    fun testTenPlayableTeamColorsAvailable() {
        assertEquals(10, Team.PLAYABLE_TEAMS.size, "Exactly 10 playable team colors must be defined")
        
        val expectedTeams = listOf(
            Team.RED,
            Team.BLUE,
            Team.GREEN,
            Team.PURPLE,
            Team.ORANGE,
            Team.CYAN,
            Team.PINK,
            Team.TEAL,
            Team.WHITE,
            Team.BLACK
        )
        assertEquals(expectedTeams, Team.PLAYABLE_TEAMS)

        // All 10 teams must have valid hex colors starting with '#'
        for (team in Team.PLAYABLE_TEAMS) {
            assertTrue(team.defaultHex.startsWith("#"), "Team $team must have a valid hex color")
            assertEquals(7, team.defaultHex.length, "Team $team hex must be 7 characters (#RRGGBB)")
            assertTrue(team.defaultColorName.isNotBlank(), "Team $team must have a color name")
            assertTrue(team.i18nKey.isNotBlank(), "Team $team must have an i18n key")
            assertFalse(team == Team.YELLOW, "Yellow is reserved for AI and should not be in playable teams")
        }
    }

    @Test
    fun testStartPvEWithAlternativeTeamColors() = runBlocking {
        val testColors = listOf(Team.GREEN, Team.PURPLE, Team.CYAN, Team.ORANGE, Team.TEAL)

        for (color in testColors) {
            val session = GameSession()
            val heroes = listOf(PredefinedCharacters[0].templateId, PredefinedCharacters[1].templateId)

            session.startPvEGame(
                playerId = "player_${color.name.lowercase()}",
                gameName = "${color.name} Crusade",
                allowSecondPlayer = false,
                playerTeam = color,
                playerTeamColor = color.defaultHex,
                playerTeamName = "${color.defaultColorName} Legion",
                chosenHeroes = heroes,
                chosenCastle = "14"
            )

            assertEquals(GameStatus.IN_PROGRESS, session.gameState.status)
            assertEquals(color, session.gameState.players.first { it.id == "player_${color.name.lowercase()}" }.team)
            assertEquals(color, session.gameState.activeTeamTurn)
            assertNotNull(session.gameState.teamInfos[color])
            assertEquals(color.defaultHex, session.gameState.teamInfos[color]?.color)
            assertEquals(Team.YELLOW, session.gameState.players.first { it.isBot }.team)
        }
    }

    @Test
    fun testMultiplayerWithCustomTeamPairing() = runBlocking {
        // Test Green vs Purple game
        val session = GameSession()
        
        val greenTeamInfo = TeamInfo(id = Team.GREEN, name = "Emerald Wardens", color = Team.GREEN.defaultHex, creatorId = "GreenLeader")
        val purpleTeamInfo = TeamInfo(id = Team.PURPLE, name = "Shadow Cabal", color = Team.PURPLE.defaultHex, creatorId = "PurpleLeader")
        
        val greenPlayer = Player(id = "GreenLeader", name = "GreenLeader", team = Team.GREEN, isReady = true)
        val purplePlayer = Player(id = "PurpleLeader", name = "PurpleLeader", team = Team.PURPLE, isReady = true)

        val char1 = Character(id = "c1", playerId = "GreenLeader", name = "Milten")
        val char2 = Character(id = "c2", playerId = "GreenLeader", name = "Gorn")
        val char3 = Character(id = "c3", playerId = "PurpleLeader", name = "Diego")
        val char4 = Character(id = "c4", playerId = "PurpleLeader", name = "Lester")

        session.gameState = GameState(
            status = GameStatus.LOBBY,
            gameName = "Forest vs Shadows",
            creatorPlayerId = "GreenLeader",
            teamInfos = mapOf(Team.GREEN to greenTeamInfo, Team.PURPLE to purpleTeamInfo),
            players = listOf(greenPlayer, purplePlayer),
            characters = listOf(char1, char2, char3, char4),
            teamCastles = mapOf(Team.GREEN to "14", Team.PURPLE to "23")
        )

        // Creator starts game
        session.startGame("GreenLeader")

        assertEquals(GameStatus.IN_PROGRESS, session.gameState.status)
        assertEquals(Team.GREEN, session.gameState.activeTeamTurn)
        assertEquals(2, session.gameState.characters.filter { !it.isDead && it.playerId == "GreenLeader" }.size)
        assertEquals(2, session.gameState.characters.filter { !it.isDead && it.playerId == "PurpleLeader" }.size)
        assertEquals("14", session.gameState.characters.first { it.playerId == "GreenLeader" }.currentSector)
        assertEquals("23", session.gameState.characters.first { it.playerId == "PurpleLeader" }.currentSector)
    }
}
