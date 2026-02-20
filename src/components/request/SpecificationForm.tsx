import { motion } from 'framer-motion'

export default function SpecificationForm({
  topic,
  onTopicChange,
  quantity,
  onQuantityChange,
  format,
  onFormatChange,
}: {
  topic: string
  onTopicChange: (v: string) => void
  quantity: number
  onQuantityChange: (v: number) => void
  format: string
  onFormatChange: (v: string) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Topic / theme</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="e.g. customer support, API docs"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-white/80">Quantity (samples)</label>
          <span className="text-sm font-bold text-[#3B82F6] tabular-nums">{quantity.toLocaleString()}</span>
        </div>
        <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] transition-all duration-150"
            style={{ width: `${((quantity - 100) / 99900) * 100}%` }}
          />
          <input
            type="range"
            min={100}
            max={100000}
            step={100}
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Output format</label>
        <select
          value={format}
          onChange={(e) => onFormatChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#3B82F6] outline-none transition"
        >
          <option value="jsonl">JSONL</option>
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
          <option value="txt">Plain text</option>
        </select>
      </div>
    </motion.div>
  )
}
