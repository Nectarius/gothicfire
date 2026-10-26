package models

import kotlin.random.Random

enum class TacticalBiome {
    FOREST,
    RIVER,
    CANYON,
    FORTRESS,
    PLAINS;

    val backdropUrl: String
        get() = when (this) {
            FOREST -> "/tactical/arena_forest.jpg"
            RIVER -> "/tactical/arena_river.jpg"
            CANYON -> "/tactical/arena_canyon.jpg"
            FORTRESS -> "/tactical/arena_castle.jpg"
            PLAINS -> "/tactical/arena_forest.jpg"
        }
}

object TacticalMapGenerator {
    const val GRID_WIDTH = 10
    const val GRID_HEIGHT = 8

    /**
     * Determines the biome of a sector based on its metadata and lore.
     */
    fun detectBiome(sectorId: String): TacticalBiome {
        val terr = MapData[sectorId]
        val loc = LocationInfoCatalog[sectorId]

        val name = (terr?.name ?: "").lowercase()
        val title = (loc?.title ?: "").lowercase()
        val region = (loc?.region ?: "").lowercase()
        val desc = (loc?.description ?: "").lowercase()

        val titleAndName = "$name $title"
        val fullLore = "$titleAndName $region $desc"

        // 1. Castles and major fortified structures
        if (terr?.isCastle == true ||
            listOf("city gate", "khorinis east gate", "barricade", "hideout", "castle", "citadel", "monastery of innos").any { titleAndName.contains(it) }
        ) {
            return TacticalBiome.FORTRESS
        }

        // 2. Mountain, Gorge & Canyon Sectors
        if (listOf("mountains", "gorge", "canyon", "crags", "defile", "pass", "tunnel").any { titleAndName.contains(it) }) {
            return TacticalBiome.CANYON
        }

        // 3. River, Bridge, Waterfall & Coastal Sectors
        if (listOf("bridge", "waterfall", "lake", "coast", "cove", "beach", "harbor").any { titleAndName.contains(it) }) {
            return TacticalBiome.RIVER
        }

        // 4. Forest, Woods, Grove Sectors
        if (listOf("forest", "woods", "grove", "hollow", "grimwald").any { titleAndName.contains(it) || region.contains(it) || desc.contains(it) }) {
            return TacticalBiome.FOREST
        }

        // 5. River/Canyon from full lore
        if (listOf("bridge", "waterfall", "lake", "coast", "cove", "beach", "harbor").any { desc.contains(it) }) {
            return TacticalBiome.RIVER
        }

        if (listOf("mountains", "gorge", "canyon", "crags", "defile", "pass", "tunnel").any { region.contains(it) || desc.contains(it) }) {
            return TacticalBiome.CANYON
        }

        if (listOf("fortress", "monastery", "barricade").any { fullLore.contains(it) }) {
            return TacticalBiome.FORTRESS
        }

        return TacticalBiome.PLAINS
    }

    /**
     * Deterministically generates a 10x8 grid of TacticalTileType for a sector.
     * tiles[y][x] where y in 0 until 8, x in 0 until 10.
     */
    fun generateMap(
        sectorId: String,
        protection: Int = 5,
        attackerSiegeWeapons: Int = 0
    ): Pair<TacticalBiome, List<List<TacticalTileType>>> {
        val biome = detectBiome(sectorId)
        val seed = sectorId.hashCode().toLong()
        val rng = Random(seed)

        // Initialize 8 rows x 10 cols with PLAIN
        val grid = Array(GRID_HEIGHT) { Array(GRID_WIDTH) { TacticalTileType.PLAIN } }

        when (biome) {
            TacticalBiome.FORTRESS -> {
                // Wall at column 7, gates at row 3 and 4
                val wallRows = (1..6).toList()
                for (y in wallRows) {
                    if (y == 3 || (y == 4 && protection < 20)) {
                        grid[y][7] = TacticalTileType.FORTRESS_GATE
                    } else {
                        grid[y][7] = TacticalTileType.FORTRESS_WALL
                    }
                }
                // Attacker siege weapons breach wall tiles
                var breaches = attackerSiegeWeapons
                val breachCandidates = listOf(2, 5, 1, 6)
                for (by in breachCandidates) {
                    if (breaches > 0 && grid[by][7] == TacticalTileType.FORTRESS_WALL) {
                        grid[by][7] = TacticalTileType.PLAIN
                        breaches--
                    }
                }
                // Outer perimeter rocks
                for (x in 2..5) {
                    if (rng.nextFloat() < 0.3f) grid[0][x] = TacticalTileType.CLIFF_ROCK
                    if (rng.nextFloat() < 0.3f) grid[7][x] = TacticalTileType.CLIFF_ROCK
                }
            }
            TacticalBiome.RIVER -> {
                // River at column 4
                for (y in 0 until GRID_HEIGHT) {
                    grid[y][4] = TacticalTileType.RIVER
                }
                // Bridges at row 2 and 5
                grid[2][4] = TacticalTileType.BRIDGE
                grid[5][4] = TacticalTileType.BRIDGE

                // Scattered trees along banks
                for (y in 0 until GRID_HEIGHT) {
                    if (y != 2 && y != 5) {
                        if (rng.nextFloat() < 0.35f) grid[y][3] = TacticalTileType.FOREST
                        if (rng.nextFloat() < 0.35f) grid[y][5] = TacticalTileType.FOREST
                    }
                }
            }
            TacticalBiome.CANYON -> {
                // Canyon cliffs at top and bottom
                for (x in 0 until GRID_WIDTH) {
                    grid[0][x] = TacticalTileType.CLIFF_ROCK
                    grid[7][x] = TacticalTileType.CLIFF_ROCK
                }
                // Choke points at column 4 and 5
                grid[1][4] = TacticalTileType.CLIFF_ROCK
                grid[2][4] = TacticalTileType.CLIFF_ROCK
                grid[5][5] = TacticalTileType.CLIFF_ROCK
                grid[6][5] = TacticalTileType.CLIFF_ROCK
            }
            TacticalBiome.FOREST -> {
                // 25-30% of central tiles are dense forest
                for (y in 1..6) {
                    for (x in 2..7) {
                        if (rng.nextFloat() < 0.28f) {
                            grid[y][x] = TacticalTileType.FOREST
                        }
                    }
                }
            }
            TacticalBiome.PLAINS -> {
                // Sparse trees and rocks (~8%)
                for (y in 1..6) {
                    for (x in 2..7) {
                        val roll = rng.nextFloat()
                        if (roll < 0.05f) {
                            grid[y][x] = TacticalTileType.FOREST
                        } else if (roll < 0.08f) {
                            grid[y][x] = TacticalTileType.CLIFF_ROCK
                        }
                    }
                }
            }
        }

        // Ensure attacker spawn (cols 0-1, rows 1-6) and defender spawn (cols 8-9, rows 1-6) are traversable
        for (y in 1..6) {
            for (x in listOf(0, 1, 8, 9)) {
                if (!grid[y][x].isTraversable) {
                    grid[y][x] = TacticalTileType.PLAIN
                }
            }
        }

        return biome to grid.map { it.toList() }
    }

    /**
     * Initializes initial unit positions for attacker and defender sides.
     */
    fun spawnAllUnits(
        battleId: String,
        attackerChar: Character,
        defenderChar: Character,
        attackerPlayerId: String,
        defenderPlayerId: String,
        attackerTeam: Team,
        defenderTeam: Team
    ): List<TacticalUnit> {
        val result = mutableListOf<TacticalUnit>()

        // 1. Attacker Hero
        result.add(
            TacticalRules.createHeroUnit(
                battleId = battleId,
                char = attackerChar,
                playerId = attackerPlayerId,
                team = attackerTeam,
                spawnX = 0,
                spawnY = 3
            )
        )

        // 2. Attacker Troops
        val attackerTroopSlots = listOf(0 to 2, 0 to 4, 1 to 2, 1 to 4)
        var slotIdx = 0
        if (attackerChar.army.heavyInfantry > 0 && slotIdx < attackerTroopSlots.size) {
            val (sx, sy) = attackerTroopSlots[slotIdx++]
            result.add(TacticalRules.createTroopUnit(battleId, TacticalUnitType.HEAVY_INFANTRY, attackerChar.army.heavyInfantry, attackerChar.army, attackerPlayerId, attackerTeam, sx, sy))
        }
        if (attackerChar.army.lightInfantry > 0 && slotIdx < attackerTroopSlots.size) {
            val (sx, sy) = attackerTroopSlots[slotIdx++]
            result.add(TacticalRules.createTroopUnit(battleId, TacticalUnitType.LIGHT_INFANTRY, attackerChar.army.lightInfantry, attackerChar.army, attackerPlayerId, attackerTeam, sx, sy))
        }
        if (attackerChar.army.archers > 0 && slotIdx < attackerTroopSlots.size) {
            val (sx, sy) = attackerTroopSlots[slotIdx++]
            result.add(TacticalRules.createTroopUnit(battleId, TacticalUnitType.ARCHER, attackerChar.army.archers, attackerChar.army, attackerPlayerId, attackerTeam, sx, sy))
        }
        if (attackerChar.army.mages > 0 && slotIdx < attackerTroopSlots.size) {
            val (sx, sy) = attackerTroopSlots[slotIdx++]
            result.add(TacticalRules.createTroopUnit(battleId, TacticalUnitType.MAGE, attackerChar.army.mages, attackerChar.army, attackerPlayerId, attackerTeam, sx, sy))
        }

        // 3. Defender Hero
        result.add(
            TacticalRules.createHeroUnit(
                battleId = battleId,
                char = defenderChar,
                playerId = defenderPlayerId,
                team = defenderTeam,
                spawnX = 9,
                spawnY = 3
            )
        )

        // 4. Defender Troops
        val defenderTroopSlots = listOf(9 to 2, 9 to 4, 8 to 2, 8 to 4)
        slotIdx = 0
        if (defenderChar.army.heavyInfantry > 0 && slotIdx < defenderTroopSlots.size) {
            val (sx, sy) = defenderTroopSlots[slotIdx++]
            result.add(TacticalRules.createTroopUnit(battleId, TacticalUnitType.HEAVY_INFANTRY, defenderChar.army.heavyInfantry, defenderChar.army, defenderPlayerId, defenderTeam, sx, sy))
        }
        if (defenderChar.army.lightInfantry > 0 && slotIdx < defenderTroopSlots.size) {
            val (sx, sy) = defenderTroopSlots[slotIdx++]
            result.add(TacticalRules.createTroopUnit(battleId, TacticalUnitType.LIGHT_INFANTRY, defenderChar.army.lightInfantry, defenderChar.army, defenderPlayerId, defenderTeam, sx, sy))
        }
        if (defenderChar.army.archers > 0 && slotIdx < defenderTroopSlots.size) {
            val (sx, sy) = defenderTroopSlots[slotIdx++]
            result.add(TacticalRules.createTroopUnit(battleId, TacticalUnitType.ARCHER, defenderChar.army.archers, defenderChar.army, defenderPlayerId, defenderTeam, sx, sy))
        }
        if (defenderChar.army.mages > 0 && slotIdx < defenderTroopSlots.size) {
            val (sx, sy) = defenderTroopSlots[slotIdx++]
            result.add(TacticalRules.createTroopUnit(battleId, TacticalUnitType.MAGE, defenderChar.army.mages, defenderChar.army, defenderPlayerId, defenderTeam, sx, sy))
        }

        return result
    }
}
