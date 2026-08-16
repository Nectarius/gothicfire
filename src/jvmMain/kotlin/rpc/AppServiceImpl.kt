package rpc

import com.mongodb.client.model.Filters
import db.MongoConfig
import dev.kilua.rpc.ServiceException
import io.ktor.server.application.*
import io.ktor.server.sessions.*
import models.Discussion
import models.Note
import models.UserSession
import models.GameResultSummary
import models.GameState
import models.Team
import kotlinx.serialization.json.Json
import java.util.UUID

class AppServiceImpl(private val call: ApplicationCall) : AppService {
    private val session get() = call.sessions.get<UserSession>()

    override suspend fun getCurrentUser(): UserSession {
        return session ?: throw ServiceException("Unauthorized")
    }

    override suspend fun getNotes(): List<Note> {
        val user = session ?: throw ServiceException("Unauthorized")
        return MongoConfig.notes.find(Filters.eq("userId", user.id)).toList()
    }

    override suspend fun saveNote(title: String, content: String): Note {
        val user = session ?: throw ServiceException("Unauthorized")
        val note = Note(
            id = UUID.randomUUID().toString(),
            userId = user.id,
            title = title,
            content = content,
            updatedAt = System.currentTimeMillis()
        )
        MongoConfig.notes.insertOne(note)
        return note
    }

    override suspend fun deleteNote(noteId: String): Boolean {
        val user = session ?: throw ServiceException("Unauthorized")
        val result = MongoConfig.notes.deleteOne(
            Filters.and(Filters.eq("id", noteId), Filters.eq("userId", user.id))
        )
        return result.deletedCount > 0
    }

    override suspend fun getDiscussions(): List<Discussion> {
        return MongoConfig.discussions.find().sort(com.mongodb.client.model.Sorts.descending("createdAt")).toList()
    }

    override suspend fun postDiscussion(content: String): Discussion {
        val user = session ?: throw ServiceException("Unauthorized")
        val discussion = Discussion(
            id = UUID.randomUUID().toString(),
            userId = user.id,
            authorName = user.name,
            content = content,
            createdAt = System.currentTimeMillis()
        )
        MongoConfig.discussions.insertOne(discussion)
        return discussion
    }

    override suspend fun getGameHistory(): List<GameResultSummary> {
        val historyCollection = MongoConfig.database.getCollection("game_turn_history")
        val docs = historyCollection.find(Filters.eq("trigger", "GAME_OVER"))
            .sort(com.mongodb.client.model.Sorts.descending("savedAt"))
            .toList()
        
        val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }
        
        return docs.mapNotNull { doc ->
            try {
                val gameId = doc.getString("gameId") ?: "unknown"
                val stateJson = doc.getString("gameStateJson") ?: return@mapNotNull null
                val savedAt = doc.getLong("savedAt") ?: 0L
                val state = json.decodeFromString<GameState>(stateJson)
                
                val redTeam = state.teamInfos[Team.RED]
                val blueTeam = state.teamInfos[Team.BLUE]
                
                val winningTeamInfo = state.winningTeam?.let { state.teamInfos[it] }
                
                val redPlayers = state.players.filter { it.team == Team.RED }.map { it.name }
                val bluePlayers = state.players.filter { it.team == Team.BLUE }.map { it.name }
                
                GameResultSummary(
                    gameId = gameId,
                    winningTeamName = winningTeamInfo?.name ?: state.winningTeam?.name,
                    winningTeamColor = winningTeamInfo?.color,
                    totalTurns = state.currentTurn,
                    finishedAt = savedAt,
                    redTeamName = redTeam?.name,
                    blueTeamName = blueTeam?.name,
                    redPlayers = redPlayers,
                    bluePlayers = bluePlayers
                )
            } catch (e: Exception) {
                null
            }
        }
    }
}
