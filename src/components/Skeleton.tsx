import { motion } from 'framer-motion'

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      className="glass-card space-y-4"
    >
      <div className="h-12 w-12 rounded-xl bg-white/10 animate-pulse" />
      <div className="h-6 w-3/4 rounded bg-white/10 animate-pulse" />
      <div className="h-4 w-1/2 rounded bg-white/10 animate-pulse" />
    </motion.div>
  )
}

export function SkeletonLine() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
      <div className="flex-1 h-2 rounded-full bg-white/10 animate-pulse" />
      <div className="h-4 w-12 rounded bg-white/10 animate-pulse" />
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="glass-card h-64 flex items-end gap-2 p-4">
      {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t bg-white/10"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
        />
      ))}
    </div>
  )
}
