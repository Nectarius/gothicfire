package game

import io.ktor.client.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.coroutines.withTimeout
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import models.*
import org.slf4j.LoggerFactory

class AdvisorService(
    private val client: HttpClient,
    private val agentUrl: String = "http://127.0.0.1:8000",
    private val timeoutMillis: Long = 90000L
) {
    private val logger = LoggerFactory.getLogger(AdvisorService::class.java)
    private val json = Json {
        ignoreUnknownKeys = true
        isLenient = true
        encodeDefaults = true
    }

    suspend fun consultAdvisor(
        gameState: GameState,
        playerId: String,
        advisorId: String,
        questionType: String
    ): AdvisorConsultationResponse {
        val player = gameState.players.find { it.id == playerId }
        val playerTeam = player?.team ?: Team.RED
        val myChars = gameState.characters.filter { it.playerId == playerId && !it.isDead }
        val myTerritories = gameState.territories.values.filter { it.ownerTeam == playerTeam || it.ownerPlayerId == playerId }

        val enemyPlayers = gameState.players.filter { it.team != playerTeam }
        val enemyChars = gameState.characters.filter { char -> enemyPlayers.any { it.id == char.playerId } && !char.isDead }
        val enemyTerritories = gameState.territories.values.filter { it.ownerTeam != null && it.ownerTeam != playerTeam }

        val myTotalArmy = myChars.sumOf { it.army.total() }
        val myTotalGold = myChars.sumOf { it.gold }
        val myTotalFood = myChars.sumOf { it.food }
        val enemyTotalArmy = enemyChars.sumOf { it.army.total() }

        // 1. Economic & Upkeep analysis
        val foodConsumption = myTotalArmy
        val foodDeficit = myTotalFood < foodConsumption
        val foodTurnsRemaining = if (foodConsumption > 0) myTotalFood / foodConsumption else 99
        val uncollectedFood = myTerritories.sumOf { it.food }
        val uncollectedGold = myTerritories.sumOf { it.gold }

        // 2. Castle & Garrison analysis
        val myCastleSector = gameState.teamCastles[playerTeam]
        val myCastleName = myCastleSector?.let { MapData[it]?.name ?: "Castle $it" } ?: "None"
        val garrisonChars = myChars.filter { it.currentSector == myCastleSector }
        val garrisonArmy = garrisonChars.sumOf { it.army.total() }
        val enemyCastles = enemyPlayers.mapNotNull { gameState.teamCastles[it.team] }.distinct()
            .joinToString { MapData[it]?.name ?: "Castle $it" }

        // 3. Perimeter Threats to Castle
        val castleAdjSectors = myCastleSector?.let { MapData[it]?.adjacentIds?.toSet() } ?: emptySet()
        val enemiesNearCastle = enemyChars.filter { it.currentSector in castleAdjSectors }
        val castleThreatDescriptions = enemiesNearCastle.map {
            "${it.name} (${it.army.total()} troops at Sector ${it.currentSector})"
        }

        // 4. Commander Specializations and Combat Synergies
        val commanderHighlights = myChars.map { char ->
            val unlockedStrategy = when {
                char.archon >= 6 && char.army.total() > 5 -> "Arcane Phalanx"
                char.warlord >= 6 && char.army.total() > 3 -> "Hammer and Spell"
                char.vanguard >= 6 && char.army.total() > 5 -> "Spell Infused Volley"
                else -> null
            }
            val stratNote = if (unlockedStrategy != null) ", Combat Strategy: $unlockedStrategy" else ""
            val specialty = listOf(
                "Warlord" to char.warlord,
                "Archon" to char.archon,
                "Vanguard" to char.vanguard,
                "Intellect" to char.intellect
            ).maxByOrNull { it.second }
            val specNote = if (specialty != null && specialty.second >= 5) ", Hero Attribute: ${specialty.first} ${specialty.second}" else ""
            val locName = char.currentSector?.let { MapData[it]?.name ?: "Sector $it" } ?: "Base"
            val armyComp = formatArmyBreakdown(char.army)
            "Our Commander ${char.name} stationed at $locName (${char.army.total()} troops: $armyComp$specNote$stratNote)"
        }

        // 5. Enemy Commander Locations
        val enemyCommanderHighlights = enemyChars.map { enemy ->
            val enemyTeam = enemyPlayers.find { it.id == enemy.playerId }?.team ?: "Enemy"
            val enemyLocName = enemy.currentSector?.let { MapData[it]?.name ?: "Sector $it" } ?: "Unknown"
            val isCastle = enemy.currentSector?.let { MapData[it]?.isCastle } == true
            val castleNote = if (isCastle) " [Enemy Fortress Garrison]" else ""
            val enemyArmyComp = formatArmyBreakdown(enemy.army)
            "Enemy ${enemy.name} (Team $enemyTeam): ${enemy.army.total()} troops ($enemyArmyComp) stationed at $enemyLocName$castleNote"
        }

        // 6. Frontline Opportunities / Risks (Explicitly clarifying who is where)
        val combatOpportunities = mutableListOf<String>()
        for (char in myChars) {
            val sec = char.currentSector ?: continue
            val adjIds = MapData[sec]?.adjacentIds ?: emptyList()
            val myLocName = MapData[sec]?.name ?: "Sector $sec"
            for (adj in adjIds) {
                val enemy = enemyChars.find { it.currentSector == adj }
                if (enemy != null) {
                    val enemyLocName = MapData[adj]?.name ?: "Sector $adj"
                    val enemyTeam = enemyPlayers.find { it.id == enemy.playerId }?.team ?: "Enemy"
                    val isEnemyCastle = MapData[adj]?.isCastle == true
                    val castleTag = if (isEnemyCastle) " (Enemy Fortress!)" else ""
                    val mySize = char.army.total()
                    val enemySize = enemy.army.total()
                    if (mySize >= enemySize * 10 && enemySize > 0) {
                        combatOpportunities.add("OVERWHELMING ADVANTAGE: Our commander ${char.name} ($mySize units at $myLocName) can wipe out enemy ${enemy.name} ($enemySize units at $enemyLocName$castleTag) with a 10x instant victory ratio!")
                    } else if (mySize > enemySize) {
                        combatOpportunities.add("OUR ADVANTAGE: Our commander ${char.name} ($mySize units at $myLocName) outnumbers enemy ${enemy.name} of Team $enemyTeam ($enemySize units at $enemyLocName$castleTag).")
                    } else if (enemySize > mySize) {
                        combatOpportunities.add("HOSTILE THREAT: Enemy ${enemy.name} of Team $enemyTeam ($enemySize units at $enemyLocName$castleTag) outnumbers our commander ${char.name} ($mySize units at $myLocName).")
                    } else {
                        combatOpportunities.add("EVEN MATCH: Our commander ${char.name} ($mySize units at $myLocName) faces enemy ${enemy.name} ($enemySize units at $enemyLocName$castleTag).")
                    }
                }
            }
        }

        // 7. Tactical Alerts
        val tacticalAlerts = mutableListOf<String>()
        if (foodDeficit) {
            tacticalAlerts.add("CRITICAL: Food shortage! Current food ($myTotalFood) < upkeep ($foodConsumption/turn). Soldiers will starve next turn!")
        } else if (foodTurnsRemaining <= 1 && foodConsumption > 0) {
            tacticalAlerts.add("LOW FOOD: $myTotalFood Food for $foodConsumption upkeep/turn (approx 1 turn left).")
        }
        if (myCastleSector != null && garrisonArmy == 0) {
            tacticalAlerts.add("CRITICAL: Castle ($myCastleName) has NO garrison troops!")
        }
        if (castleThreatDescriptions.isNotEmpty()) {
            tacticalAlerts.add("IMMEDIATE THREAT: Enemies on castle borders: ${castleThreatDescriptions.joinToString(", ")}.")
        }
        if (uncollectedFood > 0 || uncollectedGold > 0) {
            tacticalAlerts.add("RESOURCES: Controlled sectors hold $uncollectedGold Gold and $uncollectedFood Food ready for collection.")
        }

        val totalMages = myChars.sumOf { it.army.mages }
        val totalHeavy = myChars.sumOf { it.army.heavyInfantry }
        val totalLight = myChars.sumOf { it.army.lightInfantry }
        val totalArchers = myChars.sumOf { it.army.archers }

        val activeTroopList = mutableListOf<String>()
        if (totalLight > 0) activeTroopList.add("$totalLight Light Infantry")
        if (totalHeavy > 0) activeTroopList.add("$totalHeavy Heavy Infantry")
        if (totalArchers > 0) activeTroopList.add("$totalArchers Archers")
        if (totalMages > 0) activeTroopList.add("$totalMages Mages")
        val troopBreakdownStr = if (activeTroopList.isNotEmpty()) activeTroopList.joinToString(", ") else "0 troops"
        val mageWarning = if (totalMages == 0) "; NOTE: We have 0 Mages" else ""

        val playerSummary = buildString {
            append("Team: $playerTeam. Controlled Sectors: ${myTerritories.size}. Castle Base: $myCastleName (Garrison: $garrisonArmy troops). ")
            append("Our Total Army: $myTotalArmy troops ($troopBreakdownStr$mageWarning). ")
            append("Treasury: $myTotalGold Gold, $myTotalFood Food (Upkeep: $foodConsumption Food/turn, ${if (foodDeficit) "STARVATION RISK" else "$foodTurnsRemaining turns reserve"}). ")
            if (commanderHighlights.isNotEmpty()) {
                append("Our Commanders: ${commanderHighlights.joinToString("; ")}. ")
            }
            if (combatOpportunities.isNotEmpty()) {
                append("Frontline Clashes: ${combatOpportunities.joinToString("; ")}. ")
            }
            if (tacticalAlerts.isNotEmpty()) {
                append("Tactical Alerts: ${tacticalAlerts.joinToString(" | ")}")
            }
        }

        val opponentsSummary = buildString {
            append("Rival Teams: ${enemyPlayers.map { it.team }.distinct().joinToString()}. Enemy Sectors: ${enemyTerritories.size}. Enemy Army Total: $enemyTotalArmy units across ${enemyChars.size} active commanders. Enemy Fortresses: ${if (enemyCastles.isNotBlank()) enemyCastles else "Unknown"}. ")
            if (enemyCommanderHighlights.isNotEmpty()) {
                append("Enemy Forces & Locations: ${enemyCommanderHighlights.joinToString("; ")}.")
            }
        }

        val mapSummary = "Current Turn: ${gameState.currentTurn}/${gameState.maxTurns}. Market Rate: 1 Gold buys 1 Food, 2 Food sells for 1 Gold. Unharvested in sectors: $uncollectedGold Gold, $uncollectedFood Food."

        val isJade = advisorId.equals("JADE", ignoreCase = true)
        val advisorName = if (isJade) "Jade the Enlightened" else "Zorax the Mighty"

        val request = AdvisorConsultationRequest(
            gameId = gameState.gameName ?: "campaign",
            turn = gameState.currentTurn,
            playerId = playerId,
            advisorId = if (isJade) "JADE" else "ZORAX",
            advisorName = advisorName,
            questionType = questionType,
            playerTeam = playerTeam.name,
            playerSummary = playerSummary,
            opponentsSummary = opponentsSummary,
            mapSummary = mapSummary
        )

        val baseUrl = agentUrl.trimEnd('/')
            .removeSuffix("/api/v1/decide")
            .removeSuffix("/api/v1/advisor/consult")
            .removeSuffix("/api/v1")

        val targetEndpoint = "$baseUrl/api/v1/advisor/consult"

        logger.info("Consulting advisor $advisorName at $targetEndpoint (timeout: ${timeoutMillis}ms)...")

        val result = runCatching {
            withTimeout(timeoutMillis) {
                val response = client.post(targetEndpoint) {
                    contentType(ContentType.Application.Json)
                    setBody(json.encodeToString(request))
                    timeout {
                        requestTimeoutMillis = timeoutMillis
                        connectTimeoutMillis = timeoutMillis
                        socketTimeoutMillis = timeoutMillis
                    }
                }
                if (!response.status.isSuccess()) {
                    throw IllegalStateException("Advisor HTTP ${response.status}")
                }
                json.decodeFromString<AdvisorConsultationResponse>(response.bodyAsText())
            }
        }

        return result.getOrElse { err ->
            logger.warn("Advisor consultation failed at $targetEndpoint ($err). Using in-character fallback counsel.")
            fallbackAdvice(
                advisorId = advisorId,
                advisorName = advisorName,
                questionType = questionType,
                myArmy = myTotalArmy,
                enemyArmy = enemyTotalArmy,
                myGold = myTotalGold,
                foodDeficit = foodDeficit,
                foodNeeded = foodConsumption,
                myFood = myTotalFood,
                uncollectedFood = uncollectedFood,
                castleGarrison = garrisonArmy,
                hasCastleThreat = castleThreatDescriptions.isNotEmpty()
            )
        }
    }

    private fun fallbackAdvice(
        advisorId: String,
        advisorName: String,
        questionType: String,
        myArmy: Int,
        enemyArmy: Int,
        myGold: Int,
        foodDeficit: Boolean = false,
        foodNeeded: Int = 0,
        myFood: Int = 0,
        uncollectedFood: Int = 0,
        castleGarrison: Int = 1,
        hasCastleThreat: Boolean = false
    ): AdvisorConsultationResponse {
        val isJade = advisorId.equals("JADE", ignoreCase = true)

        val advice: String
        val keyPoints: List<String>

        when (questionType.uppercase()) {
            "STATUS" -> {
                if (isJade) {
                    advice = if (foodDeficit) {
                        "The arcane ether whispers of famine, My Lord. We muster $myArmy soldiers while our adversaries command $enemyArmy, but we only have $myFood food against $foodNeeded needed upkeep! We must harvest our cultivated lands immediately."
                    } else {
                        "The arcane ether whispers of shifting balances, My Lord. We muster $myArmy soldiers while our adversaries command $enemyArmy. Our treasury of $myGold gold holds promise, but we must protect our cultivated lands from encroachment."
                    }
                    keyPoints = listOf("Army comparison: $myArmy vs $enemyArmy enemy troops", "Treasury reserve: $myGold gold", "Safeguard border sectors")
                } else {
                    advice = if (foodDeficit) {
                        "Commander! Our ranks count $myArmy soldiers against the enemy's $enemyArmy, but our men face starvation ($myFood Food vs $foodNeeded upkeep)! Keep the castle secured and gather supplies immediately."
                    } else {
                        "Commander! Our ranks count $myArmy soldiers against the enemy's $enemyArmy. We hold our ground, but vigilance is our shield. Keep the castle secured and do not let their scouts probe our perimeter undetected."
                    }
                    keyPoints = listOf("Standing force: $myArmy soldiers", "Enemy threat: $enemyArmy hostile troops", "Secure castle garrison")
                }
            }
            "NEXT_MOVE" -> {
                if (isJade) {
                    advice = if (foodDeficit) {
                        "Channel our focus into survival, Seeker! Harvest available territory resources immediately—we need food to sustain our ranks before we recruit Mages."
                    } else {
                        "Channel our wealth into strength, Seeker. If you possess surplus gold, harvest available territory resources and recruit Mages to amplify our spellcasting dominance this turn."
                    }
                    keyPoints = listOf("Collect unharvested sector resources", "Invest gold in high-tier arcane units", "Check adjacent movement paths")
                } else {
                    advice = if (castleGarrison == 0 && hasCastleThreat) {
                        "Fall back to the castle immediately, Commander! The enemy probes our perimeter and our walls are unguarded! Move troops to reinforce the vanguard."
                    } else {
                        "Strengthen the vanguard, Commander! If you have gold in the war chest, recruit Heavy Infantry immediately. A fortified line will absorb any surprise assault."
                    }
                    keyPoints = listOf("Recruit Heavy Infantry at castle", "Upgrade sector protection if under 20", "Position troops on defensible chokepoints")
                }
            }
            else -> { // STRATEGY
                if (isJade) {
                    advice = "Victory belongs to those who master both fortune and magic, Commander. Cultivate high-yield sectors across the map, assemble a devastating coven of Mages, and strike their fortress when their defenses falter."
                    keyPoints = listOf("Maximize territory cultivation for compound gold", "Synergize Archon stat with Mage units", "Target the opposing fortress")
                } else {
                    advice = "War is won by iron and relentless advance, Sire! Secure our supply line, fortify key transit sectors with protection, and march an overwhelming host directly upon the enemy castle."
                    keyPoints = listOf("Build overwhelming force (>10x ratio for instant victory)", "Push forward toward enemy castle", "Never leave your base undefended")
                }
            }
        }

        return AdvisorConsultationResponse(
            advisorName = advisorName,
            questionType = questionType,
            advice = advice,
            keyPoints = keyPoints
        )
    }

    private fun formatArmyBreakdown(army: Army): String {
        val parts = mutableListOf<String>()
        if (army.lightInfantry > 0) parts.add("${army.lightInfantry} Light")
        if (army.heavyInfantry > 0) parts.add("${army.heavyInfantry} Heavy")
        if (army.archers > 0) parts.add("${army.archers} Archers")
        if (army.mages > 0) parts.add("${army.mages} Mages")
        return if (parts.isNotEmpty()) parts.joinToString(", ") else "0 units"
    }
}
