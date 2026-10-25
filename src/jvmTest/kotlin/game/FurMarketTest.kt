package game

import models.FurMarket
import models.FurMarketEntry
import models.HideType
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class FurMarketTest {

    @Test
    fun testBaseValuation() {
        assertEquals(5, HideType.WOLF.basePrice)
        assertEquals(10, HideType.WARG.basePrice)
        assertEquals(20, HideType.BOAR.basePrice)
        assertEquals(20, HideType.SHADOWBEAST.basePrice)
        assertEquals(30, HideType.TROLL.basePrice)
        assertEquals(35, HideType.BLACK_TROLL.basePrice)
    }

    @Test
    fun testEffectivePriceClamping() {
        for (hide in HideType.entries) {
            val minPrice = FurMarket.effectivePrice(hide, 0.10) // below min
            val expectedMin = kotlin.math.round(hide.basePrice * 0.50).toInt()
            assertEquals(expectedMin, minPrice, "Effective price below min must clamp to 0.50")

            val maxPrice = FurMarket.effectivePrice(hide, 3.50) // above max
            val expectedMax = kotlin.math.round(hide.basePrice * 2.00).toInt()
            assertEquals(expectedMax, maxPrice, "Effective price above max must clamp to 2.00")

            val basePrice = FurMarket.effectivePrice(hide, 1.00)
            assertEquals(hide.basePrice, basePrice, "At 1.0 multiplier price should equal base price")
        }
    }

    @Test
    fun testMarketSimulationRandomWalkBoundaries() {
        val rng = Random(42)
        for (hide in HideType.entries) {
            var entry = FurMarketEntry(1.0, true)
            for (step in 1..10000) {
                entry = FurMarket.nextEntry(entry, rng)

                assertTrue(
                    entry.multiplier >= FurMarket.MIN_MULTIPLIER,
                    "Multiplier ${entry.multiplier} fell below ${FurMarket.MIN_MULTIPLIER}"
                )
                assertTrue(
                    entry.multiplier <= FurMarket.MAX_MULTIPLIER,
                    "Multiplier ${entry.multiplier} exceeded ${FurMarket.MAX_MULTIPLIER}"
                )

                val price = FurMarket.effectivePrice(hide, entry.multiplier)
                val minPossible = kotlin.math.round(hide.basePrice * 0.50).toInt()
                val maxPossible = kotlin.math.round(hide.basePrice * 2.00).toInt()
                assertTrue(price in minPossible..maxPossible, "Price $price out of bounds [$minPossible, $maxPossible]")
            }
        }
    }
}
