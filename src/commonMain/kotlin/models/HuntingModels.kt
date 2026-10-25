package models

import kotlinx.serialization.Serializable
import kotlin.math.round
import kotlin.random.Random

@Serializable
enum class HideType(
    val itemId: String,
    val displayName: String,
    val basePrice: Int,
    val emoji: String
) {
    WOLF("ItAt_WolfFur", "Wolf Fur", 5, "🐺"),
    WARG("ItAt_WargFur", "Warg Fur", 10, "🐕"),
    BOAR("ItAt_Addon_KeilerFur", "Boarskin", 20, "🐗"),
    SHADOWBEAST("ItAt_ShadowFur", "Shadowbeast Fur", 20, "🦇"),
    TROLL("ItAt_TrollFur", "Troll Fur", 30, "🧌"),
    BLACK_TROLL("ItAt_TrollBlackFur", "Black Troll Fur", 35, "🖤");

    companion object {
        fun fromItemId(itemId: String): HideType? = entries.find { it.itemId == itemId }
    }
}

@Serializable
data class HuntingCamp(
    val sectorId: String,
    val ownerPlayerId: String,
    val ownerTeam: Team,
    val pitchedByCharId: String,
    val pitchedOnTurn: Int
)

@Serializable
data class HuntingGround(
    val sectorIds: List<String>,
    val title: String,
    val description: String
)

@Serializable
data class FurMarketEntry(
    val multiplier: Double = 1.0,
    val trendUp: Boolean = true
)

object FurMarket {
    const val MIN_MULTIPLIER = 0.50
    const val MAX_MULTIPLIER = 2.00
    const val CAMP_COST = 20

    fun initial(): Map<HideType, FurMarketEntry> =
        HideType.entries.associateWith { FurMarketEntry(1.0, true) }

    fun effectivePrice(hide: HideType, multiplier: Double): Int {
        val clamped = multiplier.coerceIn(MIN_MULTIPLIER, MAX_MULTIPLIER)
        return round(hide.basePrice * clamped).toInt()
    }

    fun nextEntry(current: FurMarketEntry, random: Random = Random.Default): FurMarketEntry {
        // Step delta between 0.05 and 0.20
        val step = 0.05 + random.nextDouble() * 0.15 // in [0.05, 0.20]

        // 70% chance to preserve current direction, 30% chance to flip
        val keepTrend = random.nextDouble() < 0.70
        var trendUp = if (keepTrend) current.trendUp else !current.trendUp

        var newMult = if (trendUp) current.multiplier + step else current.multiplier - step

        if (newMult >= MAX_MULTIPLIER) {
            newMult = MAX_MULTIPLIER
            trendUp = false
        } else if (newMult <= MIN_MULTIPLIER) {
            newMult = MIN_MULTIPLIER
            trendUp = true
        }

        // Clean rounding to 2 decimal places
        val roundedMult = round(newMult * 100.0) / 100.0
        return FurMarketEntry(multiplier = roundedMult.coerceIn(MIN_MULTIPLIER, MAX_MULTIPLIER), trendUp = trendUp)
    }
}

object HuntingCatalog {
    val table: Map<HideType, List<HuntingGround>> = mapOf(
        HideType.WOLF to listOf(
            HuntingGround(
                sectorIds = listOf("1"),
                title = "Sector 1: Northern Grimwald",
                description = "The dense woods north of the city are prime hunting territory where packs of wolves roam beneath the trees. Bartok also takes the hero hunting here specifically for wolves."
            ),
            HuntingGround(
                sectorIds = listOf("30"),
                title = "Sector 30: Onar's Wheatfields",
                description = "Wolves lurk in the nearby treelines and ravines, frequently preying on Pepe's flock (tied to the quest Four Wolves for Pepe)."
            ),
            HuntingGround(
                sectorIds = listOf("38", "27"),
                title = "Sector 38: Western Crags & Sector 27: Cavalorn's Valley",
                description = "Young wolves and standard wolves stalk the brush and rocky slopes leading down from Xardas's tower."
            ),
            HuntingGround(
                sectorIds = listOf("17", "20"),
                title = "Sector 17: Sekob's Farm & Sector 20: Akil's Farm",
                description = "The fringes of the crop fields and stone paths are regularly contested by packs of wolves."
            )
        ),
        HideType.WARG to listOf(
            HuntingGround(
                sectorIds = listOf("41", "40"),
                title = "Sector 41: Shadowbeast Woods & Sector 40: Grom's Camp",
                description = "The deeper southern pine forests house higher-tier predators, including packs of wargs roaming near the rock faces and orc encampments."
            ),
            HuntingGround(
                sectorIds = listOf("50", "48"),
                title = "Sector 50: Paladin Barricade & Sector 48: Pass Gorge",
                description = "Wargs accompany orc scouts and warrior patrols stationed along the approach gorges and defensive lines to the Valley of Mines."
            ),
            HuntingGround(
                sectorIds = listOf("52"),
                title = "Sector 52: Castle of the Valley of Mines (Outer Ring)",
                description = "The valley surrounding the castle is infested with orc raiding bands, which consistently keep wargs at their camps."
            )
        ),
        HideType.SHADOWBEAST to listOf(
            HuntingGround(
                sectorIds = listOf("41"),
                title = "Sector 41: Shadowbeast Woods",
                description = "Explicitly identified as a deep pine forest ruled by shadowbeasts, where they rest inside rocky hollows and caves."
            ),
            HuntingGround(
                sectorIds = listOf("1"),
                title = "Sector 1: Northern Grimwald",
                description = "Young shadowbeasts roam the deeper parts of this northern forest. Additionally, Bartok's hunting excursion leads directly into a cave sheltering an aggressive shadowbeast."
            ),
            HuntingGround(
                sectorIds = listOf("19"),
                title = "Sector 19: Sagitta's Grove (Woods behind Sekob's Farm)",
                description = "The thick forest surrounding Sagitta's cave features rocky caverns containing sleeping shadowbeasts (such as the cave with the Sun Aloe herb)."
            ),
            HuntingGround(
                sectorIds = listOf("2"),
                title = "Sector 2: Black Troll Gorge (Southern approach)",
                description = "In the wooded pass leading up to the Black Troll's lake, a shadowbeast makes its den inside an alcove cave."
            )
        ),
        HideType.TROLL to listOf(
            HuntingGround(
                sectorIds = listOf("39"),
                title = "Sector 39: Troll Canyon",
                description = "A deep, narrow gorge in the southern mountains where mountain trolls directly block the paths."
            ),
            HuntingGround(
                sectorIds = listOf("2"),
                title = "Sector 2: Black Troll Gorge (Surroundings)",
                description = "Standard brown trolls spawn along the plateau edges and paths approaching Grimbald's camp near the mountain basin."
            ),
            HuntingGround(
                sectorIds = listOf("40"),
                title = "Sector 40: Grom's Camp",
                description = "Two standard trolls guard the forest clearing near Grom's campfire at the foot of the southern peaks. Grom even tasks the hero with providing food before offering hunting training."
            )
        ),
        HideType.BLACK_TROLL to listOf(
            HuntingGround(
                sectorIds = listOf("2"),
                title = "Sector 2: Black Troll Gorge",
                description = "This is the unique habitat of the legendary Black Troll on Khorinis. Grimbald camps just outside the basin waiting for a partner to help bring it down. Its fur is required for Bosper's master trial or can be shown to Falk."
            )
        ),
        HideType.BOAR to listOf(
            HuntingGround(
                sectorIds = listOf("4", "6"),
                title = "Sector 4: Vino's Hollow & Sector 6: Northgate Woods",
                description = "Wild boars (Keiler) spawn in the dense thickets and clearings around Vino's distillery and along the timber borders near Lobart's fields."
            ),
            HuntingGround(
                sectorIds = listOf("16", "20"),
                title = "Sector 16: Erol's Bridge & Sector 20: Akil's Farm",
                description = "The forested hills between the city road, Erol's bridge, and the path to Akil's farm contain several small groups of roaming boars."
            ),
            HuntingGround(
                sectorIds = listOf("43"),
                title = "Sector 43: Ruins of the Builders (Pyramids plateau)",
                description = "The scrubland and outer valley leading up to the ancient stepped pyramids are frequented by wild boars."
            )
        )
    )

    private val validSectorsByHide: Map<HideType, Set<String>> =
        table.mapValues { (_, grounds) -> grounds.flatMap { it.sectorIds }.toSet() }

    private val hidesBySector: Map<String, List<HideType>> = run {
        val result = mutableMapOf<String, MutableList<HideType>>()
        for ((hide, grounds) in table) {
            for (ground in grounds) {
                for (sector in ground.sectorIds) {
                    result.getOrPut(sector) { mutableListOf() }.add(hide)
                }
            }
        }
        result
    }

    fun isHuntable(hide: HideType, sectorId: String): Boolean =
        validSectorsByHide[hide]?.contains(sectorId) == true

    fun huntableHidesIn(sectorId: String): List<HideType> =
        hidesBySector[sectorId] ?: emptyList()

    fun groundsFor(hide: HideType): List<HuntingGround> =
        table[hide] ?: emptyList()

    fun hasGameIn(sectorId: String): Boolean =
        huntableHidesIn(sectorId).isNotEmpty()
}
