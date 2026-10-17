"""ADK Workflow for Castle Lord Audiences (Lord Hagen, Onar, Pyrokar, Commander Garond)."""

import logging
import os
import time
from typing import Optional

from google.genai import types
from google.adk.agents import LlmAgent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService

from ..schemas import CastleAudienceRequest, CastleAudienceResponse, AdvisorResponse
from ..prompts import build_castle_lord_prompts
from ..parser import (
    safe_parse_castle_lord_json,
    get_castle_lord_fallback,
    sanitize_advisor_advice,
)
from ..cache import advisor_cache
from ..llm_adapter import LlamaCppLlm

logger = logging.getLogger("AiAgentCore.Workflows.CastleAudience")

_session_service = InMemorySessionService()


async def run_castle_audience_workflow(
    request: CastleAudienceRequest,
    llm: LlamaCppLlm
) -> CastleAudienceResponse:
    """Executes castle audience workflow with in-character guardrails and caching."""
    lord_id = request.lord_id.upper().strip()

    # 1. Idempotency Cache Check
    cache_key_q = f"CASTLE_AUDIENCE_{lord_id}_{request.castle_sector_id}"
    cached_resp = advisor_cache.get(
        turn=request.turn,
        player_summary=request.player_summary,
        question_type=cache_key_q,
        advisor_id=lord_id,
        opponents_summary=request.opponents_summary or "",
        map_summary=f"{request.map_summary}_siege={request.is_under_siege}"
    )
    if cached_resp is not None:
        logger.info(
            f"Castle audience cache hit for {cached_resp.advisor_name} "
            f"(turn {request.turn}, lord {lord_id})."
        )
        return CastleAudienceResponse(
            lord_id=lord_id,
            lordId=lord_id,
            lord_name=cached_resp.advisor_name,
            lordName=cached_resp.advisor_name,
            castle_sector_id=request.castle_sector_id,
            castleSectorId=request.castle_sector_id,
            speech=cached_resp.advice,
            key_points=cached_resp.key_points,
            keyPoints=cached_resp.key_points,
            timestamp=int(time.time() * 1000)
        )

    sys_prompt, user_prompt, tokens_limit, lord_name = build_castle_lord_prompts(
        lord_id=lord_id,
        turn=request.turn,
        player_summary=request.player_summary,
        opponents_summary=request.opponents_summary,
        map_summary=request.map_summary,
        is_under_siege=request.is_under_siege
    )
    fallback_speech, fallback_kps = get_castle_lord_fallback(lord_id)

    logger.info(
        f"Starting ADK Castle Audience workflow for {lord_name} "
        f"(sector: {request.castle_sector_id}, turn: {request.turn}, max_tokens: {tokens_limit})"
    )

    castle_agent = LlmAgent(
        name=f"CastleLord_{lord_id}",
        model=llm,
        instruction=sys_prompt,
        generate_content_config=types.GenerateContentConfig(
            temperature=0.2,
            max_output_tokens=tokens_limit,
            stop_sequences=["\n\n", "```"],
            response_mime_type="application/json"
        )
    )

    app_id = f"gothicfire_castle_{request.game_id or 'default'}"
    user_id = request.player_id or "player_commander"
    session = None

    try:
        t0 = time.perf_counter()
        session = await _session_service.create_session(app_name=app_id, user_id=user_id)
        runner = Runner(agent=castle_agent, session_service=_session_service, app_name=app_id)

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
        logger.info(f"ADK Castle Lord speech generated in {elapsed:.3f}s for {lord_name}")

        parsed_speech, parsed_key_points = safe_parse_castle_lord_json(raw_output)
        final_speech = parsed_speech or fallback_speech
        final_key_points = parsed_key_points or fallback_kps

        # Factually ground against hallucinations
        final_speech = sanitize_advisor_advice(final_speech, request.player_summary)

        response = CastleAudienceResponse(
            lord_id=lord_id,
            lordId=lord_id,
            lord_name=lord_name,
            lordName=lord_name,
            castle_sector_id=request.castle_sector_id,
            castleSectorId=request.castle_sector_id,
            speech=final_speech,
            key_points=final_key_points,
            keyPoints=final_key_points,
            timestamp=int(time.time() * 1000)
        )

        advisor_cache.set(
            turn=request.turn,
            player_summary=request.player_summary,
            question_type=cache_key_q,
            advisor_id=lord_id,
            response=AdvisorResponse(
                advisor_name=lord_name,
                question_type=cache_key_q,
                advice=final_speech,
                key_points=final_key_points
            ),
            opponents_summary=request.opponents_summary or "",
            map_summary=f"{request.map_summary}_siege={request.is_under_siege}"
        )

        return response

    except Exception as e:
        logger.warning(f"Castle audience consultation exception ({e}). Using in-character fallback.")
        return CastleAudienceResponse(
            lord_id=lord_id,
            lordId=lord_id,
            lord_name=lord_name,
            lordName=lord_name,
            castle_sector_id=request.castle_sector_id,
            castleSectorId=request.castle_sector_id,
            speech=fallback_speech,
            key_points=fallback_kps,
            keyPoints=fallback_kps,
            timestamp=int(time.time() * 1000)
        )
    finally:
        if session is not None:
            try:
                await _session_service.delete_session(
                    app_name=app_id,
                    user_id=user_id,
                    session_id=session.id
                )
            except Exception as del_err:
                logger.debug(f"Error cleaning up ADK castle audience session: {del_err}")
