package rpc

import com.mongodb.client.model.Filters
import db.MongoConfig
import io.ktor.server.application.*
import io.ktor.server.sessions.*
import models.Discussion
import models.Note
import models.UserSession
import java.util.UUID

class AppServiceImpl(private val call: ApplicationCall) : AppService {
    private val session get() = call.sessions.get<UserSession>()

    override suspend fun getCurrentUser(): UserSession {
        return session ?: throw Exception("Unauthorized")
    }

    override suspend fun getNotes(): List<Note> {
        val user = session ?: throw Exception("Unauthorized")
        return MongoConfig.notes.find(Filters.eq("userId", user.id)).toList()
    }

    override suspend fun saveNote(title: String, content: String): Note {
        val user = session ?: throw Exception("Unauthorized")
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
        val user = session ?: throw Exception("Unauthorized")
        val result = MongoConfig.notes.deleteOne(
            Filters.and(Filters.eq("id", noteId), Filters.eq("userId", user.id))
        )
        return result.deletedCount > 0
    }

    override suspend fun getDiscussions(): List<Discussion> {
        return MongoConfig.discussions.find().sort(com.mongodb.client.model.Sorts.descending("createdAt")).toList()
    }

    override suspend fun postDiscussion(content: String): Discussion {
        val user = session ?: throw Exception("Unauthorized")
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
}
