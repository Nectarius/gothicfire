package models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
enum class AdvisorId {
    ZORAX,
    JADE
}

@Serializable
data class AdvisorInfo(
    val id: String,
    val name: String,
    val title: String,
    val description: String,
    val iconUrl: String,
    val accentColor: String,
    val personality: String
)

val PredefinedAdvisors = listOf(
    AdvisorInfo(
        id = "ZORAX",
        name = "Zorax the Mighty",
        title = "Veteran General & War Tactician",
        description = "A battle-hardened commander with grey hair and scarred armor. Emphasizes iron discipline, garrisoned castles, and crushing martial force.",
        iconUrl = "/advisor_zorax.png",
        accentColor = "#eab308",
        personality = "Direct military authority, discipline, battlefield pragmatism."
    ),
    AdvisorInfo(
        id = "JADE",
        name = "Jade the Enlightened",
        title = "High Sorceress & Arcane Seer",
        description = "An astute sorceress with flowing velvet hair and mystical sight. Excels at economic cultivation, arcane synergies, and foresight.",
        iconUrl = "/advisor_jade.png",
        accentColor = "#a855f7",
        personality = "Arcane wisdom, foresight, resource cultivation, spellcraft."
    )
)

@Serializable
enum class AdvisorQuestionType {
    STATUS,     // "What's the current status?"
    NEXT_MOVE,  // "What should I do next?"
    STRATEGY    // "What is our strategy for the future?"
}

@Serializable
data class AdvisorQuestionOption(
    val type: String,
    val icon: String,
    val label: String,
    val description: String
)

val AdvisorQuestions = listOf(
    AdvisorQuestionOption(
        type = "STATUS",
        icon = "📊",
        label = "What's the current status?",
        description = "Compare your empire's standing, army power, and economy against your rivals."
    ),
    AdvisorQuestionOption(
        type = "NEXT_MOVE",
        icon = "⚔️",
        label = "What should I do next?",
        description = "Get tactical counsel for your current turn, troop movements, and upgrades."
    ),
    AdvisorQuestionOption(
        type = "STRATEGY",
        icon = "🔮",
        label = "What is our strategy for the future?",
        description = "Discover a long-term strategic pathway to total victory."
    )
)

@Serializable
data class AdvisorConsultationRequest(
    val gameId: String,
    val turn: Int,
    val playerId: String,
    val advisorId: String,
    val advisorName: String,
    val questionType: String,
    val playerTeam: String,
    val playerSummary: String,
    val opponentsSummary: String,
    val mapSummary: String
)

@Serializable
data class AdvisorConsultationResponse(
    @SerialName("advisor_name")
    val advisorNameSnake: String? = null,
    val advisorName: String = advisorNameSnake ?: "",
    @SerialName("question_type")
    val questionTypeSnake: String? = null,
    val questionType: String = questionTypeSnake ?: "",
    val advice: String = "",
    @SerialName("key_points")
    val keyPointsSnake: List<String>? = null,
    val keyPoints: List<String> = keyPointsSnake ?: emptyList()
)
