import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Cpu, Shield, TrendingUp } from 'lucide-react'
import MinerNetworkScene from '../components/MinerNetworkScene'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'
import { MOCK_MINERS } from '../utils/mockData'

const radarMetrics = (m: (typeof MOCK_MINERS)[0]) => [
  { metric: 'Trust', value: m.trust * 100, fullMark: 100 },
  { metric: 'Consensus', value: m.consensus * 100, fullMark: 100 },
  { metric: 'Incentive', value: m.incentive * 100, fullMark: 100 },
  { metric: 'Dividends', value: m.dividends * 100, fullMark: 100 },
]

export default function Explorer() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = MOCK_MINERS.filter(
    (m) =>
      m.uid.includes(search) ||
      m.coldkey.toLowerCase().includes(search.toLowerCase())
  )
  const miner = selected ? MOCK_MINERS.find((m) => m.id === selected) : null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-2xl font-bold text-white mb-2">Miner & validator explorer</h1>
      <p className="text-white/60 mb-8">Inspect performance and quality metrics.</p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold text-white mb-3">Network overview</h2>
        <MinerNetworkScene />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by UID or coldkey..."
              className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/40 focus:border-[#3B82F6] outline-none"
            />
          </div>

          <div className="glass-card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">UID</th>
                    <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Stake</th>
                    <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Trust</th>
                    <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Incentive</th>
                    <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Role</th>
                    <th className="text-left py-3 px-4 text-white/60 font-medium text-sm" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (
                    <tr
                      key={m.id}
                      onClick={() => setSelected(m.id)}
                      className={`border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${
                        selected === m.id ? 'bg-[#3B82F6]/10' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono text-white">{m.uid}</td>
                      <td className="py-3 px-4 text-white/80">{m.stake.toFixed(0)}</td>
                      <td className="py-3 px-4 text-white/80">{(m.trust * 100).toFixed(0)}%</td>
                      <td className="py-3 px-4 text-[#10B981]">{(m.incentive * 100).toFixed(0)}%</td>
                      <td className="py-3 px-4">
                        {m.validatorPermit ? (
                          <span className="inline-flex items-center gap-1 text-[#8B5CF6] text-sm">
                            <Shield className="w-3.5 h-3.5" />
                            Validator
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-white/60 text-sm">
                            <Cpu className="w-3.5 h-3.5" />
                            Miner
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          {miner ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card sticky top-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Miner {miner.uid}</h2>
                  <p className="text-xs text-white/50 font-mono">{miner.coldkey}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-white/50">Stake</p>
                  <p className="text-white font-semibold">{miner.stake.toFixed(0)}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-white/50">Rank</p>
                  <p className="text-white font-semibold">#{miner.rank}</p>
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarMetrics(miner)}>
                    <PolarGrid stroke="rgba(255,255,255,0.2)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                    <Radar name="Score" dataKey="value" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-white/60">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
                Last update: {new Date(miner.lastUpdate).toLocaleTimeString()}
              </div>
            </motion.div>
          ) : (
            <div className="glass-card flex flex-col items-center justify-center py-16 text-center">
              <Cpu className="w-12 h-12 text-white/30 mb-4" />
              <p className="text-white/50">Select a miner to view details</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
