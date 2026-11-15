---
name: query-map-topology
description: Use this skill when querying world map sectors, territory connections, sector coordinates, castle locations, fog-of-war rules, adjacent movements, or tactical grid biome generation. Trigger on "query map sector", "is sector adjacent", "check castle sectors", "fog of war rules", "how does terrain biome generate", "find sector connections", or "lookup map data".
---

# Query Map Topology

## Purpose
Inspects world map geography, sector adjacencies, castle stronghold IDs, fog-of-war visibility, and tactical arena biome generation strictly from dedicated topology files without traversing frontend renderers or loose JSON assets.

## Strict Scope Rules

### Target File Paths
- **Map Graph & Territories**: `src/commonMain/kotlin/models/MapData.kt` (70 lines)
- **Visibility & Adjacency Logic**: `src/commonMain/kotlin/models/GridUtils.kt` (81 lines)
- **Tactical Biome & Grid Generator**: `src/commonMain/kotlin/models/TacticalMapGenerator.kt` (267 lines)

### Bypassed Areas (Do NOT Touch)
- Do **NOT** scan frontend UI components (`src/jsMain/kotlin/components/StrategicMap.kt`, `TerritoryCard.kt`).
- Do **NOT** read loose or stale top-level JSON dumps (`map_data.json`, `map_data_new.json`, `location_info.json`).
- Do **NOT** read image assets (`*.png`, `*.jpg`).
- Adjacencies must only be validated through `MapData[id]?.adjacentIds` or `isAdjacentSector()`.

---

## Quick-Reference Schema & Section Map

### `src/commonMain/kotlin/models/MapData.kt`
- **Territory Data Class (L3–L12)**:
  `data class Territory(val id: String, val x: Int, val y: Int, val adjacentIds: List<String>, val isCastle: Boolean = false, val name: String? = null, val protection: Int = if (isCastle) 20 else 5, val cultivation: Int = if (isCastle) 14 else 10)`
- **Map Graph (L14–L70)**: 55 sectors indexed by String `"0"` to `"54"`.
- **Key Stronghold / Castle Sectors (`isCastle = true`)**:
  - Sector **`7`**: Monastery of Innos (Prot: 20, Cult: 14)
  - Sector **`14`**: City of Khorinis (Prot: 20, Cult: 14)
  - Sector **`23`**: Onar's Farm (Prot: 20, Cult: 14)
  - Sector **`52`**: Fortress of the Pass (Prot: 20, Cult: 14)

### `src/commonMain/kotlin/models/GridUtils.kt`
- **Adjacency Validation (L3–L7)**: `isAdjacentSector(from: String, to: String): Boolean` checks bidirectional linkage.
- **Shortest Path Distance (L14–L30)**: `getSectorDistance(from: String, to: String): Int` computes BFS shortest path in strategic sector moves (`0` if same, `Int.MAX_VALUE` if unreachable).
- **Fog-of-War Visibility Rules (L40–L80)**:
  1. Status is `LOBBY` or `GAME_OVER` -> All characters visible.
  2. Character on player's team -> Always visible.
  3. Character is in any Castle (`targetTerritory?.isCastle == true || gameState.teamCastles.containsValue(targetSector)`) -> Always visible.
  4. Scout rule -> Visible if any living allied character is in the same or adjacent sector (`allySector == targetSector || isAdjacentSector(allySector, targetSector)`).

### `src/commonMain/kotlin/models/TacticalMapGenerator.kt`
- **Grid Dimensions**: `GRID_WIDTH = 10`, `GRID_HEIGHT = 8`.
- **Biomes (L5–L20)**: `FOREST`, `RIVER`, `CANYON`, `FORTRESS`, `PLAINS`.
- **Biome Detection (L29–L77)**: Uses both `MapData[sectorId]` and `LocationInfoCatalog[sectorId]` (`name`, `title`, `region`, `description`):
  - Castle sectors (`isCastle == true`) or gate/barricade/hideout/citadel/monastery keywords -> `FORTRESS`
  - Sector names/titles containing mountains / gorge / canyon / crags / defile / pass / tunnel -> `CANYON`
  - Sector names/titles containing bridge / waterfall / lake / coast / cove / beach / harbor -> `RIVER`
  - Sector names/titles/region/desc containing forest / woods / grove / hollow / grimwald -> `FOREST`
  - Additional lore (`region` / `desc`) fallbacks for `RIVER`, `CANYON`, `FORTRESS`, otherwise default -> `PLAINS`

---

## Fast Query Patterns

### 1. Check Adjacencies and Stats for a Specific Sector
- **File**: `src/commonMain/kotlin/models/MapData.kt`
- **Fast CLI Command**:
  ```bash
  grep -E '"<SECTOR_ID>" to Territory' src/commonMain/kotlin/models/MapData.kt
  ```
  *Example (`Sector 14`)*:
  ```bash
  grep -E '"14" to Territory' src/commonMain/kotlin/models/MapData.kt
  # Output: "14" to Territory("14", 150, 448, listOf("11", "25", "26"), isCastle = true, name = "City of Khorinis", protection = 20, cultivation = 14)
  ```

### 2. Verify Castle Strongholds in the Game
- **File**: `src/commonMain/kotlin/models/MapData.kt`
- **Fast CLI Command**:
  ```bash
  grep "isCastle = true" src/commonMain/kotlin/models/MapData.kt
  ```

### 3. Check Visibility / Fog-of-War Rules
- **File**: `src/commonMain/kotlin/models/GridUtils.kt`
- **Range**: Lines 32 to 80
- **Fast CLI Command**:
  ```bash
  sed -n '32,80p' src/commonMain/kotlin/models/GridUtils.kt
  ```

### 4. Check Biome Generation & Backdrop Assets
- **File**: `src/commonMain/kotlin/models/TacticalMapGenerator.kt`
- **Range**: Lines 5 to 77
- **Fast CLI Command**:
  ```bash
  sed -n '5,77p' src/commonMain/kotlin/models/TacticalMapGenerator.kt
  ```
