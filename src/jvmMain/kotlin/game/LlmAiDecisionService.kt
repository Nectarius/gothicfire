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

            // Rule-Based Triage (The "Deterministic Override" Pattern)
            // Pre-filter critical game states / existential threats to bypass costly, stochastic LLM HTTP call
            val triageOverride = DeterministicTriageEngine.evaluateCriticalStateOverride(char, snapshot, mustStayAtCastle)
            if (triageOverride != null) {
                logger.info("Deterministic Override: Critical threat detected for Commander ${char.name}. Executing survival action: $triageOverride (Skipping LLM)")
                actions.add(triageOverride)
                continue
            }

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
        val isAtCastle = char.currentSector == snapshot.gameState.teamCastles[snapshot.botTeam]

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

        // ==============================================================================
        // Minister's 1-Ply Heuristic Scoring & Evaluation Engine
        // Evaluates every viable move from 1 to 100 based on economic & combat rules
        // ==============================================================================
        val candidateMoves = mutableListOf<ScoredCandidateMove>()

        val currentFood = char.food
        val currentArmy = char.army.total()
        val maxRecruit = (100 - currentArmy).coerceAtLeast(0)

        // 1. Recruitment options (Mages, Heavy Infantry, Archers, Light Infantry)
        if (territory != null && maxRecruit > 0) {
            val baseRecruitScore = when {
                currentArmy == 0 -> 85 // Defenseless commander must recruit immediately
                currentArmy < 10 -> 70
                currentArmy < 25 -> 55
                else -> 45
            }

            // Mages (80 gold, min 30 protection)
            if (char.gold >= 80 && territory.protection >= 30) {
                val count = (char.gold / 80).coerceAtMost(maxRecruit)
                if (count > 0) {
                    val archonSynergy = char.archon >= 6
                    var score = baseRecruitScore + if (archonSynergy) 20 else 5
                    if (currentFood < currentArmy + count) score -= 30 // Starvation risk penalty
                    score = score.coerceIn(1, 99)
                    val desc = if (archonSynergy) "Score: $score/100, Archon Synergy, +$count Mages" else "Score: $score/100, Recruit $count Mages, Power 3.0"
                    val hint = "Recruit $count Mages (Costs ${count * 80}g, Power 3.0${if (archonSynergy) " [Archon ${char.archon} synergy]" else ""})"
                    candidateMoves.add(ScoredCandidateMove(BotAction.Recruit(char.id, ArmyType.MAGES, count), "RECRUIT_MAGES", score, desc, hint))
                }
            }

            // Heavy Infantry (50 gold, min 20 protection)
            if (char.gold >= 50 && territory.protection >= 20) {
                val count = (char.gold / 50).coerceAtMost(maxRecruit)
                if (count > 0) {
                    val warlordSynergy = char.warlord >= 6
                    var score = baseRecruitScore + if (warlordSynergy) 20 else 5
                    if (currentFood < currentArmy + count) score -= 30
                    score = score.coerceIn(1, 99)
                    val desc = if (warlordSynergy) "Score: $score/100, Warlord Synergy, +$count Heavy Infantry" else "Score: $score/100, Recruit $count Heavy Infantry, Power 2.0"
                    val hint = "Recruit $count Heavy Infantry (Costs ${count * 50}g, Power 2.0${if (warlordSynergy) " [Warlord ${char.warlord} synergy]" else ""})"
                    candidateMoves.add(ScoredCandidateMove(BotAction.Recruit(char.id, ArmyType.HEAVY_INFANTRY, count), "RECRUIT_HEAVY_INFANTRY", score, desc, hint))
                }
            }

            // Archers (40 gold, min 10 protection)
            if (char.gold >= 40 && territory.protection >= 10) {
                val count = (char.gold / 40).coerceAtMost(maxRecruit)
                if (count > 0) {
                    val vanguardSynergy = char.vanguard >= 6
                    var score = baseRecruitScore + if (vanguardSynergy) 20 else 5
                    if (currentFood < currentArmy + count) score -= 30
                    score = score.coerceIn(1, 99)
                    val desc = if (vanguardSynergy) "Score: $score/100, Vanguard Synergy, +$count Archers" else "Score: $score/100, Recruit $count Archers, Power 1.5"
                    val hint = "Recruit $count Archers (Costs ${count * 40}g, Power 1.5${if (vanguardSynergy) " [Vanguard ${char.vanguard} synergy]" else ""})"
                    candidateMoves.add(ScoredCandidateMove(BotAction.Recruit(char.id, ArmyType.ARCHERS, count), "RECRUIT_ARCHERS", score, desc, hint))
                }
            }

            // Light Infantry (30 gold, 0 protection needed)
            if (char.gold >= 30) {
                val count = (char.gold / 30).coerceAtMost(maxRecruit)
                if (count > 0) {
                    var score = if (currentArmy == 0) 80 else 40
                    if (currentFood < currentArmy + count) score -= 30
                    score = score.coerceIn(1, 95)
                    val desc = "Score: $score/100, Recruit $count Light Infantry, Low Cost Defense"
                    val hint = "Recruit $count Light Infantry (Costs ${count * 30}g, Power 1.0)"
                    candidateMoves.add(ScoredCandidateMove(BotAction.Recruit(char.id, ArmyType.LIGHT_INFANTRY, count), "RECRUIT_LIGHT_INFANTRY", score, desc, hint))
                }
            }
        }

        // 2. Collection
        if (territory != null && (territory.food > 0 || territory.gold > 0)) {
            if (territory.ownerPlayerId == char.playerId || territory.ownerTeam == snapshot.botTeam) {
                var score = 50
                if (currentFood < currentArmy) {
                    score += 35 // Urgent: Prevents starvation next turn!
                } else if (currentFood < currentArmy * 2) {
                    score += 15
                }
                score += (territory.gold / 10).coerceAtMost(15) + (territory.food / 10).coerceAtMost(15)
                score = score.coerceIn(40, 98)
                val starvationTag = if (currentFood < currentArmy) ", Prevents Starvation!" else ""
                val desc = "Score: $score/100, Harvest Sector Yield +${territory.gold}g +${territory.food}f$starvationTag"
                val hint = "Harvest ${territory.gold} Gold and ${territory.food} Food stored in current sector"
                candidateMoves.add(ScoredCandidateMove(BotAction.CollectResources(char.id, sectorId), "COLLECT_RESOURCES_${sectorId}", score, desc, hint))
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

                        val lootGold = targetTerrState?.gold ?: 0
                        val lootFood = targetTerrState?.food ?: 0
                        val lootTag = if (lootGold > 0) ", +${lootGold} Gold" else ""

                        var score = winChance
                        if (isCastle) score += 15
                        if (lootGold > 0 || lootFood > 0) score += 5
                        score = score.coerceIn(1, 100)

                        val desc = when {
                            winChance >= 90 -> "Score: $score/100, Guaranteed Victory $winChance% Win${if (isCastle) ", Enemy Fortress!" else ""}$lootTag"
                            winChance >= 70 -> "Score: $score/100, Strong Victory Odds $winChance% Win${if (isCastle) ", Enemy Fortress!" else ""}$lootTag"
                            winChance >= 50 -> "Score: $score/100, Favorable Combat $winChance% Win$lootTag"
                            winChance >= 40 -> "Score: $score/100, Contested Skirmish $winChance% Win"
                            else -> "Score: $score/100, Suicidal Attack ($winChance% Win - Discarded)"
                        }

                        val hint = "Attack enemy ${occupant.name} (${occupant.army.total()} troops)$castleTag using $strategyName. Odds: $winChance% win chance"
                        candidateMoves.add(ScoredCandidateMove(BotAction.Move(char.id, adjId, bestStrategy), "ATTACK_SECTOR_${adjId}", score, desc, hint))
                    } else {
                        val unlootedGold = targetTerrState?.gold ?: 0
                        val unlootedFood = targetTerrState?.food ?: 0
                        val cultivation = targetTerrState?.cultivation ?: 10

                        var score = 45
                        if (isCastle) score += 30
                        score += (unlootedGold / 5).coerceAtMost(15) + (unlootedFood / 5).coerceAtMost(10) + (cultivation / 3).coerceAtMost(10)
                        score = score.coerceIn(40, 95)

                        val lootStr = if (unlootedGold > 0 || unlootedFood > 0) ", +${unlootedGold}g +${unlootedFood}f" else ""
                        val desc = "Score: $score/100, Claim Unowned Sector${if (isCastle) " [FORTRESS!]" else ""}$lootStr"
                        val hint = "Claim unowned sector $adjId$castleTag (Cultivation: $cultivation, Unlooted: $unlootedGold Gold, $unlootedFood Food)"
                        candidateMoves.add(ScoredCandidateMove(BotAction.Move(char.id, adjId, BattleStrategy.NONE), "MOVE_TO_SECTOR_${adjId}", score, desc, hint))
                    }
                }
            }
        }

        // 4. Upgrade
        if (territory != null && (territory.ownerPlayerId == char.playerId || territory.ownerTeam == snapshot.botTeam)) {
            if (territory.cultivation < 30) {
                var score = 45
                if (char.gold >= 60) score += 10
                val desc = "Score: $score/100, Upgrade Cultivation to ${territory.cultivation + 5}, Boosts Long-Term Yields"
                val hint = "Upgrade Cultivation to ${territory.cultivation + 5} (boosts future yields)"
                candidateMoves.add(ScoredCandidateMove(BotAction.UpgradeTerritory(char.id, sectorId, "CULTIVATION"), "UPGRADE_CULTIVATION_${sectorId}", score, desc, hint))
            }
            if (territory.protection < 30) {
                var score = 45
                if (isAtCastle) score += 25
                val desc = "Score: $score/100, Fortify Sector Defense to ${territory.protection + 5}${if (isAtCastle) ", Protects Castle Fortress" else ""}"
                val hint = "Upgrade Protection to ${territory.protection + 5} (fortifies defense)"
                candidateMoves.add(ScoredCandidateMove(BotAction.UpgradeTerritory(char.id, sectorId, "PROTECTION"), "UPGRADE_PROTECTION_${sectorId}", score, desc, hint))
            }
        }

        // 5. Always provide safe wait/skip option
        val waitScore = if (mustStayAtCastle) 75 else 40
        val waitDesc = if (mustStayAtCastle) "Score: 75/100, Garrison Castle Wall, Safe" else "Score: 40/100, Conserve Strength, Safe"
        val waitHint = if (mustStayAtCastle) "Fulfill garrison duty to secure base fortress" else "Conserve strength and end turn"
        val waitCandidate = ScoredCandidateMove(BotAction.Skip(char.id), "WAIT", waitScore, waitDesc, waitHint)
        candidateMoves.add(waitCandidate)

        // ==============================================================================
        // Heuristic Pruning Threshold (Commander vs. Minister Pattern)
        // Discard any move scoring below 40 (e.g. suicidal attacks or starvation moves)
        // Sort descending so the LLM Commander sees highest-scoring options first
        // ==============================================================================
        val pruningThreshold = 40
        val viableCandidates = candidateMoves
            .filter { it.score >= pruningThreshold }
            .sortedByDescending { it.score }
            .ifEmpty { listOf(waitCandidate) }

        val legalMoveActionMap = mutableMapOf<String, BotAction>()
        for (cand in viableCandidates) {
            legalMoveActionMap[cand.annotatedMoveString] = cand.action
            legalMoveActionMap[cand.rawKey] = cand.action
        }
        legalMoveActionMap["WAIT"] = BotAction.Skip(char.id)
        legalMoveActionMap[waitCandidate.annotatedMoveString] = BotAction.Skip(char.id)

        val legalMovesForLlm = viableCandidates.map { it.annotatedMoveString }

        val summary = buildString {
            append("Commander ${char.name} at Sector $sectorId (${MapData[sectorId]?.name ?: "Sector $sectorId"}). ")
            append("Stats: Warlord ${char.warlord}, Archon ${char.archon}, Vanguard ${char.vanguard}, Intellect ${char.intellect}. Strategy: $strategyName. ")
            append("Army: ${char.army.total()} (Mages: ${char.army.mages}, Heavy: ${char.army.heavyInfantry}, Light: ${char.army.lightInfantry}, Archers: ${char.army.archers}). ")
            append("Treasury: ${char.gold} Gold, ${char.food} Food (Need ${char.army.total()} Food/turn). ")
            append("Territory Protection: ${territory?.protection ?: 0}. ")
            if (mustStayAtCastle) {
                append("GARRISON DUTY: Must remain at the base castle to protect it from capture! ")
            }
            append("\nMinister's 1-Ply Evaluated Move Rankings (High to Low):\n")
            for (cand in viableCandidates) {
                append("- ${cand.annotatedMoveString}: ${cand.detailedHint}\n")
            }
        }

        val chosenMove = opponentService.requestComputerMove(
            gameId = snapshot.gameState.gameName ?: "game",
            turn = snapshot.gameState.currentTurn,
            playerId = char.playerId,
            summary = summary,
            legalMoves = legalMovesForLlm
        )

        val baseChosenMove = chosenMove.substringBefore(" (").trim()
        val action = legalMoveActionMap[chosenMove]
            ?: legalMoveActionMap[baseChosenMove]
            ?: viableCandidates.firstOrNull()?.action
            ?: BotAction.Skip(char.id)
        return action
    }
}

/**
 * Encapsulates a candidate action scored by the Minister's 1-ply engine (1-100).
 */
data class ScoredCandidateMove(
    val action: BotAction,
    val rawKey: String,
    val score: Int,
    val descriptor: String,
    val detailedHint: String
) {
    val annotatedMoveString: String
        get() = "$rawKey ($descriptor)"
}
