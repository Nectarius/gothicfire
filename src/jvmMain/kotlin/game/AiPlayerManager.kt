package game

import kotlinx.coroutines.delay
import models.Player
import models.Team
import models.GameStatus
import org.slf4j.LoggerFactory
import java.util.UUID

object AiPlayerManager {
    private val logger = LoggerFactory.getLogger(AiPlayerManager::class.java)
    
    // In the future, this can be instantiated based on environment variables
    private val aiService: AiDecisionService = HeuristicAiService()

    suspend fun executeBotTurn(gameSession: GameSession) {
        val activeTeam = gameSession.gameState.activeTeamTurn
        var iterations = 0
        val maxIterations = 15

        while (iterations < maxIterations) {
            iterations++
            val gameState = gameSession.gameState
            
            // If the turn has already advanced or game ended, stop
            if (gameState.activeTeamTurn != activeTeam || gameState.status != GameStatus.IN_PROGRESS) {
                break
            }
            
            val botPlayers = gameState.players.filter { it.team == activeTeam && it.isBot }
            if (botPlayers.isEmpty()) {
                break
            }
            
            val botCharacters = gameState.characters.filter { char -> botPlayers.any { it.id == char.playerId } && !char.hasActedThisTurn && !char.isDead }
            if (botCharacters.isEmpty()) {
                break
            }
            
            val snapshot = BotGameStateSnapshot(
                gameState = gameState,
                botTeam = activeTeam,
                botCharacters = botCharacters,
                botPlayers = botPlayers
            )
            
            logger.info("Executing AI turn for team $activeTeam (iteration $iterations)")
            val actions = aiService.decideTurn(snapshot)
            
            if (actions.isEmpty()) {
                // Fallback: force skip turn if the AI returns no actions but characters still haven't acted
                for (char in botCharacters) {
                    gameSession.skipTurn(char.playerId, char.id)
                }
                break
            }
            
            for (action in actions) {
                delay(500) // 500ms delay between actions
                
                val charId = when (action) {
                    is BotAction.Move -> action.characterId
                    is BotAction.Recruit -> action.characterId
                    is BotAction.CollectResources -> action.characterId
                    is BotAction.UpgradeTerritory -> action.characterId
                    is BotAction.Skip -> action.characterId
                }
                
                // Fetch the latest state of the character to ensure they haven't died or acted already
                val char = gameSession.gameState.characters.find { it.id == charId } ?: continue
                if (char.hasActedThisTurn || char.isDead) continue
                
                val playerId = char.playerId
                logger.info("AI Action: $action")
                
                when (action) {
                    is BotAction.Move -> gameSession.moveCharacter(playerId, action.targetSector, action.characterId, action.strategy)
                    is BotAction.Recruit -> gameSession.recruitArmy(playerId, action.unitType, action.count, action.characterId)
                    is BotAction.CollectResources -> gameSession.collectResources(playerId, action.sectorId, action.characterId)
                    is BotAction.UpgradeTerritory -> gameSession.upgradeTerritory(playerId, action.sectorId, action.upgradeType, action.characterId)
                    is BotAction.Skip -> gameSession.skipTurn(playerId, action.characterId)
                }
            }
        }
        
        // Final fallback: if we reached max iterations and the turn still hasn't ended, forcefully skip remaining bot characters
        val finalGameState = gameSession.gameState
        if (finalGameState.activeTeamTurn == activeTeam && finalGameState.status == GameStatus.IN_PROGRESS) {
            val finalBotPlayers = finalGameState.players.filter { it.team == activeTeam && it.isBot }
            val finalBotCharacters = finalGameState.characters.filter { char -> finalBotPlayers.any { it.id == char.playerId } && !char.hasActedThisTurn && !char.isDead }
            
            for (char in finalBotCharacters) {
                logger.warn("Force skipping turn for AI character ${char.id} to avoid stuck turn.")
                gameSession.skipTurn(char.playerId, char.id)
            }
        }
    }
}
