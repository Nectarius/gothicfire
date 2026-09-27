"""Core shared AI agent package for Gothic Fire.
Contains data schemas, persona definitions, prompt builders, and JSON parsers.
"""

from .schemas import (
    DecisionRequest,
    DecisionResponse,
    AdvisorRequest,
    AdvisorResponse,
)

from .personas import (
    ADVISOR_PERSONAS,
    get_advisor_persona,
)

from .prompts import (
    build_decision_prompts,
    build_advisor_prompts,
    build_status_advisor_prompts,
    build_strategy_advisor_prompts,
    build_next_move_advisor_prompts,
)

from .parser import (
    clean_json_markdown,
    match_legal_move,
    safe_parse_decision_json,
    safe_parse_advisor_json,
    sanitize_advisor_advice,
    get_advisor_fallback,
)

__all__ = [
    "DecisionRequest",
    "DecisionResponse",
    "AdvisorRequest",
    "AdvisorResponse",
    "ADVISOR_PERSONAS",
    "get_advisor_persona",
    "build_decision_prompts",
    "build_advisor_prompts",
    "build_status_advisor_prompts",
    "build_strategy_advisor_prompts",
    "build_next_move_advisor_prompts",
    "clean_json_markdown",
    "match_legal_move",
    "safe_parse_decision_json",
    "safe_parse_advisor_json",
    "sanitize_advisor_advice",
    "get_advisor_fallback",
]
