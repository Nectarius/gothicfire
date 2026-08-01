package models

import kotlinx.serialization.Serializable

@Serializable
enum class Team {
    RED,
    BLUE
}

@Serializable
enum class GameStatus {
    LOBBY,
    IN_PROGRESS,
    GAME_OVER
}



@Serializable
data class Character(
    val id: String,
    val playerId: String,
    val name: String,
    val strength: Int,
    val agility: Int,
    val wisdom: Int,
    val currentSector: String? = null,
    val hasActedThisTurn: Boolean = false,
    val isDead: Boolean = false,
    val food: Int = 0,
    val gold: Int = 0,
    val soldiers: Int = 0
)

@Serializable
data class Player(
    val id: String,
    val name: String,
    val team: Team,
    val isReady: Boolean = false
)

@Serializable
data class TerritoryState(
    val sectorId: String,
    val ownerPlayerId: String? = null,
    val ownerTeam: Team? = null,
    val cultivation: Int = 10,
    val protection: Int = 10,
    val food: Int = 0,
    val gold: Int = 0
)

@Serializable
data class GameState(
    val status: GameStatus = GameStatus.LOBBY,
    val players: List<Player> = emptyList(),
    val characters: List<Character> = emptyList(),
    val activeTeamTurn: Team = Team.RED,
    val currentTurn: Int = 1,
    val maxTurns: Int = 20,
    val winningTeam: Team? = null,
    val teamCastles: Map<Team, String> = emptyMap(),
    val territories: Map<String, TerritoryState> = emptyMap()
)

