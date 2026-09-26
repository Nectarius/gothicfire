package game

import models.*
import org.slf4j.LoggerFactory

/**
 * AI Decision Service implementation that queries the local LLM microservice (AiOpponentService).
 * If the agent is unreachable, times out, or fails, gracefully falls back to HeuristicAiService.
 */
class LlmAiDecisionService(
    private val opponentService: AiOpponentService,
    private val fallbackService: AiDecisionService = HeuristicAiService()
) : AiDecisionService {
    private val logger = LoggerFactory.getLogger(LlmAiDecisionService::class.java)

    override suspend fun decideTurn(snapshot: BotGameStateSnapshot): List<BotAction> {
        val actions = mutableListOf<BotAction>()

        val allTeamCharacters = snapshot.gameState.characters.filter { char ->
            snapshot.gameState.players.find { p -> p.id == char.playerId }?.team == snapshot.botTeam && !char.isDead
        }
        val teamCastleId = snapshot.gameState.teamCastles[snapshot.botTeam]
        val designatedGuardian = allTeamCharacters.maxByOrNull { it.intellect }
        val charsAtCastleIds = allTeamCharacters.filter { it.currentSector == teamCastleId }.map { it.id }.toSet()

        for (char in snapshot.botCharacters) {
            if (char.hasActedThisTurn || char.isDead || char.currentSector == null) {
                continue
            }

            val isAtCastle = char.currentSector == teamCastleId
            val isDesignatedGuardian = char.id == designatedGuardian?.id
            val isOnlyGuardian = isAtCastle && charsAtCastleIds.size == 1
            val mustStayAtCastle = isAtCastle && (isDesignatedGuardian || isOnlyGuardian)

            val action = decideForCharacter(char, snapshot, mustStayAtCastle)
            actions.add(action)
        }

        return actions
    }

    private suspend fun decideForCharacter(
        char: Character,
        snapshot: BotGameStateSnapshot,
        mustStayAtCastle: Boolean
    ): BotAction {
        val sectorId = char.currentSector ?: return BotAction.Skip(char.id)
        val territory = snapshot.gameState.territories[sectorId]

        val legalMoveActionMap = mutableMapOf<String, BotAction>()

        // 1. Recruitment options
        if (char.gold >= 50 && territory != null && territory.protection >= 20) {
            val count = char.gold / 50
            legalMoveActionMap["RECRUIT_HEAVY_INFANTRY"] = BotAction.Recruit(char.id, ArmyType.HEAVY_INFANTRY, count)
        }
        if (char.gold >= 30 && territory != null) {
            val count = char.gold / 30
            legalMoveActionMap["RECRUIT_LIGHT_INFANTRY"] = BotAction.Recruit(char.id, ArmyType.LIGHT_INFANTRY, count)
        }

        // 2. Collection
        if (territory != null && (territory.food > 0 || territory.gold > 0)) {
            if (territory.ownerPlayerId == char.playerId || territory.ownerTeam == snapshot.botTeam) {
                legalMoveActionMap["COLLECT_RESOURCES_${sectorId}"] = BotAction.CollectResources(char.id, sectorId)
            }
        }

        // 3. Movement / Attack
        if (!mustStayAtCastle) {
            val currentTerritoryData = MapData[sectorId]
            if (currentTerritoryData != null) {
                for (adjId in currentTerritoryData.adjacentIds) {
                    val occupant = snapshot.gameState.characters.find { it.currentSector == adjId && !it.isDead }
                    val targetPlayer = occupant?.let { occ -> snapshot.gameState.players.find { it.id == occ.playerId } }
                    if (targetPlayer?.team == snapshot.botTeam) continue

                    if (occupant != null) {
                        legalMoveActionMap["ATTACK_SECTOR_${adjId}"] = BotAction.Move(char.id, adjId, BattleStrategy.NONE)
                    } else {
                        legalMoveActionMap["MOVE_TO_SECTOR_${adjId}"] = BotAction.Move(char.id, adjId, BattleStrategy.NONE)
                    }
                }
            }
        }

        // 4. Upgrade
        if (territory != null && (territory.ownerPlayerId == char.playerId || territory.ownerTeam == snapshot.botTeam)) {
            if (territory.cultivation < 30) {
                legalMoveActionMap["UPGRADE_CULTIVATION_${sectorId}"] = BotAction.UpgradeTerritory(char.id, sectorId, "CULTIVATION")
            }
            if (territory.protection < 30) {
                legalMoveActionMap["UPGRADE_PROTECTION_${sectorId}"] = BotAction.UpgradeTerritory(char.id, sectorId, "PROTECTION")
            }
        }

        // Always allow wait/skip
        legalMoveActionMap["WAIT"] = BotAction.Skip(char.id)

        val legalMoveKeys = legalMoveActionMap.keys.toList()

        val summary = "Commander ${char.name} at Sector $sectorId. Army: ${char.army.total()} (Mages: ${char.army.mages}, Heavy: ${char.army.heavyInfantry}, Light: ${char.army.lightInfantry}, Archers: ${char.army.archers}). Gold: ${char.gold}, Food: ${char.food}. Territory protection: ${territory?.protection ?: 0}. Must stay at castle: $mustStayAtCastle."

        val chosenMove = opponentService.requestComputerMove(
            gameId = snapshot.gameState.gameName ?: "game",
            turn = snapshot.gameState.currentTurn,
            playerId = char.playerId,
            summary = summary,
            legalMoves = legalMoveKeys
        )

        val action = legalMoveActionMap[chosenMove]
        if (action != null) {
            return action
        }

        logger.warn("Chosen move '$chosenMove' not mapped to BotAction, delegating to heuristic fallback.")
        return fallbackService.decideTurn(snapshot).find { act ->
            when (act) {
                is BotAction.Move -> act.characterId == char.id
                is BotAction.Recruit -> act.characterId == char.id
                is BotAction.CollectResources -> act.characterId == char.id
                is BotAction.UpgradeTerritory -> act.characterId == char.id
                is BotAction.Skip -> act.characterId == char.id
            }
        } ?: BotAction.Skip(char.id)
    }
}
