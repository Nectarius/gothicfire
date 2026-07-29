package models

fun isAdjacentSector(from: String, to: String): Boolean {
    if (from == to) return false
    val fromTerritory = MapData[from] ?: return false
    return fromTerritory.adjacentIds.contains(to)
}
