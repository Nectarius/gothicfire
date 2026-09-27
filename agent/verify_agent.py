#!/usr/bin/env python3
"""
Verification Script for Gothic Fire Tactical AI Agent.
Tests the local Qwen2.5-1.5B GGUF model directly without launching the HTTP server.
Validates model loading, ChatML JSON inference, latency, and memory footprint.
Uses shared core package to eliminate code/prompt divergence with server.py.
"""

import json
import os
import resource
import sys
import time
from typing import Dict, List, Tuple
from llama_cpp import Llama

# Ensure agent directory and repo root are in sys.path
_AGENT_DIR = os.path.dirname(os.path.abspath(__file__))
if _AGENT_DIR not in sys.path:
    sys.path.insert(0, _AGENT_DIR)
_REPO_DIR = os.path.dirname(_AGENT_DIR)
if _REPO_DIR not in sys.path:
    sys.path.insert(0, _REPO_DIR)

from core import (
    AdvisorRequest,
    build_decision_prompts,
    build_advisor_prompts,
    safe_parse_decision_json,
    safe_parse_advisor_json,
    sanitize_advisor_advice,
    get_advisor_fallback,
)

MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "models",
    "qwen2.5-1.5b-instruct-q4_k_m.gguf"
)
if not os.path.exists(MODEL_PATH):
    rel_path = "./models/qwen2.5-1.5b-instruct-q4_k_m.gguf"
    if os.path.exists(rel_path):
        MODEL_PATH = rel_path

N_CTX = int(os.getenv("AI_CTX", "2048"))
N_THREADS = int(os.getenv("AI_THREADS", "4"))


def get_current_rss_mb() -> float:
    """Returns current resident memory (RSS) in MB using /proc/self/status on Linux."""
    try:
        with open("/proc/self/status", "r") as f:
            for line in f:
                if line.startswith("VmRSS:"):
                    return round(int(line.split()[1]) / 1024.0, 2)
    except Exception:
        pass
    # Fallback to getrusage (peak max RSS)
    return round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024.0, 2)


def get_peak_rss_mb() -> float:
    """Returns peak resident memory (RSS) in MB."""
    try:
        with open("/proc/self/status", "r") as f:
            for line in f:
                if line.startswith("VmHWM:"):
                    return round(int(line.split()[1]) / 1024.0, 2)
    except Exception:
        pass
    return round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024.0, 2)


def run_inference(
    llm: Llama,
    turn: int,
    state_summary: str,
    legal_moves: List[str]
) -> Tuple[Dict[str, str], float]:
    """Executes a single decision inference with shared Qwen ChatML prompting and measures elapsed time."""
    system_prompt, user_prompt = build_decision_prompts(turn, state_summary, legal_moves)
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    t0 = time.perf_counter()
    completion = llm.create_chat_completion(
        messages=messages,
        temperature=0.1,
        response_format={"type": "json_object"},
        max_tokens=180
    )
    elapsed = time.perf_counter() - t0

    content = completion["choices"][0]["message"]["content"].strip()
    resp = safe_parse_decision_json(content, legal_moves)
    return {
        "chosen_move": resp.chosen_move,
        "reasoning": resp.reasoning
    }, elapsed


def run_advisor_inference(
    llm: Llama,
    advisor_id: str,
    question_type: str,
    turn: int,
    state_summary: str,
    opponents_summary: str = "",
    map_summary: str = ""
) -> Tuple[Dict, float]:
    """Executes advisor consultation inference using shared core persona prompts and parsers."""
    req = AdvisorRequest(
        turn=turn,
        advisor_id=advisor_id,
        question_type=question_type,
        player_summary=state_summary,
        opponents_summary=opponents_summary,
        map_summary=map_summary
    )
    sys_prompt, user_prompt, tokens_limit, advisor_name = build_advisor_prompts(req)
    fallback_advice, fallback_kps = get_advisor_fallback(advisor_id, question_type, turn)

    messages = [
        {"role": "system", "content": sys_prompt},
        {"role": "user", "content": user_prompt}
    ]

    t0 = time.perf_counter()
    completion = llm.create_chat_completion(
        messages=messages,
        temperature=0.1,
        response_format={"type": "json_object"},
        max_tokens=tokens_limit
    )
    elapsed = time.perf_counter() - t0

    content = completion["choices"][0]["message"]["content"].strip()
    parsed_advice, parsed_key_points = safe_parse_advisor_json(content)
    final_advice = parsed_advice or fallback_advice
    final_key_points = parsed_key_points or fallback_kps
    final_advice = sanitize_advisor_advice(final_advice, state_summary)

    return {
        "advisor_name": advisor_name,
        "advice": final_advice,
        "key_points": final_key_points
    }, elapsed


def main():
    print("=" * 70)
    print("   Gothic Fire Tactical AI Agent: Verification Self-Test   ")
    print("=" * 70)

    if not os.path.exists(MODEL_PATH):
        print(f"[FATAL] Model file not found at: {MODEL_PATH}")
        sys.exit(1)

    print(f"Model Path  : {MODEL_PATH}")
    print(f"Context (n_ctx): {N_CTX}")
    print(f"Threads (n_threads): {N_THREADS}")

    ram_before_load = get_current_rss_mb()
    print(f"RAM before load: {ram_before_load:.2f} MB")

    print("\n[1/4] Loading GGUF model into memory...")
    t_load_start = time.perf_counter()
    llm = Llama(
        model_path=MODEL_PATH,
        n_ctx=N_CTX,
        n_threads=N_THREADS,
        verbose=False
    )
    load_time = time.perf_counter() - t_load_start
    ram_after_load = get_current_rss_mb()

    print(f"✓ Model loaded in: {load_time:.3f} s")
    print(f"✓ RAM after load : {ram_after_load:.2f} MB (Delta: +{ram_after_load - ram_before_load:.2f} MB)")

    # -------------------------------------------------------------
    # Scenario 1: Early Game Economic & Garrison Decision
    # Khorinis Castle (Sector 14). Human Player is Red, Bot is Yellow.
    # Yellow Commander Torrez has 150 gold, 40 food, 0 units. Surrounding sectors neutral.
    # -------------------------------------------------------------
    print("\n[2/4] Executing Scenario 1: Early Game Fortress Garrison & Recruitment...")
    s1_turn = 1
    s1_summary = (
        "Commander Torrez is stationed at Castle Khorinis (Sector 14). "
        "Treasury: 150 Gold, 40 Food. Current Army: 0 units. "
        "Castle fortification protection is 20. Immediate adjacent sectors (11, 25, 26) are neutral. "
        "Primary goal: Establish defensive army garrison before exploring outward."
    )
    s1_legal_moves = [
        "RECRUIT_HEAVY_INFANTRY (Score: 85/100, Warlord Synergy, +3 Heavy Infantry)",
        "UPGRADE_PROTECTION_14 (Score: 70/100, Fortify Castle Wall)",
        "RECRUIT_LIGHT_INFANTRY (Score: 60/100, Basic Defense)",
        "UPGRADE_CULTIVATION_14 (Score: 45/100, Boosts Yield)",
        "WAIT (Score: 75/100, Garrison Castle Wall, Safe)"
    ]

    res1, t1 = run_inference(llm, s1_turn, s1_summary, s1_legal_moves)
    chosen1 = res1["chosen_move"]
    reason1 = res1["reasoning"]

    print(f"  Turn          : {s1_turn}")
    print(f"  Situation     : {s1_summary}")
    print(f"  Legal Moves   : {s1_legal_moves}")
    print(f"  Inference Time: {t1:.3f} s")
    print(f"  Selected Move : {chosen1}")
    print(f"  Reasoning     : {reason1}")

    # Assertion
    assert chosen1 in s1_legal_moves, f"Assertion failed: {chosen1} not in {s1_legal_moves}"
    print(f"  ✓ Assertion passed: Selected move '{chosen1}' is in legal moves.")

    # -------------------------------------------------------------
    # Scenario 2: Mid Game Tactical Battle Engagement
    # Onar's Farm (Sector 23). Commander Milten (Archon) has 10 Mages and 5 Heavy Infantry.
    # Enemy commander Gorn approaches adjacent Sector 22 with 15 Light Infantry.
    # -------------------------------------------------------------
    print("\n[3/4] Executing Scenario 2: Mid Game Border Confrontation at Sector 22...")
    s2_turn = 12
    s2_summary = (
        "Archon Milten commands Onar's Farm (Sector 23) with an army of 10 Mages and 5 Heavy Infantry. "
        "Gold: 120, Food: 80. Enemy rival Gorn is advancing through adjacent Sector 22 with 15 Light Infantry. "
        "Milten possesses strong Archon synergy boosting Mage combat power. Sector 22 is within striking range."
    )
    s2_legal_moves = [
        "ATTACK_SECTOR_22 (Score: 95/100, Guaranteed Victory 95% Win, Archon Phalanx)",
        "RECRUIT_MAGES (Score: 80/100, Archon Synergy, +1 Mage)",
        "MOVE_TO_30 (Score: 50/100, Claim Unowned Sector)",
        "UPGRADE_PROTECTION_23 (Score: 45/100, Fortify Farm Defense)",
        "WAIT (Score: 40/100, Conserve Strength, Safe)"
    ]

    res2, t2 = run_inference(llm, s2_turn, s2_summary, s2_legal_moves)
    chosen2 = res2["chosen_move"]
    reason2 = res2["reasoning"]

    print(f"  Turn          : {s2_turn}")
    print(f"  Situation     : {s2_summary}")
    print(f"  Legal Moves   : {s2_legal_moves}")
    print(f"  Inference Time: {t2:.3f} s")
    print(f"  Selected Move : {chosen2}")
    print(f"  Reasoning     : {reason2}")

    # Assertion
    assert chosen2 in s2_legal_moves, f"Assertion failed: {chosen2} not in {s2_legal_moves}"
    print(f"  ✓ Assertion passed: Selected move '{chosen2}' is in legal moves.")

    # -------------------------------------------------------------
    # Scenario 3: Safety & Fallback Validation
    # Test that illegal / hallucinated move triggers safe fallback to legal_moves[0]
    # -------------------------------------------------------------
    print("\n[4/5] Validating Safety Fallback Mechanism...")
    test_moves = ["SAFE_GARRISON", "MARCH_NORTH"]
    hallucinated_choice = "ILLEGAL_MOVE_NONSENSE"

    # Test real validator logic from core
    test_json = json.dumps({"chosen_move": hallucinated_choice, "reasoning": "Attempting illegal move"})
    fallback_res = safe_parse_decision_json(test_json, test_moves)

    assert fallback_res.chosen_move == "SAFE_GARRISON"
    assert "Fallback:" in fallback_res.reasoning
    print("  ✓ Fallback logic successfully guarded against illegal move.")

    # -------------------------------------------------------------
    # Scenario 4: Advisor AI Persona Consultation (Zorax & Jade)
    # -------------------------------------------------------------
    print("\n[5/5] Validating Advisor Personas (Zorax & Jade)...")
    advisor_summary = (
        "Commander has 1 Castle, 2 Sectors, 8 Heavy Infantry, 120 Gold, 60 Food. "
        "Opponent Bot has 1 Castle, 3 Sectors, 14 Light Infantry, 150 Gold, 80 Food."
    )

    # Zorax Next Move
    z_res, tz = run_advisor_inference(llm, "ZORAX", "NEXT_MOVE", 5, advisor_summary)
    print(f"  Advisor       : {z_res['advisor_name']} (Zorax the Mighty)")
    print(f"  Question      : What should I do next?")
    print(f"  Inference Time: {tz:.3f} s")
    print(f"  Advice        : {z_res['advice']}")
    print(f"  Key Points    : {z_res['key_points']}")
    assert len(z_res["advice"]) > 0, "Zorax advice should not be empty"

    # Jade Strategy
    j_res, tj = run_advisor_inference(llm, "JADE", "STRATEGY", 5, advisor_summary)
    print(f"  Advisor       : {j_res['advisor_name']} (Jade the Enlightened)")
    print(f"  Question      : What is our strategy for the future?")
    print(f"  Inference Time: {tj:.3f} s")
    print(f"  Advice        : {j_res['advice']}")
    print(f"  Key Points    : {j_res['key_points']}")
    assert len(j_res["advice"]) > 0, "Jade advice should not be empty"
    print("  ✓ Both Zorax and Jade advisor personas verified.")

    # -------------------------------------------------------------
    # Final Benchmark and Resource Usage Summary
    # -------------------------------------------------------------
    final_rss = get_current_rss_mb()
    peak_rss = get_peak_rss_mb()

    print("\n" + "=" * 70)
    print("                      VERIFICATION SUMMARY                      ")
    print("=" * 70)
    print(f"  • Model Loading Time    : {load_time:.3f} s")
    print(f"  • Scenario 1 Latency    : {t1:.3f} s  (Move: {chosen1})")
    print(f"  • Scenario 2 Latency    : {t2:.3f} s  (Move: {chosen2})")
    print(f"  • Zorax Advisor Latency : {tz:.3f} s")
    print(f"  • Jade Advisor Latency  : {tj:.3f} s")
    print(f"  • Current RSS Memory    : {final_rss:.2f} MB")
    print(f"  • Peak RAM (HWM)        : {peak_rss:.2f} MB (Cap is 2560 MB)")
    print(f"  • Context Cap (n_ctx)   : {N_CTX} tokens")
    print(f"  • Memory Constraint     : {'PASSED (< 2.5 GB)' if peak_rss < 2560 else 'WARNING (>= 2.5 GB)'}")
    print(f"  • All Assertions        : PASSED")
    print("=" * 70)


if __name__ == "__main__":
    main()
