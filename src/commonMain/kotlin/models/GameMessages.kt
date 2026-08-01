package models

import kotlinx.serialization.Serializable

@Serializable
sealed class GameAction {
    @Serializable
    data class JoinTeam(val team: Team, val playerName: String) : GameAction()
    
    @Serializable
    data class CreateCharacter(val name: String, val strength: Int, val agility: Int, val wisdom: Int) : GameAction()
    
    @Serializable
    data class SelectCharacters(val templateIds: List<String>) : GameAction()
    
    @Serializable
    data object ToggleReady : GameAction()
    
    @Serializable
    data object StartGame : GameAction()
    
    @Serializable
    data class PlaceCharacter(val targetSector: String, val characterId: String? = null) : GameAction()
    
    @Serializable
    data class MoveCharacter(val targetSector: String, val characterId: String? = null) : GameAction()
    
    @Serializable
    data class SelectCastleAndReady(val castleId: String) : GameAction()
    
    @Serializable
    data class UpgradeTerritory(val sectorId: String, val upgradeType: String, val characterId: String? = null) : GameAction()
    
    @Serializable
    data class CollectResources(val sectorId: String, val characterId: String? = null) : GameAction()
    
    @Serializable
    data class HireSoldiers(val count: Int, val characterId: String? = null) : GameAction()
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
    data class FightOccurred(val sectorId: String, val winnerId: String, val loserId: String) : GameEvent()
}
