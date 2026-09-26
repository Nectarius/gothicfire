package game

import io.ktor.client.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.coroutines.withTimeout
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.slf4j.LoggerFactory

/**
 * Request payload sent to the local Python AI Agent microservice.
 */
@Serializable
data class DecisionRequest(
    val gameId: String,
    val turn: Int,
    val playerId: String,
    val summary: String,
    val legalMoves: List<String>
)

/**
 * Response payload received from the local Python AI Agent microservice.
 */
@Serializable
data class DecisionResponse(
    @SerialName("chosen_move")
    val chosenMove: String = "",
    val reasoning: String = ""
)

/**
 * Ktor client service to interact with the local Python FastAPI decision service.
 * Implements strict request timeout, runCatching safety wrapper, and resilient fallback handling.
 */
class AiOpponentService(
    private val client: HttpClient,
    private val agentUrl: String = "http://127.0.0.1:8000",
    private val timeoutMillis: Long = 15000L
) {
    private val logger = LoggerFactory.getLogger(AiOpponentService::class.java)

    private val json = Json {
        ignoreUnknownKeys = true
        isLenient = true
        encodeDefaults = true
    }

    /**
     * Request a move decision for a computer character from the local AI agent.
     *
     * @param gameId Current game identifier.
     * @param turn Current turn number.
     * @param playerId Identifier of the computer player/character.
     * @param summary Tactical battlefield situation and state summary.
     * @param legalMoves Available legal actions to choose from.
     * @return The chosen legal move, or a safe fallback move if timeout/error occurs.
     */
    suspend fun requestComputerMove(
        gameId: String,
        turn: Int,
        playerId: String,
        summary: String,
        legalMoves: List<String>
    ): String {
        val defaultFallback = legalMoves.firstOrNull() ?: "WAIT"

        if (legalMoves.isEmpty()) {
            logger.warn(
                "AiOpponentService.requestComputerMove invoked with empty legalMoves list. (gameId={}, turn={}, playerId={})",
                gameId, turn, playerId
            )
            return defaultFallback
        }

        val requestPayload = DecisionRequest(
            gameId = gameId,
            turn = turn,
            playerId = playerId,
            summary = summary,
            legalMoves = legalMoves
        )

        val targetEndpoint = if (agentUrl.endsWith("/decide") || agentUrl.endsWith("/decision") || agentUrl.endsWith("/decide-turn")) {
            agentUrl
        } else {
            "${agentUrl.trimEnd('/')}/decide"
        }

        val result = runCatching {
            withTimeout(timeoutMillis) {
                val httpResponse = client.post(targetEndpoint) {
                    contentType(ContentType.Application.Json)
                    setBody(json.encodeToString(requestPayload))
                    timeout {
                        requestTimeoutMillis = timeoutMillis
                        connectTimeoutMillis = timeoutMillis
                        socketTimeoutMillis = timeoutMillis
                    }
                }

                if (!httpResponse.status.isSuccess()) {
                    throw IllegalStateException("AI Agent microservice returned HTTP error status: ${httpResponse.status}")
                }

                val responseBody = httpResponse.bodyAsText()
                val decision = json.decodeFromString<DecisionResponse>(responseBody)

                val selectedMove = decision.chosenMove.trim()
                if (selectedMove.isBlank()) {
                    throw IllegalStateException("AI Agent returned blank move. Reasoning: ${decision.reasoning}")
                }

                if (selectedMove !in legalMoves) {
                    logger.warn(
                        "AI Agent chose invalid move '{}' not found in legalMoves {}. Reasoning: '{}'. Falling back to '{}'.",
                        selectedMove, legalMoves, decision.reasoning, defaultFallback
                    )
                    defaultFallback
                } else {
                    logger.info(
                        "AI Agent selected move '{}' for gameId={}, turn={}, playerId={}. Reasoning: '{}'",
                        selectedMove, gameId, turn, playerId, decision.reasoning
                    )
                    selectedMove
                }
            }
        }

        return result.getOrElse { error ->
            logger.warn(
                "AiOpponentService request failed for gameId={}, turn={}, playerId={} (target: {}): {}. Falling back to '{}'",
                gameId, turn, playerId, targetEndpoint, error.message, defaultFallback
            )
            defaultFallback
        }
    }
}
