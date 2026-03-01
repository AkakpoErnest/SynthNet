import os
import sys
import uuid
import time
import argparse
import traceback

import bittensor as bt

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from protocol import SynthNetSynapse
from synthnet.generate import generate_samples
from synthnet.score import compute_quality_score


def get_config():
    parser = argparse.ArgumentParser(description="SynthNet Miner")
    parser.add_argument("--netuid", type=int, default=1)
    parser.add_argument("--axon.port", type=int, default=8091)
    parser.add_argument("--subtensor.network", type=str, default="test")
    parser.add_argument("--logging.debug", action="store_true")
    bt.subtensor.add_args(parser)
    bt.logging.add_args(parser)
    bt.wallet.add_args(parser)
    bt.axon.add_args(parser)
    return bt.config(parser)


def forward(synapse: SynthNetSynapse) -> SynthNetSynapse:
    bt.logging.info(
        f"Request: type={synapse.data_type}, topic='{synapse.topic}', "
        f"quantity={synapse.quantity}, format={synapse.format}"
    )

    try:
        samples = generate_samples(
            data_type=synapse.data_type,
            topic=synapse.topic,
            quantity=synapse.quantity,
            format=synapse.format,
            diversity=synapse.diversity,
            creativity=synapse.creativity,
        )

        scores = compute_quality_score(samples, synapse.format, synapse.quantity)

        synapse.samples = samples
        synapse.quality_scores = scores
        synapse.dataset_id = str(uuid.uuid4())

        bt.logging.success(
            f"Generated {len(samples)} samples. Composite: {scores['composite']}"
        )

    except Exception as e:
        bt.logging.error(f"Generation error: {e}")
        bt.logging.debug(traceback.format_exc())
        synapse.error = str(e)
        synapse.samples = []

    return synapse


def blacklist(synapse: SynthNetSynapse) -> tuple:
    # Phase 1: allow all registered hotkeys
    return False, "OK"


def priority(synapse: SynthNetSynapse) -> float:
    return 1.0


def main():
    config = get_config()
    bt.logging(config=config)
    bt.logging.info("Starting SynthNet miner")

    wallet = bt.wallet(config=config)
    subtensor = bt.subtensor(config=config)
    metagraph = subtensor.metagraph(config.netuid)

    bt.logging.info(f"Wallet:     {wallet}")
    bt.logging.info(f"Subtensor:  {subtensor}")
    bt.logging.info(f"Metagraph:  {metagraph}")

    axon = bt.axon(wallet=wallet, config=config)
    axon.attach(
        forward_fn=forward,
        blacklist_fn=blacklist,
        priority_fn=priority,
    )
    axon.serve(netuid=config.netuid, subtensor=subtensor)
    axon.start()

    bt.logging.success(f"Miner running on port {config.axon.port}")

    while True:
        try:
            metagraph.sync(subtensor=subtensor)
            bt.logging.debug(f"Metagraph synced. Block: {subtensor.block}")
        except Exception as e:
            bt.logging.warning(f"Sync error: {e}")
        time.sleep(60)


if __name__ == "__main__":
    main()
