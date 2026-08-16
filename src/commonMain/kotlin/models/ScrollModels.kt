package models

import kotlinx.serialization.Serializable

@Serializable
enum class ScrollType {
    WARLORD,
    INTELLECT,
    VANGUARD,
    ARCHON
}

@Serializable
data class Scroll(
    val id: String,
    val type: ScrollType,
    val boostAmount: Int
)
