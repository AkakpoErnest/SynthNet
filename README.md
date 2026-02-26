# SynthNet — Decentralized Synthetic Data Generation

A production-ready frontend for the **SynthNet** Bittensor subnet: a decentralized synthetic data generation marketplace.

## Stack

- **React 19** + **TypeScript**
- **Vite** for build and dev server
- **Tailwind CSS** (v4) for styling and glassmorphism
- **Framer Motion** for page transitions, scroll reveals, stagger lists, modal/toast animations
- **Three.js** + **React Three Fiber** + **@react-three/drei** for 3D scenes (network, particles, floating shapes)
- **Recharts** for quality and metrics charts
- **Lucide React** for icons
- **React Router v7** for navigation

## Design

- **Colors:** Electric blue (#3B82F6), cyan (#06B6D4), purple/violet (#7C3AED, #8B5CF6), dark gradient backgrounds (#0F172A → #1E293B), success green (#10B981), warning amber (#F59E0B).
- **Effects:** Glassmorphism, gradient text, glow on CTAs, hover/active states, smooth scrolling.
- **Background:** Full-site looping video (`/public/0212.mp4`) with a dark overlay for readability.
- **3D:** Landing hero uses `NetworkVisualization` (nodes + connections), `ParticleSystem`, and `FloatingShapes`; auto-rotate and mouse-reactive. Explorer uses `MinerNetworkScene`.

## Project structure

```
src/
├── components/
│   ├── 3d/
│   │   ├── NetworkVisualization.tsx   # Three.js hero (nodes + edges)
│   │   ├── FloatingShapes.tsx         # Wireframe cubes/spheres
│   │   └── ParticleSystem.tsx         # Particle field
│   ├── dashboard/
│   │   ├── StatsCard.tsx              # Animated counter cards
│   │   ├── MinerGrid.tsx
│   │   ├── QualityChart.tsx           # Line + radar
│   │   └── ActivityFeed.tsx
│   ├── layout/
│   │   ├── Navbar.tsx                 # Responsive nav + Connect Wallet button
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── marketplace/
│   │   ├── DatasetCard.tsx            # Preview snippet, download flow with confirm dialog
│   │   ├── FilterSidebar.tsx
│   │   └── PreviewModal.tsx
│   ├── request/
│   │   ├── StepIndicator.tsx
│   │   ├── DataTypeSelector.tsx
│   │   └── SpecificationForm.tsx
│   ├── Layout.tsx                     # Root layout with video background
│   ├── MinerNetworkScene.tsx          # 3D scene for Explorer page
│   ├── ScrollReveal.tsx
│   └── Skeleton.tsx
├── context/
│   └── ToastContext.tsx
├── data/                              # Static data files
├── hooks/
│   └── useAnimatedCounter.ts
├── pages/
│   ├── Landing.tsx
│   ├── Dashboard.tsx
│   ├── RequestData.tsx
│   ├── Explorer.tsx
│   └── Marketplace.tsx
├── utils/
│   └── mockData.ts
└── App.tsx
```

## Mock data (example from spec)

- **Active miners:** 342
- **Total datasets generated:** 15,847
- **Average quality score:** 94.2/100
- **Network uptime:** 99.8%
- **Recent generations:** e.g. "Customer service conversations dataset" (1,000 samples, Quality 96), "Python function examples" (500, 91), "Product descriptions" (2,500, 93).

All of this lives in `src/utils/mockData.ts`. Replace with real API calls for production.

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint
npm run pdf      # Generate PDF from presentation (requires puppeteer)
```

## Pages

- **/** — Landing: video background, 3D hero, animated stats (count-up when in view), recent generations, features, live activity, CTA.
- **/dashboard** — Stats cards (animated counters), quality line/radar charts, generation queue, top miners.
- **/request** — Multi-step form (StepIndicator, DataTypeSelector, SpecificationForm), cost estimate, success toast on submit.
- **/explorer** — 3D miner network scene, miner/validator table, detail panel with radar.
- **/marketplace** — Filter sidebar, dataset cards with preview snippets and download confirm dialog, preview modal.

## Key UI features

- **Connect Wallet** button in navbar (desktop and mobile) styled with blue→cyan gradient.
- **Download flow** on dataset cards: click → confirm purchase dialog (shows TAO price) → animated download state → success toast.
- **Video background** (`public/0212.mp4`) plays muted, looping behind all pages with a semi-transparent dark overlay.
- Counter animations for stats (count up from 0 when in view).
- Stagger animations for lists (dashboard, activity feed).
- Scroll-triggered reveals (`ScrollReveal`).
- Page transition animations (Framer Motion `AnimatePresence`).
- Modal enter/exit (PreviewModal, Toast, download confirm).
- Loading skeletons available in `Skeleton.tsx`.

## Assets

- `public/synthnet-logo.png` — Logo shown in navbar.
- `public/0212.mp4` / `public/0212.mov` — Background video (MP4 for Chrome/Firefox, MOV fallback for Safari).
