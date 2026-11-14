---
name: ui-and-i18n
description: >-
  Use this skill when adding or modifying Kilua JS frontend components, modals,
  HUD panels, WebSocket UI handlers, or localized strings in Gothic Fire.
  Covers src/jsMain/kotlin/ and the 3-locale i18n contract (en, el, ru).
---

# UI & Localization (Kilua JS + i18n)

## Target File Paths
- **App Entry & Root State**: `src/jsMain/kotlin/App.kt`
- **WebSocket Client Bridge**: `src/jsMain/kotlin/game/GameWebSocket.kt`
- **UI Components & Modals**: `src/jsMain/kotlin/components/` (e.g., `TurnHud.kt`, `StrategicMap.kt`, `TacticalBattleModal.kt`, `AdvisorModal.kt`, `CastleDialogueModal.kt`, `TerritoryCard.kt`)
- **i18n Engine & Fallback Map**: `src/jsMain/kotlin/i18n/I18n.kt` (`Language.EN`, `Language.EL`, `Language.RU`, `fallbackEn`)
- **Locale JSONs**:
  - `src/jsMain/resources/locales/en.json`
  - `src/jsMain/resources/locales/el.json`
  - `src/jsMain/resources/locales/ru.json`
  - Location lore: `location_info_en.json`, `location_info_el.json`, `location_info_ru.json`

## Feature Checklist

1. **No Hardcoded UI Copy**: Add translation keys instead of raw English strings in Kilua components.
2. **All 3 Locales + Fallback**: Add every new key to `en.json`, `el.json`, `ru.json`, and `fallbackEn` in `I18n.kt` (keep placeholder format `{0}`, `{1}` identical across languages).
3. **Wire Protocol to UI**: If adding a new server event or action, update `GameWebSocket.kt` and verify matching DTOs in `src/commonMain/` via `query-game-protocol`.

## Verification

- **Locale Key Parity Check**:
  ```bash
  python3 -c '
  import json
  files = ["en", "el", "ru"]
  keys = {f: set(json.load(open(f"src/jsMain/resources/locales/{f}.json"))) for f in files}
  base = keys["en"]
  for f in files[1:]:
      missing = sorted(base - keys[f])
      extra = sorted(keys[f] - base)
      print(f, "missing:", len(missing), missing[:10], "extra:", len(extra), extra[:10])
  '
  ```
- **Frontend Bundle Check**: `./gradlew jarWithJs`

