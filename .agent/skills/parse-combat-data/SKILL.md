---
name: parse-combat-data
description: Use this skill when collecting, updating, extracting, or re-scanning tactical combat data, unit stats, combat balance values, weapon ranges, damage formulas, prevalence bonuses, or battle rules. Trigger on "re-scan combat data", "parse combat file", "update battle stats", "check unit stats", "what is the damage formula", "how does prevalence bonus work", or "lookup figurine attributes".
---

# Parse Combat Data

## Purpose
Collects and extracts tactical and strategic combat data strictly from the dedicated combat models and balance logic files without rescanning or indexing the rest of the repository.

## Strict Scope Rules

### Target File Paths
- **Balance Configuration**: `tactical_balance.json` (repository root only; no duplicate in `src/*/resources/`) & `src/commonMain/kotlin/models/TacticalBalance.kt` (341 lines)
- **Balance Loader**: `src/jvmMain/kotlin/config/TacticalBalanceLoader.kt` (55 lines — loads `TACTICAL_BALANCE_PATH`, working dir `tactical_balance.json`, `/tactical_balance.json` classpath resource, or built-in defaults)
- **Primary Source (Tactical Rules & Logic)**: `src/commonMain/kotlin/models/TacticalCombatModels.kt` (554 lines)
- **Tactical Grid Bot AI**: `src/jvmMain/kotlin/game/TacticalAiService.kt` (239 lines — heuristic AI for 10x8 tactical combat)
- **Secondary Source (Strategic)**: `src/commonMain/kotlin/models/FightLogic.kt` (195 lines)
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
| **L27–L65** | `TacticalUnitType` & Properties | `WARRIOR_HERO`, `ARCHER_HERO`, `MAGE_HERO`, `ARCHER`, `HEAVY_INFANTRY`, `LIGHT_INFANTRY`, `MAGE`, `defaultMoves`, `baseHp`, `baseAttack`, `baseDefense`, `weaponDefense`, `arrowDefense`, `magicDefense`, `damageType` |
| **L67–L132** | Data Classes | `UnitFacing` (`NORTH`/`SOUTH`/`EAST`/`WEST`), `TacticalAttackAngle`, `TacticalUnit`, `TacticalBattleState` |
| **L136–L145**| Hero Derivation | `TacticalRules.deriveHeroArchetype(char)`: Warlord -> Warrior, Vanguard -> Archer, Archon + (Intellect/2) -> Mage |
| **L153–L301**| Prevalence & Unit Factories | `calculatePrevalenceMultiplier`, `createHeroUnit` (stat-scaled HP/ATK/defenses), `createTroopUnit` (headcount and prevalence scaling) |
| **L307–L333**| Squad Casualty Map | `calculateSurvivingCount`: `ceil(initial * (currentHp / maxHp))`; `mapSurvivingArmy` maps back to `Army` |
| **L338–L395**| Grid Pathfinding & LoS | `findValidMoves` (BFS with 4-directional moves and obstacle blocking), `isLineOfSightClear` (Raycast) |
| **L400–L432**| Attack Matrix | `canAttackTarget`: Pattern matching (`MELEE`/`ADJACENT`, `ORTHOGONAL`, `DIAGONAL_OR_VERTICAL`, `ANY_DIRECTION`) and range/LoS checks from balance config |
| **L437–L553**| Damage Calculation | `determineAttackAngle`: `FRONT` (1.0x), `FLANK` (1.5x), `REAR` (2.0x). `calculateDamage`: `baseDamage = max(1, effectiveAtk - (effectiveDef / 2))`, `damageWithBonus = (baseDamage * angleMultiplier).roundToInt()`. Includes strategy buffs (`ARCANE_PHALANX`, `HAMMER_AND_SPELL`, `SPELL_INFUSED_VOLLEY`), **Troop Bodyguard Aura** (`L528–L534`: `+bodyguardDefenseBonus` when Hero has living allied troops), and **Armor Bypass** (`L537–L539`: caps `effectiveDef` at `mageBypassDefenseCap` when `bypassesArmor && MAGIC && magicDefense == defense`) |

### `src/commonMain/kotlin/models/FightLogic.kt`
| Line Range | Component | Key Identifiers / Description |
| :--- | :--- | :--- |
| **L9–L14** | `effectiveProtection` | Diminishing returns (`raw * 0.1` for `< 20`; `ln(1.0 + raw / 8.0) * 8.0`, max `25.0` for `>= 20`) |
| **L27–L58** | Strategic Scores | `calculateArmyCombatScore`, `calculateStatBonus` (Warlord, Archon, Vanguard, Intellect scaling) |
| **L79–L195**| Strategic Resolution | `resolveFight` (4x overwhelming check, strategy/siege negation, d20 rolls, casualty ratios), `calculateFightResult`, `estimateWinChance` |

---

## Fast Query Patterns

### 1. Lookup Base Unit Stats & Move Limits
- **File**: `src/commonMain/kotlin/models/TacticalBalance.kt` (or `tactical_balance.json`)
- **Range**: Lines 76 to 267 (`DefaultTacticalBalanceConfig`)
- **Fast CLI Command**:
  ```bash
  sed -n '76,267p' src/commonMain/kotlin/models/TacticalBalance.kt
  ```

### 2. Lookup Tactical Damage Formula, Bodyguard Aura & Strategy Buffs
- **File**: `src/commonMain/kotlin/models/TacticalCombatModels.kt`
- **Range**: Lines 463 to 553
- **Fast CLI Command**:
  ```bash
  sed -n '463,553p' src/commonMain/kotlin/models/TacticalCombatModels.kt
  ```

### 3. Lookup Attack Range & Line-of-Sight Matrix
- **File**: `src/commonMain/kotlin/models/TacticalCombatModels.kt`
- **Range**: Lines 381 to 432
- **Fast CLI Command**:
  ```bash
  sed -n '381,432p' src/commonMain/kotlin/models/TacticalCombatModels.kt
  ```

### 4. Lookup Strategic Army Scoring & Hero Stat Synergy
- **File**: `src/commonMain/kotlin/models/FightLogic.kt`
- **Range**: Lines 27 to 58
- **Fast CLI Command**:
  ```bash
  sed -n '27,58p' src/commonMain/kotlin/models/FightLogic.kt
  ```
