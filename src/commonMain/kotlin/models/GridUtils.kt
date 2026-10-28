package models

fun isAdjacentSector(from: String, to: String): Boolean {
    if (from == to) return false
    val fromTerritory = MapData[from] ?: return false
    return fromTerritory.adjacentIds.contains(to)
}

/**
 * Computes shortest path distance in terms of strategic sector moves using Breadth-First Search (BFS).
 * Returns 0 if from == to, 1 for adjacent, 2 for reachable in 2 moves, etc.
 * Returns Int.MAX_VALUE if unreachable or invalid sector.
 */
fun getSectorDistance(from: String, to: String): Int {
    if (from == to) return 0
    val visited = mutableSetOf(from)
    val queue = ArrayDeque<Pair<String, Int>>()
    queue.add(from to 0)
    while (queue.isNotEmpty()) {
        val (current, dist) = queue.removeFirst()
        val neighbors = MapData[current]?.adjacentIds ?: emptyList()
        for (next in neighbors) {
            if (next == to) return dist + 1
            if (visited.add(next)) {
                queue.add(next to dist + 1)
            }
        }
    }
    return Int.MAX_VALUE
}

/**
 * Fog-of-War Visibility Rules:
 * 1. In LOBBY or GAME_OVER, all characters are visible.
 * 2. A player always sees their own characters and allied characters.
 * 3. Any character located in a Castle (or team base castle) is always visible.
 * 4. An enemy character is visible if and only if at least one living allied character
 *    is in the same sector or in an adjacent sector ("at the next location").
 */
fun isCharacterVisibleToPlayer(
    targetChar: Character,
    viewingPlayerId: String,
    gameState: GameState
): Boolean {
    if (gameState.status == GameStatus.LOBBY || gameState.status == GameStatus.GAME_OVER) {
        return true
    }
    
    val viewingPlayer = gameState.players.find { it.id == viewingPlayerId } ?: return true
    val viewingTeam = viewingPlayer.team
    
    val targetPlayer = gameState.players.find { it.id == targetChar.playerId }
    
    // Always see own characters and ally characters
    if (targetPlayer?.team == viewingTeam) {
        return true
    }
    
    // Target must be placed on the board and alive to be seen on the map
    val targetSector = targetChar.currentSector ?: return false
    if (targetChar.isDead) return false
    
    // Castle rule: A player can always see castles and any characters there
    val targetTerritory = MapData[targetSector]
    val isCastle = targetTerritory?.isCastle == true || gameState.teamCastles.containsValue(targetSector)
    if (isCastle) {
        return true
    }
    
    // Scout rule: Visible if any living allied character is in the same or adjacent sector
    val alliedPlacedChars = gameState.characters.filter { char ->
        val p = gameState.players.find { it.id == char.playerId }
        p?.team == viewingTeam && !char.isDead && char.currentSector != null
    }
    
    return alliedPlacedChars.any { ally ->
        val allySector = ally.currentSector!!
        allySector == targetSector || isAdjacentSector(allySector, targetSector)
    }
}

