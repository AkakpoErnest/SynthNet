import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import type { Miner } from '../../utils/mockData'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export default function MinerGrid({ miners }: { miners: Miner[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-2 max-h-64 overflow-y-auto"
    >
      {miners.slice(0, 8).map((m) => (
        <motion.div
          key={m.id}
          variants={item}
          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" title="Active" />
            <span className="text-white font-medium">Miner {m.uid}</span>
            {m.validatorPermit && (
              <Shield className="w-3.5 h-3.5 text-[#8B5CF6]" />
            )}
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-white/60">Trust {(m.trust * 100).toFixed(0)}%</span>
            <span className="text-[#10B981]">Incentive {(m.incentive * 100).toFixed(0)}%</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
