from contextlib import asynccontextmanager
import logging
import os
import sys
import threading
import time
from typing import List, Optional, Tuple
from fastapi import APIRouter, FastAPI, HTTPException, Response, status
import uvicorn
import llama_cpp
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
    safe_parse_decision_json,
    safe_parse_advisor_json,
    sanitize_advisor_advice,
    get_advisor_fallback,
    LlamaCppLlm,
    run_decide_workflow,
    run_advisor_workflow,
    advisor_cache,
    decide_cache,
    _inference_lock,
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
AI_USE_MLOCK = os.getenv("AI_USE_MLOCK", "false").lower() in ("true", "1", "yes")
AI_ENABLE_RAM_CACHE = os.getenv("AI_ENABLE_RAM_CACHE", "false").lower() in ("true", "1", "yes")

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


# Global model instance (uses unified _inference_lock for safe serialized inference)
_llm: Optional[Llama] = None
_adk_llm: Optional[LlamaCppLlm] = None


def get_llm() -> Llama:
    global _llm
    if _llm is None:
        with _inference_lock:
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
                if AI_ENABLE_RAM_CACHE:
                    try:
                        _llm.set_cache(llama_cpp.LlamaRAMCache(capacity_bytes=128 * 1024 * 1024))
                        logger.info("Enabled 128MB in-memory KV prompt cache (LlamaRAMCache).")
                    except Exception as cache_err:
                        logger.warning(f"KV prompt cache could not be initialized: {cache_err}")
                logger.info("Model loaded successfully.")
    return _llm


def get_adk_llm() -> LlamaCppLlm:
    """Provides singleton LlamaCppLlm adapter wired to the local Llama instance."""
    global _adk_llm
    if _adk_llm is None:
        _adk_llm = LlamaCppLlm(
            model_path=MODEL_PATH,
            llm_getter=get_llm,
            n_ctx=N_CTX,
            n_threads=N_THREADS,
            n_batch=AI_BATCH,
            use_mlock=AI_USE_MLOCK
        )
    return _adk_llm


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        get_llm()
        get_adk_llm()
    except Exception as e:
        logger.error(f"Failed to load model during startup: {e}")
    yield


app = FastAPI(
    title="Gothic Fire Tactical AI Agent (Google ADK)",
    description="Google ADK graph-powered decision microservice for turn-based strategy game",
    version="2.0.0",
    lifespan=lifespan
)


async def decide_action(request: DecisionRequest) -> DecisionResponse:
    """Executes tactical decision via ADK DecideWorkflow with zero-compute short-circuiting."""
    return await run_decide_workflow(request, get_adk_llm())


async def consult_advisor(request: AdvisorRequest) -> AdvisorResponse:
    """Executes advisor consultation via ADK AdvisorWorkflow with persona guardrails."""
    return await run_advisor_workflow(request, get_adk_llm())


# Unified API v1 Router
api_v1_router = APIRouter(prefix="/api/v1")


@api_v1_router.post("/decide", response_model=DecisionResponse)
async def post_decide(request: DecisionRequest) -> DecisionResponse:
    """Primary tactical decision endpoint for computer player turns."""
    return await decide_action(request)


@api_v1_router.post("/advisor/consult", response_model=AdvisorResponse)
async def post_consult_advisor(request: AdvisorRequest) -> AdvisorResponse:
    """Advisor consultation endpoint providing thematic counsel."""
    return await consult_advisor(request)


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
        "engine": "google-adk-2.11.0",
        "model_path": MODEL_PATH,
        "model_loaded": model_loaded,
        "n_ctx": N_CTX,
        "n_threads": N_THREADS,
        "ram_rss_mb": rss_mb,
        "advisor_cache_size": advisor_cache.size(),
        "decide_cache_size": decide_cache.size()
    }


@app.get("/live")
def live():
    """Liveness probe endpoint returning 200 immediately."""
    return {"status": "alive"}


if __name__ == "__main__":
    logger.info(f"Starting Tactical AI Agent server on {AI_HOST}:{AI_PORT}...")
    uvicorn.run(app, host=AI_HOST, port=AI_PORT)
