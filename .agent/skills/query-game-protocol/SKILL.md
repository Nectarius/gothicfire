---
name: query-game-protocol
description: Use this skill when looking up WebSocket game actions, server event payloads, client-server communication contracts, action parameters, or network message serialization. Trigger on "check game action", "query websocket message", "inspect game event", "client server protocol", "what does server broadcast on", "show game action schema", or "lookup network message".
---

# Query Game Protocol

## Purpose
Inspects client-to-server (`GameAction`) and server-to-client (`GameEvent`) WebSocket schemas and routing dispatch mechanisms strictly from the single source-of-truth protocol file without scanning frontend views or backend session logic.

## Strict Scope Rules

### Target File Paths
- **Protocol Schema (Single Source of Truth)**: `src/commonMain/kotlin/models/GameMessages.kt` (250 lines)
- **Ktor WebSocket Dispatcher**: `src/jvmMain/kotlin/game/GameSocketRoute.kt` (127 lines)

### Bypassed Areas (Do NOT Touch)
- Do **NOT** search the ~2,300 lines of `src/jvmMain/kotlin/game/GameSession.kt` to deduce message signatures.
- Do **NOT** scan frontend components (`App.kt`, `StrategicMap.kt`, `TacticalBattleModal.kt`).
- Do **NOT** scan `src/jsMain/kotlin/game/GameWebSocket.kt` unless debugging client-side socket connection handling.

---

## Quick-Reference Schema & Section Map

### `src/commonMain/kotlin/models/GameMessages.kt`

#### 1. `sealed class GameAction` (Client -> Server)
| Line Range | Category | Action Variants & Parameters |
| :--- | :--- | :--- |
| **L7–L45** | Lobby & Setup | `CreateGame(playerName, gameName)`<br>`CancelGame(playerName)`<br>`CreateTeam(team, name, color, playerName)`<br>`JoinTeam(team, playerName)`<br>`StartPvEGame(playerName, gameName, allowSecondPlayer, playerTeam, playerTeamColor, playerTeamName, chosenHeroes, chosenCastle, chosenAdvisor)`<br>`JoinPvEGame(playerName, chosenHeroes)`<br>`CreateCharacter(name, warlord, intellect, vanguard, archon)`<br>`SelectCharacters(templateIds)`<br>`ToggleReady`, `StartGame` |
| **L47–L81** | Strategic Map & Economy | `PlaceCharacter(targetSector, characterId?, strategy)`<br>`MoveCharacter(targetSector, characterId?, strategy)`<br>`SelectCastleAndReady(castleId)`<br>`UpgradeTerritory(sectorId, upgradeType, characterId?)`<br>`CollectResources(sectorId, characterId?)`<br>`RecruitArmy(count, characterId?, unitType)`<br>`SearchScroll(targetSector, characterId?)`, `UseScroll(scrollId, characterId?)`<br>`BuySiegeWeapon(characterId?)`<br>`TransferResources(fromCharId, toCharId, food, gold)`<br>`MarketTrade(characterId, buyFood, goldAmount)`<br>`SkipTurn(characterId)` |
| **L83–L120**| Sub-Locations & Advisors | `AskAdvisor(questionType)` (`STATUS`, `NEXT_MOVE`, `STRATEGY`), `SelectAdvisor(advisorId)`<br>`ConsultCastleLord(sectorId, characterId)`<br>`TalkToTavernPatron(sectorId, characterId, patronId)`<br>`PitchHuntingCamp(characterId)`, `DismantleHuntingCamp(characterId)`<br>`HarvestHide(characterId, hideType)`, `SellHide(characterId, hideType)`<br>`AskHunterAboutHide(sectorId, characterId, patronId, hideType)` |
| **L122–L153**| Tactical Combat & Session | `TacticalMoveUnit(battleId, unitId, targetX, targetY)`<br>`TacticalAttackUnit(battleId, attackerUnitId, targetUnitId)`<br>`TacticalEndUnitTurn(battleId)`, `TacticalRetreat(battleId)`<br>`TacticalAutoResolve(battleId)`, `TacticalAcknowledgeResult(battleId)`<br>`EndGame`, `LeaveGame` |

#### 2. `sealed class GameEvent` (Server -> Client Broadcasts)
| Line Range | Event Variant | Key Payload Fields |
| :--- | :--- | :--- |
| **L158–L165** | State & Lifecycle | `GameStateUpdated(gameState, yourPlayerId)`<br>`WaitingForOpponent(message)`<br>`Error(message)` |
| **L167–L175** | `AdvisorAdviceReceived` | `advisorId`, `advisorName`, `questionType`, `advice`, `keyPoints`, `timestamp` |
| **L177–L197** | Combat, Scrolls & World | `FightOccurred(sectorId, winnerId, loserId, winnerLosses, loserLosses, strategy)`<br>`ScrollFound(characterId, characterName, scroll)`<br>`ScrollSearchFailed(characterId, characterName, sectorId)`<br>`NatureEventOccurred(sectorId, eventType)`<br>`ResourceTransferred(fromCharId, toCharId, fromSectorId, toSectorId, food, gold)` |
| **L199–L240** | Castles, Tavern & Hunting | `CastleDialogueReceived(lordId, lordName, sectorId, speech, keyPoints, timestamp)`<br>`TavernDialogueReceived(patronId, patronName, greeting, responseText, timestamp)`<br>`HideHarvested(characterId, characterName, sectorId, hideType)`<br>`HideSold(characterId, hideType, price)`<br>`HunterIntelReceived(patronId, patronName, hideType, grounds, timestamp)` |
| **L242–L249** | `TacticalBattleStarted`<br>`TacticalStateUpdated`<br>`TacticalBattleEnded` | `battleState: TacticalBattleState`, `lastActionLog: String`<br>`winnerPlayerId: String` |

---

## Fast Query Patterns

### 1. View All Client Actions (`GameAction`)
- **File**: `src/commonMain/kotlin/models/GameMessages.kt`
- **Range**: Lines 5 to 154
- **Fast CLI Command**:
  ```bash
  sed -n '5,154p' src/commonMain/kotlin/models/GameMessages.kt
  ```

### 2. View All Server Events (`GameEvent`)
- **File**: `src/commonMain/kotlin/models/GameMessages.kt`
- **Range**: Lines 156 to 250
- **Fast CLI Command**:
  ```bash
  sed -n '156,250p' src/commonMain/kotlin/models/GameMessages.kt
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
