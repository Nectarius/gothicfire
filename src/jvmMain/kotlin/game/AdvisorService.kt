package game

import io.ktor.client.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.coroutines.withTimeout
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import models.*
import org.slf4j.LoggerFactory

class AdvisorService(
    private val client: HttpClient,
    private val agentUrl: String = "http://127.0.0.1:8000",
    private val timeoutMillis: Long = 60000L
) {
    private val logger = LoggerFactory.getLogger(AdvisorService::class.java)
    private val json = Json {
        ignoreUnknownKeys = true
        isLenient = true
        encodeDefaults = true
    }

    suspend fun consultAdvisor(
        gameState: GameState,
        playerId: String,
        advisorId: String,
        questionType: String
    ): AdvisorConsultationResponse {
        val player = gameState.players.find { it.id == playerId }
        val playerTeam = player?.team ?: Team.RED
        val myChars = gameState.characters.filter { it.playerId == playerId && !it.isDead }
        val myTerritories = gameState.territories.values.filter { it.ownerTeam == playerTeam || it.ownerPlayerId == playerId }

        val enemyPlayers = gameState.players.filter { it.team != playerTeam }
        val enemyChars = gameState.characters.filter { char -> enemyPlayers.any { it.id == char.playerId } && !char.isDead }
        val enemyTerritories = gameState.territories.values.filter { it.ownerTeam != null && it.ownerTeam != playerTeam }

        val myTotalArmy = myChars.sumOf { it.army.total() }
        val myTotalGold = myChars.sumOf { it.gold }
        val myTotalFood = myChars.sumOf { it.food }
        val enemyTotalArmy = enemyChars.sumOf { it.army.total() }

        val myCastle = gameState.teamCastles[playerTeam]?.let { MapData[it]?.name ?: "Castle $it" } ?: "None"
        val enemyCastles = enemyPlayers.mapNotNull { gameState.teamCastles[it.team] }.distinct()
            .joinToString { MapData[it]?.name ?: "Castle $it" }

        val playerSummary = "Team: $playerTeam. Controlled Sectors: ${myTerritories.size}. Total Army: $myTotalArmy (Mages: ${myChars.sumOf { it.army.mages }}, Heavy: ${myChars.sumOf { it.army.heavyInfantry }}, Light: ${myChars.sumOf { it.army.lightInfantry }}, Archers: ${myChars.sumOf { it.army.archers }}). Treasury: $myTotalGold Gold, $myTotalFood Food. Castle Base: $myCastle."
        val opponentsSummary = "Rival Teams: ${enemyPlayers.map { it.team }.distinct().joinToString()}. Enemy Sectors: ${enemyTerritories.size}. Enemy Army: $enemyTotalArmy units across ${enemyChars.size} active commanders. Enemy Fortresses: ${if (enemyCastles.isNotBlank()) enemyCastles else "Unknown"}."
        val mapSummary = "Current Turn: ${gameState.currentTurn}/${gameState.maxTurns}. Market Rate: ${gameState.marketRate}."

        val isJade = advisorId.equals("JADE", ignoreCase = true)
        val advisorName = if (isJade) "Jade the Enlightened" else "Zorax the Mighty"

        val request = AdvisorConsultationRequest(
            gameId = gameState.gameName ?: "campaign",
            turn = gameState.currentTurn,
            playerId = playerId,
            advisorId = if (isJade) "JADE" else "ZORAX",
            advisorName = advisorName,
            questionType = questionType,
            playerTeam = playerTeam.name,
            playerSummary = playerSummary,
            opponentsSummary = opponentsSummary,
            mapSummary = mapSummary
        )

        val baseUrl = agentUrl.trimEnd('/')
            .removeSuffix("/decide")
            .removeSuffix("/decision")
            .removeSuffix("/decide-turn")
            .removeSuffix("/api/advisor/consult")
            .removeSuffix("/advisor")
            .trimEnd('/')

        val targetEndpoint = if (agentUrl.endsWith("/api/advisor/consult") || agentUrl.endsWith("/advisor")) {
            agentUrl
        } else {
            "$baseUrl/api/advisor/consult"
        }

        logger.info("Consulting advisor $advisorName at $targetEndpoint (timeout: ${timeoutMillis}ms)...")

        val result = runCatching {
            withTimeout(timeoutMillis) {
                val response = client.post(targetEndpoint) {
                    contentType(ContentType.Application.Json)
                    setBody(json.encodeToString(request))
                    timeout {
                        requestTimeoutMillis = timeoutMillis
                        connectTimeoutMillis = timeoutMillis
                        socketTimeoutMillis = timeoutMillis
                    }
                }
                if (!response.status.isSuccess()) {
                    throw IllegalStateException("Advisor HTTP ${response.status}")
                }
                json.decodeFromString<AdvisorConsultationResponse>(response.bodyAsText())
            }
        }

        return result.getOrElse { err ->
            logger.warn("Advisor consultation failed at $targetEndpoint ($err). Using in-character fallback counsel.")
            fallbackAdvice(advisorId, advisorName, questionType, myTotalArmy, enemyTotalArmy, myTotalGold)
        }
    }

    private fun fallbackAdvice(
        advisorId: String,
        advisorName: String,
        questionType: String,
        myArmy: Int,
        enemyArmy: Int,
        myGold: Int
    ): AdvisorConsultationResponse {
        val isJade = advisorId.equals("JADE", ignoreCase = true)

        val advice: String
        val keyPoints: List<String>

        when (questionType.uppercase()) {
            "STATUS" -> {
                if (isJade) {
                    advice = "The arcane ether whispers of shifting balances, My Lord. We muster $myArmy soldiers while our adversaries command $enemyArmy. Our treasury of $myGold gold holds promise, but we must protect our cultivated lands from encroachment."
                    keyPoints = listOf("Army comparison: $myArmy vs $enemyArmy enemy troops", "Treasury reserve: $myGold gold", "Safeguard border sectors")
                } else {
                    advice = "Commander! Our ranks count $myArmy soldiers against the enemy's $enemyArmy. We hold our ground, but vigilance is our shield. Keep the castle secured and do not let their scouts probe our perimeter undetected."
                    keyPoints = listOf("Standing force: $myArmy soldiers", "Enemy threat: $enemyArmy hostile troops", "Secure castle garrison")
                }
            }
            "NEXT_MOVE" -> {
                if (isJade) {
                    advice = "Channel our wealth into strength, Seeker. If you possess surplus gold, harvest available territory resources and recruit Mages to amplify our spellcasting dominance this turn."
                    keyPoints = listOf("Collect unharvested sector resources", "Invest gold in high-tier arcane units", "Check adjacent movement paths")
                } else {
                    advice = "Strengthen the vanguard, Commander! If you have gold in the war chest, recruit Heavy Infantry immediately. A fortified line will absorb any surprise assault."
                    keyPoints = listOf("Recruit Heavy Infantry at castle", "Upgrade sector protection if under 20", "Position troops on defensible chokepoints")
                }
            }
            else -> { // STRATEGY
                if (isJade) {
                    advice = "Victory belongs to those who master both fortune and magic, Commander. Cultivate high-yield sectors across the map, assemble a devastating coven of Mages, and strike their fortress when their defenses falter."
                    keyPoints = listOf("Maximize territory cultivation for compound gold", "Synergize Archon stat with Mage units", "Target the opposing fortress")
                } else {
                    advice = "War is won by iron and relentless advance, Sire! Secure our supply line, fortify key transit sectors with protection, and march an overwhelming host directly upon the enemy castle."
                    keyPoints = listOf("Build overwhelming force (>10x ratio for instant victory)", "Push forward toward enemy castle", "Never leave your base undefended")
                }
            }
        }

        return AdvisorConsultationResponse(
            advisorName = advisorName,
            questionType = questionType,
            advice = advice,
            keyPoints = keyPoints
        )
    }
}
