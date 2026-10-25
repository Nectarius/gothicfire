package models

import kotlinx.serialization.Serializable

@Serializable
enum class Team {
    RED,
    BLUE,
    GREEN,
    PURPLE,
    ORANGE,
    CYAN,
    PINK,
    TEAL,
    WHITE,
    BLACK,
    YELLOW;

    val defaultHex: String
        get() = when (this) {
            RED -> "#D32F2F"
            BLUE -> "#1976D2"
            GREEN -> "#2E7D32"
            PURPLE -> "#7B1FA2"
            ORANGE -> "#F57C00"
            CYAN -> "#00BCD4"
            PINK -> "#E91E63"
            TEAL -> "#00796B"
            WHITE -> "#FFFFFF"
            BLACK -> "#212121"
            YELLOW -> "#EAB308"
        }

    val defaultColorName: String
        get() = when (this) {
            RED -> "Crimson Red"
            BLUE -> "Cobalt Blue"
            GREEN -> "Emerald Green"
            PURPLE -> "Royal Purple"
            ORANGE -> "Blaze Orange"
            CYAN -> "Electric Cyan"
            PINK -> "Magenta Pink"
            TEAL -> "Teal / Sea Green"
            WHITE -> "Pure White"
            BLACK -> "Charcoal Black"
            YELLOW -> "Sun Yellow"
        }

    val i18nKey: String
        get() = "lobby.${name.lowercase()}_team"

    companion object {
        /** The 10 playable team colors available for selection. */
        val PLAYABLE_TEAMS: List<Team> = listOf(
            RED,
            BLUE,
            GREEN,
            PURPLE,
            ORANGE,
            CYAN,
            PINK,
            TEAL,
            WHITE,
            BLACK
        )
    }
}

@Serializable
enum class GameStatus {
    NOT_CREATED,
    LOBBY,
    IN_PROGRESS,
    GAME_OVER
}

@Serializable
data class GameResultSummary(
    val gameId: String,
    val winningTeamName: String?,
    val winningTeamColor: String?,
    val totalTurns: Int,
    val finishedAt: Long,
    val redTeamName: String?,
    val blueTeamName: String?,
    val yellowTeamName: String? = null,
    val redPlayers: List<String>,
    val bluePlayers: List<String>,
    val yellowPlayers: List<String> = emptyList()
)

/**
 * Pre-battle strategy the attacker can choose before engaging.
 * Each strategy provides a small bonus to the attacker's combat score if requirements are met.
 *
 * Requirements:
 *   ARCANE_PHALANX       — archon >= 6 AND army.total() > 5
 *   HAMMER_AND_SPELL     — warlord >= 6 AND army.total() > 3
 *   SPELL_INFUSED_VOLLEY — vanguard >= 6 AND army.total() > 5
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
    BattleStrategy.ARCANE_PHALANX -> character.archon >= 6 && character.army.total() > 5
    BattleStrategy.HAMMER_AND_SPELL -> character.warlord >= 6 && character.army.total() > 3
    BattleStrategy.SPELL_INFUSED_VOLLEY -> character.vanguard >= 6 && character.army.total() > 5
}

/**
 * Returns the combat score bonus for the chosen strategy.
 */
fun strategyBonus(character: Character, strategy: BattleStrategy): Double = when (strategy) {
    BattleStrategy.NONE -> 0.0
    BattleStrategy.ARCANE_PHALANX -> 3.0 + (character.archon * 0.3)
    BattleStrategy.HAMMER_AND_SPELL -> 3.0 + (character.warlord * 0.3)
    BattleStrategy.SPELL_INFUSED_VOLLEY -> 3.0 + (character.vanguard * 0.3)
}

@Serializable
enum class ArmyType {
    LIGHT_INFANTRY,
    ARCHERS,
    HEAVY_INFANTRY,
    MAGES
}

@Serializable
data class Army(
    val mages: Int = 0,
    val heavyInfantry: Int = 0,
    val lightInfantry: Int = 0,
    val archers: Int = 0
) {
    fun total(): Int = mages + heavyInfantry + lightInfantry + archers
}

@Serializable
data class Character(
    val id: String,
    val playerId: String,
    val name: String,
    val warlord: Int = 0,
    val intellect: Int = 0,
    val vanguard: Int = 0,
    val archon: Int = 0,
    val currentSector: String? = null,
    val hasActedThisTurn: Boolean = false,
    val isDead: Boolean = false,
    val food: Int = 0,
    val gold: Int = 0,
    val army: Army = Army(),
    val siegeWeapons: Int = 0,
    val scrolls: List<Scroll> = emptyList(),
    val hides: Map<HideType, Int> = emptyMap()
)

@Serializable
data class Player(
    val id: String,
    val name: String,
    val team: Team,
    val isReady: Boolean = false,
    val isBot: Boolean = false,
    val advisorId: String = "ZORAX"
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
data class TeamInfo(
    val id: Team,
    val name: String,
    val color: String,
    val creatorId: String
)

@Serializable
data class GameState(
    val status: GameStatus = GameStatus.NOT_CREATED,
    val gameName: String? = null,
    val creatorPlayerId: String? = null,
    val teamInfos: Map<Team, TeamInfo> = emptyMap(),
    val players: List<Player> = emptyList(),
    val characters: List<Character> = emptyList(),
    val activeTeamTurn: Team = Team.RED,
    val currentTurn: Int = 1,
    val maxTurns: Int = 80,
    val winningTeam: Team? = null,
    val teamCastles: Map<Team, String> = emptyMap(),
    val territories: Map<String, TerritoryState> = emptyMap(),
    val marketRate: Float = 3.0f,
    val isPvE: Boolean = false,
    val huntingCamps: List<HuntingCamp> = emptyList(),
    val furMarket: Map<HideType, FurMarketEntry> = FurMarket.initial(),
    val furSalesThisTurn: Map<String, Set<HideType>> = emptyMap()
)
