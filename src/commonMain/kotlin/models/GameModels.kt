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

/**
 * Pre-battle strategy the attacker can choose before engaging.
 * Each strategy provides a small bonus to the attacker's combat score if requirements are met.
 *
 * Requirements:
 *   ARCANE_PHALANX       — soldiers > 5
 *   HAMMER_AND_SPELL     — agility >= 6 AND soldiers > 3
 *   SPELL_INFUSED_VOLLEY — wisdom >= 6 AND soldiers > 5
 */
@Serializable
enum class BattleStrategy {
    NONE,
    ARCANE_PHALANX,
    HAMMER_AND_SPELL,
    SPELL_INFUSED_VOLLEY
}

/** Checks whether a character meets the requirements to use a given strategy. */
fun canUseStrategy(character: Character, strategy: BattleStrategy): Boolean = when (strategy) {
    BattleStrategy.NONE -> true
    BattleStrategy.ARCANE_PHALANX -> character.soldiers > 5
    BattleStrategy.HAMMER_AND_SPELL -> character.agility >= 6 && character.soldiers > 3
    BattleStrategy.SPELL_INFUSED_VOLLEY -> character.wisdom >= 6 && character.soldiers > 5
}

/**
 * Returns the combat score bonus for the chosen strategy.
 * The bonus scales slightly with the relevant stat so investing in stats still matters.
 *
 * ARCANE_PHALANX:       +3 base + (strength * 0.3)  — rewards tanky frontline builds
 * HAMMER_AND_SPELL:     +3 base + (agility * 0.3)   — rewards mobile flanking builds
 * SPELL_INFUSED_VOLLEY: +3 base + (wisdom * 0.3)    — rewards magical ranged builds
 */
fun strategyBonus(character: Character, strategy: BattleStrategy): Double = when (strategy) {
    BattleStrategy.NONE -> 0.0
    BattleStrategy.ARCANE_PHALANX -> 3.0 + (character.strength * 0.3)
    BattleStrategy.HAMMER_AND_SPELL -> 3.0 + (character.agility * 0.3)
    BattleStrategy.SPELL_INFUSED_VOLLEY -> 3.0 + (character.wisdom * 0.3)
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
    val soldiers: Int = 0,
    val siegeWeapons: Int = 0,
    val scrolls: List<Scroll> = emptyList()
)

@Serializable
data class Player(
    val id: String,
    val name: String,
    val team: Team,
    val isReady: Boolean = false
)

@Serializable
enum class NatureEventType {
    ABUNDANT_HARVEST,
    VOLUNTEERS,
    HURRICANE,
    FLOOD
}

@Serializable
data class TerritoryState(
    val sectorId: String,
    val ownerPlayerId: String? = null,
    val ownerTeam: Team? = null,
    val cultivation: Int = 10,
    val protection: Int = 5,
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
    val territories: Map<String, TerritoryState> = emptyMap(),
    val marketRate: Float = 3.0f
)
