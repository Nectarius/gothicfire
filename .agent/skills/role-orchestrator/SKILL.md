---
name: role-orchestrator
description: >-
  Development workflow Orchestrator role for cross-stack Gothic Fire tasks.
  Use when coordinating multi-layer features or refactors spanning Kotlin/Ktor
  (src/), Kilua JS (src/jsMain/), tactical_balance.json, and the Python ADK
  microservice (agent/).
---

# Role: Orchestrator

Coordinate cross-stack work using a **contract-first, gated** sequence. Do not implement large cross-stack features ad hoc before interfaces are aligned.

## Workflow Chain

1. **Triage Scope**
   - If the task is isolated to a single file or small bugfix, handle it directly without spawning a multi-agent chain.
   - If the task crosses boundaries (e.g., Kotlin DTOs/WebSocket protocol + `agent/core/schemas.py`, or `tactical_balance.json` + AI prompts/evals), run the chain below.
2. **Architect Phase (`role-architect`)**
   - Delegate or follow `.agent/skills/role-architect/SKILL.md` first.
   - Require a concise interface contract before any implementation starts.
3. **Parallel Implementation**
   - **Game/UI Scope:** `src/commonMain/`, `src/jvmMain/`, `src/jsMain/`, `src/jvmTest/`, `tactical_balance.json`.
   - **AI/Agent Scope:** `agent/core/` (`schemas.py`, `prompts.py`, `parser.py`, `workflows/`), `agent/eval_sets/`.
   - Keep worker file ownership disjoint when running in parallel.
4. **Verification Gate (`role-verifier`)**
   - Delegate or follow `.agent/skills/role-verifier/SKILL.md` after implementation.
   - Do not mark the task complete until required checks pass or failures are explicitly resolved.

