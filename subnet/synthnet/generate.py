import os
import json
import requests
from typing import List


def _build_prompt(data_type: str, topic: str, quantity: int,
                  diversity: float, creativity: float) -> str:
    diversity_hint = (
        "highly varied, covering many angles and perspectives"
        if diversity > 60
        else "focused and consistent in style"
    )

    type_instructions = {
        "text": (
            f"Generate {quantity} short text samples about: {topic}. "
            f"Each sample should be 1–4 sentences. Style: {diversity_hint}."
        ),
        "code": (
            f"Generate {quantity} code snippets related to: {topic}. "
            f"Each snippet should be self-contained and functional. "
            f"Use Python unless another language is implied by the topic."
        ),
        "conversations": (
            f"Generate {quantity} short dialogue exchanges about: {topic}. "
            f"Format: 'User: ...\\nAssistant: ...' — 2–4 turns each. "
            f"Style: {diversity_hint}."
        ),
    }

    instruction = type_instructions.get(data_type, type_instructions["text"])

    return (
        f"{instruction}\n\n"
        f"IMPORTANT: Return ONLY a JSON array of strings. "
        f"Each string is one complete sample. No commentary, no markdown fences. "
        f'Example: ["sample one", "sample two"]'
    )


def _parse_response(raw: str, quantity: int) -> List[str]:
    """Best-effort parse of LLM output into a list of strings."""
    # Try strict JSON first
    try:
        parsed = json.loads(raw.strip())
        if isinstance(parsed, list):
            return [str(s) for s in parsed[:quantity]]
    except json.JSONDecodeError:
        pass

    # Strip markdown fences if present
    raw = raw.strip()
    if raw.startswith("```"):
        raw = "\n".join(raw.split("\n")[1:])
    if raw.endswith("```"):
        raw = "\n".join(raw.split("\n")[:-1])

    # Try JSON again after stripping fences
    try:
        parsed = json.loads(raw.strip())
        if isinstance(parsed, list):
            return [str(s) for s in parsed[:quantity]]
    except json.JSONDecodeError:
        pass

    # Fall back: split on double newline or numbered/bulleted lines
    lines = [l.strip() for l in raw.split("\n") if l.strip()]
    cleaned = []
    for line in lines:
        if line and line[0].isdigit() and ". " in line:
            cleaned.append(line.split(". ", 1)[1])
        elif line.startswith("- "):
            cleaned.append(line[2:])
        else:
            cleaned.append(line)
    return cleaned[:quantity]


def generate_samples(
    data_type: str,
    topic: str,
    quantity: int,
    format: str,
    diversity: float,
    creativity: float,
) -> List[str]:
    """
    Generate synthetic samples using local Ollama.
    Phase 1 cap: quantity is capped at 500 to avoid LLM timeouts.
    """
    quantity = min(quantity, 500)

    model = os.getenv("OLLAMA_MODEL", "llama3.2")
    base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    temperature = 0.3 + (creativity / 100.0) * 0.9  # 0–100 → 0.3–1.2

    prompt = _build_prompt(data_type, topic, quantity, diversity, creativity)

    resp = requests.post(
        f"{base_url}/api/generate",
        json={
            "model": model,
            "prompt": prompt,
            "stream": False,
            "options": {"temperature": temperature},
        },
        timeout=120,
    )
    resp.raise_for_status()

    raw = resp.json().get("response", "")
    samples = _parse_response(raw, quantity)

    if not samples:
        raise ValueError(f"Ollama returned empty response for topic='{topic}'")

    return samples
