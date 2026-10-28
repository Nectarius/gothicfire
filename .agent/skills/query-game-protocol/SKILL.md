---
name: query-game-protocol
description: Use this skill when looking up WebSocket game actions, server event payloads, client-server communication contracts, action parameters, or network message serialization. Trigger on "check game action", "query websocket message", "inspect game event", "client server protocol", "what does server broadcast on", "show game action schema", or "lookup network message".
---

# Query Game Protocol

## Purpose
Inspects client-to-server (`GameAction`) and server-to-client (`GameEvent`) WebSocket schemas and routing dispatch mechanisms strictly from the single source-of-truth protocol file without scanning frontend views or backend session logic.

## Strict Scope Rules

### Target File Paths
- **Protocol Schema (Single Source of Truth)**: `src/commonMain/kotlin/models/GameMessages.kt` (248 lines)
- **Ktor WebSocket Dispatcher**: `src/jvmMain/kotlin/game/GameSocketRoute.kt` (135 lines)

### Bypassed Areas (Do NOT Touch)
- Do **NOT** search the 2,200 lines of `src/jvmMain/kotlin/game/GameSession.kt` to deduce message signatures.
- Do **NOT** scan frontend components (`App.kt`, `StrategicMap.kt`, `TacticalBattleModal.kt`).
- Do **NOT** scan `src/jsMain/kotlin/game/GameWebSocket.kt` unless debugging client-side socket connection handling.

---

## Quick-Reference Schema & Section Map

### `src/commonMain/kotlin/models/GameMessages.kt`

#### 1. `sealed class GameAction` (Client -> Server)
| Line Range | Category | Action Variants & Parameters |
| :--- | :--- | :--- |
| **L8–L46** | Lobby & Setup | `CreateGame(playerName, gameName)`<br>`StartPvEGame(playerName, gameName, allowSecondPlayer, playerTeam, playerTeamColor, playerTeamName, chosenHeroes, chosenCastle, chosenAdvisor)`<br>`CreateCharacter(name, warlord, intellect, vanguard, archon)`<br>`SelectCastleAndReady(castleId)`<br>`ToggleReady`, `StartGame`, `LeaveGame` |
| **L48–L82** | Strategic Map | `PlaceCharacter(targetSector, characterId?, strategy)`<br>`MoveCharacter(targetSector, characterId?, strategy)`<br>`UpgradeTerritory(sectorId, upgradeType, characterId?)`<br>`RecruitArmy(count, characterId?, unitType)`<br>`TransferResources(fromCharId, toCharId, food, gold)`<br>`MarketTrade(characterId, buyFood, goldAmount)` |
| **L84–L121**| Sub-Locations & Advisors | `AskAdvisor(questionType)` (`STATUS`, `NEXT_MOVE`, `STRATEGY`)<br>`ConsultCastleLord(sectorId, characterId)`<br>`TalkToTavernPatron(sectorId, characterId, patronId)`<br>`PitchHuntingCamp(characterId)`, `HarvestHide(characterId, hideType)`<br>`SellHide(characterId, hideType)` |
| **L123–L145**| Tactical Combat | `TacticalMoveUnit(battleId, unitId, targetX, targetY)`<br>`TacticalAttackUnit(battleId, attackerUnitId, targetUnitId)`<br>`TacticalEndUnitTurn(battleId)`<br>`TacticalRetreat(battleId)`<br>`TacticalAutoResolve(battleId)` |

#### 2. `sealed class GameEvent` (Server -> Client Broadcasts)
| Line Range | Event Variant | Key Payload Fields |
| :--- | :--- | :--- |
| **L156–L163** | `GameStateUpdated` | `gameState: GameState`, `yourPlayerId: String` |
| **L165–L173** | `AdvisorAdviceReceived` | `advisorId`, `advisorName`, `questionType`, `advice`, `keyPoints` |
| **L175–L186** | `FightOccurred` | `sectorId`, `winnerId`, `loserId`, `winnerLosses`, `loserLosses`, `strategy` |
| **L215–L230** | Lore Events | `CastleDialogueReceived(sectorId, lordId, dialogue, standing)`<br>`TavernDialogueReceived(sectorId, patronId, dialogue, bountyGiver)` |
| **L232–L246** | `TacticalBattleStarted`<br>`TacticalStateUpdated`<br>`TacticalBattleEnded` | `battleState: TacticalBattleState`, `log: String`<br>`winnerPlayerId: String` |

---

## Fast Query Patterns

### 1. View All Client Actions (`GameAction`)
- **File**: `src/commonMain/kotlin/models/GameMessages.kt`
- **Range**: Lines 6 to 152
- **Fast CLI Command**:
  ```bash
  sed -n '6,152p' src/commonMain/kotlin/models/GameMessages.kt
  ```

### 2. View All Server Events (`GameEvent`)
- **File**: `src/commonMain/kotlin/models/GameMessages.kt`
- **Range**: Lines 154 to 248
- **Fast CLI Command**:
  ```bash
  sed -n '154,248p' src/commonMain/kotlin/models/GameMessages.kt
  ```

### 3. Check WebSocket Action Route Handling
- **File**: `src/jvmMain/kotlin/game/GameSocketRoute.kt`
- **Fast CLI Command**:
  ```bash
  grep -A 2 "is GameAction.<ACTION_NAME>" src/jvmMain/kotlin/game/GameSocketRoute.kt
  ```
  *Example (`TacticalMoveUnit`)*:
  ```bash
  grep -A 2 "is GameAction.TacticalMoveUnit" src/jvmMain/kotlin/game/GameSocketRoute.kt
  # Output: is GameAction.TacticalMoveUnit -> game.tacticalMoveUnit(playerId, action.battleId, action.unitId, action.targetX, action.targetY)
  ```
