package models

import kotlinx.serialization.Serializable

@Serializable
data class UnitLocation(
    val unitId: String,   // e.g., "unit-abc123"
    val sector: String    // e.g., "A1", "C3", "E4"
)
