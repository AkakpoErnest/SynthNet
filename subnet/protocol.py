import bittensor as bt
from typing import Optional, List, Literal


class SynthNetSynapse(bt.Synapse):
    """
    Protocol for SynthNet synthetic data generation.

    Validator fills (request): data_type, topic, quantity, format, diversity, creativity
    Miner fills (response):    samples, quality_scores, dataset_id, miner_uid, error
    """

    # Request fields (validator → miner)
    data_type: Literal["text", "code", "conversations"] = "text"
    topic: str = ""
    quantity: int = 100
    format: Literal["jsonl", "json", "csv", "txt"] = "txt"
    diversity: float = 70.0   # 0–100 hint to miner
    creativity: float = 60.0  # 0–100 maps to LLM temperature

    # Response fields (miner → validator)
    samples: Optional[List[str]] = None
    quality_scores: Optional[dict] = None  # keys: diversity, accuracy, coherence, format, creativity
    dataset_id: Optional[str] = None
    miner_uid: Optional[int] = None
    error: Optional[str] = None

    def deserialize(self) -> "SynthNetSynapse":
        return self
