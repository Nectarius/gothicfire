package game

import java.io.File
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import models.GothicTitles
import models.LocationInfoCatalog
import models.LocationInfoRepository
import models.getLocationInfo

class LocationInfoCatalogTest {

    @Test
    fun testJsonFileExistsAndContainsAll55Sectors() {
        val jsonFile = File("locales/location_info.json")
        assertTrue(jsonFile.exists(), "locales/location_info.json must exist")

        val jsonContent = jsonFile.readText(Charsets.UTF_8)
        val catalog = LocationInfoRepository.parseCatalog(jsonContent)
        assertEquals(55, catalog.size, "location_info.json must contain all 55 sectors")

        for (i in 0..54) {
            val sectorId = i.toString()
            val info = catalog[sectorId]
            assertNotNull(info, "Sector $sectorId must be present in location_info.json")
            assertEquals(sectorId, info.sectorId)
            assertTrue(info.title.isNotBlank(), "Sector $sectorId title must not be blank")
            assertTrue(info.region.isNotBlank(), "Sector $sectorId region must not be blank")
            assertTrue(info.tagline.isNotBlank(), "Sector $sectorId tagline must not be blank")
            assertTrue(info.imageUrl.isNotBlank(), "Sector $sectorId imageUrl must not be blank")
            assertTrue(info.description.isNotBlank(), "Sector $sectorId description must not be blank")
            assertTrue(info.history.isNotBlank(), "Sector $sectorId history must not be blank")
            assertTrue(info.characters.isNotEmpty(), "Sector $sectorId must have associated characters")
        }
    }

    @Test
    fun testDynamicJsonLoadingWithoutCodeChanges() {
        // Test updating location info dynamically via JSON
        val customJson = """
        {
          "999": {
            "sectorId": "999",
            "title": "Custom Test Sanctum",
            "region": "Custom Realm",
            "tagline": "A test location added purely via JSON.",
            "imageUrl": "/locations/info/test.jpg",
            "appearsIn": ["Gothic II"],
            "description": "Created dynamically from JSON without code changes.",
            "history": "Demonstrates hot update capability.",
            "characters": [
              {
                "name": "Nameless Tester",
                "role": "QA Hero",
                "description": "Verifying JSON loading."
              }
            ],
            "facts": ["Added at runtime."]
          }
        }
        """.trimIndent()

        val loaded = LocationInfoRepository.loadFromJson(customJson, "test_locale")
        assertEquals(1, loaded.size)
        val testInfo = LocationInfoRepository.getLocationInfo("999", "test_locale")
        assertNotNull(testInfo)
        assertEquals("Custom Test Sanctum", testInfo.title)
        assertEquals("Nameless Tester", testInfo.characters.first().name)
    }

    @Test
    fun testMultilingualSupport() {
        val ruFile = File("locales/location_info_ru.json")
        assertTrue(ruFile.exists(), "locales/location_info_ru.json must exist")
        LocationInfoRepository.loadFromJson(ruFile.readText(), "ru")

        val elFile = File("locales/location_info_el.json")
        assertTrue(elFile.exists(), "locales/location_info_el.json must exist")
        LocationInfoRepository.loadFromJson(elFile.readText(), "el")

        // Russian queries
        val ruS00 = getLocationInfo("0", "ru")
        assertNotNull(ruS00)
        assertEquals("Маяк Джека", ruS00.title)
        assertEquals("Северное побережье Хориниса", ruS00.region)
        assertTrue(ruS00.description.contains("маяк"))

        val ruS49 = getLocationInfo("49", "ru")
        assertNotNull(ruS49)
        assertEquals("Башня Ксардаса", ruS49.title)
        assertTrue(ruS49.characters.any { it.name == "Ксардас" })

        // Greek queries
        val elS00 = getLocationInfo("0", "el")
        assertNotNull(elS00)
        assertEquals("Ο Φάρος του Τζακ", elS00.title)
        assertEquals("Βόρεια Ακτή του Κόρινις", elS00.region)
        assertTrue(elS00.description.contains("φάρος"))

        val elS49 = getLocationInfo("49", "el")
        assertNotNull(elS49)
        assertEquals("Πύργος του Ξάρντας", elS49.title)
        assertTrue(elS49.characters.any { it.name == "Ξάρντας" })

        // Verify all 55 sectors exist in both catalogs
        for (i in 0..54) {
            val sId = i.toString()
            val ruItem = getLocationInfo(sId, "ru")
            assertNotNull(ruItem, "Russian sector $sId must be present")
            assertTrue(ruItem.title.isNotBlank())
            assertTrue(ruItem.description.isNotBlank())

            val elItem = getLocationInfo(sId, "el")
            assertNotNull(elItem, "Greek sector $sId must be present")
            assertTrue(elItem.title.isNotBlank())
            assertTrue(elItem.description.isNotBlank())
        }

        // Fallback to English when non-existent locale queried
        val fallbackInfo = getLocationInfo("0", "unknown_lang")
        assertNotNull(fallbackInfo)
        assertEquals("Jack's Lighthouse", fallbackInfo.title)
    }

    @Test
    fun testAll55ArtworkFilesExistOnDisk() {
        val resourcesDir = File("src/jsMain/resources")
        assertTrue(resourcesDir.exists(), "src/jsMain/resources must exist")

        for (i in 0..54) {
            val sectorId = i.toString()
            val info = getLocationInfo(sectorId)
            assertNotNull(info)

            val relativePath = info.imageUrl.removePrefix("/")
            val file = File(resourcesDir, relativePath)
            assertTrue(
                file.exists() && file.length() > 1000,
                "Artwork file for sector $sectorId must exist at ${file.path} (size: ${file.length()} bytes)"
            )
        }
    }

    @Test
    fun testKeyLoreAndCrossSeriesContinuity() {
        // Sector 00: Jack's Lighthouse
        val s00 = getLocationInfo("0")!!
        assertEquals("Jack's Lighthouse", s00.title)
        assertTrue(s00.characters.any { it.name == "Old Jack" })

        // Sector 05: Circle of the Sun (Vatras, Pyrokar, Xardas ritual for Eye of Innos)
        val s05 = getLocationInfo("5")!!
        assertTrue(s05.characters.any { it.name == "Vatras" })
        assertTrue(s05.characters.any { it.name == "Pyrokar" })
        assertTrue(s05.characters.any { it.name == "Xardas" })

        // Sector 07: Monastery of Innos
        val s07 = getLocationInfo("7")!!
        assertTrue(s07.appearsIn.contains(GothicTitles.G1))
        assertTrue(s07.characters.any { it.name == "Pyrokar" })
        assertTrue(s07.characters.any { it.name == "Milten" })

        // Sector 14: City of Khorinis
        val s14 = getLocationInfo("14")!!
        assertTrue(s14.characters.any { it.name == "Lord Hagen" })

        // Sector 18: Crypt of Inubis
        val s18 = getLocationInfo("18")!!
        assertTrue(s18.characters.any { it.name == "Inubis" })

        // Sector 23: Onar's Farm (General Lee, Gothic 3 reference)
        val s23 = getLocationInfo("23")!!
        assertTrue(s23.appearsIn.contains(GothicTitles.G3))
        assertTrue(s23.characters.any { it.name == "Lee" })
        assertTrue(s23.characters.any { it.name == "Onar" })

        // Sector 31: Dexter's Watchtower (Raven link)
        val s31 = getLocationInfo("31")!!
        assertTrue(s31.characters.any { it.name == "Dexter" })

        // Sector 44 & 45: Jharkendar Portal & Water Mages
        val s44 = getLocationInfo("44")!!
        assertTrue(s44.characters.any { it.name == "Saturas" })

        val s45 = getLocationInfo("45")!!
        assertTrue(s45.characters.any { it.name == "Raven" })

        // Sector 49: Xardas's Tower (G1, G2, NotR, G3)
        val s49 = getLocationInfo("49")!!
        assertTrue(s49.appearsIn.contains(GothicTitles.G1))
        assertTrue(s49.appearsIn.contains(GothicTitles.G2))
        assertTrue(s49.appearsIn.contains(GothicTitles.G3))
        assertTrue(s49.characters.any { it.name == "Xardas" })

        // Sector 52: Fortress of the Pass (Garond)
        val s52 = getLocationInfo("52")!!
        assertTrue(s52.characters.any { it.name == "Garond" })
    }
}
