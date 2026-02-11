import { motion } from 'framer-motion'
import { FileText, Code, MessageCircle, Download } from 'lucide-react'
import type { Dataset } from '../../utils/mockData'
import type { ComponentType } from 'react'

const typeIcons: Record<'text' | 'code' | 'conversations', ComponentType<{ className?: string }>> = {
  text: FileText,
  code: Code,
  conversations: MessageCircle,
}

const typeLabels: Record<string, string> = {
  text: 'Text',
  code: 'Code',
  conversations: 'Conversations',
}

export default function DatasetCard({
  dataset,
  onPreview,
}: {
  dataset: Dataset
  onPreview: () => void
}) {
  const Icon = typeIcons[dataset.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass-card group cursor-pointer overflow-hidden border border-white/5 hover:border-white/15 hover:shadow-lg hover:shadow-[#3B82F6]/10 transition-all duration-300"
      onClick={onPreview}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-[#3B82F6]" />
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#10B981]/20">
          <span className="text-[#10B981] font-semibold text-sm">{dataset.qualityScore}</span>
          <span className="text-white/50 text-xs">quality</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">{dataset.name}</h3>
      <p className="text-sm text-white/50 mb-4">
        {dataset.samples.toLocaleString()} samples · {typeLabels[dataset.type]}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-[#3B82F6]">{dataset.price} TAO</span>
        <motion.button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-4 h-4" />
          Download
        </motion.button>
      </div>
    </motion.div>
  )
}
