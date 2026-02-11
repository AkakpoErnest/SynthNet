import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'

export interface StatsCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  gradient?: string
  animateCounter?: boolean
  suffix?: string
  decimals?: number
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  gradient = 'from-[#3B82F6] to-[#06B6D4]',
  animateCounter = false,
  suffix = '',
  decimals = 0,
}: StatsCardProps) {
  const numericValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, '')) || 0
  const { display, ref } = useAnimatedCounter({
    end: numericValue,
    duration: 1200,
    startInView: animateCounter,
    decimals,
    suffix,
  })

  const displayValue = animateCounter ? display : (typeof value === 'number' ? value.toLocaleString() + suffix : value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card flex items-center gap-4 group hover:border-white/15 transition-all duration-300"
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        <p className="text-2xl font-bold text-white tabular-nums">{displayValue}</p>
        <p className="text-sm text-white/60">{label}</p>
      </div>
    </motion.div>
  )
}
