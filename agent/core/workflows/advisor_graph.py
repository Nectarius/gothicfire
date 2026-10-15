"""ADK Workflow for War Council Advisor Consultations (Zorax the Mighty & Jade the Enlightened)."""

import logging
import os
import time
from typing import Optional

from google.genai import types
from google.adk.agents import LlmAgent
from google.adk.events import Event
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.workflow import Workflow, START, node

from ..schemas import AdvisorRequest, AdvisorResponse
from ..prompts import build_advisor_prompts
from ..parser import (
    safe_parse_advisor_json,
    sanitize_advisor_advice,
    get_advisor_fallback,
)
from ..cache import advisor_cache
from ..llm_adapter import LlamaCppLlm

logger = logging.getLogger("AiAgentCore.Workflows.Advisor")

_session_service = InMemorySessionService()


async def run_advisor_workflow(
    request: AdvisorRequest,
    llm: LlamaCppLlm
) -> AdvisorResponse:
    """Executes advisor consultation workflow with idempotency caching and guardrails."""
    q_type = request.question_type.upper().strip()
    advisor_id = request.advisor_id.upper().strip()

    # 1. Idempotency Cache Check (Sub-millisecond duplicate UI click bypass)
    cached_resp = advisor_cache.get(
        turn=request.turn,
        player_summary=request.player_summary,
        question_type=q_type,
        advisor_id=advisor_id,
        opponents_summary=request.opponents_summary or "",
        map_summary=request.map_summary or ""
    )
    if cached_resp is not None:
        logger.info(
            f"Advisor consultation cache hit for {cached_resp.advisor_name} "
            f"(turn {request.turn}, question {q_type}). Returning cached counsel."
        )
        return cached_resp

    sys_prompt, user_prompt, tokens_limit, advisor_name = build_advisor_prompts(request)
    fallback_advice, fallback_kps = get_advisor_fallback(advisor_id, q_type, request.turn)

    logger.info(
        f"Starting ADK Advisor workflow for {advisor_name} "
        f"(type: {q_type}, turn: {request.turn}, max_tokens: {tokens_limit})"
    )

    # 2. ADK Specialized Persona Agent
    advisor_agent = LlmAgent(
        name=f"Advisor_{advisor_id}",
        model=llm,
        instruction=sys_prompt,
        generate_content_config=types.GenerateContentConfig(
            temperature=0.1,
            max_output_tokens=tokens_limit,
            stop_sequences=["\n\n", "```"],
            response_mime_type="application/json"
        )
    )

    app_id = f"gothicfire_advisor_{request.game_id or 'default'}"
    user_id = request.player_id or "player_commander"
    session = None

    try:
        t0 = time.perf_counter()
        session = await _session_service.create_session(app_name=app_id, user_id=user_id)
        runner = Runner(agent=advisor_agent, session_service=_session_service, app_name=app_id)

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
        logger.info(f"ADK Advisor counsel generated in {elapsed:.3f}s for {advisor_name} ({q_type})")
        logger.debug(f"Raw advisor output: {raw_output}")

        # 3. Grounding Guardrail & Sanitization
        parsed_advice, parsed_key_points = safe_parse_advisor_json(raw_output)
        final_advice = parsed_advice or fallback_advice
        final_key_points = parsed_key_points or fallback_kps

        # Factually ground against hallucinations (e.g. 0-count units)
        final_advice = sanitize_advisor_advice(final_advice, request.player_summary)

        # Starvation Alert Guardrail
        if "STARVATION RISK" in request.player_summary and "starv" not in final_advice.lower() and "food" not in final_advice.lower():
            final_advice = f"CRITICAL: Soldiers starve next turn! {final_advice}"

        response = AdvisorResponse(
            advisor_name=advisor_name,
            advisorName=advisor_name,
            question_type=q_type,
            questionType=q_type,
            advice=final_advice,
            key_points=final_key_points,
            keyPoints=final_key_points
        )

        # Store in LRU cache
        advisor_cache.set(
            turn=request.turn,
            player_summary=request.player_summary,
            question_type=q_type,
            advisor_id=advisor_id,
            response=response,
            opponents_summary=request.opponents_summary or "",
            map_summary=request.map_summary or ""
        )

        return response

    except Exception as e:
        logger.warning(f"ADK Advisor consultation exception ({e}). Using in-character fallback.")
        fallback_resp = AdvisorResponse(
            advisor_name=advisor_name,
            advisorName=advisor_name,
            question_type=q_type,
            questionType=q_type,
            advice=fallback_advice,
            key_points=fallback_kps,
            keyPoints=fallback_kps
        )
        advisor_cache.set(
            turn=request.turn,
            player_summary=request.player_summary,
            question_type=q_type,
            advisor_id=advisor_id,
            response=fallback_resp,
            opponents_summary=request.opponents_summary or "",
            map_summary=request.map_summary or ""
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
                logger.debug(f"Error cleaning up ADK advisor session: {del_err}")


def build_advisor_workflow(llm: LlamaCppLlm) -> Workflow:
    """Constructs a declarative ADK Workflow graph representing the advisor consultation DAG."""
    @node(name="advisor_guardrail")
    async def guardrail_node():
        return Event(content=types.Content(role="model", parts=[types.Part.from_text(text='{"status": "ok"}')]))

    return Workflow(
        name="WarCouncilAdvisorGraph",
        edges=[
            (START, guardrail_node)
        ]
    )
