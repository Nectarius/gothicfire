"""In-memory caching and idempotency mechanisms for Gothic Fire AI Agent."""

import hashlib
import threading
import time
from collections import OrderedDict
from typing import Optional, Tuple
from .schemas import AdvisorResponse


class AdvisorCache:
    """Thread-safe LRU cache for advisor consultation responses.
    
    Prevents duplicate LLM inference calls when players repeatedly click
    advisor consultation buttons in the UI within the same turn state.
    """

    def __init__(self, capacity: int = 128, ttl_seconds: float = 3600.0):
        self._capacity = max(1, capacity)
        self._ttl_seconds = ttl_seconds
        self._cache: OrderedDict[str, Tuple[AdvisorResponse, float]] = OrderedDict()
        self._lock = threading.Lock()

    @staticmethod
    def generate_key(
        turn: int,
        player_summary: str,
        question_type: str,
        advisor_id: str
    ) -> str:
        """Computes a deterministic MD5 hash key for state consultation query."""
        raw = f"{turn}|{advisor_id.upper().strip()}|{question_type.upper().strip()}|{player_summary.strip()}"
        return hashlib.md5(raw.encode("utf-8")).hexdigest()

    def get(
        self,
        turn: int,
        player_summary: str,
        question_type: str,
        advisor_id: str
    ) -> Optional[AdvisorResponse]:
        """Retrieves cached AdvisorResponse if present and unexpired, else None."""
        key = self.generate_key(turn, player_summary, question_type, advisor_id)
        with self._lock:
            if key not in self._cache:
                return None

            response, timestamp = self._cache[key]
            if time.time() - timestamp > self._ttl_seconds:
                del self._cache[key]
                return None

            # Move to end for LRU freshness
            self._cache.move_to_end(key)
            return response

    def set(
        self,
        turn: int,
        player_summary: str,
        question_type: str,
        advisor_id: str,
        response: AdvisorResponse
    ) -> None:
        """Stores AdvisorResponse in the LRU cache."""
        key = self.generate_key(turn, player_summary, question_type, advisor_id)
        with self._lock:
            if key in self._cache:
                self._cache.move_to_end(key)
            elif len(self._cache) >= self._capacity:
                self._cache.popitem(last=False)  # Evict oldest entry

            self._cache[key] = (response, time.time())

    def clear(self) -> None:
        """Clears all cached advisor responses."""
        with self._lock:
            self._cache.clear()

    def size(self) -> int:
        """Returns the current number of cached items."""
        with self._lock:
            return len(self._cache)


# Global singleton instance for advisor consultation caching
advisor_cache = AdvisorCache(capacity=128, ttl_seconds=3600.0)
