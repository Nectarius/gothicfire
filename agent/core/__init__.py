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

from .cache import (
    AdvisorCache,
    advisor_cache,
    DecisionCache,
    decide_cache,
)

from .llm_adapter import (
    LlamaCppLlm,
    _inference_lock,
)

from .workflows import (
    build_decide_workflow,
    run_decide_workflow,
    build_advisor_workflow,
    run_advisor_workflow,
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
    "AdvisorCache",
    "advisor_cache",
    "DecisionCache",
    "decide_cache",
    "LlamaCppLlm",
    "_inference_lock",
    "build_decide_workflow",
    "run_decide_workflow",
    "build_advisor_workflow",
    "run_advisor_workflow",
]
