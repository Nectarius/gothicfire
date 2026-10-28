---
name: parse-combat-data
description: Use this skill when collecting, updating, extracting, or re-scanning tactical combat data, unit stats, combat balance values, weapon ranges, damage formulas, prevalence bonuses, or battle rules. Trigger on "re-scan combat data", "parse combat file", "update battle stats", "check unit stats", "what is the damage formula", "how does prevalence bonus work", or "lookup figurine attributes".
---

# Parse Combat Data

## Purpose
Collects and extracts tactical and strategic combat data strictly from the dedicated combat models and balance logic files without rescanning or indexing the rest of the repository.

## Strict Scope Rules

### Target File Paths
- **Balance Configuration**: `tactical_balance.json` (root and resources) & `src/commonMain/kotlin/models/TacticalBalance.kt`
- **Primary Source (Tactical Rules & Logic)**: `src/commonMain/kotlin/models/TacticalCombatModels.kt`
- **Secondary Source (Strategic)**: `src/commonMain/kotlin/models/FightLogic.kt` (196 lines)
- **Output / Benchmark Suite**: `agent/eval_sets/tactical_suite.json` (optional)

### Bypassed Areas (Do NOT Touch)
- Do **NOT** scan `src/jsMain/` or frontend components (`TacticalBattleModal.kt`, `StrategicMap.kt`).
- Do **NOT** scan server lifecycle or networking code (`src/jvmMain/kotlin/game/GameSession.kt`, `GameSocketRoute.kt`).
- Do **NOT** run repository-wide ripgrep or file search for combat terms.
- Refuse to infer balance numbers from test cases or CSS styles.

---

## Quick-Reference Schema & Section Map

### `src/commonMain/kotlin/models/TacticalCombatModels.kt`
| Line Range | Component | Key Identifiers / Description |
| :--- | :--- | :--- |
| **L10–L25** | `TacticalTileType` | `PLAIN`, `FOREST`, `RIVER`, `BRIDGE`, `CLIFF_ROCK`, `FORTRESS_WALL`, `FORTRESS_GATE`, `isTraversable`, `blocksLineOfSight` |
| **L27–L50** | `TacticalUnitType` | `WARRIOR_HERO`, `ARCHER_HERO`, `MAGE_HERO`, `ARCHER`, `HEAVY_INFANTRY`, `LIGHT_INFANTRY`, `MAGE`, `defaultMoves` |
| **L51–L83** | Base Stat Tables | `baseHp`, `baseAttack`, `baseDefense`, `weaponDefense`, `arrowDefense`, `magicDefense`, `damageType` |
| **L68–L116** | Data Classes | `TacticalUnit` (HP, ATK, DEF, weaponDefense, arrowDefense, magicDefense, damageType, moves, facing: `NORTH`/`SOUTH`/`EAST`/`WEST`), `TacticalBattleState` |
| **L120–L158**| Hero Derivation | `TacticalRules.deriveHeroArchetype(char)`: Warlord -> Warrior, Vanguard -> Archer, Archon/Intellect -> Mage |
| **L160–L220**| Unit Factories | `createHeroUnit`: Scaled with character stats across weapon/arrow/magic defenses; `createTroopUnit`: Headcount and prevalence scaling |
| **L281–L310**| Squad Casualty Map | `calculateSurvivingCount`: `ceil(initial * (currentHp / maxHp))`; `mapSurvivingArmy` maps back to `Army` |
| **L315–L373**| Grid Pathfinding | `findValidMoves` (BFS with 4-directional moves and obstacle blocking), `isLineOfSightClear` (Raycast) |
| **L375–L410**| Attack Matrix | `canAttackTarget`: Pattern matching (`MELEE`, `ORTHOGONAL`, `DIAGONAL_OR_VERTICAL`, `ANY_DIRECTION`) from balance config |
| **L415–L520**| Damage Calculation | `determineAttackAngle`: `FRONT` (1.0x), `FLANK` (+50% bonus / 1.5x), `REAR` (double bonus / 2.0x). `calculateDamage`: `damage = max(1, (effectiveAtk - (effectiveDef / 2)) * angleMultiplier)`. Strategy buffs: `ARCANE_PHALANX`, `HAMMER_AND_SPELL`, `SPELL_INFUSED_VOLLEY` |

### `src/commonMain/kotlin/models/FightLogic.kt`
| Line Range | Component | Key Identifiers / Description |
| :--- | :--- | :--- |
| **L9–L14** | `effectiveProtection` | Diminishing returns: `ln(1.0 + raw / 8.0) * 8.0`, max effective = 25.0 |
| **L27–L58** | Strategic Scores | `calculateArmyCombatScore`, `calculateStatBonus` (Warlord, Archon, Vanguard, Intellect scaling) |
| **L60–L196**| `calculateFight` | Full automated strategic fight resolver, casualty calculation, and strategy modifiers |

---

## Fast Query Patterns

### 1. Lookup Base Unit Stats & Move Limits
- **File**: `src/commonMain/kotlin/models/TacticalCombatModels.kt`
- **Range**: Lines 40 to 83
- **Fast CLI Command**:
  ```bash
  sed -n '40,84p' src/commonMain/kotlin/models/TacticalCombatModels.kt
  ```

### 2. Lookup Tactical Damage Formula & Strategy Buffs
- **File**: `src/commonMain/kotlin/models/TacticalCombatModels.kt`
- **Range**: Lines 425 to 475
- **Fast CLI Command**:
  ```bash
  sed -n '425,475p' src/commonMain/kotlin/models/TacticalCombatModels.kt
  ```

### 3. Lookup Attack Range & Line-of-Sight Matrix
- **File**: `src/commonMain/kotlin/models/TacticalCombatModels.kt`
- **Range**: Lines 380 to 420
- **Fast CLI Command**:
  ```bash
  sed -n '380,420p' src/commonMain/kotlin/models/TacticalCombatModels.kt
  ```

### 4. Lookup Strategic Army Scoring & Hero Stat Synergy
- **File**: `src/commonMain/kotlin/models/FightLogic.kt`
- **Range**: Lines 27 to 58
- **Fast CLI Command**:
  ```bash
  sed -n '27,58p' src/commonMain/kotlin/models/FightLogic.kt
  ```
