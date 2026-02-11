import { motion, AnimatePresence } from 'framer-motion'
import { Download, X } from 'lucide-react'
import type { Dataset } from '../../utils/mockData'

export default function PreviewModal({
  dataset,
  onClose,
}: {
  dataset: Dataset | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {dataset && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-card max-w-2xl w-full max-h-[80vh] overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-white pr-8">{dataset.name}</h2>
              <motion.button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors absolute top-4 right-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <p className="text-sm text-white/50 mb-4">
              Quality: {dataset.qualityScore} · {dataset.samples.toLocaleString()} samples · {dataset.price} TAO
            </p>
            <div className="rounded-xl bg-[#0F172A] border border-white/10 p-4 font-mono text-sm overflow-auto max-h-64">
              {dataset.preview.map((line, i) => (
                <div key={i} className="text-white/80">
                  <span className="text-white/40 select-none w-6 inline-block">{i + 1}</span>
                  {line}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <motion.button
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3B82F6] text-white font-medium hover:bg-[#2563EB] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
