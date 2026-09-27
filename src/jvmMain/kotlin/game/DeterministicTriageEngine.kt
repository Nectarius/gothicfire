package game

import models.*
import org.slf4j.LoggerFactory

/**
 * Rule-Based Triage Engine (The "Deterministic Override" Pattern).
 *
 * Evaluates board states for critical existential threats (e.g., food starvation,
 * castle undefended with adjacent enemy, defenseless commander ambush, or strict garrison duty).
 * When a critical state is detected, returns a deterministic survival BotAction,
 * skipping the stochastic, high-latency LLM HTTP call entirely.
 */
object DeterministicTriageEngine {
    private val logger = LoggerFactory.getLogger(DeterministicTriageEngine::class.java)

    /**
     * Evaluates whether a character is in a "Critical Game State" requiring an immediate deterministic override.
     *
     * @return A survival BotAction if an existential threat is detected, or null if the board state is stable
     *         and ready for strategic LLM reasoning.
     */
    fun evaluateCriticalStateOverride(
        char: Character,
        snapshot: BotGameStateSnapshot,
        mustStayAtCastle: Boolean
    ): BotAction? {
        val sectorId = char.currentSector ?: return null
        val territory = snapshot.gameState.territories[sectorId]
        val teamCastleId = snapshot.gameState.teamCastles[snapshot.botTeam]
        val isAtCastle = char.currentSector == teamCastleId

        val enemyPlayers = snapshot.gameState.players.filter { it.team != snapshot.botTeam }
        val enemyChars = snapshot.gameState.characters.filter { c ->
            !c.isDead && enemyPlayers.any { it.id == c.playerId }
        }

        // ----------------------------------------------------------------------
        // Critical State 1: Castle Defense Emergency
        // Home fortress is under immediate threat (enemy in adjacent sector)
        // and garrison is critical.
        // ----------------------------------------------------------------------
        if (teamCastleId != null) {
            val castleAdjSectors = MapData[teamCastleId]?.adjacentIds?.toSet() ?: emptySet()
            val enemiesAdjacentToCastle = enemyChars.filter { it.currentSector in castleAdjSectors }
            val allCastleCharacters = snapshot.gameState.characters.filter {
                it.currentSector == teamCastleId && !it.isDead &&
                snapshot.gameState.players.find { p -> p.id == it.playerId }?.team == snapshot.botTeam
            }
            val garrisonArmy = allCastleCharacters.sumOf { it.army.total() }

            if (enemiesAdjacentToCastle.isNotEmpty() && isAtCastle && garrisonArmy < 5) {
                val maxRecruit = (100 - char.army.total()).coerceAtLeast(0)
                if (maxRecruit > 0 && territory != null) {
                    if (char.gold >= 50 && territory.protection >= 20) {
                        val count = (char.gold / 50).coerceAtMost(maxRecruit)
                        logger.info("Deterministic Override: Castle under immediate attack with low garrison ($garrisonArmy troops). Recruiting $count Heavy Infantry.")
                        return BotAction.Recruit(char.id, ArmyType.HEAVY_INFANTRY, count)
                    } else if (char.gold >= 30) {
                        val count = (char.gold / 30).coerceAtMost(maxRecruit)
                        logger.info("Deterministic Override: Castle under immediate attack with low garrison ($garrisonArmy troops). Recruiting $count Light Infantry.")
                        return BotAction.Recruit(char.id, ArmyType.LIGHT_INFANTRY, count)
                    }
                }
                logger.info("Deterministic Override: Castle under immediate attack. Garrisoning castle wall.")
                return BotAction.Skip(char.id)
            }
        }

        // ----------------------------------------------------------------------
        // Critical State 2: Acute Food Starvation Emergency
        // Food < Upkeep and current sector holds stored food.
        // ----------------------------------------------------------------------
        val upkeep = char.army.total()
        if (upkeep > 0 && char.food < upkeep) {
            if (territory != null && territory.food > 0 &&
                (territory.ownerPlayerId == char.playerId || territory.ownerTeam == snapshot.botTeam)) {
                logger.info("Deterministic Override: Food starvation risk for ${char.name} (food ${char.food} < upkeep $upkeep). Collecting ${territory.food} Food in Sector $sectorId.")
                return BotAction.CollectResources(char.id, sectorId)
            }
        }

        // ----------------------------------------------------------------------
        // Critical State 3: Sole Castle Guardian Forbidden From Marching Out
        // ----------------------------------------------------------------------
        if (mustStayAtCastle && isAtCastle) {
            val maxRecruit = (100 - char.army.total()).coerceAtLeast(0)
            if (char.army.total() == 0 && maxRecruit > 0 && territory != null) {
                if (char.gold >= 50 && territory.protection >= 20) {
                    val count = (char.gold / 50).coerceAtMost(maxRecruit)
                    logger.info("Deterministic Override: Castle Guardian ${char.name} has 0 troops. Recruiting $count Heavy Infantry.")
                    return BotAction.Recruit(char.id, ArmyType.HEAVY_INFANTRY, count)
                } else if (char.gold >= 30) {
                    val count = (char.gold / 30).coerceAtMost(maxRecruit)
                    logger.info("Deterministic Override: Castle Guardian ${char.name} has 0 troops. Recruiting $count Light Infantry.")
                    return BotAction.Recruit(char.id, ArmyType.LIGHT_INFANTRY, count)
                }
            }
            if (territory != null && (territory.food > 0 || territory.gold > 0) &&
                (territory.ownerPlayerId == char.playerId || territory.ownerTeam == snapshot.botTeam)) {
                logger.info("Deterministic Override: Castle Guardian ${char.name} harvesting stored resources in castle sector.")
                return BotAction.CollectResources(char.id, sectorId)
            }
            logger.info("Deterministic Override: Castle Guardian ${char.name} holding garrison position.")
            return BotAction.Skip(char.id)
        }

        // ----------------------------------------------------------------------
        // Critical State 4: Defenseless Commander Adjacent to Aggressive Enemy
        // 0 troops with enemy commander on immediate border.
        // ----------------------------------------------------------------------
        if (char.army.total() == 0) {
            val currentTerritoryData = MapData[sectorId]
            val adjEnemies = if (currentTerritoryData != null) {
                enemyChars.filter { it.currentSector in currentTerritoryData.adjacentIds && it.army.total() > 0 }
            } else emptyList()

            if (adjEnemies.isNotEmpty()) {
                val maxRecruit = 100
                if (territory != null && char.gold >= 50 && territory.protection >= 20) {
                    val count = (char.gold / 50).coerceAtMost(maxRecruit)
                    logger.info("Deterministic Override: Defenseless Commander ${char.name} adjacent to enemy ${adjEnemies.first().name}. Recruiting $count Heavy Infantry.")
                    return BotAction.Recruit(char.id, ArmyType.HEAVY_INFANTRY, count)
                } else if (territory != null && char.gold >= 30) {
                    val count = (char.gold / 30).coerceAtMost(maxRecruit)
                    logger.info("Deterministic Override: Defenseless Commander ${char.name} adjacent to enemy ${adjEnemies.first().name}. Recruiting $count Light Infantry.")
                    return BotAction.Recruit(char.id, ArmyType.LIGHT_INFANTRY, count)
                } else if (!mustStayAtCastle && currentTerritoryData != null) {
                    val occupiedSectors = snapshot.gameState.characters.filter { !it.isDead }.mapNotNull { it.currentSector }.toSet()
                    val safeSector = currentTerritoryData.adjacentIds.find { it !in occupiedSectors }
                    if (safeSector != null) {
                        logger.info("Deterministic Override: Defenseless Commander ${char.name} retreating to safe sector $safeSector away from enemy.")
                        return BotAction.Move(char.id, safeSector, BattleStrategy.NONE)
                    }
                }
            }
        }

        // Board state is stable. Proceed to stochastic LLM strategic reasoning.
        return null
    }
}
