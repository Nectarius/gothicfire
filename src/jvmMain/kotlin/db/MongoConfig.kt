package db

import com.mongodb.client.MongoClients
import com.mongodb.client.MongoDatabase
import models.Discussion
import models.Note
import models.User
import org.bson.codecs.configuration.CodecRegistries
import org.bson.codecs.configuration.CodecRegistry
import com.mongodb.MongoClientSettings
import org.bson.codecs.pojo.PojoCodecProvider
import EnvConfig

object MongoConfig {
    private val pojoCodecRegistry: CodecRegistry = CodecRegistries.fromRegistries(
        MongoClientSettings.getDefaultCodecRegistry(),
        CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build())
    )
    
    private val settings = MongoClientSettings.builder()
        .applyConnectionString(com.mongodb.ConnectionString(EnvConfig["MONGODB_URI"] ?: "mongodb://localhost:27017"))
        .codecRegistry(pojoCodecRegistry)
        .build()

    private val client = MongoClients.create(settings)
    val database: MongoDatabase = client.getDatabase(EnvConfig["MONGODB_DB"] ?: "kilua_app")
    
    val users = database.getCollection("users", User::class.java)
    val notes = database.getCollection("notes", Note::class.java)
    val discussions = database.getCollection("discussions", Discussion::class.java)
}
