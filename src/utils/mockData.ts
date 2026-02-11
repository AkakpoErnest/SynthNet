/**
 * SynthNet mock data – matches spec: 342 miners, 15,847 datasets, 94.2 quality, 99.8% uptime
 * and recent generations: Customer service (1k/96), Python (500/91), Product descriptions (2.5k/93).
 */

export interface Miner {
  id: string
  uid: string
  stake: number
  rank: number
  trust: number
  consensus: number
  incentive: number
  dividends: number
  lastUpdate: number
  validatorPermit: boolean
  active: boolean
  coldkey: string
  hotkey: string
  uptime: number
  datasetsGenerated: number
}

export interface Validator {
  id: string
  uid: string
  stake: number
  rank: number
  trust: number
  consensus: number
  incentive: number
  dividends: number
  lastUpdate: number
  validatorPermit: boolean
  active: boolean
}

export interface Dataset {
  id: string
  name: string
  type: 'text' | 'code' | 'conversations'
  qualityScore: number
  samples: number
  price: number
  createdAt: string
  minerId: string
  preview: string[]
}

export interface RecentGeneration {
  id: string
  name: string
  samples: number
  qualityScore: number
  type: 'text' | 'code' | 'conversations'
  createdAt: string
}

export interface GenerationActivity {
  id: string
  type: string
  minerId: string
  datasetId: string
  progress: number
  status: 'pending' | 'generating' | 'complete' | 'failed'
  createdAt: string
}

export interface NetworkStats {
  activeMiners: number
  totalDatasetsGenerated: number
  averageQualityScore: number
  networkUptime: number
  totalTAOStaked: number
}

export const NETWORK_STATS: NetworkStats = {
  activeMiners: 342,
  totalDatasetsGenerated: 15847,
  averageQualityScore: 94.2,
  networkUptime: 99.8,
  totalTAOStaked: 2843920,
}

export const RECENT_GENERATIONS: RecentGeneration[] = [
  { id: 'rg-1', name: 'Customer service conversations dataset', samples: 1000, qualityScore: 96, type: 'conversations', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'rg-2', name: 'Python function examples', samples: 500, qualityScore: 91, type: 'code', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'rg-3', name: 'Product descriptions', samples: 2500, qualityScore: 93, type: 'text', createdAt: new Date(Date.now() - 10800000).toISOString() },
]

export const MOCK_MINERS: Miner[] = Array.from({ length: 24 }, (_, i) => ({
  id: `miner-${i + 1}`,
  uid: String(i + 1),
  stake: 1200 + Math.random() * 8000,
  rank: i + 1,
  trust: 0.7 + Math.random() * 0.3,
  consensus: 0.65 + Math.random() * 0.35,
  incentive: 0.5 + Math.random() * 0.5,
  dividends: 0.4 + Math.random() * 0.4,
  lastUpdate: Date.now() - Math.random() * 3600000,
  validatorPermit: i < 4,
  active: true,
  coldkey: `5GrwvaEF...${String(i).padStart(2, '0')}`,
  hotkey: `5FHneW46...${String(i).padStart(2, '0')}`,
  uptime: 95 + Math.random() * 5,
  datasetsGenerated: 100 + Math.floor(Math.random() * 500),
}))

export const MOCK_VALIDATORS: Validator[] = MOCK_MINERS.filter(m => m.validatorPermit).slice(0, 8).map((m, i) => ({
  ...m,
  id: `validator-${i + 1}`,
}))

export const MOCK_DATASETS: Dataset[] = [
  { id: 'ds-1', name: 'Code completions - TypeScript', type: 'code', qualityScore: 96, samples: 50000, price: 120, createdAt: '2025-02-10T14:30:00Z', minerId: 'miner-1', preview: ['function useSynthNet() {', '  const [data, setData] = useState(null)', '  return data', '}'] },
  { id: 'ds-2', name: 'Customer service conversations dataset', type: 'conversations', qualityScore: 96, samples: 1000, price: 85, createdAt: '2025-02-10T12:00:00Z', minerId: 'miner-2', preview: ['User: My order has not arrived', 'Agent: I apologize for the delay. Let me check...', 'User: Order #28492'] },
  { id: 'ds-3', name: 'Python function examples', type: 'code', qualityScore: 91, samples: 500, price: 45, createdAt: '2025-02-10T10:15:00Z', minerId: 'miner-3', preview: ['def train_model(X, y):', '    """Train a classifier on the given features."""', '    return model.fit(X, y)'] },
  { id: 'ds-4', name: 'Product descriptions', type: 'text', qualityScore: 93, samples: 2500, price: 60, createdAt: '2025-02-10T09:00:00Z', minerId: 'miner-1', preview: ['Premium wireless headphones with 30h battery.', 'Ergonomic office chair with lumbar support.'] },
  { id: 'ds-5', name: 'Technical documentation - API', type: 'text', qualityScore: 94, samples: 10000, price: 60, createdAt: '2025-02-10T08:00:00Z', minerId: 'miner-3', preview: ['GET /api/v1/datasets', 'Returns a paginated list of synthetic datasets.', 'Query params: page, limit, type'] },
  { id: 'ds-6', name: 'Multi-turn QA dialogues', type: 'conversations', qualityScore: 97, samples: 15000, price: 140, createdAt: '2025-02-09T11:00:00Z', minerId: 'miner-2', preview: ['Q: What is the capital of France?', 'A: Paris.', 'Q: What is its population?', 'A: About 2.1 million in the city.'] },
]

export const MOCK_ACTIVITY: GenerationActivity[] = [
  { id: 'a1', type: 'code', minerId: 'miner-1', datasetId: 'ds-1', progress: 100, status: 'complete', createdAt: new Date().toISOString() },
  { id: 'a2', type: 'text', minerId: 'miner-3', datasetId: 'ds-7', progress: 67, status: 'generating', createdAt: new Date(Date.now() - 120000).toISOString() },
  { id: 'a3', type: 'conversations', minerId: 'miner-2', datasetId: 'ds-8', progress: 23, status: 'generating', createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: 'a4', type: 'code', minerId: 'miner-4', datasetId: 'ds-9', progress: 0, status: 'pending', createdAt: new Date(Date.now() - 60000).toISOString() },
  { id: 'a5', type: 'text', minerId: 'miner-1', datasetId: 'ds-10', progress: 100, status: 'complete', createdAt: new Date(Date.now() - 600000).toISOString() },
]

export const QUALITY_METRICS_OVER_TIME = [
  { day: 'Mon', score: 92 }, { day: 'Tue', score: 94 }, { day: 'Wed', score: 91 },
  { day: 'Thu', score: 95 }, { day: 'Fri', score: 94 }, { day: 'Sat', score: 96 }, { day: 'Sun', score: 94 },
]

export const RADAR_METRICS = [
  { metric: 'Diversity', value: 88, fullMark: 100 },
  { metric: 'Accuracy', value: 94, fullMark: 100 },
  { metric: 'Coherence', value: 91, fullMark: 100 },
  { metric: 'Format', value: 97, fullMark: 100 },
  { metric: 'Creativity', value: 85, fullMark: 100 },
]

export const DATA_TYPES = [
  { id: 'text', label: 'Text', description: 'Articles, docs, reviews' },
  { id: 'code', label: 'Code', description: 'Snippets, completions, docstrings' },
  { id: 'conversations', label: 'Conversations', description: 'Dialogues, support, QA' },
] as const
