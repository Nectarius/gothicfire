package models

import kotlinx.serialization.Serializable

@Serializable
data class User(val id: String, val email: String, val name: String, val createdAt: Long)

@Serializable
data class Note(val id: String, val userId: String, val title: String, val content: String, val updatedAt: Long)

@Serializable
data class Discussion(val id: String, val userId: String, val authorName: String, val content: String, val createdAt: Long)

@Serializable
data class UserSession(val id: String, val email: String, val name: String)

@Serializable
data class TwitterPkceSession(val codeVerifier: String, val state: String)
