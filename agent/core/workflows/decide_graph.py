"""ADK Workflow for Tactical Computer Opponent Decisions."""

import logging
import os
import re
import time
from typing import Optional

from google.genai import types
from google.adk.agents import LlmAgent
from google.adk.events import Event
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.workflow import Workflow, START, node, Edge, DEFAULT_ROUTE

from ..schemas import DecisionRequest, DecisionResponse
from ..prompts import build_decision_prompts
from ..parser import safe_parse_decision_json
from ..cache import decide_cache
from ..llm_adapter import LlamaCppLlm

logger = logging.getLogger("AiAgentCore.Workflows.Decide")

_session_service = InMemorySessionService()


async def run_decide_workflow(
    request: DecisionRequest,
    llm: LlamaCppLlm
) -> DecisionResponse:
    """Executes tactical decision with zero-compute short-circuiting and ADK reasoning."""
    legal_moves = request.legal_moves

    # 1. Zero-Compute Fast Paths (< 1ms)
    if not legal_moves:
        logger.warning("Empty legal_moves received. Returning WAIT fallback.")
        return DecisionResponse(
            chosen_move="WAIT",
            reasoning="Fallback: No legal moves were provided in request."
        )

    if len(legal_moves) == 1:
        only_move = legal_moves[0]
        logger.info(f"Single legal move available on turn {request.turn}. Zero-compute bypass: '{only_move}'")
        return DecisionResponse(
            chosen_move=only_move,
            reasoning="Direct selection: Only one legal action was viable for this character."
        )

    # 2. Idempotency Cache Check (< 1ms)
    moves_tuple = tuple(legal_moves)
    cached_resp = decide_cache.get(
        turn=request.turn,
        state_summary=request.state_summary,
        legal_moves=moves_tuple
    )
    if cached_resp is not None:
        logger.info(f"Decision cache hit for turn {request.turn}. Returning cached decision.")
        return cached_resp

    # 3. Move Pruning to Prevent Prompt Bloat & CPU Batch Evaluation Stalls
    max_legal_moves = int(os.getenv("AI_MAX_LEGAL_MOVES", "8"))
    if len(legal_moves) > max_legal_moves:
        def _extract_score(move_str: str) -> float:
            m = re.search(r"Score:\s*(\d+(?:\.\d+)?)", move_str, re.IGNORECASE)
            return float(m.group(1)) if m else 0.0

        has_scores = any("score:" in m.lower() for m in legal_moves)
        if has_scores:
            effective_moves = sorted(legal_moves, key=_extract_score, reverse=True)[:max_legal_moves]
        else:
            effective_moves = legal_moves[:max_legal_moves]
        logger.info(f"Pruned legal moves from {len(legal_moves)} to {len(effective_moves)} (max={max_legal_moves})")
    else:
        effective_moves = legal_moves

    fallback_move = effective_moves[0]
    system_prompt, user_prompt = build_decision_prompts(
        turn=request.turn,
        state_summary=request.state_summary,
        legal_moves=effective_moves
    )

    decide_max_tokens = int(os.getenv("AI_DECIDE_MAX_TOKENS", "120"))

    # 4. ADK Supreme Commander Agent
    commander_agent = LlmAgent(
        name="SupremeTacticalCommander",
        model=llm,
        instruction=system_prompt,
        generate_content_config=types.GenerateContentConfig(
            temperature=0.1,
            max_output_tokens=decide_max_tokens,
            stop_sequences=["\n\n", "```"],
            response_mime_type="application/json"
        )
    )

    app_id = f"gothicfire_decide_{request.game_id or 'default'}"
    user_id = request.player_id or "bot_commander"
    session = None

    try:
        t0 = time.perf_counter()
        session = await _session_service.create_session(app_name=app_id, user_id=user_id)
        runner = Runner(agent=commander_agent, session_service=_session_service, app_name=app_id)

        user_content = types.Content(
            role="user",
            parts=[types.Part.from_text(text=user_prompt)]
        )

        response_chunks = []
        async for event in runner.run_async(
            user_id=user_id,
            session_id=session.id,
            new_message=user_content
        ):
            if event.content and event.content.parts:
                for part in event.content.parts:
                    if getattr(part, "text", None):
                        response_chunks.append(part.text)

        elapsed = time.perf_counter() - t0
        raw_output = "".join(response_chunks).strip()
        logger.info(f"ADK Decision workflow finished in {elapsed:.3f}s (turn: {request.turn})")
        logger.debug(f"Raw ADK decision output: {raw_output}")

        # 5. Rule Guardrail & Deterministic Verification
        response = safe_parse_decision_json(raw_output, effective_moves, fallback_move)

        # Cache decision for idempotency
        decide_cache.set(
            turn=request.turn,
            state_summary=request.state_summary,
            legal_moves=moves_tuple,
            response=response
        )
        return response

    except Exception as e:
        logger.error(f"Error during ADK decision execution: {e}", exc_info=True)
        fallback_resp = DecisionResponse(
            chosen_move=fallback_move,
            reasoning=f"Fallback: Workflow exception ({type(e).__name__}): {str(e)}"
        )
        decide_cache.set(
            turn=request.turn,
            state_summary=request.state_summary,
            legal_moves=moves_tuple,
            response=fallback_resp
        )
        return fallback_resp
    finally:
        if session is not None:
            try:
                await _session_service.delete_session(
                    app_name=app_id,
                    user_id=user_id,
                    session_id=session.id
                )
            except Exception as del_err:
                logger.debug(f"Error cleaning up ADK decision session: {del_err}")


def build_decide_workflow(llm: LlamaCppLlm) -> Workflow:
    """Constructs a declarative ADK Workflow graph representing the decision DAG."""
    @node(name="rule_guardrail")
    async def guardrail_node():
        return Event(content=types.Content(role="model", parts=[types.Part.from_text(text='{"status": "ok"}')]))

    return Workflow(
        name="TacticalDecisionGraph",
        edges=[
            (START, guardrail_node)
        ]
    )
