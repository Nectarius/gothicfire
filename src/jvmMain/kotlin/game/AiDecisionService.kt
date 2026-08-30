package game

import models.ArmyType
import models.BattleStrategy
import models.Character
import models.GameState
import models.Player
import models.Team

data class BotGameStateSnapshot(
    val gameState: GameState,
    val botTeam: Team,
    val botCharacters: List<Character>,
    val botPlayers: List<Player>
)

sealed class BotAction {
    data class Move(val characterId: String, val targetSector: String, val strategy: BattleStrategy = BattleStrategy.NONE) : BotAction()
    data class Recruit(val characterId: String, val unitType: ArmyType, val count: Int) : BotAction()
    data class CollectResources(val characterId: String, val sectorId: String) : BotAction()
    data class UpgradeTerritory(val characterId: String, val sectorId: String, val upgradeType: String) : BotAction()
    data class Skip(val characterId: String) : BotAction()
}

interface AiDecisionService {
    suspend fun decideTurn(snapshot: BotGameStateSnapshot): List<BotAction>
}
