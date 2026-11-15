---
name: inspect-ai-pipeline
description: Use this skill when inspecting the AI decision pipeline, advisor personas (Zorax, Jade), castle lords (Lord Hagen, Onar, Pyrokar, Commander Garond), bot triage short-circuits, prompt templates, legal move parsing, or ADK microservice integration. Trigger on "check ai decision pipeline", "inspect advisor prompt", "what are Zorax and Jade personas", "how does bot short circuit triage work", "check LLM fallback rules", or "verify AI latency constraints".
---

# Inspect AI Pipeline

## Purpose
Inspects the Google ADK decision microservice, LLM prompt templates, advisor personas, deterministic survival triage short-circuits, and legal move extraction strictly from dedicated AI engine modules without indexing binary weights or full server state.

## Strict Scope Rules

### Target File Paths
- **Deterministic Zero-Latency Triage**: `src/jvmMain/kotlin/game/DeterministicTriageEngine.kt` (142 lines)
- **Ktor AI Client Bridges**: `src/jvmMain/kotlin/game/LlmAiDecisionService.kt` (390 lines), `src/jvmMain/kotlin/game/AiOpponentService.kt` (177 lines), `src/jvmMain/kotlin/game/AdvisorService.kt` (495 lines)
- **FastAPI / ADK Microservice Server**: `agent/server.py` (240 lines)
- **ADK Workflows**: `agent/core/workflows/decide_graph.py` (177 lines), `agent/core/workflows/advisor_graph.py` (184 lines), `agent/core/workflows/castle_audience_graph.py` (179 lines)
- **Pydantic API Schemas**: `agent/core/schemas.py` (99 lines)
- **Personas & Prompt Builders**: `agent/core/personas.py` (79 lines), `agent/core/prompts.py` (199 lines)
- **JSON Repair & Fallback Registry**: `agent/core/parser.py` (330 lines)
- **Caching & LLM Adapter**: `agent/core/cache.py` (173 lines), `agent/core/llm_adapter.py` (224 lines)

### Bypassed Areas (Do NOT Touch)
- Do **NOT** load binary GGUF model files (`*.gguf`) into memory or editor buffers.
- Do **NOT** search inside virtualenv or package caches (`venv/`, `.venv/`, `site-packages/`, `__pycache__/`).
- Do **NOT** scan general frontend components (`src/jsMain/`) or unrelated database code.
- Refuse to execute arbitrary LLM inferences when inspecting static prompt structures or triage heuristics.

---

## Quick-Reference Schema & Section Map

### 1. `src/jvmMain/kotlin/game/DeterministicTriageEngine.kt`
Zero-compute (<1ms) triage heuristic that short-circuits LLM invocation for critical existential board threats:
| Line Range | Heuristic Rule | Trigger Condition & Resolved Bot Action |
| :--- | :--- | :--- |
| **L38–L68** | **Castle Defense Emergency** | Adjacent enemy to home castle & garrison < 5 units (`isAtCastle`) -> Recruits Heavy/Light Infantry or `BotAction.Skip` to hold wall |
| **L70–L81** | **Acute Food Starvation Emergency** | `char.food < upkeep` (`army.total()`) and current controlled sector holds stored food -> `BotAction.CollectResources` |
| **L83–L106**| **Sole Castle Guardian** | `mustStayAtCastle && isAtCastle` -> Recruits infantry if 0 troops, collects stored castle resources, or `BotAction.Skip` |
| **L108–L137**| **Defenseless Commander Adjacent to Enemy** | `char.army.total() == 0` with adjacent armed enemy -> Recruits Heavy/Light Infantry if gold permits, else moves to unoccupied safe sector |

### 2. `agent/server.py` (FastAPI / ADK Microservice on Port 8000)
| Line Range | Endpoint / Feature | Description |
| :--- | :--- | :--- |
| **L69–L75** | Engine Configuration | `N_CTX = 2048`, `N_THREADS = 4`, `AI_PORT = 8000`, `AI_BATCH = 512`, `AI_USE_MLOCK = false`, `AI_ENABLE_RAM_CACHE = false` |
| **L107–L146**| LLM Lifecycle | Singleton `Llama` loader with thread-safe `_inference_lock` and optional 128MB RAM KV cache |
| **L181–L184**| `POST /api/v1/decide` | Evaluates `DecisionRequest` via `run_decide_workflow` and returns legal move in `DecisionResponse` |
| **L187–L190**| `POST /api/v1/advisor/consult`| Returns in-character strategic advice in `AdvisorResponse` via `run_advisor_workflow` |
| **L193–L196**| `POST /api/v1/castle/audience`| Evaluates player standing with Lord Hagen, Onar, Pyrokar, or Commander Garond via `run_castle_audience_workflow` |
| **L202–L235**| `GET /health` & `GET /live` | Health check (model load status, thread counts, RAM RSS MB, cache sizes) and liveness probe |

### 3. `agent/core/personas.py`
- **ADVISOR_PERSONAS (L5–L22)**:
  - `"ZORAX"` (**Zorax the Mighty**): Seasoned grey-haired general. Doctrinal focus: Castle garrison defense, crushing counter-attacks, Heavy Infantry discipline.
  - `"JADE"` (**Jade the Enlightened**): Arcane high sorceress. Doctrinal focus: Cultivation of territory resources, Mage synergies, long-term economic pacing.
- **CASTLE_LORD_PERSONAS (L31–L72)**:
  - `"LORD_HAGEN"`: Royal Paladin commander (City of Khorinis #14) — Paladin honor, royal law, fortress defense.
  - `"ONAR"`: Mercenary landowner (Onar's Farm #23) — Gold, grain stores, mercenary value.
  - `"PYROKAR"`: Highest Mage of Fire (Monastery of Innos #7) — Mage presence, spiritual purity, balance of light and shadow.
  - `"GAROND"`: Expedition Commander (Fortress of the Pass #52) — Survival, troop counts, emergency rations, defensive bottlenecks.

### 4. `agent/core/parser.py`
- **Advisor Fallback Matrix (L11–L38)**: Deterministic advice fallbacks (`ADVISOR_FALLBACK_MAP`) for `(ZORAX, STATUS)`, `(ZORAX, NEXT_MOVE)`, `(ZORAX, STRATEGY)`, `(JADE, STATUS)`, `(JADE, NEXT_MOVE)`, and `(JADE, STRATEGY)`.
- **Castle Lord Fallback Matrix (L248–L265)**: Deterministic speech fallbacks (`CASTLE_LORD_FALLBACK_MAP`) for `LORD_HAGEN`, `ONAR`, `PYROKAR`, and `GAROND`.
- **Move Matcher & Guardrails (L54–L84, L222–L233)**: `match_legal_move` resolves model choices via numeric indices, base move names, and substring matching; `sanitize_advisor_advice` strips hallucinated mage counts when `0 Mages` is in `player_summary`.

---

## Fast Query Patterns

### 1. Check Deterministic Triage Rules
- **File**: `src/jvmMain/kotlin/game/DeterministicTriageEngine.kt`
- **Range**: Lines 23 to 142
- **Fast CLI Command**:
  ```bash
  sed -n '23,142p' src/jvmMain/kotlin/game/DeterministicTriageEngine.kt
  ```

### 2. Check Advisor Persona System Prompts
- **File**: `agent/core/personas.py`
- **Range**: Lines 5 to 23
- **Fast CLI Command**:
  ```bash
  sed -n '5,23p' agent/core/personas.py
  ```

### 3. Inspect Castle Lord Personalities & Standing Criteria
- **File**: `agent/core/personas.py`
- **Range**: Lines 31 to 79
- **Fast CLI Command**:
  ```bash
  sed -n '31,79p' agent/core/personas.py
  ```

### 4. Check REST Request & Response Payload Schemas
- **File**: `agent/core/schemas.py`
- **Range**: Lines 1 to 99
- **Fast CLI Command**:
  ```bash
  sed -n '1,99p' agent/core/schemas.py
  ```

### 5. Check AI Microservice Health & Parameters
- **Fast CLI Command**:
  ```bash
  curl -s http://localhost:8000/health || echo "AI Agent microservice offline"
  ```
