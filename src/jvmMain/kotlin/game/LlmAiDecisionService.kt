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
        val moveHints = mutableMapOf<String, String>()

        // Best battle strategy available for this character
        val bestStrategy = when {
            char.archon >= 6 && char.army.total() > 5 -> BattleStrategy.ARCANE_PHALANX
            char.warlord >= 6 && char.army.total() > 3 -> BattleStrategy.HAMMER_AND_SPELL
            char.vanguard >= 6 && char.army.total() > 5 -> BattleStrategy.SPELL_INFUSED_VOLLEY
            else -> BattleStrategy.NONE
        }
        val strategyName = when (bestStrategy) {
            BattleStrategy.ARCANE_PHALANX -> "Arcane Phalanx"
            BattleStrategy.HAMMER_AND_SPELL -> "Hammer and Spell"
            BattleStrategy.SPELL_INFUSED_VOLLEY -> "Spell Infused Volley"
            BattleStrategy.NONE -> "Standard"
        }

        // 1. Recruitment options (Mages, Heavy Infantry, Archers, Light Infantry)
        val maxRecruit = (100 - char.army.total()).coerceAtLeast(0)
        if (territory != null && maxRecruit > 0) {
            // Mages (80 gold, min 30 protection)
            if (char.gold >= 80 && territory.protection >= 30) {
                val count = (char.gold / 80).coerceAtMost(maxRecruit)
                if (count > 0) {
                    legalMoveActionMap["RECRUIT_MAGES"] = BotAction.Recruit(char.id, ArmyType.MAGES, count)
                    val synergy = if (char.archon >= 6) " [Archon ${char.archon} synergy]" else ""
                    moveHints["RECRUIT_MAGES"] = "Recruit $count Mages (Costs ${count * 80}g, Power 3.0$synergy)"
                }
            }
            // Heavy Infantry (50 gold, min 20 protection)
            if (char.gold >= 50 && territory.protection >= 20) {
                val count = (char.gold / 50).coerceAtMost(maxRecruit)
                if (count > 0) {
                    legalMoveActionMap["RECRUIT_HEAVY_INFANTRY"] = BotAction.Recruit(char.id, ArmyType.HEAVY_INFANTRY, count)
                    val synergy = if (char.warlord >= 6) " [Warlord ${char.warlord} synergy]" else ""
                    moveHints["RECRUIT_HEAVY_INFANTRY"] = "Recruit $count Heavy Infantry (Costs ${count * 50}g, Power 2.0$synergy)"
                }
            }
            // Archers (40 gold, min 10 protection)
            if (char.gold >= 40 && territory.protection >= 10) {
                val count = (char.gold / 40).coerceAtMost(maxRecruit)
                if (count > 0) {
                    legalMoveActionMap["RECRUIT_ARCHERS"] = BotAction.Recruit(char.id, ArmyType.ARCHERS, count)
                    val synergy = if (char.vanguard >= 6) " [Vanguard ${char.vanguard} synergy]" else ""
                    moveHints["RECRUIT_ARCHERS"] = "Recruit $count Archers (Costs ${count * 40}g, Power 1.5$synergy)"
                }
            }
            // Light Infantry (30 gold, 0 protection needed)
            if (char.gold >= 30) {
                val count = (char.gold / 30).coerceAtMost(maxRecruit)
                if (count > 0) {
                    legalMoveActionMap["RECRUIT_LIGHT_INFANTRY"] = BotAction.Recruit(char.id, ArmyType.LIGHT_INFANTRY, count)
                    moveHints["RECRUIT_LIGHT_INFANTRY"] = "Recruit $count Light Infantry (Costs ${count * 30}g, Power 1.0)"
                }
            }
        }

        // 2. Collection
        if (territory != null && (territory.food > 0 || territory.gold > 0)) {
            if (territory.ownerPlayerId == char.playerId || territory.ownerTeam == snapshot.botTeam) {
                legalMoveActionMap["COLLECT_RESOURCES_${sectorId}"] = BotAction.CollectResources(char.id, sectorId)
                moveHints["COLLECT_RESOURCES_${sectorId}"] = "Harvest ${territory.gold} Gold and ${territory.food} Food stored in current sector"
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

                    val targetTerrData = MapData[adjId]
                    val targetTerrState = snapshot.gameState.territories[adjId]
                    val isCastle = targetTerrData?.isCastle == true
                    val castleTag = if (isCastle) " [ENEMY FORTRESS!]" else ""

                    if (occupant != null) {
                        val protection = targetTerrState?.protection ?: (targetTerrData?.protection ?: 0)
                        val winChance = estimateWinChance(char, occupant, protection, bestStrategy, char.siegeWeapons)
                        val oddsTag = when {
                            winChance >= 90 -> "HIGH ($winChance% win chance)"
                            winChance >= 60 -> "FAVORABLE ($winChance% win chance)"
                            winChance >= 40 -> "RISKY ($winChance% win chance)"
                            else -> "SUICIDAL ($winChance% win chance - AVOID)"
                        }
                        legalMoveActionMap["ATTACK_SECTOR_${adjId}"] = BotAction.Move(char.id, adjId, bestStrategy)
                        moveHints["ATTACK_SECTOR_${adjId}"] = "Attack enemy ${occupant.name} (${occupant.army.total()} troops)$castleTag using $strategyName. Odds: $oddsTag"
                    } else {
                        val unlootedGold = targetTerrState?.gold ?: 0
                        val unlootedFood = targetTerrState?.food ?: 0
                        val cultivation = targetTerrState?.cultivation ?: 10
                        legalMoveActionMap["MOVE_TO_SECTOR_${adjId}"] = BotAction.Move(char.id, adjId, BattleStrategy.NONE)
                        moveHints["MOVE_TO_SECTOR_${adjId}"] = "Claim unowned sector $adjId$castleTag (Cultivation: $cultivation, Unlooted: $unlootedGold Gold, $unlootedFood Food)"
                    }
                }
            }
        }

        // 4. Upgrade
        if (territory != null && (territory.ownerPlayerId == char.playerId || territory.ownerTeam == snapshot.botTeam)) {
            if (territory.cultivation < 30) {
                legalMoveActionMap["UPGRADE_CULTIVATION_${sectorId}"] = BotAction.UpgradeTerritory(char.id, sectorId, "CULTIVATION")
                moveHints["UPGRADE_CULTIVATION_${sectorId}"] = "Upgrade Cultivation to ${territory.cultivation + 5} (boosts future yields)"
            }
            if (territory.protection < 30) {
                legalMoveActionMap["UPGRADE_PROTECTION_${sectorId}"] = BotAction.UpgradeTerritory(char.id, sectorId, "PROTECTION")
                moveHints["UPGRADE_PROTECTION_${sectorId}"] = "Upgrade Protection to ${territory.protection + 5} (fortifies defense)"
            }
        }

        // Always allow wait/skip
        legalMoveActionMap["WAIT"] = BotAction.Skip(char.id)
        moveHints["WAIT"] = "Conserve strength and end turn"

        val legalMoveKeys = legalMoveActionMap.keys.toList()

        val summary = buildString {
            append("Commander ${char.name} at Sector $sectorId (${MapData[sectorId]?.name ?: "Sector $sectorId"}). ")
            append("Stats: Warlord ${char.warlord}, Archon ${char.archon}, Vanguard ${char.vanguard}, Intellect ${char.intellect}. Strategy: $strategyName. ")
            append("Army: ${char.army.total()} (Mages: ${char.army.mages}, Heavy: ${char.army.heavyInfantry}, Light: ${char.army.lightInfantry}, Archers: ${char.army.archers}). ")
            append("Treasury: ${char.gold} Gold, ${char.food} Food (Need ${char.army.total()} Food/turn). ")
            append("Territory Protection: ${territory?.protection ?: 0}. ")
            if (mustStayAtCastle) {
                append("GARRISON DUTY: Must remain at the base castle to protect it from capture! ")
            }
            append("\nTactical Evaluation of Available Moves:\n")
            for ((key, hint) in moveHints) {
                append("- $key: $hint\n")
            }
        }

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
