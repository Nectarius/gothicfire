---
name: eval-ai-changes
description: >-
  Use this skill when modifying AI prompts, personas, legal move scoring,
  schemas, or game mechanics that affect bot decisions or War Council advisors.
  Covers agent/eval_sets/ and agent/verify_agent.py regression checks.
---

# Evaluate AI Changes

## Target File Paths
- **Verification & Latency/RAM Gate**: `agent/verify_agent.py` (validates model load, ADK workflows, zero-compute fast path, advisor caching, latency, `< 1.5 GB` RSS)
- **Eval Config**: `agent/eval_sets/eval_config.json` (`response_match_score` criteria)
- **Tactical Bot Eval Suite**: `agent/eval_sets/tactical_suite.json`
- **Advisor Persona Eval Suite**: `agent/eval_sets/advisor_suite.json`
- **Prompt, Parser & Workflow Modules**: `agent/core/prompts.py`, `agent/core/personas.py`, `agent/core/parser.py`, `agent/core/schemas.py`, `agent/core/workflows/` (`decide_graph.py`, `advisor_graph.py`, `castle_audience_graph.py`)

## Rules for Updating Evals & Prompts

1. **Keep `qwen2.5-1.5b` Constraints in Mind**:
   - Context window is `N_CTX = 2048` (`AI_CTX`), `decide_graph.py` prunes `legal_moves` to `AI_MAX_LEGAL_MOVES` (default `8`) and caps `AI_DECIDE_MAX_TOKENS` (default `120`).
   - Avoid bloated prompts or multi-hop LLM chains that contend on `_inference_lock`.
2. **Add Eval Cases for New Mechanics**:
   - New bot action or triage rule -> add a case in `agent/eval_sets/tactical_suite.json` matching its `eval_cases` schema (`eval_id`, `conversation` with `user_content` + expected JSON `final_response`).
   - New advisor topic, unit, or starvation/economy rule -> add a case in `agent/eval_sets/advisor_suite.json`.
3. **Sync Fallbacks & Guardrails**:
   - If you add a new `question_type`, `advisor_id`, or `lord_id`, update deterministic fallbacks in `agent/core/parser.py` (`ADVISOR_FALLBACK_MAP` / `get_advisor_fallback` and `CASTLE_LORD_FALLBACK_MAP` / `get_castle_lord_fallback`).
   - Check `sanitize_advisor_advice()` hallucination guardrails in `agent/core/parser.py` (invoked by `advisor_graph.py` and `castle_audience_graph.py`) when adding new unit types or resource rules.

## Verification

- **Validate Eval JSON Syntax**:
  ```bash
  python3 -c 'import json, glob; [json.load(open(p)) for p in glob.glob("agent/eval_sets/*.json")]; print("All eval JSONs valid")'
  ```
- **Run Agent Verification Suite**:
  ```bash
  venv/bin/python agent/verify_agent.py
  ```

