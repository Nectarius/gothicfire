package db

import com.mongodb.client.model.Filters
import com.mongodb.client.model.ReplaceOptions
import kotlinx.coroutines.launch
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import models.GameState
import models.GameStatus
import org.bson.Document
import org.slf4j.LoggerFactory
import java.util.UUID

object GameRepository {
    private val logger = LoggerFactory.getLogger(GameRepository::class.java)
    private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }
    
    private val activeGamesCollection by lazy { MongoConfig.database.getCollection("active_games") }
    private val turnHistoryCollection by lazy { MongoConfig.database.getCollection("game_turn_history") }
    
    private val scope = kotlinx.coroutines.CoroutineScope(kotlinx.coroutines.Dispatchers.IO + kotlinx.coroutines.SupervisorJob())
    
    fun saveGameState(
        gameId: String = "global_game",
        state: GameState,
        trigger: String = "TURN_END",
        userId: String? = null,
        playerName: String? = null
    ) {
        scope.launch {
            try {
                val now = System.currentTimeMillis()
                val stateJson = json.encodeToString(state)
                
                // 1. Upsert into active_games
                val doc = Document()
                    .append("id", gameId)
                    .append("gameStateJson", stateJson)
                    .append("status", state.status.name)
                    .append("currentTurn", state.currentTurn)
                    .append("activeTeamTurn", state.activeTeamTurn.name)
                    .append("isPvE", state.isPvE)
                    .append("updatedAt", now)
                
                if (!userId.isNullOrBlank()) doc.append("userId", userId)
                if (!playerName.isNullOrBlank()) doc.append("playerName", playerName)
                
                activeGamesCollection.replaceOne(
                    Filters.eq("id", gameId),
                    doc,
                    ReplaceOptions().upsert(true)
                )
                
                // 2. Record historical snapshot for turns and game over
                if (trigger == "TURN_END" || trigger == "GAME_OVER") {
                    val historyDoc = Document()
                        .append("id", UUID.randomUUID().toString())
                        .append("gameId", gameId)
                        .append("turnNumber", state.currentTurn)
                        .append("activeTeamTurn", state.activeTeamTurn.name)
                        .append("status", state.status.name)
                        .append("trigger", trigger)
                        .append("gameStateJson", stateJson)
                        .append("savedAt", now)
                    
                    turnHistoryCollection.insertOne(historyDoc)
                }
                
                logger.info("Saved game state to MongoDB ({}): GameId {}, Turn {}, Status: {}, Active Team: {}", trigger, gameId, state.currentTurn, state.status, state.activeTeamTurn)
            } catch (e: Exception) {
                logger.error("Failed to save game state: {}", e.message, e)
            }
        }
    }
    
    fun loadActiveGame(gameId: String = "global_game"): GameState? {
        return try {
            val doc = activeGamesCollection.find(Filters.eq("id", gameId)).firstOrNull() ?: return null
            val stateJson = doc.getString("gameStateJson") ?: return null
            val loadedState = json.decodeFromString<GameState>(stateJson)
            logger.info("Successfully restored active game from MongoDB: Turn {}, Status: {}, Active Team: {}", loadedState.currentTurn, loadedState.status, loadedState.activeTeamTurn)
            loadedState
        } catch (e: Exception) {
            logger.error("Error restoring active game: {}", e.message, e)
            null
        }
    }
    
    fun loadActivePvEGame(userId: String?, playerName: String?): Pair<String, GameState>? {
        return try {
            val filterList = mutableListOf<org.bson.conversions.Bson>()
            filterList.add(Filters.eq("isPvE", true))
            filterList.add(Filters.eq("status", GameStatus.IN_PROGRESS.name))
            
            val userOrNameFilters = mutableListOf<org.bson.conversions.Bson>()
            if (!userId.isNullOrBlank()) {
                userOrNameFilters.add(Filters.eq("userId", userId))
                userOrNameFilters.add(Filters.eq("id", "pve_$userId"))
            }
            if (!playerName.isNullOrBlank()) {
                userOrNameFilters.add(Filters.eq("playerName", playerName))
                userOrNameFilters.add(Filters.eq("id", "pve_$playerName"))
            }
            if (userOrNameFilters.isNotEmpty()) {
                filterList.add(Filters.or(userOrNameFilters))
            } else {
                return null
            }
            
            val doc = activeGamesCollection.find(Filters.and(filterList)).firstOrNull() ?: return null
            val gameId = doc.getString("id") ?: return null
            val stateJson = doc.getString("gameStateJson") ?: return null
            val loadedState = json.decodeFromString<GameState>(stateJson)
            logger.info("Successfully restored active PvE game '{}' from MongoDB: Turn {}, Status: {}", gameId, loadedState.currentTurn, loadedState.status)
            Pair(gameId, loadedState)
        } catch (e: Exception) {
            logger.error("Error restoring active PvE game: {}", e.message, e)
            null
        }
    }
    
    fun clearActiveGame(gameId: String = "global_game") {
        try {
            activeGamesCollection.deleteOne(Filters.eq("id", gameId))
            logger.info("Cleared active game '{}' from MongoDB", gameId)
        } catch (e: Exception) {
            logger.error("Error clearing active game: {}", e.message, e)
        }
    }
}
