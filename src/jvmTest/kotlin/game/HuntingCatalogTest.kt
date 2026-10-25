package game

import models.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class HuntingCatalogTest {

    @Test
    fun testAllHidesCovered() {
        assertEquals(6, HideType.entries.size)
        assertEquals(6, HuntingCatalog.table.size)

        for (hide in HideType.entries) {
            val grounds = HuntingCatalog.groundsFor(hide)
            assertTrue(grounds.isNotEmpty(), "Hide $hide must have hunting grounds registered")
            for (ground in grounds) {
                assertTrue(ground.sectorIds.isNotEmpty(), "Ground '${ground.title}' must contain sectorIds")
                assertTrue(ground.title.isNotBlank(), "Ground title must not be blank")
                assertTrue(ground.description.isNotBlank(), "Ground description must not be blank")
                for (sectorId in ground.sectorIds) {
                    assertTrue(MapData.containsKey(sectorId), "Sector $sectorId in ground '${ground.title}' must exist in MapData")
                }
            }
        }
    }

    @Test
    fun testBlackTrollUniqueToSector2() {
        assertTrue(HuntingCatalog.isHuntable(HideType.BLACK_TROLL, "2"))
        for (i in 0..54) {
            val sectorId = i.toString()
            if (sectorId != "2") {
                assertFalse(
                    HuntingCatalog.isHuntable(HideType.BLACK_TROLL, sectorId),
                    "Black Troll fur should not be huntable in sector $sectorId"
                )
            }
        }
    }

    @Test
    fun testWolfHuntingSectors() {
        assertFalse(HuntingCatalog.isHuntable(HideType.WOLF, "14"), "City of Khorinis (14) must not have wolves")
        val expectedWolfSectors = setOf("1", "30", "38", "27", "17", "20")
        for (s in expectedWolfSectors) {
            assertTrue(HuntingCatalog.isHuntable(HideType.WOLF, s), "Sector $s should have wolves")
        }
    }

    @Test
    fun testSector2MultiGame() {
        val hidesInSector2 = HuntingCatalog.huntableHidesIn("2")
        assertTrue(hidesInSector2.contains(HideType.BLACK_TROLL))
        assertTrue(hidesInSector2.contains(HideType.TROLL))
        assertTrue(hidesInSector2.contains(HideType.SHADOWBEAST))
        assertFalse(hidesInSector2.contains(HideType.WOLF))
    }

    @Test
    fun testHunterNpcTags() {
        val bartok = getPatronForSector("1", "bartok")
        assertNotNull(bartok)
        assertTrue(bartok.isHunter, "Bartok should be tagged as Hunter")
        assertTrue(bartok.tags.contains(NpcTag.HUNTER))

        val grimbald = getPatronForSector("2", "grimbald")
        assertNotNull(grimbald)
        assertTrue(grimbald.isHunter, "Grimbald should be tagged as Hunter")

        val niclas = getPatronForSector("3", "niclas")
        assertNotNull(niclas)
        assertTrue(niclas.isHunter, "Niclas should be tagged as Hunter")

        val dragomir = getPatronForSector("29", "dragomir")
        assertNotNull(dragomir)
        assertTrue(dragomir.isHunter, "Dragomir should be tagged as Hunter")

        val grom = getPatronForSector("40", "grom")
        assertNotNull(grom)
        assertTrue(grom.isHunter, "Grom should be tagged as Hunter")

        // Kardif and Moe should NOT be hunters
        val kardif = getPatronForSector("14", "KARDIF")
        assertNotNull(kardif)
        assertFalse(kardif.isHunter, "Kardif is not a hunter")

        val moe = getPatronForSector("14", "MOE")
        assertNotNull(moe)
        assertFalse(moe.isHunter, "Moe is not a hunter")
    }
}
