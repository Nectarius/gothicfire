package models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class CastleLord(
    val id: String,
    val name: String,
    val title: String,
    val castleSectorId: String,
    val castleName: String,
    val portraitUrl: String,
    val faction: String,
    val greeting: String
)

val PredefinedCastleLords = listOf(
    CastleLord(
        id = "LORD_HAGEN",
        name = "Lord Hagen",
        title = "Grand Master of the Paladins",
        castleSectorId = "14",
        castleName = "City of Khorinis",
        portraitUrl = "/portraits/lord_hagen.png",
        faction = "Royal Army & Paladins of Innos",
        greeting = "In the name of King Rhobar and the grace of Innos! State your business with the expedition force, Commander."
    ),
    CastleLord(
        id = "ONAR",
        name = "Onar",
        title = "Great Landowner",
        castleSectorId = "23",
        castleName = "Onar's Farm",
        portraitUrl = "/portraits/onar.png",
        faction = "Onar's Estate & Mercenaries",
        greeting = "What do you want? If you're here from the militia to demand more tax or grain, Lee's boys will throw you out. Otherwise, speak."
    ),
    CastleLord(
        id = "PYROKAR",
        name = "Pyrokar",
        title = "High Mage of the Circle of Fire",
        castleSectorId = "7",
        castleName = "Monastery of Innos",
        portraitUrl = "/portraits/pyrokar.png",
        faction = "The Monastery of Innos",
        greeting = "May the light of Innos guide you. What brings you before the High Council of Fire in these troubled times?"
    ),
    CastleLord(
        id = "GAROND",
        name = "Commander Garond",
        title = "Expedition Commander",
        castleSectorId = "52",
        castleName = "Fortress of the Pass",
        portraitUrl = "/portraits/garond.png",
        faction = "Mining Valley Expeditionary Force",
        greeting = "Halt! You're speaking with Commander Garond. If you have reinforcements or food supplies, speak up immediately. We hold this pass by blood alone."
    )
)

fun getCastleLordForSector(sectorId: String): CastleLord? =
    PredefinedCastleLords.find { it.castleSectorId == sectorId }

@Serializable
data class CastleDialogueResponse(
    @SerialName("lord_id")
    val lordIdSnake: String? = null,
    val lordId: String = lordIdSnake ?: "",
    @SerialName("lord_name")
    val lordNameSnake: String? = null,
    val lordName: String = lordNameSnake ?: "",
    @SerialName("castle_sector_id")
    val castleSectorIdSnake: String? = null,
    val castleSectorId: String = castleSectorIdSnake ?: "",
    val speech: String = "",
    @SerialName("key_points")
    val keyPointsSnake: List<String>? = null,
    val keyPoints: List<String> = keyPointsSnake ?: emptyList(),
    val timestamp: Long = 0L
)

@Serializable
data class CastleAudienceRequest(
    val gameId: String,
    val turn: Int,
    val playerId: String,
    val lordId: String,
    val lordName: String,
    val castleSectorId: String,
    val playerTeam: String,
    val playerSummary: String,
    val opponentsSummary: String,
    val mapSummary: String,
    val isUnderSiege: Boolean = false
)
