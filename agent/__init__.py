"""Gothic Fire Tactical AI Agent (Google ADK)."""

import os
import sys
from typing import Optional

# Ensure directories are in path
_CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if _CURRENT_DIR not in sys.path:
    sys.path.insert(0, _CURRENT_DIR)
_REPO_ROOT = os.path.dirname(_CURRENT_DIR)
if _REPO_ROOT not in sys.path:
    sys.path.insert(0, _REPO_ROOT)

from google.adk.agents import LlmAgent
from google.genai import types

from .core.schemas import (
    DecisionRequest,
    DecisionResponse,
    AdvisorRequest,
    AdvisorResponse,
    CastleAudienceRequest,
    CastleAudienceResponse,
)
from .core.llm_adapter import LlamaCppLlm
from .core.workflows import (
    build_decide_workflow,
    run_decide_workflow,
    build_advisor_workflow,
    run_advisor_workflow,
    run_castle_audience_workflow,
)
from .server import app, get_adk_llm


def create_tactical_agent() -> LlmAgent:
    """Creates the default ADK tactical commander agent for evaluation and workflow execution."""
    system_prompt = (
        "You are the Supreme Tactical Commander for the turn-based strategy game Gothic Fire. "
        "Your War Minister has pre-evaluated, scored (1-100), and vetted the viable legal actions for your army. "
        "Review the tactical situation and pick the single best action from the provided scored legal moves list. "
        "Commander directives: Favor high-scoring actions (>=60), exploit commander attribute synergies, "
        "ensure resource security, and fulfill castle garrison duty when assigned.\n"
        'Return output strictly as JSON matching: {"chosen_move": "<exact_full_string_from_legal_moves>", "reasoning": "<concise logic>"}.'
    )
    llm = get_adk_llm()
    return LlmAgent(
        name="TacticalCommanderAgent",
        model=llm,
        instruction=system_prompt,
        generate_content_config=types.GenerateContentConfig(
            temperature=0.1,
            max_output_tokens=120,
            stop_sequences=["}"],
            response_mime_type="application/json"
        )
    )


async def get_agent_async():
    """ADK CLI evaluation entry point."""
    agent = create_tactical_agent()
    return agent, None


__all__ = [
    "app",
    "get_adk_llm",
    "create_tactical_agent",
    "get_agent_async",
    "DecisionRequest",
    "DecisionResponse",
    "AdvisorRequest",
    "AdvisorResponse",
    "CastleAudienceRequest",
    "CastleAudienceResponse",
    "build_decide_workflow",
    "run_decide_workflow",
    "build_advisor_workflow",
    "run_advisor_workflow",
    "run_castle_audience_workflow",
]

