from contextlib import asynccontextmanager
import logging
import os
import sys
import threading
import time
from typing import List, Optional, Tuple
from fastapi import APIRouter, FastAPI, HTTPException, Response, status
import uvicorn
from llama_cpp import Llama

# Ensure agent directory and repo root are in sys.path for direct script execution
_AGENT_DIR = os.path.dirname(os.path.abspath(__file__))
if _AGENT_DIR not in sys.path:
    sys.path.insert(0, _AGENT_DIR)
_REPO_DIR = os.path.dirname(_AGENT_DIR)
if _REPO_DIR not in sys.path:
    sys.path.insert(0, _REPO_DIR)

from core import (
    DecisionRequest,
    DecisionResponse,
    AdvisorRequest,
    AdvisorResponse,
    ADVISOR_PERSONAS,
    get_advisor_persona,
    build_decision_prompts,
    build_advisor_prompts,
    build_status_advisor_prompts,
    build_strategy_advisor_prompts,
    build_next_move_advisor_prompts,
    safe_parse_decision_json,
    safe_parse_advisor_json,
    sanitize_advisor_advice,
    get_advisor_fallback,
)

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

N_CTX = int(os.getenv("AI_CTX", "2048"))
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

    system_prompt, user_prompt = build_decision_prompts(
        turn=request.turn,
        state_summary=request.state_summary,
        legal_moves=legal_moves
    )

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    try:
        decide_max_tokens = int(os.getenv("AI_DECIDE_MAX_TOKENS", "180"))
        t0 = time.perf_counter()
        with _model_lock:
            completion = llm.create_chat_completion(
                messages=messages,
                temperature=0.1,
                response_format={"type": "json_object"},
                max_tokens=decide_max_tokens
            )
        elapsed = time.perf_counter() - t0
        logger.info(f"Tactical move decided in {elapsed:.2f}s (turn: {request.turn})")

        content = completion["choices"][0]["message"]["content"].strip()
        logger.debug(f"LLM raw response: {content}")

        return safe_parse_decision_json(content, legal_moves, fallback_move)

    except Exception as e:
        logger.error(f"Error during inference: {e}", exc_info=True)
        return DecisionResponse(
            chosen_move=fallback_move,
            reasoning=f"Fallback: Inference exception ({type(e).__name__}): {str(e)}"
        )


def _execute_advisor_inference(
    sys_prompt: str,
    user_prompt: str,
    tokens_limit: int,
    advisor_name: str,
    q_type: str,
    request: AdvisorRequest
) -> AdvisorResponse:
    """Thread-safe inference execution, JSON parsing, sanitization, and fallback for advisor consultation."""
    fallback_advice, fallback_kps = get_advisor_fallback(request.advisor_id, q_type, request.turn)
    logger.info(f"Received advisor consultation for {advisor_name} (type: {q_type}, turn: {request.turn}, max_tokens: {tokens_limit})")

    try:
        llm = get_llm()
        messages = [
            {"role": "system", "content": sys_prompt},
            {"role": "user", "content": user_prompt}
        ]

        logger.info(f"Advisor prompt ({q_type}):\n{user_prompt}")
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
        final_key_points = parsed_key_points or fallback_kps

        final_advice = sanitize_advisor_advice(final_advice, request.player_summary)

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
            key_points=fallback_kps,
            keyPoints=fallback_kps
        )


def consult_status_advisor(request: AdvisorRequest) -> AdvisorResponse:
    """Specialized advisor handler for imperial & battlefield STATUS auditing."""
    persona_info = get_advisor_persona(request.advisor_id.upper())
    sys_prompt, user_prompt, tokens_limit = build_status_advisor_prompts(request, persona_info)
    return _execute_advisor_inference(sys_prompt, user_prompt, tokens_limit, persona_info["name"], "STATUS", request)


def consult_strategy_advisor(request: AdvisorRequest) -> AdvisorResponse:
    """Specialized advisor handler for long-term STRATEGY and grand campaign planning."""
    persona_info = get_advisor_persona(request.advisor_id.upper())
    sys_prompt, user_prompt, tokens_limit = build_strategy_advisor_prompts(request, persona_info)
    return _execute_advisor_inference(sys_prompt, user_prompt, tokens_limit, persona_info["name"], "STRATEGY", request)


def consult_next_move_advisor(request: AdvisorRequest) -> AdvisorResponse:
    """Specialized advisor handler for immediate NEXT_MOVE tactical recommendations."""
    persona_info = get_advisor_persona(request.advisor_id.upper())
    sys_prompt, user_prompt, tokens_limit = build_next_move_advisor_prompts(request, persona_info)
    return _execute_advisor_inference(sys_prompt, user_prompt, tokens_limit, persona_info["name"], "NEXT_MOVE", request)


def consult_advisor(request: AdvisorRequest) -> AdvisorResponse:
    """Dispatches consultation request to decomposed, specialized prompt handlers based on task type."""
    q_type = request.question_type.upper()
    if q_type == "STATUS":
        return consult_status_advisor(request)
    elif q_type == "STRATEGY":
        return consult_strategy_advisor(request)
    else:
        return consult_next_move_advisor(request)


# Unified API v1 Router
api_v1_router = APIRouter(prefix="/api/v1")


@api_v1_router.post("/decide", response_model=DecisionResponse)
def post_decide(request: DecisionRequest) -> DecisionResponse:
    """Primary tactical decision endpoint for computer player turns."""
    return decide_action(request)


@api_v1_router.post("/advisor/consult", response_model=AdvisorResponse)
def post_consult_advisor(request: AdvisorRequest) -> AdvisorResponse:
    """Advisor consultation endpoint providing thematic counsel."""
    return consult_advisor(request)


app.include_router(api_v1_router)


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
