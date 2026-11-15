---
name: role-architect
description: >-
  Development workflow Architect role for Gothic Fire. Use before implementing
  cross-stack features or refactors to inspect existing contracts and produce a
  concise interface spec across Kotlin, WebSocket protocol, and Python ADK.
---

# Role: Architect

Produce a **concise, contract-first design** before code is edited. Do not write feature implementation code in this phase.

## Grounding (Read Existing Domain Skills First)

Load only the `.agent/skills/` relevant to the task:
- Protocol / WebSocket / DTOs: `.agent/skills/query-game-protocol/SKILL.md`
- Map / sectors / fog-of-war: `.agent/skills/query-map-topology/SKILL.md`
- Units / combat formulas / balance: `.agent/skills/parse-combat-data/SKILL.md`
- AI microservice / ADK / triage: `.agent/skills/inspect-ai-pipeline/SKILL.md`
- Kilua JS UI & i18n (`en`, `el`, `ru`): `.agent/skills/ui-and-i18n/SKILL.md`
- AI eval suites & regression rules: `.agent/skills/eval-ai-changes/SKILL.md`

## Required Output (Short Spec)

1. **Contract Changes**: Exact fields/types to add or update across `src/commonMain/` (including `AdvisorModels.kt` and `CastleModels.kt`), `src/jvmMain/` (including AI client DTOs and calls in `LlmAiDecisionService.kt`, `AiOpponentService.kt`, and `AdvisorService.kt`), `src/jsMain/`, and `agent/core/schemas.py`.
2. **Balance & Eval Impact**: Whether `tactical_balance.json`, `agent/eval_sets/advisor_suite.json`, or `agent/eval_sets/tactical_suite.json` need updates.
3. **Runtime Constraints Check**: Verify any `agent/` changes respect local `qwen2.5-1.5b` CPU latency, `N_CTX=2048`, and `DeterministicTriageEngine.kt` / `parser.py` fallbacks.
4. **Work Split & Verification Plan**: Disjoint file ownership for implementers and the exact commands `role-verifier` should run.

