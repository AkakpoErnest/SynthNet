# SynthNet incentive & evaluation design (draft)

## Goal
Allocate TAO emissions to **useful synthetic data**, not to **maximum output volume**, while keeping **validators honest** and making the system **expensive to game**.

This doc is written for a Bittensor-style loop:
1) validators issue tasks → 2) miners generate datasets → 3) validators score → 4) weights/emissions update.

## Core mechanism (recommended)
Use **multi-signal quality** + **concave reward aggregation** + **audit-backed validator reliability**.

### 1) Define a per-task quality score `q ∈ [0, 1]`
Each generated dataset gets a bounded score built from signals that are hard to fake simultaneously:

- `auto`: deterministic checks (schema/format, constraint adherence, dedup, PII/leakage heuristics, toxicity, etc.)
- `downstream`: measured usefulness (see below) on *hidden/held-out* evals when available
- `human`: periodic human audits on random samples, used as a calibration/anchor
- `novelty`: anti-copy signal (embedding-distance/near-dup penalties), *only* as a regularizer (never the main term)

Example:
```
q = clamp(
  0.45*downstream +
  0.25*human +
  0.20*auto +
  0.10*novelty -
  penalties,
  0, 1
)
```

Penalties should be “hard” for objective violations (PII leak, spec failure, obvious duplication).

### 2) Make rewards concave in volume (kills “spam” strategies)
Never let “more samples” linearly increase emissions. Two simple patterns:

- **Top‑K aggregation per miner per epoch**: score many outputs but only count the best `K`.
  - `miner_score = mean(topK(q_i, K))`
- **Saturating reward curve** per task: `reward ∝ sqrt(q)` or `reward ∝ log(1 + α*q)`

If miners can submit arbitrarily many datasets, top‑K is the cleanest “quality over quantity” lever.

### 3) Hold validators accountable with reliability-weighted influence
Validators should earn more *only if* their scoring matches ex‑post “ground truth” anchors:

- **Audit tasks**: randomly selected tasks are re-scored by (a) a larger validator committee and/or (b) humans.
- **Validator reliability score** `r_v`: agreement with audits + agreement with other reliable validators.

Example:
```
r_v = exp(-MAE(v_scores, audit_scores)/σ) * agreement_with_reliable_peers
```

Use `r_v` to:
- scale validator dividends (and/or permit eligibility)
- downweight validator impact in any off-chain aggregation you control (e.g., committee scoring)

## “Downstream usefulness” options (pick per data type)
Downstream scoring is the most aligned metric, but you need to avoid making it easy to overfit.

Practical patterns:
- **Requester-supplied hidden eval**: the requester provides an evaluation harness + private test set; validators run it.
- **Subnet-owned private benchmarks**: rotating, non-public benchmark suites per domain (text/code/dialogue).
- **Proxy downstream** (cheap MVP): train lightweight baseline models (or fixed probes) and score improvement vs a baseline.

Key requirement: at least part of downstream evaluation must be **hidden or rotating**.

## Anti-gaming checklist
- **Random private benchmarks** + rotation: prevents “train to the test”.
- **Canary strings + PII traps**: instant large penalty for leakage.
- **Near-duplicate detection**: embedding + n-gram dedup; penalize “template spam”.
- **Spec-tight scoring**: enforce schema/constraints deterministically before any “soft” scoring.
- **Multi-validator redundancy**: score each task by `m ≥ 3` validators; aggregate with trimmed mean/median.
- **Commit → reveal** for artifacts (optional): miners commit dataset hash before revealing content to reduce post-hoc edits.
- **Challenge process** (bonded): participants can pay to trigger an audit; bad scoring loses bond/stake/permit reputation.

## Subnet design variants
### A) Marketplace-driven (best long-term)
Emissions follow **quality-adjusted paid demand**:
- reward pools grow with real usage
- wash trading is costly if fees are burned/paid to auditors

### B) Benchmark-driven (best for early bootstrapping)
Validators issue standardized tasks from private benchmark sets; emissions follow benchmark performance.

### C) Hybrid (recommended)
Split emissions:
- `X%` benchmark/audit pool (keeps incentives grounded early)
- `Y%` market pool (converges to real utility as adoption grows)

## MVP rollout (low risk)
1) Start with deterministic `auto` + small human-audit rate (1–5% of tasks).
2) Add downstream scoring for a subset of domains where you can maintain hidden benchmarks.
3) Gradually shift emissions weight toward downstream + market signals.

## Open questions (worth deciding early)
- What is the *unit of work*: “dataset”, “batch”, or “request response”?
- Do requesters pay fees (market pool), or is everything emission-funded initially?
- What compute budget can validators spend per task (limits downstream scoring choices)?
- Which violations are “hard fail” (score=0 + potential slashing), vs “soft penalty”?
