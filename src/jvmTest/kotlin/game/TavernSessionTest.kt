package game

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import models.*

class TavernSessionTest {

    private fun createTestGameState(): GameState {
        val playerRed = Player(id = "player_red", name = "Alice", team = Team.RED)
        val playerBlue = Player(id = "player_blue", name = "Bob", team = Team.BLUE)
        val charRed = Character(
            id = "char_red",
            playerId = "player_red",
            name = "Lester",
            currentSector = "14",
            army = Army(heavyInfantry = 10, archers = 5),
            food = 25,
            gold = 180
        )
        val charBlue = Character(
            id = "char_blue",
            playerId = "player_blue",
            name = "Gorn",
            currentSector = "23",
            army = Army(lightInfantry = 12),
            food = 30,
            gold = 50
        )

        val khorinisState = TerritoryState(
            sectorId = "14",
            ownerPlayerId = "player_red",
            ownerTeam = Team.RED,
            protection = 25,
            cultivation = 14
        )

        return GameState(
            status = GameStatus.IN_PROGRESS,
            gameName = "Tavern Test Game",
            players = listOf(playerRed, playerBlue),
            characters = listOf(charRed, charBlue),
            territories = mapOf("14" to khorinisState),
            teamCastles = mapOf(Team.RED to "14", Team.BLUE to "23"),
            marketRate = 4.0f
        )
    }

    @Test
    fun testKhorinisTavernPatronsList() {
        assertEquals(5, KhorinisTavernPatrons.size)
        val ids = KhorinisTavernPatrons.map { it.id }.toSet()
        assertTrue(ids.containsAll(listOf("KARDIF", "MOE", "ALRIK", "HALVOR", "VALENTINO")))

        val kardif = KhorinisTavernPatrons.find { it.id == "KARDIF" }
        assertNotNull(kardif)
        assertEquals("Kardif", kardif.name)
        assertTrue(kardif.catchphrase.contains("Information costs gold"))

        val moe = KhorinisTavernPatrons.find { it.id == "MOE" }
        assertNotNull(moe)
        assertTrue(moe.catchphrase.contains("Newcomers usually buy Moe a beer"))

        val alrik = KhorinisTavernPatrons.find { it.id == "ALRIK" }
        assertNotNull(alrik)
        assertTrue(alrik.catchphrase.contains("Fifty gold coins"))

        val halvor = KhorinisTavernPatrons.find { it.id == "HALVOR" }
        assertNotNull(halvor)
        assertTrue(halvor.catchphrase.contains("Fresh fish from the bay"))

        val valentino = KhorinisTavernPatrons.find { it.id == "VALENTINO" }
        assertNotNull(valentino)
        assertTrue(valentino.catchphrase.contains("Step aside, peasant"))
    }

    @Test
    fun testTavernSerialization() {
        val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }

        val action: GameAction = GameAction.TalkToTavernPatron("14", "char_red", "KARDIF")
        val actionJson = json.encodeToString(action)
        val decodedAction = json.decodeFromString<GameAction>(actionJson)
        assertTrue(decodedAction is GameAction.TalkToTavernPatron)
        assertEquals("14", decodedAction.sectorId)
        assertEquals("char_red", decodedAction.characterId)
        assertEquals("KARDIF", decodedAction.patronId)

        val event: GameEvent = GameEvent.TavernDialogueReceived(
            patronId = "VALENTINO",
            patronName = "Valentino",
            greeting = "Step aside, peasant.",
            responseText = "Only 100 gold? Pathetic!",
            timestamp = 123456L
        )
        val eventJson = json.encodeToString(event)
        val decodedEvent = json.decodeFromString<GameEvent>(eventJson)
        assertTrue(decodedEvent is GameEvent.TavernDialogueReceived)
        assertEquals("VALENTINO", decodedEvent.patronId)
        assertEquals("Valentino", decodedEvent.patronName)
        assertEquals("Step aside, peasant.", decodedEvent.greeting)
        assertEquals("Only 100 gold? Pathetic!", decodedEvent.responseText)
    }

    @Test
    fun testTalkToTavernPatronResponses() = runBlocking {
        val gameState = createTestGameState()
        val session = GameSession(gameState = gameState, gameId = "test_tavern_session")

        // 1. Kardif dialogue
        session.talkToTavernPatron("player_red", "14", "KARDIF", "char_red")
        // 2. Moe dialogue
        session.talkToTavernPatron("player_red", "14", "MOE", "char_red")
        // 3. Alrik dialogue
        session.talkToTavernPatron("player_red", "14", "ALRIK", "char_red")
        // 4. Halvor dialogue
        session.talkToTavernPatron("player_red", "14", "HALVOR", "char_red")
        // 5. Valentino dialogue
        session.talkToTavernPatron("player_red", "14", "VALENTINO", "char_red")
    }
}
