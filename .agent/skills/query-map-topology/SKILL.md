---
name: query-map-topology
description: Use this skill when querying world map sectors, territory connections, sector coordinates, castle locations, fog-of-war rules, adjacent movements, or tactical grid biome generation. Trigger on "query map sector", "is sector adjacent", "check castle sectors", "fog of war rules", "how does terrain biome generate", "find sector connections", or "lookup map data".
---

# Query Map Topology

## Purpose
Inspects world map geography, sector adjacencies, castle stronghold IDs, fog-of-war visibility, and tactical arena biome generation strictly from dedicated topology files without traversing frontend renderers or loose JSON assets.

## Strict Scope Rules

### Target File Paths
- **Map Graph & Territories**: `src/commonMain/kotlin/models/MapData.kt` (71 lines)
- **Visibility & Adjacency Logic**: `src/commonMain/kotlin/models/GridUtils.kt` (59 lines)
- **Tactical Biome & Grid Generator**: `src/commonMain/kotlin/models/TacticalMapGenerator.kt` (260 lines)

### Bypassed Areas (Do NOT Touch)
- Do **NOT** scan frontend UI components (`src/jsMain/kotlin/components/StrategicMap.kt`, `TerritoryCard.kt`).
- Do **NOT** read loose or stale top-level JSON dumps (`map_data.json`, `map_data_new.json`, `location_info.json`).
- Do **NOT** read image assets (`*.png`, `*.jpg`).
- Adjacencies must only be validated through `MapData[id].adjacentIds` or `isAdjacentSector()`.

---

## Quick-Reference Schema & Section Map

### `src/commonMain/kotlin/models/MapData.kt`
- **Territory Data Class (L3–L12)**:
  `data class Territory(val id: String, val x: Int, val y: Int, val adjacentIds: List<String>, val isCastle: Boolean = false, val name: String, val protection: Int = 10, val cultivation: Int = 10)`
- **Map Graph (L14–L70)**: 54 sectors indexed by String `"0"` to `"53"`.
- **Key Stronghold / Castle Sectors (`isCastle = true`)**:
  - Sector **`7`**: Monastery of Innos (Prot: 20, Cult: 14)
  - Sector **`14`**: City of Khorinis (Prot: 20, Cult: 14)
  - Sector **`23`**: Onar's Farm (Prot: 20, Cult: 14)
  - Sector **`52`**: Old Camp Fortress (Prot: 20, Cult: 14)

### `src/commonMain/kotlin/models/GridUtils.kt`
- **Adjacency Validation (L3–L7)**: `isAdjacentSector(from: String, to: String): Boolean` checks bidirectional linkage.
- **Fog-of-War Visibility Rules (L9–L58)**:
  1. Status is `LOBBY` or `GAME_OVER` -> All characters visible.
  2. Character on player's team -> Always visible.
  3. Character is in any Castle (`targetTerritory.isCastle || teamCastles.containsValue(sector)`) -> Always visible.
  4. Scout rule -> Visible if any living allied character is in the same or adjacent sector (`allySector == targetSector || isAdjacentSector(allySector, targetSector)`).

### `src/commonMain/kotlin/models/TacticalMapGenerator.kt`
- **Grid Dimensions**: `GRID_WIDTH = 10`, `GRID_HEIGHT = 8`.
- **Biomes (L10–L25)**: `FOREST`, `RIVER`, `CANYON`, `FORTRESS`, `SWAMP`, `CAVE`, `PLAIN`.
- **Biome Detection (L27–L50)**:
  - Castle sectors (`7`, `14`, `23`, `52`) -> `FORTRESS`
  - Sector names containing River / Bridge -> `RIVER`
  - Sector names containing Gorge / Canyon / Rock / Cliff -> `CANYON`
  - Sector names containing Forest / Woods / Grove -> `FOREST`
  - Sector names containing Swamp / Marsh -> `SWAMP`
  - Sector names containing Cave / Crypt / Mine -> `CAVE`
  - Default -> `PLAIN`

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
- **Range**: Lines 17 to 58
- **Fast CLI Command**:
  ```bash
  sed -n '17,58p' src/commonMain/kotlin/models/GridUtils.kt
  ```

### 4. Check Biome Generation & Backdrop Assets
- **File**: `src/commonMain/kotlin/models/TacticalMapGenerator.kt`
- **Range**: Lines 20 to 55
- **Fast CLI Command**:
  ```bash
  sed -n '20,55p' src/commonMain/kotlin/models/TacticalMapGenerator.kt
  ```
