package models

import kotlinx.serialization.Serializable

@Serializable
sealed class GameAction {
    @Serializable
    data class CreateGame(val playerName: String, val gameName: String) : GameAction()

    @Serializable
    data class CreateTeam(val team: Team, val name: String, val color: String, val playerName: String) : GameAction()
    
    @Serializable
    data class JoinTeam(val team: Team, val playerName: String) : GameAction()
    
    @Serializable
    data class CreateCharacter(val name: String, val warlord: Int, val intellect: Int, val vanguard: Int, val archon: Int) : GameAction()
    
    @Serializable
    data class SelectCharacters(val templateIds: List<String>) : GameAction()
    
    @Serializable
    data object ToggleReady : GameAction()
    
    @Serializable
    data object StartGame : GameAction()
    
    @Serializable
    data class PlaceCharacter(val targetSector: String, val characterId: String? = null, val strategy: BattleStrategy = BattleStrategy.NONE) : GameAction()
    
    @Serializable
    data class MoveCharacter(val targetSector: String, val characterId: String? = null, val strategy: BattleStrategy = BattleStrategy.NONE) : GameAction()
    
    @Serializable
    data class SelectCastleAndReady(val castleId: String) : GameAction()
    
    @Serializable
    data class UpgradeTerritory(val sectorId: String, val upgradeType: String, val characterId: String? = null) : GameAction()
    
    @Serializable
    data class CollectResources(val sectorId: String, val characterId: String? = null) : GameAction()
    
    @Serializable
    data class RecruitArmy(val count: Int, val characterId: String? = null, val unitType: ArmyType) : GameAction()
    
    @Serializable
    data class SearchScroll(val targetSector: String, val characterId: String? = null) : GameAction()
    
    @Serializable
    data class UseScroll(val scrollId: String, val characterId: String? = null) : GameAction()
    
    @Serializable
    data class BuySiegeWeapon(val characterId: String? = null) : GameAction()
    
    @Serializable
    data class TransferResources(val fromCharId: String, val toCharId: String, val food: Int, val gold: Int) : GameAction()

    @Serializable
    data class MarketTrade(val characterId: String, val buyFood: Boolean, val goldAmount: Int) : GameAction()
    
    @Serializable
    data class SkipTurn(val characterId: String) : GameAction()
    
    @Serializable
    data object EndGame : GameAction()
}

@Serializable
sealed class GameEvent {
    @Serializable
    data class GameStateUpdated(val gameState: GameState, val yourPlayerId: String) : GameEvent()
    
    @Serializable
    data class WaitingForOpponent(val message: String) : GameEvent()
    
    @Serializable
    data class Error(val message: String) : GameEvent()
    
    @Serializable
    data class FightOccurred(
        val sectorId: String,
        val winnerId: String,
        val loserId: String,
        val winnerLosses: Int = 0,
        val loserLosses: Int = 0,
        val strategy: BattleStrategy = BattleStrategy.NONE
    ) : GameEvent()
    
    @Serializable
    data class ScrollFound(val characterId: String, val characterName: String, val scroll: Scroll) : GameEvent()
    
    @Serializable
    data class ScrollSearchFailed(val characterId: String, val characterName: String, val sectorId: String) : GameEvent()
    
    @Serializable
    data class NatureEventOccurred(val sectorId: String, val eventType: NatureEventType) : GameEvent()
    
    @Serializable
    data class ResourceTransferred(val fromCharId: String, val toCharId: String, val fromSectorId: String, val toSectorId: String, val food: Int, val gold: Int) : GameEvent()
}
