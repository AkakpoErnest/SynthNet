import { motion } from 'framer-motion'
import type { GenerationActivity } from '../../utils/mockData'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
}

export default function ActivityFeed({ activities }: { activities: GenerationActivity[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-3"
    >
      {activities.map((a, i) => (
        <motion.div
          key={a.id}
          variants={item}
          className="flex items-center gap-4"
        >
          <span className="text-white/60 text-sm w-20 capitalize">{a.type}</span>
          <span className="text-white/40 text-xs">Miner {a.minerId.replace('miner-', '')}</span>
          <div className="flex-1 min-w-0">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
                initial={{ width: 0 }}
                animate={{ width: `${a.progress}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </div>
          </div>
          <span className="text-xs text-white/50 w-16 capitalize">{a.status}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}
