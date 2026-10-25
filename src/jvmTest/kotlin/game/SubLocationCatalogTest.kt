package game

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import kotlinx.coroutines.runBlocking
import models.*

class SubLocationCatalogTest {

    @Test
    fun testAll55SectorsPresent() {
        assertEquals(55, SectorSubLocations.size, "All 55 sectors must be present in SectorSubLocations")
        for (i in 0..54) {
            val sectorId = i.toString()
            val subLocation = getSubLocationForSector(sectorId)
            assertNotNull(subLocation, "Sector $sectorId must have a sub-location entry")
            assertEquals(sectorId, subLocation.sectorId)
            assertTrue(subLocation.buttonEmoji.isNotBlank(), "Sector $sectorId buttonEmoji must not be blank")
            assertTrue(subLocation.buttonLabel.isNotBlank(), "Sector $sectorId buttonLabel must not be blank")
            assertTrue(subLocation.buttonTooltip.isNotBlank(), "Sector $sectorId buttonTooltip must not be blank")
            assertTrue(subLocation.modalTitle.isNotBlank(), "Sector $sectorId modalTitle must not be blank")
            assertTrue(subLocation.modalSubtitle.isNotBlank(), "Sector $sectorId modalSubtitle must not be blank")
            assertTrue(subLocation.patrons.isNotEmpty(), "Sector $sectorId must have at least one patron")

            for (patron in subLocation.patrons) {
                assertTrue(patron.id.isNotBlank(), "Patron ID in sector $sectorId must not be blank")
                assertTrue(patron.name.isNotBlank(), "Patron name in sector $sectorId must not be blank")
                assertTrue(patron.role.isNotBlank(), "Patron role in sector $sectorId must not be blank")
                assertTrue(patron.iconUrl.isNotBlank(), "Patron iconUrl in sector $sectorId must not be blank")
                assertTrue(patron.greeting.isNotBlank(), "Patron greeting in sector $sectorId must not be blank")
                assertTrue(patron.defaultResponse.isNotBlank(), "Patron defaultResponse in sector $sectorId must not be blank")
            }
        }
    }

    @Test
    fun testKeyCanonicalPatronsLookup() {
        // Test key characters across various sectors
        val jack = getPatronForSector("0", "jack")
        assertNotNull(jack)
        assertEquals("Old Jack", jack.name)
        assertTrue(jack.defaultResponse.contains("Captain Greg's pirate ship"))

        val bartok = getPatronForSector("1", "bartok")
        assertNotNull(bartok)
        assertEquals("Bartok", bartok.name)

        val grimbald = getPatronForSector("2", "grimbald")
        assertNotNull(grimbald)
        assertTrue(grimbald.defaultResponse.contains("Shrink Monster"))

        val hyglas = getPatronForSector("7", "hyglas")
        assertNotNull(hyglas)
        assertTrue(hyglas.defaultResponse.contains("Tears of Innos"))

        val kardif = getPatronForSector("14", "KARDIF")
        assertNotNull(kardif)
        assertEquals("Kardif", kardif.name)

        val thekla = getPatronForSector("23", "thekla")
        assertNotNull(thekla)
        assertTrue(thekla.defaultResponse.contains("Thekla's Stew"))

        val lee = getPatronForSector("23", "lee")
        assertNotNull(lee)
        assertEquals("General Lee", lee.name)

        val dexter = getPatronForSector("31", "dexter")
        assertNotNull(dexter)
        assertTrue(dexter.defaultResponse.contains("Captain Greg"))

        val saturas = getPatronForSector("44", "saturas")
        assertNotNull(saturas)
        assertTrue(saturas.greeting.contains("Uriziel"))
        assertTrue(saturas.defaultResponse.contains("New Camp"))

        val xardas = getPatronForSector("49", "xardas")
        assertNotNull(xardas)
        assertTrue(xardas.defaultResponse.contains("Belt of Strength"))

        val engor = getPatronForSector("52", "engor")
        assertNotNull(engor)
        assertTrue(engor.defaultResponse.contains("meat-ration quest"))

        val brutus = getPatronForSector("54", "brutus")
        assertNotNull(brutus)
        assertTrue(brutus.defaultResponse.contains("meatbugs"))

        // Test location banners & character artwork
        assertEquals("/locations/jack_lighthouse_lantern.jpg", getSubLocationForSector("0")?.bannerImageUrl)
        assertEquals("/characters/old_jack.jpg", jack.iconUrl)

        assertEquals("/locations/monastery_library_cellar.jpg", getSubLocationForSector("7")?.bannerImageUrl)
        assertEquals("/locations/mercenary_farm_kitchen.jpg", getSubLocationForSector("23")?.bannerImageUrl)
        assertEquals("/locations/water_mages_vault.jpg", getSubLocationForSector("44")?.bannerImageUrl)
        assertEquals("/characters/vatras.jpg", saturas.iconUrl)

        assertEquals("/locations/xardas_tower_study.jpg", getSubLocationForSector("49")?.bannerImageUrl)
        assertEquals("/characters/xardas.jpg", xardas.iconUrl)

        assertEquals("/locations/citadel_pass_hall.jpg", getSubLocationForSector("52")?.bannerImageUrl)
        assertEquals("/locations/wilderness_hunter_camp.jpg", getSubLocationForSector("1")?.bannerImageUrl)
    }

    @Test
    fun testTalkToPatronInNon14Sector() = runBlocking {
        val playerRed = Player(id = "player_red", name = "Alice", team = Team.RED)
        val charRed = Character(
            id = "char_red",
            playerId = "player_red",
            name = "Milten",
            currentSector = "49",
            army = Army(heavyInfantry = 5),
            food = 20,
            gold = 100
        )
        val xardasTerr = TerritoryState(
            sectorId = "49",
            ownerPlayerId = "player_red",
            ownerTeam = Team.RED,
            protection = 18,
            cultivation = 6,
            food = 10,
            gold = 50
        )

        val gameState = GameState(
            status = GameStatus.IN_PROGRESS,
            gameName = "SubLocation Test Game",
            players = listOf(playerRed),
            characters = listOf(charRed),
            territories = mapOf("49" to xardasTerr),
            teamCastles = mapOf(Team.RED to "14")
        )

        val session = GameSession(gameState = gameState, gameId = "test_sublocation_session")

        // Visit Xardas in sector 49
        session.talkToTavernPatron("player_red", "49", "xardas", "char_red")
    }
}
