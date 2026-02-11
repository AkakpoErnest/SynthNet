import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'

export default function FilterSidebar({
  typeFilter,
  onTypeFilterChange,
  qualityMin,
  onQualityMinChange,
}: {
  typeFilter: string
  onTypeFilterChange: (v: string) => void
  qualityMin: number
  onQualityMinChange: (v: number) => void
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:w-56 shrink-0"
    >
      <div className="glass-card sticky top-24">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-white/60" />
          <span className="font-medium text-white">Filters</span>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#3B82F6] outline-none transition-colors"
            >
              <option value="all">All</option>
              <option value="text">Text</option>
              <option value="code">Code</option>
              <option value="conversations">Conversations</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Min quality: {qualityMin}</label>
            <input
              type="range"
              min={0}
              max={100}
              value={qualityMin}
              onChange={(e) => onQualityMinChange(Number(e.target.value))}
              className="w-full h-2 rounded-full bg-white/10 accent-[#3B82F6]"
            />
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
