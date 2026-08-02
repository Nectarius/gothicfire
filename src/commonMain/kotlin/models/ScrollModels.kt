package models

import kotlinx.serialization.Serializable

@Serializable
enum class ScrollType {
    STRENGTH,
    WISDOM,
    AGILITY
}

@Serializable
data class Scroll(
    val id: String,
    val type: ScrollType,
    val boostAmount: Int = 3
)
