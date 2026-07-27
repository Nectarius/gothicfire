package models

import kotlinx.serialization.Serializable

@Serializable
data class TwitterUserResponse(val data: TwitterUserInfo)

@Serializable
data class TwitterUserInfo(val id: String, val name: String, val username: String)
