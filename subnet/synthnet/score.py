import json
from typing import List, Optional


def score_format(samples: List[str], requested_format: str) -> float:
    """Check that samples are parseable in the requested format. Returns 0.0–1.0."""
    if not samples:
        return 0.0

    if requested_format in ("json", "jsonl"):
        valid = sum(1 for s in samples if _is_json(s.split("\n")[0]))
    elif requested_format == "csv":
        valid = sum(1 for s in samples if "," in s)
    else:  # txt — always passes
        valid = len(samples)

    return valid / len(samples)


def score_quantity(returned: int, requested: int) -> float:
    """Ratio of returned to requested samples. Zero below 50% return rate."""
    if requested == 0:
        return 0.0
    ratio = returned / requested
    if ratio >= 0.9:
        return 1.0
    elif ratio >= 0.5:
        return (ratio - 0.5) / 0.4  # linear: 0.5→0.0, 0.9→1.0
    return 0.0


def score_diversity(samples: List[str], n: int = 3) -> float:
    """Unique n-gram ratio across all samples. Returns 0.0–1.0."""
    if len(samples) < 2:
        return 0.0

    def get_ngrams(text: str):
        tokens = text.lower().split()
        return list(zip(*[tokens[i:] for i in range(n)])) if len(tokens) >= n else []

    all_ngrams = []
    for s in samples:
        all_ngrams.extend(get_ngrams(s))

    if not all_ngrams:
        return 0.0

    unique_ratio = len(set(all_ngrams)) / len(all_ngrams)
    return min(unique_ratio / 0.85, 1.0)


def score_coherence(samples: List[str]) -> float:
    """Penalizes empty, very short, mostly non-alpha, and duplicate samples. Returns 0.0–1.0."""
    if not samples:
        return 0.0

    seen = set()
    penalty = 0.0
    for s in samples:
        s = s.strip()
        if not s:
            penalty += 1
            continue
        if len(s) < 10:
            penalty += 0.5
            continue
        alpha_ratio = sum(c.isalpha() for c in s) / len(s)
        if alpha_ratio < 0.3:
            penalty += 0.7
            continue
        if s in seen:
            penalty += 1
        seen.add(s)

    return max(1.0 - (penalty / len(samples)), 0.0)


WEIGHTS = {
    "format":    0.20,
    "quantity":  0.25,
    "diversity": 0.30,
    "coherence": 0.25,
}


def compute_quality_score(
    samples: Optional[List[str]],
    requested_format: str,
    requested_quantity: int,
) -> dict:
    """
    Compute all sub-scores and return a dict with individual scores (0–100)
    and a composite score. Used by the validator for set_weights().
    """
    if not samples:
        return {"format": 0.0, "quantity": 0.0, "diversity": 0.0, "coherence": 0.0, "composite": 0.0}

    fmt = score_format(samples, requested_format)
    qty = score_quantity(len(samples), requested_quantity)
    div = score_diversity(samples)
    coh = score_coherence(samples)

    composite = (
        WEIGHTS["format"]    * fmt +
        WEIGHTS["quantity"]  * qty +
        WEIGHTS["diversity"] * div +
        WEIGHTS["coherence"] * coh
    )

    return {
        "format":    round(fmt * 100, 1),
        "quantity":  round(qty * 100, 1),
        "diversity": round(div * 100, 1),
        "coherence": round(coh * 100, 1),
        "composite": round(composite * 100, 1),
    }


def _is_json(s: str) -> bool:
    try:
        json.loads(s)
        return True
    except Exception:
        return False
