import { motion } from 'framer-motion'
import { Database, Cpu, TrendingUp, Activity } from 'lucide-react'
import StatsCard from '../components/dashboard/StatsCard'
import MinerGrid from '../components/dashboard/MinerGrid'
import { QualityLineChart, QualityRadarChart } from '../components/dashboard/QualityChart'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import {
  NETWORK_STATS,
  MOCK_MINERS,
  MOCK_ACTIVITY,
} from '../utils/mockData'

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white mb-8"
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Total datasets"
          value={NETWORK_STATS.totalDatasetsGenerated}
          icon={Database}
          gradient="from-[#3B82F6] to-[#06B6D4]"
          animateCounter
        />
        <StatsCard
          label="Active miners"
          value={NETWORK_STATS.activeMiners}
          icon={Cpu}
          gradient="from-[#8B5CF6] to-[#7C3AED]"
          animateCounter
        />
        <StatsCard
          label="Quality score"
          value={`${NETWORK_STATS.averageQualityScore}%`}
          icon={TrendingUp}
          gradient="from-[#10B981] to-[#06B6D4]"
        />
        <StatsCard
          label="TAO staked"
          value={(NETWORK_STATS.totalTAOStaked / 1e6).toFixed(2) + 'M'}
          icon={Activity}
          gradient="from-[#F59E0B] to-[#EF4444]"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <QualityLineChart />
        <QualityRadarChart />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Generation queue</h2>
          <ActivityFeed activities={MOCK_ACTIVITY} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Top miners</h2>
          <MinerGrid miners={MOCK_MINERS} />
        </motion.div>
      </div>
    </motion.div>
  )
}
