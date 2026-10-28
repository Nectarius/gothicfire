package models

import kotlinx.serialization.Serializable

@Serializable
sealed class GameAction {
    @Serializable
    data class CreateGame(val playerName: String, val gameName: String) : GameAction()
    
    @Serializable
    data class CancelGame(val playerName: String) : GameAction()

    @Serializable
    data class CreateTeam(val team: Team, val name: String, val color: String, val playerName: String) : GameAction()
    
    @Serializable
    data class JoinTeam(val team: Team, val playerName: String) : GameAction()
    
    @Serializable
    data class StartPvEGame(
        val playerName: String,
        val gameName: String,
        val allowSecondPlayer: Boolean,
        val playerTeam: Team,
        val playerTeamColor: String,
        val playerTeamName: String,
        val chosenHeroes: List<String>,
        val chosenCastle: String,
        val chosenAdvisor: String = "ZORAX"
    ) : GameAction()
    
    @Serializable
    data class JoinPvEGame(val playerName: String, val chosenHeroes: List<String>) : GameAction()
    
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
    data class AskAdvisor(val questionType: String) : GameAction()

    @Serializable
    data class SelectAdvisor(val advisorId: String) : GameAction()

    @Serializable
    data class ConsultCastleLord(
        val sectorId: String,
        val characterId: String
    ) : GameAction()

    @Serializable
    data class TalkToTavernPatron(
        val sectorId: String,
        val characterId: String,
        val patronId: String
    ) : GameAction()

    @Serializable
    data class PitchHuntingCamp(val characterId: String) : GameAction()

    @Serializable
    data class DismantleHuntingCamp(val characterId: String) : GameAction()

    @Serializable
    data class HarvestHide(val characterId: String, val hideType: HideType) : GameAction()

    @Serializable
    data class SellHide(val characterId: String, val hideType: HideType) : GameAction()

    @Serializable
    data class AskHunterAboutHide(
        val sectorId: String,
        val characterId: String,
        val patronId: String,
        val hideType: HideType
    ) : GameAction()

    @Serializable
    data class TacticalMoveUnit(
        val battleId: String,
        val unitId: String,
        val targetX: Int,
        val targetY: Int
    ) : GameAction()

    @Serializable
    data class TacticalAttackUnit(
        val battleId: String,
        val attackerUnitId: String,
        val targetUnitId: String
    ) : GameAction()

    @Serializable
    data class TacticalEndUnitTurn(val battleId: String) : GameAction()

    @Serializable
    data class TacticalRetreat(val battleId: String) : GameAction()

    @Serializable
    data class TacticalAutoResolve(val battleId: String) : GameAction()

    @Serializable
    data class TacticalAcknowledgeResult(val battleId: String) : GameAction()

    @Serializable
    data object EndGame : GameAction()
    
    @Serializable
    data object LeaveGame : GameAction()
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
    data class AdvisorAdviceReceived(
        val advisorId: String,
        val advisorName: String,
        val questionType: String,
        val advice: String,
        val keyPoints: List<String> = emptyList(),
        val timestamp: Long = 0L
    ) : GameEvent()

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
    
    @Serializable
    data class CastleDialogueReceived(
        val lordId: String,
        val lordName: String,
        val sectorId: String,
        val speech: String,
        val keyPoints: List<String> = emptyList(),
        val timestamp: Long = 0L
    ) : GameEvent()

    @Serializable
    data class TavernDialogueReceived(
        val patronId: String,
        val patronName: String,
        val greeting: String,
        val responseText: String,
        val timestamp: Long = 0L
    ) : GameEvent()

    @Serializable
    data class HideHarvested(
        val characterId: String,
        val characterName: String,
        val sectorId: String,
        val hideType: HideType
    ) : GameEvent()

    @Serializable
    data class HideSold(
        val characterId: String,
        val hideType: HideType,
        val price: Int
    ) : GameEvent()

    @Serializable
    data class HunterIntelReceived(
        val patronId: String,
        val patronName: String,
        val hideType: HideType,
        val grounds: List<HuntingGround>,
        val timestamp: Long = 0L
    ) : GameEvent()

    @Serializable
    data class TacticalBattleStarted(val battleState: TacticalBattleState) : GameEvent()

    @Serializable
    data class TacticalStateUpdated(val battleState: TacticalBattleState, val lastActionLog: String) : GameEvent()

    @Serializable
    data class TacticalBattleEnded(val battleState: TacticalBattleState, val winnerPlayerId: String) : GameEvent()
}
