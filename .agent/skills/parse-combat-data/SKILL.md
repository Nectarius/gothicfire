---
name: parse-combat-data
description: Use this skill when collecting, updating, extracting, or re-scanning tactical combat data, unit stats, combat balance values, weapon ranges, damage formulas, prevalence bonuses, or battle rules. Trigger on "re-scan combat data", "parse combat file", "update battle stats", "check unit stats", "what is the damage formula", "how does prevalence bonus work", or "lookup figurine attributes".
---

# Parse Combat Data

## Purpose
Collects and extracts tactical and strategic combat data strictly from the dedicated combat models and balance logic files without rescanning or indexing the rest of the repository.

## Strict Scope Rules

### Target File Paths
- **Primary Source (Tactical)**: `src/commonMain/kotlin/models/TacticalCombatModels.kt` (480 lines)
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
| **L51–L83** | Base Stat Tables | `baseHp` (Hero: 28-36, Troop: 5-9), `baseAttack` (5-8), `baseDefense` (2-6) |
| **L96–L140** | Data Classes | `TacticalUnit` (HP, ATK, DEF, moves, initialSquadCount, isPrevalentUnit), `TacticalBattleState` (10x8 grid, turn phases) |
| **L144–L153**| Hero Derivation | `TacticalRules.deriveHeroArchetype(char)`: Warlord -> Warrior, Vanguard -> Archer, Archon/Intellect -> Mage |
| **L155–L180**| Prevalence Bonus | `calculatePrevalenceMultiplier`: Single dominant troop type = **+25% ATK & DEF** (`1.25`); tied = **+15%** (`1.15`) |
| **L182–L284**| Unit Factories | `createHeroUnit`: Scaled by character stats; `createTroopUnit`: Headcount scaling (`rawAtk = baseAtk + (count * 0.5)`) |
| **L286–L315**| Squad Casualty Map | `calculateSurvivingCount`: `ceil(initial * (currentHp / maxHp))`; `mapSurvivingArmy` maps back to `Army` |
| **L318–L377**| Grid Pathfinding | `findValidMoves` (BFS with 4-directional moves and obstacle blocking), `isLineOfSightClear` (Raycast) |
| **L380–L420**| Attack Matrix | `canAttackTarget`: Melee = Chebyshev 1; Archer Hero = Orthogonal 1..2; Mage = 1..3 LoS-bypass; Regular Archer = Diag/Vert 1..2 |
| **L422–L480**| Damage Calculation | `calculateDamage`: `damage = max(1, effectiveAtk - (effectiveDef / 2))`. Strategy buffs: `ARCANE_PHALANX`, `HAMMER_AND_SPELL`, `SPELL_INFUSED_VOLLEY` |

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
