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
        <label className="block text-sm font-medium text-white/80 mb-2">Quantity (samples)</label>
        <input
          type="number"
          min={100}
          max={100000}
          step={100}
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition"
        />
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
