# Gothic Fire AI Agent: ADK Migration (Option 1)
## Presentation Slide Deck & Speaker Notes

> **PowerPoint File**: [`agent/GothicFire_ADK_Migration_Option1.pptx`](file:///home/eudialyte/workspaces/gothic_fire/gothic_fire/gothicfire/agent/GothicFire_ADK_Migration_Option1.pptx)  
> **Format**: 16:9 Widescreen, Modern Dark Theme  
> **Slides**: 10 Slides with visual cards and structured talking points  

---

### Slide 1: Title Slide
* **Title**: Gothic Fire AI Agent Architecture
* **Subtitle**: Migration to Google Agent Development Kit (ADK) — Option 1
* **Tagline**: Graph-Powered Workflows • Offline Zero-Cost Local LLM • ADK Eval Sets & Optimization
* **Presenter Notes**:
  > *"Welcome everyone. Today we are presenting the architecture and implementation roadmap for migrating Gothic Fire's AI microservice to Google's Agent Development Kit (ADK) under Option 1. This migration allows us to maintain 100% offline, zero-cost inference using our local 1.5B model, while dramatically boosting tactical reliability through graph workflows, cutting latency by up to 65%, and requiring zero changes to our Kotlin backend."*

---

### Slide 2: Executive Summary & Strategic Context
* **Card 1: Current State & Pain Points**
  * Monolithic Prompts: Single-pass prompts try to handle rules, move choices, and personas at once.
  * Small Model Fragility: 1.5B local model can hallucinate illegal moves or miss critical castle threats.
  * Manual Test Harness: Handcrafted test asserts without regression scoring or standardized datasets.
* **Card 2: The Solution: Option 1**
  * Preserve Python Microservice: Keeps AI isolated in `agent/` on port 8000; zero Kotlin changes.
  * Google ADK 2.0 Workflows: Deconstruct monolithic prompts into directed graph workflows (DAGs).
  * 100% Offline & Free: Runs local Qwen 2.5 1.5B GGUF on CPU with < 1.5 GB RAM footprint.
* **Card 3: Target Outcomes**
  * Guaranteed Legal Moves: Deterministic validation nodes eliminate illegal tactical moves.
  * Up to 65% Latency Drop: Fast paths for forced moves and bounded generation tokens.
  * Automated Quality Benchmarking: Standardized `adk eval_set` replaces ad-hoc testing.
* **Presenter Notes**:
  > *"Our primary motivation is making our AI rock-solid without increasing infrastructure costs. In turn-based games, small models struggle when forced to do complex multi-step reasoning in a single prompt. Option 1 solves this by sandwiching the local LLM between deterministic game rules."*

---

### Slide 3: Target Architecture Blueprint
* **Left Column: Microservice Boundary & Contract**
  * Untouched Kotlin Backend: Ktor services continue communicating via HTTP REST on port 8000.
  * Strict JSON Schemas: Preserves `DecisionRequest`, `DecisionResponse`, `AdvisorRequest`, `AdvisorResponse`.
  * Container Isolation: Runs as dedicated `gothicfire-agent` container in Docker Compose and K3s.
  * Health & Liveness Probes: `/health` and `/live` monitor model memory (VmRSS) and readiness.
* **Right Column: Internal ADK Microservice Engine**
  * ADK 2.0 Workflows: Replaces if/else scripts with structured Directed Acyclic Graphs.
  * LiteLLM Model Connector: Transparent abstraction targeting local GGUF or cloud APIs.
  * Sandwich Architecture: Deterministic Rules ➔ LLM Reasoning ➔ Deterministic Validation.
  * Zero Vendor Lock-in: Can test Gemini 2.0 Flash or local Ollama with a simple config flag.
* **Presenter Notes**:
  > *"A critical architectural selling point is backward compatibility. Our game engine in Kotlin remains completely unaware that anything changed under the hood. The REST contract is preserved 100%."*

---

### Slide 4: Tactical Computer Opponent Graph
* **Pipeline Nodes**:
  1. **Node 1: Fast Router (Deterministic)**: If moves == 0 or 1, bypass LLM entirely (100% CPU savings on forced moves).
  2. **Node 2: Stance Classifier (LLM)**: Evaluates high-level posture (`DEFEND_CASTLE`, `RECRUIT_ARMY`, `EXPAND`).
  3. **Node 3: Candidate Filter (Deterministic)**: Prunes 20+ moves down to 2–4 candidates matching the stance.
  4. **Node 4: Move Selector (LLM)**: Picks best candidate; output bounded to 45 tokens (down from 180).
  5. **Node 5: Rule Guardrail (Deterministic)**: Asserts chosen move is strictly legal; safe heuristic fallback on failure.
* **Presenter Notes**:
  > *"Notice how the 1.5B model is never asked to evaluate 20 legal moves simultaneously. Instead, it only chooses a strategic posture, code filters the moves, and the model picks from 3 filtered options. It's impossible for the bot to generate an invalid move."*

---

### Slide 5: War Council Advisor Graph
* **Left Column: Consultation Graph Flow**
  * Step 1: Idempotency Cache: Hashes `(turn, player_state, question_type)`. Prevents duplicate UI clicks.
  * Step 2: State Auditor: Deterministic extraction of food runway turns, castle threats, uncollected loot.
  * Step 3: Persona Router: Dispatches dynamically to Zorax or Jade prompt nodes.
  * Step 4: Grounding Guardrail: Injects mandatory starvation and garrison warnings if omitted.
* **Right Column: The Two Advisory Personas**
  * **Zorax the Mighty**: Grizzled military general focused on fortress garrisons, force ratios, and blunt tactical strikes.
  * **Jade the Enlightened**: Arcane sorceress focused on food runway, resource cultivation, and long-term pacing.
* **Presenter Notes**:
  > *"Advisors now have dedicated guardrails. If a player is about to starve next turn, our deterministic auditor guarantees that starvation is front-and-center, regardless of how creative the LLM gets with its roleplay."*

---

### Slide 6: Cost & Latency Optimization Framework
* **Quadrant 1: Zero-Compute Short-Circuit**
  * Single legal move returns in 0ms without invoking the LLM.
  * Turn idempotency cache serves duplicate player clicks from RAM.
* **Quadrant 2: Bounded Output Token Generation**
  * Decisions capped at 45 tokens (down from 180) with stop sequence `}`.
  * Cuts CPU inference time by ~65% (from ~1.8s down to ~0.5s).
* **Quadrant 3: KV Cache & Prompt Re-Use**
  * Enables in-memory prompt KV caching in `llama-cpp-python`.
  * Evaluates persona lore and game rules once; only new turn state is processed.
* **Quadrant 4: Lazy State Tool Fetching**
  * Replaces monolithic text strings with on-demand ADK tools.
  * Shrinks prompt context window by 60%, reducing memory bandwidth pressure.
* **Presenter Notes**:
  > *"Even though local models don't bill per token, CPU time directly impacts server hosting costs and player concurrency. Cutting token limits and short-circuiting single moves frees up the CPU thread pool for other multiplayer sessions."*

---

### Slide 7: Automated Quality Assurance: ADK Eval Sets
* **Left: ADK Evaluation Tooling**
  * `adk eval`: CLI for running batch conformance tests across hundreds of turns.
  * Trajectory Matching: Verifies correct moves and mandatory alert triggers.
  * LLM-as-a-Judge: Cloud models (Gemini Flash) grade local model persona tone and strategic depth.
  * `adk optimize`: Discovers minimal-token prompts that preserve persona fidelity.
* **Right: Gothic Fire Benchmark Suites**
  * `tactical_suite.json`: Evaluates under-siege defense, starvation crises, and expansion.
  * `advisor_suite.json`: Evaluates Zorax/Jade tone, critical alert coverage, and actionability.
* **Presenter Notes**:
  > *"Currently we have a manual Python script (`verify_agent.py`). With ADK eval sets, prompt tuning becomes a verifiable engineering process with automated regression scores."*

---

### Slide 8: Implementation Roadmap (6 Phased Sprints)
* **Phase 1: Environment & Setup** — Add `google-adk` and `litellm` to `requirements.txt`; verify container build.
* **Phase 2: Graph Workflows** — Build the 5-node Tactical Decision Graph and 4-node War Council Graph.
* **Phase 3: Cost Optimizations** — Implement 1-move fast path, 45-token bounds, and KV prompt cache.
* **Phase 4: ADK Eval Sets** — Port verification cases to JSON datasets; establish `adk eval` baseline.
* **Phase 5: FastAPI Integration** — Wire graphs into `/decide` and `/advisor/consult`; verify `./gradlew jvmTest`.
* **Phase 6: Container Rollout** — Build `gothicfire-agent` Docker image and deploy to Docker Compose / K3s.
* **Presenter Notes**:
  > *"The rollout is broken into 6 clear phases, with comprehensive verification gates at every step before any changes touch production."*

---

### Slide 9: Risk Mitigation & Measurable ROI
* **Risk Matrix**:
  * RAM > 1.5 GB ➔ Strict `n_ctx=2048`, delta states, and `VmRSS` monitoring.
  * Inference Timeout ➔ Bounded tokens + per-node timeouts with automatic heuristic fallback.
  * Breaking Kotlin API ➔ Existing Pydantic schemas preserved; verified via `./gradlew jvmTest`.
* **Measurable ROI**:
  * 100% Legal Move Reliability: Impossible to crash on illegal actions.
  * Zero Recurring API Invoices: Operates 100% offline.
  * ~65% Faster Latency: Bot decisions drop from ~1.8s to ~0.5s.
  * Scientific Prompt Engineering: Version-controlled regression benchmarks.
* **Presenter Notes**:
  > *"This gives our stakeholders the best of both worlds: enterprise agent tooling and multi-agent graphs, with zero monthly cloud bills and strict RAM limits."*

---

### Slide 10: Conclusion & Next Steps
* **Action Items**:
  1. Approve Architecture & Plan (Option 1 scope).
  2. Phase 1 Dependency Install (`google-adk`, `litellm`).
  3. Create Initial Eval Set (`tactical_suite.json`).
  4. Implement Decision Graph.
  5. Open Floor for Questions & Team Discussion.
* **Presenter Notes**:
  > *"Thank you! We are ready to answer any questions and proceed with Phase 1 whenever the team is ready."*
