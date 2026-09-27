"""Prompt construction logic for tactical moves and strategic advisor consultations."""

import os
from typing import Dict, List, Tuple
from .schemas import AdvisorRequest
from .personas import get_advisor_persona


_COMMON_GROUNDING_RULES = (
    "STRICT GROUNDING & FACTUAL ACCURACY RULES:\n"
    "- ONLY refer to unit types that exist in Our Standing with count > 0. If Our Standing notes 0 Mages, we have NO Mages! NEVER state or hallucinate that we have Mages; if appropriate, recommend recruiting them to unlock magical synergies.\n"
    "- Hero attributes (e.g. Archon, Warlord, Vanguard ratings) are leader attributes, NOT soldier counts. Never refer to hero attributes as troops.\n"
    "- The exact unit counts must match Our Standing. Never invent unit counts that conflict with Our Standing.\n"
    "- Distinguish strictly between friendly forces ('Our Standing') and enemy forces ('Rivals Standing'). NEVER assign our units or sector locations to the enemy, or vice versa.\n"
    "- Check frontline clash reports carefully: notice who holds the advantage and who is on the offensive."
)


def build_decision_prompts(turn: int, state_summary: str, legal_moves: List[str]) -> Tuple[str, str]:
    """Constructs the system and user prompts for tactical turn decision.
    
    Implements the 'Commander vs. Minister' pattern: The engine acts as the War Minister,
    pruning suicidal moves and scoring viable actions (1-100). The LLM acts as the Supreme
    Commander, selecting the winning action using strategic context and commander persona.
    """
    system_prompt = (
        "You are the Supreme Tactical Commander for the turn-based strategy game Gothic Fire. "
        "Your War Minister has pre-evaluated, scored (1-100), and vetted the viable legal actions for your army. "
        "Review the tactical situation and pick the single best action from the provided scored legal moves list. "
        "Commander directives: Favor high-scoring actions (>=60), exploit commander attribute synergies, "
        "ensure resource security, and fulfill castle garrison duty when assigned.\n"
        'Return output strictly as JSON matching: {"reasoning": "<step-by-step logic>", "chosen_move": "<one_of_legal_moves>"}.'
    )
    user_prompt = f"Turn: {turn}\nSituation: {state_summary}\nLegal moves: {legal_moves}"
    return system_prompt, user_prompt


# ==============================================================================
# Decomposed Specialized Advisor Prompt Builders
# ==============================================================================

def build_status_advisor_prompts(request: AdvisorRequest, persona_info: Dict) -> Tuple[str, str, int]:
    """Specialized prompt builder for imperial & battlefield STATUS assessment."""
    tokens_limit = int(os.getenv("AI_ADVISOR_STATUS_MAX_TOKENS", "260"))
    
    question_instruction = (
        'The player asks: "What is our current status?" '
        'Directly contrast our affairs (controlled territories, army power, gold & food upkeep) against our opponents. '
        'Deliver a concise, authoritative assessment of who holds the advantage and where threats lie.'
    )
    counsel_length_instruction = (
        "Provide a focused, authoritative battlefield and imperial status assessment in character (2-3 concise sentences, 45-65 words). "
        "Address troop counts, territory control, economic health/starvation risks, and key enemy threats. "
        'Return output strictly as JSON matching: {"advice": "<status assessment 45-65 words>", "key_points": ["<key standing point>", "<key threat or opportunity>"]}.'
    )
    
    sys_prompt = (
        f"{persona_info['system_prompt']}\n"
        "Role: Imperial State Auditor & Chief War Evaluator\n"
        f"Goal: {question_instruction}\n"
        f"{counsel_length_instruction}\n"
        f"{_COMMON_GROUNDING_RULES}"
    )
    
    user_prompt = (
        f"Turn: {request.turn}\n"
        f"Our Standing: {request.player_summary}\n"
        f"Rivals Standing: {request.opponents_summary}\n"
        f"Map & Economy: {request.map_summary}\n"
        f"Player Inquiry: {question_instruction}"
    )
    return sys_prompt, user_prompt, tokens_limit


def build_strategy_advisor_prompts(request: AdvisorRequest, persona_info: Dict) -> Tuple[str, str, int]:
    """Specialized prompt builder for long-term STRATEGY and grand campaign planning."""
    tokens_limit = int(os.getenv("AI_ADVISOR_STRATEGY_MAX_TOKENS", "160"))
    
    question_instruction = (
        'The player asks: "What is our strategy for the future?" '
        'Provide grand visionary counsel on long-term territorial expansion, capturing enemy castles, '
        'synergizing commander stats, and winning before Turn 80.'
    )
    counsel_length_instruction = (
        "Provide visionary grand strategy in character (2-3 sentences, 35-55 words) on long-term conquest and winning before Turn 80. "
        'Return output strictly as JSON matching: {"advice": "<grand strategy 35-55 words>", "key_points": ["<strategic goal 1>", "<strategic goal 2>"]}.'
    )
    
    sys_prompt = (
        f"{persona_info['system_prompt']}\n"
        "Role: Grand Campaign Strategist\n"
        f"Goal: {question_instruction}\n"
        f"{counsel_length_instruction}\n"
        f"{_COMMON_GROUNDING_RULES}"
    )
    
    user_prompt = (
        f"Turn: {request.turn}\n"
        f"Our Standing: {request.player_summary}\n"
        f"Rivals Standing: {request.opponents_summary}\n"
        f"Map & Economy: {request.map_summary}\n"
        f"Player Inquiry: {question_instruction}"
    )
    return sys_prompt, user_prompt, tokens_limit


def build_next_move_advisor_prompts(request: AdvisorRequest, persona_info: Dict) -> Tuple[str, str, int]:
    """Specialized prompt builder for immediate NEXT_MOVE tactical recommendations."""
    tokens_limit = int(os.getenv("AI_ADVISOR_MOVE_MAX_TOKENS", "120"))
    
    question_instruction = (
        'The player asks: "What should I do next?" '
        'Give concrete, immediate advice for this turn (e.g., whether to recruit Heavy/Light Infantry or Mages, '
        'collect unharvested resources from our sectors, fortify territory protection, or prepare to march).'
    )
    counsel_length_instruction = (
        "Provide decisive, immediate tactical counsel in character for this turn (1-2 sentences, 20-35 words). "
        "Prioritize any urgent Tactical Alerts (food deficit, undefended castle, imminent attacks) with top priority. "
        'Return output strictly as JSON matching: {"advice": "<decisive move 20-35 words>", "key_points": ["<action 1>", "<action 2>"]}.'
    )
    
    sys_prompt = (
        f"{persona_info['system_prompt']}\n"
        "Role: Immediate Tactical Field Consultant\n"
        f"Goal: {question_instruction}\n"
        f"{counsel_length_instruction}\n"
        f"{_COMMON_GROUNDING_RULES}"
    )
    
    user_prompt = (
        f"Turn: {request.turn}\n"
        f"Our Standing: {request.player_summary}\n"
        f"Rivals Standing: {request.opponents_summary}\n"
        f"Map & Economy: {request.map_summary}\n"
        f"Player Inquiry: {question_instruction}"
    )
    return sys_prompt, user_prompt, tokens_limit


def build_advisor_prompts(request: AdvisorRequest) -> Tuple[str, str, int, str]:
    """Unified dispatcher decomposing advisor consultation into specialized roles.
    
    Returns:
        (system_prompt, user_prompt, tokens_limit, advisor_name)
    """
    advisor_key = request.advisor_id.upper()
    persona_info = get_advisor_persona(advisor_key)
    advisor_name = persona_info["name"]

    q_type = request.question_type.upper()
    if q_type == "STATUS":
        sys_prompt, user_prompt, tokens_limit = build_status_advisor_prompts(request, persona_info)
    elif q_type == "STRATEGY":
        sys_prompt, user_prompt, tokens_limit = build_strategy_advisor_prompts(request, persona_info)
    else:  # NEXT_MOVE
        sys_prompt, user_prompt, tokens_limit = build_next_move_advisor_prompts(request, persona_info)

    return sys_prompt, user_prompt, tokens_limit, advisor_name
