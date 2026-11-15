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
- **i18n Engine & Fallback Maps**: `src/jsMain/kotlin/i18n/I18n.kt` (`Language.EN`, `Language.EL`, `Language.RU`, `fallbackEn`, `fallbackEl`, `fallbackRu`; fetches `/locales/${lang.code}.json` at runtime)
- **Active Frontend Locale JSONs** (bundled into `src/jsMain/resources/`):
  - `src/jsMain/resources/locales/en.json`
  - `src/jsMain/resources/locales/el.json`
  - `src/jsMain/resources/locales/ru.json`
  - Location lore: `src/jsMain/resources/locales/location_info_en.json`, `location_info_el.json`, `location_info_ru.json`
  *(Note: root `locales/` is a separate/legacy directory not served by the JS bundle; edit `src/jsMain/resources/locales/` first and keep root `locales/` synced only if required.)*

## Feature Checklist

1. **No Hardcoded UI Copy**: Add translation keys instead of raw English strings in Kilua components.
2. **All 3 Locales + Fallback**: Add every new key to `en.json`, `el.json`, `ru.json`, and `fallbackEn` / `fallbackEl` / `fallbackRu` in `I18n.kt` (keep placeholder format `{0}`, `{1}` identical across languages).
3. **Wire Protocol to UI**: If adding a new server event or action, update `GameWebSocket.kt` and verify matching DTOs in `src/commonMain/` via `query-game-protocol`.

## Verification

- **Locale Key, Placeholder & Location Lore Parity Check**:
  ```bash
  python3 -c '
  import json, re
  files = ["en", "el", "ru"]
  data = {f: json.load(open(f"src/jsMain/resources/locales/{f}.json")) for f in files}
  base = set(data["en"])
  for f in files[1:]:
      missing = sorted(base - set(data[f]))
      extra = sorted(set(data[f]) - base)
      bad_ph = [k for k in base & set(data[f]) if sorted(re.findall(r"\{\d+\}", data["en"][k])) != sorted(re.findall(r"\{\d+\}", data[f][k]))]
      print(f, "missing:", len(missing), missing[:10], "extra:", len(extra), extra[:10], "placeholder_mismatch:", bad_ph[:10])
  loc = {f: json.load(open(f"src/jsMain/resources/locales/location_info_{f}.json")) for f in files}
  for f in files[1:]:
      print(f"location_info_{f}", "missing:", sorted(set(loc["en"]) - set(loc[f])), "extra:", sorted(set(loc[f]) - set(loc["en"])))
  '
  ```
- **Frontend Bundle Check**: `./gradlew jarWithJs`

