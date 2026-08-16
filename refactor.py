import re

with open("src/jvmMain/kotlin/game/GameSession.kt", "r") as f:
    content = f.read()

# Replace winnerRemainingSoldiers -> winnerRemainingArmy
content = content.replace("outcome.winnerRemainingSoldiers", "outcome.winnerRemainingArmy")

# Replace soldiers = 0 -> army = Army()
content = content.replace("soldiers = 0,", "army = Army(),")
content = content.replace("soldiers = 0)", "army = Army())")

# Rename hireSoldiers -> recruitArmy and update logic
old_hire = """    suspend fun hireSoldiers(playerId: String, count: Int, characterId: String? = null) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            if (count !in 1..100) return
            
            val char = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && !it.isDead } ?: return
            if (char.isDead) return
            if (char.soldiers + count > 100) return
            
            val cost = count * 10
            if (char.gold < cost) return
            
            val newChars = gameState.characters.map {
                if (it.id == char.id) {
                    it.copy(gold = it.gold - cost, soldiers = it.soldiers + count)
                } else {
                    it
                }
            }
            
            gameState = gameState.copy(characters = newChars)
        }
        broadcastState()
    }"""

new_recruit = """    suspend fun recruitArmy(playerId: String, unitType: String, count: Int, characterId: String? = null) {
        mutex.withLock {
            if (gameState.status != GameStatus.IN_PROGRESS) return
            if (count !in 1..100) return
            
            val char = (if (characterId != null) {
                gameState.characters.find { it.id == characterId && it.playerId == playerId }
            } else null) ?: gameState.characters.find { it.playerId == playerId && !it.isDead } ?: return
            if (char.isDead) return
            if (char.army.total() + count > 100) return
            
            val sectorId = char.currentSector ?: return
            val territory = gameState.territories[sectorId] ?: return
            val protection = territory.protection
            
            val price = when(unitType) {
                "MAGE" -> 50
                "HEAVY_INFANTRY" -> 30
                "ARCHER" -> 15
                "LIGHT_INFANTRY" -> 10
                else -> return
            }
            
            val requiredProtection = when(unitType) {
                "MAGE" -> 30
                "HEAVY_INFANTRY" -> 20
                "ARCHER" -> 10
                "LIGHT_INFANTRY" -> 0
                else -> 0
            }
            
            if (protection < requiredProtection) return
            
            val cost = count * price
            if (char.gold < cost) return
            
            val newArmy = when(unitType) {
                "MAGE" -> char.army.copy(mages = char.army.mages + count)
                "HEAVY_INFANTRY" -> char.army.copy(heavyInfantry = char.army.heavyInfantry + count)
                "ARCHER" -> char.army.copy(archers = char.army.archers + count)
                "LIGHT_INFANTRY" -> char.army.copy(lightInfantry = char.army.lightInfantry + count)
                else -> char.army
            }
            
            val newChars = gameState.characters.map {
                if (it.id == char.id) {
                    it.copy(gold = it.gold - cost, army = newArmy)
                } else {
                    it
                }
            }
            
            gameState = gameState.copy(characters = newChars)
        }
        broadcastState()
    }"""
content = content.replace(old_hire, new_recruit)

# Update checkTurnEnd starvation logic
old_starvation = """                    if (!char.isDead && char.soldiers > 0) {
                        val foodNeeded = char.soldiers // 1 food per soldier per turn, no gold
                        val (newFood, remainingSoldiers) = if (char.food >= foodNeeded) {
                            (char.food - foodNeeded) to char.soldiers
                        } else {
                            // Ran out of food: only feed as many soldiers as available food
                            0 to char.food
                        }
                        
                        char.copy(
                            food = newFood,
                            soldiers = remainingSoldiers,
                            hasActedThisTurn = false
                        )
                    } else {
                        char.copy(hasActedThisTurn = false)
                    }"""

new_starvation = """                    if (!char.isDead && char.army.total() > 0) {
                        val foodNeeded = char.army.total()
                        val (newFood, remainingArmy) = if (char.food >= foodNeeded) {
                            (char.food - foodNeeded) to char.army
                        } else {
                            val lossRate = 0.25
                            val m = kotlin.math.round(char.army.mages * lossRate).toInt()
                            val h = kotlin.math.round(char.army.heavyInfantry * lossRate).toInt()
                            val l = kotlin.math.round(char.army.lightInfantry * lossRate).toInt()
                            val a = kotlin.math.round(char.army.archers * lossRate).toInt()
                            
                            val shrunkArmy = Army(
                                mages = kotlin.math.max(0, char.army.mages - m),
                                heavyInfantry = kotlin.math.max(0, char.army.heavyInfantry - h),
                                lightInfantry = kotlin.math.max(0, char.army.lightInfantry - l),
                                archers = kotlin.math.max(0, char.army.archers - a)
                            )
                            0 to shrunkArmy
                        }
                        
                        char.copy(
                            food = newFood,
                            army = remainingArmy,
                            hasActedThisTurn = false
                        )
                    } else {
                        char.copy(hasActedThisTurn = false)
                    }"""
content = content.replace(old_starvation, new_starvation)


# Update volunteers
old_volunteers = """                                NatureEventType.VOLUNTEERS -> {
                                    val charTarget = charsHere.first()
                                    val newSoldiers = (charTarget.soldiers + kotlin.random.Random.nextInt(2, 5)).coerceAtMost(100)
                                    val idx = finalUpdatedChars.indexOfFirst { it.id == charTarget.id }
                                    if (idx != -1) {
                                        finalUpdatedChars[idx] = charTarget.copy(soldiers = newSoldiers)
                                    }
                                }"""

new_volunteers = """                                NatureEventType.VOLUNTEERS -> {
                                    val charTarget = charsHere.first()
                                    val newCount = kotlin.random.Random.nextInt(2, 5)
                                    val space = 100 - charTarget.army.total()
                                    val actualAdd = kotlin.math.max(0, kotlin.math.min(newCount, space))
                                    val newArmy = charTarget.army.copy(lightInfantry = charTarget.army.lightInfantry + actualAdd)
                                    val idx = finalUpdatedChars.indexOfFirst { it.id == charTarget.id }
                                    if (idx != -1) {
                                        finalUpdatedChars[idx] = charTarget.copy(army = newArmy)
                                    }
                                }"""
content = content.replace(old_volunteers, new_volunteers)


with open("src/jvmMain/kotlin/game/GameSession.kt", "w") as f:
    f.write(content)

print("GameSession.kt modified.")
