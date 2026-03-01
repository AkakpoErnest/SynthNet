import os
import sys
import time
import random
import argparse
import traceback

import torch
import bittensor as bt

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from protocol import SynthNetSynapse
from synthnet.score import compute_quality_score


TASK_BANK = [
    dict(data_type="text",          topic="customer service",           quantity=50, format="txt",   diversity=70, creativity=60),
    dict(data_type="code",          topic="Python utility functions",   quantity=30, format="txt",   diversity=80, creativity=50),
    dict(data_type="conversations", topic="technical support Q&A",      quantity=30, format="jsonl", diversity=75, creativity=55),
    dict(data_type="text",          topic="product descriptions",        quantity=50, format="txt",   diversity=65, creativity=70),
    dict(data_type="code",          topic="TypeScript React components", quantity=20, format="txt",   diversity=80, creativity=60),
]

SET_WEIGHTS_EVERY = 5
EMA_ALPHA = 0.3


def get_config():
    parser = argparse.ArgumentParser(description="SynthNet Validator")
    parser.add_argument("--netuid", type=int, default=1)
    parser.add_argument("--subtensor.network", type=str, default="test")
    parser.add_argument("--logging.debug", action="store_true")
    bt.subtensor.add_args(parser)
    bt.logging.add_args(parser)
    bt.wallet.add_args(parser)
    return bt.config(parser)


def score_responses(responses: list, task: dict) -> list:
    scores = []
    for synapse in responses:
        if synapse is None or synapse.samples is None or synapse.error:
            scores.append(0.0)
            continue
        result = compute_quality_score(
            samples=synapse.samples,
            requested_format=task["format"],
            requested_quantity=task["quantity"],
        )
        composite = result["composite"] / 100.0
        scores.append(composite)
        bt.logging.debug(
            f"  format={result['format']} qty={result['quantity']} "
            f"div={result['diversity']} coh={result['coherence']} "
            f"→ {result['composite']}"
        )
    return scores


def main():
    config = get_config()
    bt.logging(config=config)
    bt.logging.info("Starting SynthNet validator")

    wallet = bt.wallet(config=config)
    subtensor = bt.subtensor(config=config)
    metagraph = subtensor.metagraph(config.netuid)
    dendrite = bt.dendrite(wallet=wallet)

    bt.logging.info(f"Wallet:    {wallet}")
    bt.logging.info(f"Netuid:    {config.netuid}")

    weights = torch.zeros(metagraph.n)
    step = 0

    while True:
        try:
            bt.logging.info(f"\n=== Validator step {step} ===")

            metagraph.sync(subtensor=subtensor)
            n = metagraph.n.item()

            # Resize weights tensor if network grew
            if len(weights) < n:
                weights = torch.cat([weights, torch.zeros(n - len(weights))])

            miner_uids = [
                uid for uid in range(n)
                if not metagraph.validator_permit[uid]
                and metagraph.axons[uid].is_serving
            ]

            if not miner_uids:
                bt.logging.warning("No active miners found. Waiting 60s...")
                time.sleep(60)
                continue

            bt.logging.info(f"Querying {len(miner_uids)} miners")

            task = random.choice(TASK_BANK)
            axons = [metagraph.axons[uid] for uid in miner_uids]
            synapses = [
                SynthNetSynapse(
                    data_type=task["data_type"],
                    topic=task["topic"],
                    quantity=task["quantity"],
                    format=task["format"],
                    diversity=task["diversity"],
                    creativity=task["creativity"],
                )
                for _ in miner_uids
            ]

            responses = dendrite.query(
                axons=axons,
                synapses=synapses,
                deserialize=True,
                timeout=60,
            )

            step_scores = score_responses(responses, task)

            for uid, score, resp in zip(miner_uids, step_scores, responses):
                n_samples = len(resp.samples) if resp and resp.samples else 0
                bt.logging.info(f"  UID {uid}: score={score:.3f}  samples={n_samples}")

            # Exponential moving average
            for i, uid in enumerate(miner_uids):
                weights[uid] = (1 - EMA_ALPHA) * weights[uid] + EMA_ALPHA * step_scores[i]

            # Set weights on-chain every N steps
            if step > 0 and step % SET_WEIGHTS_EVERY == 0:
                bt.logging.info("Setting weights on chain...")
                w = weights.clone()
                w_sum = w.sum()
                w = w / w_sum if w_sum > 0 else torch.ones(n) / n

                result = subtensor.set_weights(
                    netuid=config.netuid,
                    wallet=wallet,
                    uids=list(range(n)),
                    weights=w.tolist(),
                    wait_for_inclusion=True,
                )
                bt.logging.success(f"set_weights: {result}")

            step += 1
            time.sleep(30)

        except KeyboardInterrupt:
            bt.logging.info("Validator stopped.")
            break
        except Exception as e:
            bt.logging.error(f"Step error: {e}")
            bt.logging.debug(traceback.format_exc())
            time.sleep(30)


if __name__ == "__main__":
    main()
