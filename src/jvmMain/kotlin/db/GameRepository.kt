package db

import com.mongodb.client.model.Filters
import com.mongodb.client.model.ReplaceOptions
import kotlinx.coroutines.launch
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import models.GameState
import models.GameStatus
import org.bson.Document
import java.util.UUID

object GameRepository {
    private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }
    
    private val activeGamesCollection by lazy { MongoConfig.database.getCollection("active_games") }
    private val turnHistoryCollection by lazy { MongoConfig.database.getCollection("game_turn_history") }
    
    private val scope = kotlinx.coroutines.CoroutineScope(kotlinx.coroutines.Dispatchers.IO + kotlinx.coroutines.SupervisorJob())
    
    fun saveGameState(gameId: String = "global_game", state: GameState, trigger: String = "TURN_END") {
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
                    .append("updatedAt", now)
                
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
                
                println("💾 [GameRepository] Saved game state to MongoDB ($trigger): Turn ${state.currentTurn}, Status: ${state.status}, Active Team: ${state.activeTeamTurn}")
            } catch (e: Exception) {
                println("❌ [GameRepository] Failed to save game state: ${e.message}")
            }
        }
    }
    
    fun loadActiveGame(gameId: String = "global_game"): GameState? {
        return try {
            val doc = activeGamesCollection.find(Filters.eq("id", gameId)).firstOrNull() ?: return null
            val stateJson = doc.getString("gameStateJson") ?: return null
            val loadedState = json.decodeFromString<GameState>(stateJson)
            println("🔄 [GameRepository] Successfully restored active game from MongoDB: Turn ${loadedState.currentTurn}, Status: ${loadedState.status}, Active Team: ${loadedState.activeTeamTurn}")
            loadedState
        } catch (e: Exception) {
            println("❌ [GameRepository] Error restoring active game: ${e.message}")
            null
        }
    }
    
    fun clearActiveGame(gameId: String = "global_game") {
        try {
            activeGamesCollection.deleteOne(Filters.eq("id", gameId))
            println("🗑️ [GameRepository] Cleared active game from MongoDB")
        } catch (e: Exception) {
            println("❌ [GameRepository] Error clearing active game: ${e.message}")
        }
    }
}
