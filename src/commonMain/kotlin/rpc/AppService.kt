package rpc

import dev.kilua.rpc.annotations.RpcService
import models.Discussion
import models.Note
import models.UserSession

@RpcService
interface AppService {
    suspend fun getCurrentUser(): UserSession
    
    suspend fun getNotes(): List<Note>
    suspend fun saveNote(title: String, content: String): Note
    suspend fun deleteNote(noteId: String): Boolean
    
    suspend fun getDiscussions(): List<Discussion>
    suspend fun postDiscussion(content: String): Discussion
    
    suspend fun getGameHistory(): List<models.GameResultSummary>
}
