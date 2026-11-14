# Gothic Fire — Development Workflow Roles

For small, single-stack edits, work directly without extra ceremony.

For **cross-stack features or refactors** (spanning `src/commonMain/`, `src/jvmMain/`, `src/jsMain/`, `tactical_balance.json`, and `agent/`), follow the 4-role chain using the workspace skills in `.agent/skills/`:

1. **Orchestrator** (`.agent/skills/role-orchestrator/SKILL.md`) — Triages scope, enforces contract-first order, and gates completion.
2. **Architect** (`.agent/skills/role-architect/SKILL.md`) — Inspects existing domain skills (`query-game-protocol`, `query-map-topology`, `parse-combat-data`, `inspect-ai-pipeline`) and writes a short interface spec before edits.
3. **Stack Implementers** — Split cleanly by stack (`src/` + `tactical_balance.json` vs. `agent/` + `agent/eval_sets/`).
4. **Verifier** (`.agent/skills/role-verifier/SKILL.md`) — Independently runs `./gradlew jvmTest` / `./gradlew jarWithJs` and `.venv/bin/python agent/verify_agent.py` before sign-off.

