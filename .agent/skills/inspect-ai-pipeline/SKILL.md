---
name: inspect-ai-pipeline
description: Use this skill when inspecting the AI decision pipeline, advisor personas (Zorax, Jade), castle lords (Lord Hagen, Onar, Pyrokar), bot triage short-circuits, prompt templates, legal move parsing, or ADK microservice integration. Trigger on "check ai decision pipeline", "inspect advisor prompt", "what are Zorax and Jade personas", "how does bot short circuit triage work", "check LLM fallback rules", or "verify AI latency constraints".
---

# Inspect AI Pipeline

## Purpose
Inspects the Google ADK decision microservice, LLM prompt templates, advisor personas, deterministic survival triage short-circuits, and legal move extraction strictly from dedicated AI engine modules without indexing binary weights or full server state.

## Strict Scope Rules

### Target File Paths
- **Deterministic Zero-Latency Triage**: `src/jvmMain/kotlin/game/DeterministicTriageEngine.kt` (143 lines)
- **Ktor AI Client Bridge**: `src/jvmMain/kotlin/game/LlmAiDecisionService.kt` (260 lines)
- **FastAPI / ADK Microservice Server**: `agent/server.py` (241 lines)
- **Pydantic API Schemas**: `agent/core/schemas.py` (100 lines)
- **Personas & System Prompts**: `agent/core/personas.py` (80 lines)
- **JSON Repair & Fallback Registry**: `agent/core/parser.py` (331 lines)

### Bypassed Areas (Do NOT Touch)
- Do **NOT** load binary GGUF model files (`*.gguf`) into memory or editor buffers.
- Do **NOT** search inside virtualenv or package caches (`.venv/`, `site-packages/`, `__pycache__/`).
- Do **NOT** scan general frontend components (`src/jsMain/`) or unrelated database code.
- Refuse to execute arbitrary LLM inferences when inspecting static prompt structures or triage heuristics.

---

## Quick-Reference Schema & Section Map

### 1. `src/jvmMain/kotlin/game/DeterministicTriageEngine.kt`
Zero-compute (<1ms) triage heuristic that short-circuits LLM invocation for critical existential board threats:
| Line Range | Heuristic Rule | Trigger Condition & Resolved Bot Action |
| :--- | :--- | :--- |
| **L39–L72** | **Castle Defense Emergency** | Adjacent enemy to home castle & garrison < 5 units -> Instantly recruits Heavy/Light Infantry |
| **L74–L95** | **Food Starvation Crisis** | Hero food == 0 & gold >= 10 -> Instantly performs Market Trade / Buy Food |
| **L97–L118**| **Forced Retreat / Zero Army** | Hero army == 0 with adjacent enemy -> Retreats towards home castle or nearest safe sector |
| **L120–L142**| **Empty Castle Seizure** | Adjacent neutral or undefended enemy castle -> Moves immediately to capture fortress |

### 2. `agent/server.py` (FastAPI / ADK Microservice on Port 8000)
| Line Range | Endpoint / Feature | Description |
| :--- | :--- | :--- |
| **L69–L76** | Engine Configuration | `N_CTX = 2048`, `N_THREADS = 4`, `AI_PORT = 8000`, `AI_BATCH = 512`, `AI_USE_MLOCK = false` |
| **L107–L146**| LLM Lifecycle | Singleton `Llama` loader with thread-safe `_inference_lock` and optional 128MB RAM KV cache |
| **L181–L185**| `POST /api/v1/decide` | Evaluates `DecisionRequest` and returns legal move in `DecisionResponse` |
| **L187–L191**| `POST /api/v1/advisor/consult`| Returns in-character strategic advice in `AdvisorResponse` |
| **L193–L197**| `POST /api/v1/castle/audience`| Evaluates player standing with Lord Hagen, Onar, or Pyrokar |
| **L202–L230**| `GET /health` | Health check reporting model load status, thread counts, and memory RSS in MB |

### 3. `agent/core/personas.py`
- **ADVISOR_PERSONAS (L5–L22)**:
  - `"ZORAX"` (**Zorax the Mighty**): Seasoned grey-haired general. Doctrinal focus: Castle garrison defense, crushing counter-attacks, Heavy Infantry discipline.
  - `"JADE"` (**Jade the Enlightened**): Arcane high sorceress. Doctrinal focus: Cultivation of territory resources, Mage synergies, long-term economic pacing.
- **CASTLE_LORD_PERSONAS (L31–L80)**:
  - `"LORD_HAGEN"`: Royal Paladin commander (Khorinis Castle #14) — Paladin honor, royal law.
  - `"ONAR"`: Mercenary landowner (Onar's Farm #23) — Gold, grain stores, mercenary value.
  - `"PYROKAR"`: Highest Mage of Fire (Monastery #7) — Arcane balance, spiritual purity.

### 4. `agent/core/parser.py`
- **Fallback Matrix (L11–L38)**: Deterministic advice fallbacks for `(ZORAX, STATUS)`, `(ZORAX, NEXT_MOVE)`, `(ZORAX, STRATEGY)`, `(JADE, STATUS)`, `(JADE, NEXT_MOVE)`, and `(JADE, STRATEGY)`.
- **Move Matcher (L54–L110)**: Resolves model choices against legal moves using numeric indices, action prefixes, and fuzzy string similarity.

---

## Fast Query Patterns

### 1. Check Deterministic Triage Rules
- **File**: `src/jvmMain/kotlin/game/DeterministicTriageEngine.kt`
- **Range**: Lines 35 to 140
- **Fast CLI Command**:
  ```bash
  sed -n '35,140p' src/jvmMain/kotlin/game/DeterministicTriageEngine.kt
  ```

### 2. Check Advisor Persona System Prompts
- **File**: `agent/core/personas.py`
- **Range**: Lines 5 to 25
- **Fast CLI Command**:
  ```bash
  sed -n '5,25p' agent/core/personas.py
  ```

### 3. Inspect Castle Lord Personalities & Standing Criteria
- **File**: `agent/core/personas.py`
- **Range**: Lines 31 to 80
- **Fast CLI Command**:
  ```bash
  sed -n '31,80p' agent/core/personas.py
  ```

### 4. Check REST Request & Response Payload Schemas
- **File**: `agent/core/schemas.py`
- **Range**: Lines 7 to 65
- **Fast CLI Command**:
  ```bash
  sed -n '7,65p' agent/core/schemas.py
  ```

### 5. Check AI Microservice Health & Parameters
- **Fast CLI Command**:
  ```bash
  curl -s http://localhost:8000/health || echo "AI Agent microservice offline"
  ```
