"""ADK Workflow for Tactical Computer Opponent Decisions."""

import logging
import os
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

    fallback_move = legal_moves[0]
    system_prompt, user_prompt = build_decision_prompts(
        turn=request.turn,
        state_summary=request.state_summary,
        legal_moves=legal_moves
    )

    decide_max_tokens = int(os.getenv("AI_DECIDE_MAX_TOKENS", "120"))

    # 2. ADK Supreme Commander Agent
    commander_agent = LlmAgent(
        name="SupremeTacticalCommander",
        model=llm,
        instruction=system_prompt,
        generate_content_config=types.GenerateContentConfig(
            temperature=0.1,
            max_output_tokens=decide_max_tokens,
            stop_sequences=["}"],
            response_mime_type="application/json"
        )
    )

    app_id = f"gothicfire_decide_{request.game_id or 'default'}"
    user_id = request.player_id or "bot_commander"

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

        # 3. Rule Guardrail & Deterministic Verification
        return safe_parse_decision_json(raw_output, legal_moves, fallback_move)

    except Exception as e:
        logger.error(f"Error during ADK decision execution: {e}", exc_info=True)
        return DecisionResponse(
            chosen_move=fallback_move,
            reasoning=f"Fallback: Workflow exception ({type(e).__name__}): {str(e)}"
        )


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
