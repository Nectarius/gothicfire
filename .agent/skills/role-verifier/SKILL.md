---
name: role-verifier
description: >-
  Development workflow Verifier role for Gothic Fire. Use after implementation
  to independently run Kotlin/Gradle tests, builds, and Python AI agent
  verification without modifying implementation files.
---

# Role: Verifier

Act as an **independent quality gate**. Run verification commands, inspect failures, and report exact observed results. Do **not** edit implementation code unless explicitly asked to fix a test.

## Verification Checklist

Run only the checks relevant to the changed stacks:

1. **Kotlin / JVM Tests & Build** (when `src/` or `tactical_balance.json` changed):
   - Run `./gradlew jvmTest` (or `./gradlew test` / `./gradlew jarWithJs` for full-stack bundling).
   - If `src/jsMain/` locales changed, run the locale key-parity check from `.agent/skills/ui-and-i18n/SKILL.md`.
2. **Python AI Microservice** (when `agent/` or `tactical_balance.json` changed):
   - Run `.venv/bin/python agent/verify_agent.py` and the eval JSON validation from `.agent/skills/eval-ai-changes/SKILL.md`.
3. **Contract Parity**:
   - Confirm Kotlin request/response DTOs match `agent/core/schemas.py` field names and aliases (e.g. camelCase / snake_case).

## Reporting Format

- **Commands Run**: Exact command and exit code.
- **Pass / Fail Summary**: Counts or specific failing tests/checks.
- **Blocking Issues**: File paths and error details for the Orchestrator/implementer to fix.

