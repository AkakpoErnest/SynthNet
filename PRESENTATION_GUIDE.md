# SynthNet — Judge Presentation Guide

Use this as your script. Go through each step, navigate to the page, and say the talking points.

---

## 1. OPENING (30 seconds)

**Where:** Landing page (Home)

**Say:**
> "SynthNet is a Bittensor subnet — a decentralized marketplace for synthetic data. In one sentence: users request datasets, miners produce them, validators score quality on-chain, and rewards flow without a central operator."

---

## 2. THE HERO & DESIGN (1 min)

**Where:** Landing page — top of page

**Say:**
> "The hero uses a 3D network visualization built with Three.js — nodes and connections representing the decentralized network. You can drag to rotate, scroll to zoom, and pan. The hero has a solid background so it stands out; below, a video background fades in for the rest of the site."

**If asked about design choices:**
- **Colors:** Electric blue (#3B82F6), cyan (#06B6D4), purple (#8B5CF6) — Bittensor-inspired, tech-forward
- **Glassmorphism:** Cards use backdrop blur and semi-transparent backgrounds for depth
- **Gradient text:** "Synthetic Data" uses a blue-to-cyan-to-purple gradient for emphasis

---

## 3. STATS & NETWORK HEALTH (30 seconds)

**Where:** Landing page — scroll to the 4 stat cards

**Say:**
> "These stats show network health: 15,847 datasets generated, 342 active miners, 94.2 quality score, 99.8% uptime. The counters animate when they come into view. This is mock data for now — in production it would come from the Bittensor chain."

---

## 4. REQUEST FLOW (1 min)

**Where:** Click **Request Data** in the nav (or the "Request Data" button)

**Say:**
> "This is the core user flow. A multi-step form: first you choose the data type — text, code, or conversations. Then you set specs: topic, quantity, format, diversity, creativity. There's a live cost estimate. On submit, the request goes to miners who compete to produce the dataset."

**If asked:** "The form uses Framer Motion for step transitions. Step 3 shows a summary before submit."

---

## 5. DASHBOARD (45 seconds)

**Where:** Click **Dashboard** in the nav

**Say:**
> "The dashboard gives an overview: total datasets, active miners, quality score, TAO staked. We have quality line and radar charts, a generation queue showing in-progress work, and top miners. This is where operators would monitor network health."

---

## 6. MARKETPLACE (30 seconds)

**Where:** Click **Marketplace** in the nav

**Say:**
> "The marketplace is where users browse and download verified datasets. You can filter by type and quality. Each card shows samples, quality score, and price. Click to preview before downloading."

---

## 7. EXPLORER (30 seconds)

**Where:** Click **Miner Explorer** in the nav

**Say:**
> "The explorer shows the network topology — miners and validators, their stake, trust scores, and consensus. There's a 3D preview and a detail panel with radar charts for each miner's metrics."

---

## 8. TECH STACK (if asked)

**Say:**
> "React 18, TypeScript, Vite. Tailwind for styling. Framer Motion for animations. Three.js with React Three Fiber for the 3D hero. Recharts for the dashboard charts. All production-ready — we'd swap mock data for Bittensor API calls."

---

## 9. CHALLENGES & NEXT STEPS (if asked)

**Say:**
> "The main challenge is incentive design — rewarding quality over volume, and validators for accurate scoring, without making emissions easy to game. We're working on tying TAO flow to measurable quality, like downstream usefulness or human-validator agreement. We'd welcome feedback on subnet designs and mechanism design."

---

## LIKELY JUDGE QUESTIONS & ANSWERS

| Question | Answer |
|----------|--------|
| **What problem does SynthNet solve?** | AI models need large datasets. Real data is scarce, expensive, or private. SynthNet provides synthetic data from a decentralized network with on-chain quality verification. |
| **How does the marketplace work?** | Users request → miners generate → validators score → TAO rewards flow to high-quality producers. No central operator. |
| **What's the difference between miners and validators?** | Miners produce datasets. Validators have permits and score miner output on-chain. Both are incentivized by TAO. |
| **Is this live?** | This is a frontend prototype with mock data. The subnet design is in progress; we'd connect to Bittensor APIs for production. |
| **Why Bittensor?** | Bittensor provides decentralized incentive alignment — rewards flow based on on-chain consensus, not a central gatekeeper. |
| **What data types?** | Text, code, and conversations. Users specify format (e.g. JSONL), quantity, and parameters like diversity and creativity. |

---

## QUICK REFERENCE: PAGE ROUTES

- `/` — Landing
- `/request` — Request Data
- `/dashboard` — Dashboard
- `/explorer` — Miner Explorer
- `/marketplace` — Marketplace

---

## TIPS

1. **Start with the one-sentence pitch** — judges remember that.
2. **Show, don't just tell** — click through the app as you talk.
3. **Mention the 3D hero** — it's a standout design element.
4. **Be honest about mock data** — frame it as "production-ready frontend, awaiting subnet deployment."
5. **End with the ask** — "We'd love feedback on incentive design and subnet proposals."
