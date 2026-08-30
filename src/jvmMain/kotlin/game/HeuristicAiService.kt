package game

import models.*

class HeuristicAiService : AiDecisionService {
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

    private fun decideForCharacter(char: Character, snapshot: BotGameStateSnapshot, mustStayAtCastle: Boolean): BotAction {
        val sectorId = char.currentSector ?: return BotAction.Skip(char.id)
        val territory = snapshot.gameState.territories[sectorId]
        
        // 1. If we have no army and have gold, try to recruit
        if (char.army.total() == 0 && char.gold >= 30 && territory != null) {
            if (territory.protection >= 20 && char.gold >= 50) {
                val count = char.gold / 50
                return BotAction.Recruit(char.id, ArmyType.HEAVY_INFANTRY, count)
            } else if (char.gold >= 30) {
                val count = char.gold / 30
                return BotAction.Recruit(char.id, ArmyType.LIGHT_INFANTRY, count)
            }
        }
        
        // 2. If the sector has uncollected resources, collect them
        if (territory != null && (territory.food > 0 || territory.gold > 0)) {
            if (territory.ownerPlayerId == char.playerId || territory.ownerTeam == snapshot.botTeam) {
                return BotAction.CollectResources(char.id, sectorId)
            }
        }
        
        // 3. Look for adjacent sectors to attack or capture (if allowed to move)
        if (!mustStayAtCastle) {
            val currentTerritoryData = MapData[sectorId]
            if (currentTerritoryData != null) {
                var bestTarget: String? = null
                var bestScore = -1.0
                
                for (adjId in currentTerritoryData.adjacentIds) {
                    val occupant = snapshot.gameState.characters.find { it.currentSector == adjId && !it.isDead }
                    val targetPlayer = occupant?.let { occ -> snapshot.gameState.players.find { it.id == occ.playerId } }
                    
                    if (targetPlayer?.team == snapshot.botTeam) {
                        continue // Don't attack friends
                    }
                    
                    val protection = snapshot.gameState.territories[adjId]?.protection ?: (MapData[adjId]?.protection ?: 0)
                    
                    if (occupant != null) {
                        // Try to estimate win chance
                        val winChance = estimateWinChance(char, occupant, protection, BattleStrategy.NONE, char.siegeWeapons)
                        if (winChance > 50) {
                            val score = winChance.toDouble() + (if (MapData[adjId]?.isCastle == true) 50.0 else 0.0)
                            if (score > bestScore) {
                                bestScore = score
                                bestTarget = adjId
                            }
                        }
                    } else {
                        // Empty sector
                        val score = 30.0 + (if (MapData[adjId]?.isCastle == true) 40.0 else 0.0)
                        if (score > bestScore) {
                            bestScore = score
                            bestTarget = adjId
                        }
                    }
                }
                
                if (bestTarget != null) {
                    return BotAction.Move(char.id, bestTarget, BattleStrategy.NONE)
                }
            }
        }
        
        // 4. Try to upgrade territory
        if (territory != null && (territory.ownerPlayerId == char.playerId || territory.ownerTeam == snapshot.botTeam)) {
            if (territory.cultivation < 30) {
                return BotAction.UpgradeTerritory(char.id, sectorId, "CULTIVATION")
            } else if (territory.protection < 30) {
                return BotAction.UpgradeTerritory(char.id, sectorId, "PROTECTION")
            }
        }
        
        // 5. Fallback: skip turn
        return BotAction.Skip(char.id)
    }
}
