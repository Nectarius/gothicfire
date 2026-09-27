"""JSON extraction, repair, fallbacks, and validation for AI completions."""

import json
import logging
import re
from typing import Dict, List, Optional, Tuple
from .schemas import DecisionResponse

logger = logging.getLogger("AiAgentCore.Parser")

ADVISOR_FALLBACK_MAP: Dict[Tuple[str, str], Tuple[str, List[str]]] = {
    ("ZORAX", "STATUS"): (
        "Commander, our garrison is established, but the enemy lurks on our borders. "
        "Keep your guard up and ensure our castle is never left unattended.",
        ["Maintain castle garrison", "Watch enemy border movements"]
    ),
    ("ZORAX", "NEXT_MOVE"): (
        "Recruit Heavy Infantry if the treasury permits, Sire. A solid front line is the bedrock of every successful campaign.",
        ["Recruit Heavy Infantry", "Reinforce front line"]
    ),
    ("ZORAX", "STRATEGY"): (
        "Fortify our forward sectors and march directly upon their castle. Overwhelming force leaves no room for enemy trickery.",
        ["Fortify forward sectors", "March on opposing fortress"]
    ),
    ("JADE", "STATUS"): (
        "The arcane tides flow with our colors, My Lord, yet the rivals gather strength in the shadows. "
        "Keep a close eye on their troop counts.",
        ["Monitor rival troop counts", "Preserve arcane reserves"]
    ),
    ("JADE", "NEXT_MOVE"): (
        "Tend to our cultivation and gather unharvested gold, Commander. True dominance begins with a flourishing treasury.",
        ["Harvest territory resources", "Amplify economic growth"]
    ),
    ("JADE", "STRATEGY"): (
        "Cultivate our lands and assemble high-tier Mages. When the enemy stretches their lines too thin, strike at their heart.",
        ["Cultivate high-yield lands", "Assemble Mage legions"]
    )
}


def clean_json_markdown(raw_text: str) -> str:
    """Strips markdown code fences (```json ... ```) from raw model output."""
    text = (raw_text or "").strip()
    if text.startswith("```"):
        lines = text.splitlines()
        if lines and lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip().startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    return text


def match_legal_move(candidate: str, legal_moves: List[str]) -> Optional[str]:
    """Matches a candidate move string against legal_moves, supporting tagged metadata."""
    if not candidate or not legal_moves:
        return None
    cand_clean = candidate.strip()
    # 1. Exact match
    if cand_clean in legal_moves:
        return cand_clean
    # 2. Case-insensitive match
    for m in legal_moves:
        if cand_clean.lower() == m.lower():
            return m
    # 3. Base move match (ignoring parentheses/metadata tags)
    cand_base = cand_clean.split("(")[0].strip().lower()
    for m in legal_moves:
        m_base = m.split("(")[0].strip().lower()
        if cand_base == m_base:
            return m
    # 4. Substring / prefix containment
    for m in legal_moves:
        if cand_clean.lower() in m.lower() or m.lower() in cand_clean.lower():
            return m
    return None


def safe_parse_decision_json(
    raw_text: str,
    legal_moves: List[str],
    fallback_move: Optional[str] = None
) -> DecisionResponse:
    """Parses and validates tactical decision JSON, supporting Chain-of-Thought (CoT) where reasoning precedes chosen_move."""
    default_fallback = fallback_move or (legal_moves[0] if legal_moves else "WAIT")
    content = clean_json_markdown(raw_text)

    # 1. Direct JSON parse
    try:
        data = json.loads(content)
        if isinstance(data, dict):
            raw_chosen = str(data.get("chosen_move", "")).strip()
            reasoning = str(data.get("reasoning", "")).strip()
            matched = match_legal_move(raw_chosen, legal_moves)
            if matched:
                return DecisionResponse(
                    chosen_move=matched,
                    reasoning=reasoning if reasoning else "Tactical choice by AI model"
                )
            elif raw_chosen:
                logger.warning(
                    f"LLM chosen move '{raw_chosen}' not in legal_moves: {legal_moves}. "
                    f"Original reasoning: '{reasoning}'. Falling back to: '{default_fallback}'"
                )
                return DecisionResponse(
                    chosen_move=default_fallback,
                    reasoning="Fallback: LLM selected illegal or hallucinated move"
                )
    except Exception:
        pass

    # 2. Repair truncated JSON if unclosed quote / brace
    repaired = content.strip()
    if not repaired.endswith("}"):
        if repaired.count('"') % 2 != 0:
            repaired += '"'
        if repaired.count('{') > repaired.count('}'):
            repaired += '}'
        try:
            data = json.loads(repaired)
            if isinstance(data, dict):
                raw_chosen = str(data.get("chosen_move", "")).strip()
                reasoning = str(data.get("reasoning", "")).strip()
                matched = match_legal_move(raw_chosen, legal_moves)
                if matched:
                    return DecisionResponse(
                        chosen_move=matched,
                        reasoning=reasoning if reasoning else "Tactical choice by AI model"
                    )
        except Exception:
            pass

    # 3. Regex fallback to salvage reasoning and chosen_move (supporting CoT order: reasoning then chosen_move)
    cm_match = re.search(r'"chosen_move"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', content)
    if not cm_match:
        # Try unclosed trailing quote
        cm_match = re.search(r'"chosen_move"\s*:\s*"([^"\\]+)', content)
    
    if cm_match:
        extracted_move = cm_match.group(1).strip()
        matched = match_legal_move(extracted_move, legal_moves)
        if matched:
            rs_match = re.search(r'"reasoning"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', content)
            if not rs_match:
                rs_match = re.search(r'"reasoning"\s*:\s*"([^"\\]*)', content)
            salvaged_reason = rs_match.group(1).strip() if rs_match else "Tactical choice by AI model"
            return DecisionResponse(
                chosen_move=matched,
                reasoning=salvaged_reason
            )

    logger.warning(
        f"Failed to extract valid move from LLM output: {content!r}. Falling back to: '{default_fallback}'"
    )
    return DecisionResponse(
        chosen_move=default_fallback,
        reasoning="Fallback: LLM selected illegal or hallucinated move"
    )


def safe_parse_advisor_json(raw_text: str) -> Tuple[Optional[str], List[str]]:
    """Robustly parses advisor consultation JSON, handling markdown, unclosed braces, and truncated strings."""
    text = clean_json_markdown(raw_text)

    # 1. Normal JSON load
    try:
        parsed = json.loads(text)
        if isinstance(parsed, dict):
            adv = parsed.get("advice")
            kps = parsed.get("key_points", [])
            if isinstance(adv, str) and adv.strip():
                return adv.strip(), [str(kp) for kp in kps if kp]
    except Exception:
        pass

    # 2. Repair truncated JSON (unclosed string/brackets/braces)
    repaired = text.strip()
    if not repaired.endswith("}"):
        if repaired.count('"') % 2 != 0:
            repaired += '"'
        if repaired.count('[') > repaired.count(']'):
            repaired += ']'
        if repaired.count('{') > repaired.count('}'):
            repaired += '}'
        try:
            parsed = json.loads(repaired)
            if isinstance(parsed, dict):
                adv = parsed.get("advice")
                kps = parsed.get("key_points", [])
                if isinstance(adv, str) and adv.strip():
                    return adv.strip(), [str(kp) for kp in kps if kp]
        except Exception:
            pass

    # 3. Regex fallback extraction for unclosed strings
    adv_match = re.search(r'"advice"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)', text)
    adv = adv_match.group(1).replace('\\"', '"').replace('\\n', ' ').strip() if adv_match else None

    kps = []
    kp_match = re.search(r'"key_points"\s*:\s*\[(.*)', text, re.DOTALL)
    if kp_match:
        found = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', kp_match.group(1))
        kps = [k.replace('\\"', '"').strip() for k in found if k.strip()]

    # Clean up any trailing cut-off sentence fragment if truncated
    if adv and not adv.endswith(('.', '!', '?')) and len(adv) > 25:
        last_punct = max(adv.rfind('.'), adv.rfind('!'), adv.rfind('?'))
        if last_punct > len(adv) // 2:
            adv = adv[:last_punct + 1].strip()

    return adv, kps


def sanitize_advisor_advice(advice: str, player_summary: str) -> str:
    """Sanitizes advisor advice against factual inaccuracies like claiming 0-count units are in army."""
    result = advice
    # Safeguard: if player has 0 Mages, prevent false claims of possessing Mages
    if "0 Mages" in (player_summary or ""):
        result = re.sub(
            r'(?<!recruit\s)(?<!train\s)(?<!summon\s)\b\d+\s+Mages\b,?\s*(?:and\s+)?',
            '',
            result,
            flags=re.IGNORECASE
        )
    return result.strip()


def get_advisor_fallback(advisor_id: str, question_type: str, turn: int = 1) -> Tuple[str, List[str]]:
    """Returns in-character fallback advice and key points for timeouts or inference errors."""
    key = (str(advisor_id or "").upper().strip(), str(question_type or "").upper().strip())
    fallback = ADVISOR_FALLBACK_MAP.get(key)
    if fallback:
        return fallback[0], list(fallback[1])
    return (
        f"Hold fast, Commander. Weigh your moves with care on turn {turn}.",
        ["Maintain vigilant watch", "Strike when prepared"]
    )
