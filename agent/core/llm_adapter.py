"""In-process Google ADK BaseLlm adapter for local llama-cpp-python GGUF models.

Enables ADK Agents and Workflows to perform local offline inference directly
without spawning extra subprocesses or HTTP loopback daemons.
"""

import asyncio
import logging
import os
import threading
import time
from typing import Any, AsyncGenerator, Callable, Dict, List, Optional

from google.genai import types
from google.adk.models import BaseLlm, LlmRequest, LlmResponse
from llama_cpp import Llama

logger = logging.getLogger("AiAgentCore.LlmAdapter")

# Global thread lock for serialized CPU inference and model operations
_inference_lock = threading.Lock()

# Async lock to prevent unbounded thread pool congestion
_async_inference_lock: Optional[asyncio.Lock] = None
_lock_loop = None


def get_async_inference_lock() -> asyncio.Lock:
    """Returns an asyncio.Lock bound to the current running event loop."""
    global _async_inference_lock, _lock_loop
    try:
        current_loop = asyncio.get_running_loop()
    except RuntimeError:
        current_loop = None

    if _async_inference_lock is None or _lock_loop != current_loop:
        _async_inference_lock = asyncio.Lock()
        _lock_loop = current_loop
    return _async_inference_lock


class LlamaCppLlm(BaseLlm):
    """Google ADK BaseLlm implementation wrapping llama-cpp-python."""

    model: str = "qwen2.5-1.5b-instruct"
    model_path: str = ""
    n_ctx: int = 2048
    n_threads: int = 4
    n_batch: int = 512
    use_mlock: bool = False

    # Private attributes for in-memory model lifecycle
    _llm: Optional[Llama] = None
    _llm_getter: Optional[Callable[[], Llama]] = None

    def __init__(
        self,
        model_path: Optional[str] = None,
        llm_instance: Optional[Llama] = None,
        llm_getter: Optional[Callable[[], Llama]] = None,
        **kwargs: Any
    ):
        m_path = model_path or os.getenv("MODEL_PATH", "")
        super().__init__(model_path=m_path, **kwargs)
        if llm_instance is not None:
            self._llm = llm_instance
        if llm_getter is not None:
            self._llm_getter = llm_getter

    def get_underlying_llm(self) -> Llama:
        """Retrieves or lazily initializes the underlying Llama instance."""
        if self._llm_getter is not None:
            return self._llm_getter()

        if self._llm is None:
            with _inference_lock:
                if self._llm is None:
                    path = self.model_path or "./models/qwen2.5-1.5b-instruct-q4_k_m.gguf"
                    if not os.path.exists(path):
                        # Try relative paths
                        candidates = [
                            path,
                            "./models/qwen2.5-1.5b-instruct-q4_k_m.gguf",
                            "/app/models/qwen2.5-1.5b-instruct-q4_k_m.gguf",
                            "/models/qwen2.5-1.5b-instruct-q4_k_m.gguf"
                        ]
                        for c in candidates:
                            if os.path.exists(c):
                                path = c
                                break
                    logger.info(f"LlamaCppLlm initializing model from: {path}")
                    self._llm = Llama(
                        model_path=path,
                        n_ctx=self.n_ctx,
                        n_threads=self.n_threads,
                        n_batch=self.n_batch,
                        use_mlock=self.use_mlock,
                        verbose=False
                    )
        return self._llm

    def _convert_request_to_messages(self, llm_request: LlmRequest) -> List[Dict[str, str]]:
        """Converts ADK LlmRequest into OpenAI/ChatML message list."""
        messages: List[Dict[str, str]] = []

        # 1. System instructions
        if llm_request.config and llm_request.config.system_instruction:
            si = llm_request.config.system_instruction
            sys_text = ""
            if isinstance(si, str):
                sys_text = si
            elif hasattr(si, "parts") and si.parts:
                sys_text = "\n".join(p.text for p in si.parts if getattr(p, "text", None))
            elif isinstance(si, list):
                sys_text = "\n".join(str(item) for item in si)

            if sys_text.strip():
                messages.append({"role": "system", "content": sys_text.strip()})

        # 2. Conversation turns
        for content in llm_request.contents:
            role = "assistant" if content.role == "model" else (content.role or "user")
            text_parts = []
            if content.parts:
                for part in content.parts:
                    if getattr(part, "text", None):
                        text_parts.append(part.text)
            body = "\n".join(text_parts).strip()
            if body:
                messages.append({"role": role, "content": body})

        return messages

    def _sync_generate(
        self,
        messages: List[Dict[str, str]],
        max_tokens: int,
        temperature: float,
        stop: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """Executes model completion under thread lock."""
        llm = self.get_underlying_llm()
        with _inference_lock:
            kwargs: Dict[str, Any] = {
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens,
                "response_format": {"type": "json_object"}
            }
            if stop:
                kwargs["stop"] = stop

            completion = llm.create_chat_completion(**kwargs)
            return completion

    async def generate_content_async(
        self,
        llm_request: LlmRequest,
        stream: bool = False
    ) -> AsyncGenerator[LlmResponse, None]:
        """Asynchronously executes local model inference and yields ADK LlmResponse."""
        messages = self._convert_request_to_messages(llm_request)
        if not messages:
            messages = [{"role": "user", "content": "Analyze state and provide output in JSON format."}]

        # Extract generation configuration options
        temperature = 0.1
        max_tokens = 180
        stop_seqs: Optional[List[str]] = None

        if llm_request.config:
            if getattr(llm_request.config, "temperature", None) is not None:
                temperature = float(llm_request.config.temperature)
            if getattr(llm_request.config, "max_output_tokens", None) is not None:
                max_tokens = int(llm_request.config.max_output_tokens)
            if getattr(llm_request.config, "stop_sequences", None):
                stop_seqs = list(llm_request.config.stop_sequences)

        t0 = time.perf_counter()
        inference_timeout = float(os.getenv("AI_INFERENCE_TIMEOUT", "30.0"))

        async def _acquire_and_generate() -> Dict[str, Any]:
            async with get_async_inference_lock():
                return await asyncio.to_thread(
                    self._sync_generate,
                    messages=messages,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    stop=stop_seqs
                )

        try:
            completion = await asyncio.wait_for(_acquire_and_generate(), timeout=inference_timeout)
        except (asyncio.TimeoutError, TimeoutError) as exc:
            elapsed = time.perf_counter() - t0
            logger.warning(
                f"LlamaCppLlm inference timed out after {elapsed:.2f}s "
                f"(timeout threshold: {inference_timeout:.1f}s)."
            )
            raise TimeoutError(f"Inference timed out after {inference_timeout:.1f}s") from exc

        elapsed = time.perf_counter() - t0

        raw_text = completion["choices"][0]["message"]["content"].strip()
        logger.debug(f"LlamaCppLlm completion generated in {elapsed:.3f}s: {raw_text[:100]}...")

        usage_info = completion.get("usage", {})
        prompt_tokens = usage_info.get("prompt_tokens", 0)
        completion_tokens = usage_info.get("completion_tokens", 0)

        usage_metadata = types.GenerateContentResponseUsageMetadata(
            prompt_token_count=prompt_tokens,
            candidates_token_count=completion_tokens,
            total_token_count=prompt_tokens + completion_tokens
        )

        yield LlmResponse(
            content=types.Content(
                role="model",
                parts=[types.Part.from_text(text=raw_text)]
            ),
            usage_metadata=usage_metadata,
            model_version=self.model
        )
