import { motion } from 'framer-motion'
import { FileText, Code, MessageCircle } from 'lucide-react'
import { DATA_TYPES } from '../../utils/mockData'
import type { ComponentType } from 'react'

const typeIcons: Record<string, ComponentType<{ className?: string }>> = {
  text: FileText,
  code: Code,
  conversations: MessageCircle,
}

export default function DataTypeSelector({
  value,
  onChange,
}: {
  value: string
  onChange: (id: 'text' | 'code' | 'conversations') => void
}) {
  return (
    <div className="grid gap-3">
      {DATA_TYPES.map((t) => {
        const Icon = typeIcons[t.id]
        return (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
              value === t.id
                ? 'border-[#3B82F6] bg-[#3B82F6]/10 shadow-lg shadow-[#3B82F6]/20'
                : 'border-white/10 hover:border-white/20 bg-white/5'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div>
              <p className="font-medium text-white">{t.label}</p>
              <p className="text-sm text-white/60">{t.description}</p>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
