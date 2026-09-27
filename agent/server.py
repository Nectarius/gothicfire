from contextlib import asynccontextmanager
import json
import logging
import os
import re
import sys
import threading
import time
from typing import List, Optional, Tuple
from fastapi import FastAPI, HTTPException, Response, status
from pydantic import BaseModel, Field, AliasChoices
import uvicorn
from llama_cpp import Llama

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("AiAgentServer")

# Model configuration
DEFAULT_MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "models",
    "qwen2.5-1.5b-instruct-q4_k_m.gguf"
)
MODEL_PATH = os.getenv("MODEL_PATH", DEFAULT_MODEL_PATH)
if not os.path.exists(MODEL_PATH):
    # Try relative path fallback
    rel_path = "./models/qwen2.5-1.5b-instruct-q4_k_m.gguf"
    if os.path.exists(rel_path):
        MODEL_PATH = rel_path
    elif os.path.exists("/app/models/qwen2.5-1.5b-instruct-q4_k_m.gguf"):
        MODEL_PATH = "/app/models/qwen2.5-1.5b-instruct-q4_k_m.gguf"
    elif os.path.exists("/models/qwen2.5-1.5b-instruct-q4_k_m.gguf"):
        MODEL_PATH = "/models/qwen2.5-1.5b-instruct-q4_k_m.gguf"

N_CTX = int(os.getenv("AI_CTX", "1024"))
N_THREADS = int(os.getenv("AI_THREADS", "4"))
AI_PORT = int(os.getenv("AI_PORT", "8000"))
AI_HOST = os.getenv("AI_HOST", "0.0.0.0")
AI_BATCH = int(os.getenv("AI_BATCH", "512"))
AI_USE_MLOCK = os.getenv("AI_USE_MLOCK", "true").lower() in ("true", "1", "yes")

def ensure_model_available():
    """Verifies model exists, or optionally downloads it if AUTO_DOWNLOAD_MODEL=true."""
    global MODEL_PATH
    if os.path.exists(MODEL_PATH):
        return
    auto_download = os.getenv("AUTO_DOWNLOAD_MODEL", "false").lower() in ("true", "1", "yes")
    if auto_download:
        download_url = os.getenv(
            "MODEL_DOWNLOAD_URL",
            "https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/qwen2.5-1.5b-instruct-q4_k_m.gguf"
        )
        target_dir = os.path.dirname(os.path.abspath(MODEL_PATH))
        os.makedirs(target_dir, exist_ok=True)
        logger.info(f"Model not found at {MODEL_PATH}. Downloading from {download_url}...")
        import urllib.request
        def _reporthook(blocknum, blocksize, totalsize):
            if totalsize > 0 and blocknum % 10000 == 0:
                percent = blocknum * blocksize * 100 / totalsize
                logger.info(f"Downloading model: {percent:.1f}% ({blocknum * blocksize / (1024*1024):.1f} MB / {totalsize / (1024*1024):.1f} MB)")
        temp_path = f"{MODEL_PATH}.part"
        urllib.request.urlretrieve(download_url, temp_path, reporthook=_reporthook)
        os.replace(temp_path, MODEL_PATH)
        logger.info(f"Model successfully saved to {MODEL_PATH}")


# Request and Response schemas
class DecisionRequest(BaseModel):
    game_id: str = Field(
        default="",
        validation_alias=AliasChoices("game_id", "gameId"),
        description="ID of the game session"
    )
    turn: int = Field(
        default=1,
        description="Current game turn number"
    )
    player_id: str = Field(
        default="",
        validation_alias=AliasChoices("player_id", "playerId"),
        description="ID of the computer player/character"
    )
    state_summary: str = Field(
        default="",
        validation_alias=AliasChoices("state_summary", "summary"),
        description="Summary of current game state and battlefield situation"
    )
    legal_moves: List[str] = Field(
        default_factory=list,
        validation_alias=AliasChoices("legal_moves", "legalMoves"),
        description="List of legal moves available to choose from"
    )

    model_config = {
        "populate_by_name": True
    }


class DecisionResponse(BaseModel):
    chosen_move: str = Field(description="Selected move from legal_moves")
    reasoning: str = Field(description="Short rationale for the choice")


class AdvisorRequest(BaseModel):
    game_id: str = Field(default="", validation_alias=AliasChoices("game_id", "gameId"))
    turn: int = Field(default=1)
    player_id: str = Field(default="", validation_alias=AliasChoices("player_id", "playerId"))
    advisor_id: str = Field(default="ZORAX", validation_alias=AliasChoices("advisor_id", "advisorId"))
    advisor_name: str = Field(default="Zorax the Mighty", validation_alias=AliasChoices("advisor_name", "advisorName"))
    question_type: str = Field(default="STATUS", validation_alias=AliasChoices("question_type", "questionType"))
    player_team: str = Field(default="RED", validation_alias=AliasChoices("player_team", "playerTeam"))
    player_summary: str = Field(default="", validation_alias=AliasChoices("player_summary", "playerSummary"))
    opponents_summary: str = Field(default="", validation_alias=AliasChoices("opponents_summary", "opponentsSummary"))
    map_summary: str = Field(default="", validation_alias=AliasChoices("map_summary", "mapSummary"))

    model_config = {
        "populate_by_name": True
    }


class AdvisorResponse(BaseModel):
    advisor_name: str
    advisorName: Optional[str] = None
    question_type: str
    questionType: Optional[str] = None
    advice: str
    key_points: List[str] = Field(default_factory=list)
    keyPoints: Optional[List[str]] = None


ADVISOR_PERSONAS = {
    "ZORAX": {
        "name": "Zorax the Mighty",
        "system_prompt": (
            "You are Zorax the Mighty, a seasoned grey-haired military general and tactical war advisor in the dark turn-based strategy game Gothic Fire. "
            "You have survived a hundred sieges and battlefields. You speak with blunt martial authority, stern discipline, grim grit, and uncompromising loyalty. "
            "Address the player as 'Commander' or 'Sire'. Your military doctrine prioritizes secure castle garrisons, overwhelming force, heavy infantry discipline, and crushing counter-attacks."
        )
    },
    "JADE": {
        "name": "Jade the Enlightened",
        "system_prompt": (
            "You are Jade the Enlightened, an arcane high sorceress with flowing velvet hair and deep mystical foresight in the strategy game Gothic Fire. "
            "You speak with elegant, perceptive, and enigmatic wisdom. You perceive unseen currents of magical ether and economic destiny. "
            "Address the player as 'My Lord', 'Commander', or 'Seeker'. Your strategic doctrine prioritizes cultivation of resources, Mage synergies, territory protection, and calculating grand long-term moves."
        )
    }
}


# Global model instance and thread lock for safe serialized inference
_model_lock = threading.Lock()
_llm: Optional[Llama] = None


def get_llm() -> Llama:
    global _llm
    if _llm is None:
        with _model_lock:
            if _llm is None:
                ensure_model_available()
                if not os.path.exists(MODEL_PATH):
                    raise RuntimeError(f"Model file not found at: {MODEL_PATH}")
                logger.info(f"Loading GGUF model from {MODEL_PATH} (n_ctx={N_CTX}, n_threads={N_THREADS}, n_batch={AI_BATCH}, mlock={AI_USE_MLOCK})...")
                _llm = Llama(
                    model_path=MODEL_PATH,
                    n_ctx=N_CTX,
                    n_threads=N_THREADS,
                    n_batch=AI_BATCH,
                    use_mlock=AI_USE_MLOCK,
                    verbose=False
                )
                logger.info("Model loaded successfully.")
    return _llm


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        get_llm()
    except Exception as e:
        logger.error(f"Failed to load model during startup: {e}")
    yield


app = FastAPI(
    title="Gothic Fire Tactical AI Agent",
    description="Local LLM decision microservice for turn-based strategy game computer party",
    version="1.0.0",
    lifespan=lifespan
)


def decide_action(request: DecisionRequest) -> DecisionResponse:
    legal_moves = request.legal_moves

    # If no legal moves provided, return safe default
    if not legal_moves:
        logger.warning("Empty legal_moves received. Returning WAIT fallback.")
        return DecisionResponse(
            chosen_move="WAIT",
            reasoning="Fallback: No legal moves were provided in request."
        )

    fallback_move = legal_moves[0]
    llm = get_llm()

    # ChatML system & user prompt markup as specified
    system_prompt = (
        "You are a master tactical AI for the turn-based strategy game Gothic Fire. "
        "Review the tactical situation and pick the single best action from the provided legal moves list. "
        "Tactical rules: Prioritize favorable combat (>=60% win chance), recruit units matching commander stats, "
        "harvest uncollected resources, and NEVER pick suicidal attacks (<40% win chance). If on garrison duty, stay at castle. "
        'Return output strictly as JSON matching: {"chosen_move": "<one_of_legal_moves>", "reasoning": "<short rationale under 15 words>"}.'
    )
    user_prompt = f"Turn: {request.turn}\nSituation: {request.state_summary}\nLegal moves: {legal_moves}"

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    try:
        t0 = time.perf_counter()
        with _model_lock:
            completion = llm.create_chat_completion(
                messages=messages,
                temperature=0.1,
                response_format={"type": "json_object"},
                max_tokens=45
            )
        elapsed = time.perf_counter() - t0
        logger.info(f"Tactical move decided in {elapsed:.2f}s (turn: {request.turn})")

        content = completion["choices"][0]["message"]["content"].strip()
        logger.debug(f"LLM raw response: {content}")

        # Strip markdown fences if present
        if content.startswith("```"):
            lines = content.splitlines()
            if lines and lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].strip().startswith("```"):
                lines = lines[:-1]
            content = "\n".join(lines).strip()

        data = json.loads(content)
        chosen_move = str(data.get("chosen_move", "")).strip()
        reasoning = str(data.get("reasoning", "")).strip()

        # Safety & Fallback: Verify chosen_move is present in legal_moves
        if chosen_move not in legal_moves:
            logger.warning(
                f"LLM chosen move '{chosen_move}' not in legal_moves: {legal_moves}. "
                f"Original reasoning: '{reasoning}'. Falling back to: '{fallback_move}'"
            )
            return DecisionResponse(
                chosen_move=fallback_move,
                reasoning="Fallback: LLM selected illegal or hallucinated move"
            )

        return DecisionResponse(
            chosen_move=chosen_move,
            reasoning=reasoning if reasoning else "Tactical choice by AI model"
        )

    except json.JSONDecodeError as jde:
        logger.error(f"Failed to parse LLM JSON response: {jde}. Raw content was: {content!r}")
        return DecisionResponse(
            chosen_move=fallback_move,
            reasoning="Fallback: LLM selected illegal or hallucinated move"
        )
    except Exception as e:
        logger.error(f"Error during inference: {e}", exc_info=True)
        return DecisionResponse(
            chosen_move=fallback_move,
            reasoning=f"Fallback: Inference exception ({type(e).__name__}): {str(e)}"
        )


@app.post("/decide", response_model=DecisionResponse)
def post_decide(request: DecisionRequest) -> DecisionResponse:
    """Primary decision endpoint."""
    return decide_action(request)


@app.post("/decision", response_model=DecisionResponse)
def post_decision(request: DecisionRequest) -> DecisionResponse:
    """Alternative alias endpoint."""
    return decide_action(request)


@app.post("/api/v1/agent/decide-turn", response_model=DecisionResponse)
def post_decide_turn(request: DecisionRequest) -> DecisionResponse:
    """Endpoint matching AI_AGENT_ENDPOINT in .env."""
    return decide_action(request)


def consult_advisor(request: AdvisorRequest) -> AdvisorResponse:
    """Generates thematic tactical and strategic advice based on chosen advisor persona and question type."""
    advisor_key = request.advisor_id.upper()
    persona_info = ADVISOR_PERSONAS.get(advisor_key, ADVISOR_PERSONAS["ZORAX"])
    advisor_name = persona_info["name"]

    q_type = request.question_type.upper()
    if q_type == "STATUS":
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
    elif q_type == "STRATEGY":
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
    else:  # NEXT_MOVE
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

    logger.info(f"Received advisor consultation for {advisor_name} (type: {q_type}, turn: {request.turn}, max_tokens: {tokens_limit})")
    sys_prompt = (
        f"{persona_info['system_prompt']}\n"
        f"Query Type: {q_type}\n"
        f"Goal: {question_instruction}\n"
        f"{counsel_length_instruction}\n"
        "STRICT GROUNDING & FACTUAL ACCURACY RULES:\n"
        "- ONLY refer to unit types that exist in Our Standing with count > 0. If Our Standing notes 0 Mages, we have NO Mages! NEVER state or hallucinate that we have Mages; if appropriate, recommend recruiting them to unlock magical synergies.\n"
        "- Hero attributes (e.g. Archon, Warlord, Vanguard ratings) are leader attributes, NOT soldier counts. Never refer to hero attributes as troops.\n"
        "- The exact unit counts must match Our Standing. Never invent unit counts that conflict with Our Standing.\n"
        "- Distinguish strictly between friendly forces ('Our Standing') and enemy forces ('Rivals Standing'). NEVER assign our units or sector locations to the enemy, or vice versa.\n"
        "- Check frontline clash reports carefully: notice who holds the advantage and who is on the offensive."
    )

    user_prompt = (
        f"Turn: {request.turn}\n"
        f"Our Standing: {request.player_summary}\n"
        f"Rivals Standing: {request.opponents_summary}\n"
        f"Map & Economy: {request.map_summary}\n"
        f"Player Inquiry: {question_instruction}"
    )

    # In-character fallbacks in case of timeout or inference exception
    fallback_map = {
        ("ZORAX", "STATUS"): (
            "Commander, our garrison is established, but the enemy lurks on our borders. "
            "Keep your guard up and ensure our castle is never left unattended."
        ),
        ("ZORAX", "NEXT_MOVE"): (
            "Recruit Heavy Infantry if the treasury permits, Sire. A solid front line is the bedrock of every successful campaign."
        ),
        ("ZORAX", "STRATEGY"): (
            "Fortify our forward sectors and march directly upon their castle. Overwhelming force leaves no room for enemy trickery."
        ),
        ("JADE", "STATUS"): (
            "The arcane tides flow with our colors, My Lord, yet the rivals gather strength in the shadows. "
            "Keep a close eye on their troop counts."
        ),
        ("JADE", "NEXT_MOVE"): (
            "Tend to our cultivation and gather unharvested gold, Commander. True dominance begins with a flourishing treasury."
        ),
        ("JADE", "STRATEGY"): (
            "Cultivate our lands and assemble high-tier Mages. When the enemy stretches their lines too thin, strike at their heart."
        )
    }
    fallback_advice = fallback_map.get(
        (advisor_key, q_type),
        f"Hold fast, Commander. Weigh your moves with care on turn {request.turn}."
    )

    # Safe parsing helper
    def safe_parse_advisor_json(raw_text: str) -> Tuple[Optional[str], List[str]]:
        text = raw_text.strip()
        if text.startswith("```"):
            lines = text.splitlines()
            if lines and lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].strip().startswith("```"):
                lines = lines[:-1]
            text = "\n".join(lines).strip()

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

    try:
        llm = get_llm()
        messages = [
            {"role": "system", "content": sys_prompt},
            {"role": "user", "content": user_prompt}
        ]

        logger.info(f"Advisor prompt:\n{user_prompt}")
        t0 = time.perf_counter()
        with _model_lock:
            completion = llm.create_chat_completion(
                messages=messages,
                temperature=0.1,
                response_format={"type": "json_object"},
                max_tokens=tokens_limit
            )
        elapsed = time.perf_counter() - t0
        logger.info(f"Advisor counsel generated in {elapsed:.2f}s for {advisor_name} ({q_type}, max_tokens={tokens_limit})")

        content = completion["choices"][0]["message"]["content"].strip()
        logger.info(f"Advisor raw response: {content}")

        parsed_advice, parsed_key_points = safe_parse_advisor_json(content)
        final_advice = parsed_advice or fallback_advice
        final_key_points = parsed_key_points or ["Maintain vigilant watch", "Strike when prepared"]

        # Safeguard: if player has 0 Mages, prevent false claims of possessing Mages
        if "0 Mages" in request.player_summary:
            final_advice = re.sub(
                r'(?<!recruit\s)(?<!train\s)(?<!summon\s)\b\d+\s+Mages\b,?\s*(?:and\s+)?',
                '',
                final_advice,
                flags=re.IGNORECASE
            )

        return AdvisorResponse(
            advisor_name=advisor_name,
            advisorName=advisor_name,
            question_type=q_type,
            questionType=q_type,
            advice=final_advice,
            key_points=final_key_points,
            keyPoints=final_key_points
        )

    except Exception as e:
        logger.warning(f"Advisor consultation exception ({e}). Using in-character fallback counsel.")
        return AdvisorResponse(
            advisor_name=advisor_name,
            advisorName=advisor_name,
            question_type=q_type,
            questionType=q_type,
            advice=fallback_advice,
            key_points=["Inspect border defenses", "Bolster economic reserve"],
            keyPoints=["Inspect border defenses", "Bolster economic reserve"]
        )


@app.post("/api/advisor/consult", response_model=AdvisorResponse)
@app.post("/decide/api/advisor/consult", response_model=AdvisorResponse)
def post_consult_advisor(request: AdvisorRequest) -> AdvisorResponse:
    """Advisor consultation endpoint."""
    return consult_advisor(request)


@app.post("/advisor", response_model=AdvisorResponse)
@app.post("/decide/advisor", response_model=AdvisorResponse)
def post_advisor_alias(request: AdvisorRequest) -> AdvisorResponse:
    """Advisor consultation alias endpoint."""
    return consult_advisor(request)


@app.get("/health")
def health(response: Response):
    """Health check endpoint displaying model status and parameters. Returns 503 if model is not loaded."""
    model_loaded = _llm is not None
    if not model_loaded:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE

    rss_mb = 0.0
    try:
        with open("/proc/self/status", "r") as f:
            for line in f:
                if line.startswith("VmRSS:"):
                    rss_mb = round(int(line.split()[1]) / 1024.0, 2)
                    break
    except Exception:
        pass

    return {
        "status": "healthy" if model_loaded else "uninitialized",
        "model_path": MODEL_PATH,
        "model_loaded": model_loaded,
        "n_ctx": N_CTX,
        "n_threads": N_THREADS,
        "ram_rss_mb": rss_mb
    }


@app.get("/live")
def live():
    """Liveness probe endpoint returning 200 immediately."""
    return {"status": "alive"}



if __name__ == "__main__":
    logger.info(f"Starting Tactical AI Agent server on {AI_HOST}:{AI_PORT}...")
    uvicorn.run(app, host=AI_HOST, port=AI_PORT)
