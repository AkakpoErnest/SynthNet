import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Code, MessageCircle, Download, Loader2, Check, X } from 'lucide-react'
import type { Dataset } from '../../utils/mockData'
import type { ComponentType } from 'react'
import { useToast } from '../../context/ToastContext'

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
  const { toast } = useToast()
  const previewSnippet = dataset.preview?.[0] ?? ''
  const [showConfirm, setShowConfirm] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (downloading || downloaded) return
    setShowConfirm(true)
  }

  const handleConfirmDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowConfirm(false)
    setDownloading(true)
    toast(`Downloading "${dataset.name}"...`, 'info')
    setTimeout(() => {
      setDownloading(false)
      setDownloaded(true)
      toast(`"${dataset.name}" downloaded successfully`, 'success')
      setTimeout(() => setDownloaded(false), 2000)
    }, 800)
  }

  const handleCancelDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowConfirm(false)
  }

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
      <p className="text-sm text-white/50 mb-3">
        {dataset.samples.toLocaleString()} samples · {typeLabels[dataset.type]}
      </p>
      {previewSnippet && (
        <pre className="text-xs text-white/40 font-mono bg-white/5 rounded-lg px-3 py-2 mb-4 overflow-hidden text-ellipsis whitespace-nowrap border border-white/5">
          {previewSnippet}
        </pre>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-[#3B82F6]">{dataset.price} TAO</span>
        <motion.button
          type="button"
          onClick={handleDownloadClick}
          disabled={downloading}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
            downloaded
              ? 'bg-[#10B981]/30 text-[#10B981]'
              : downloading
                ? 'bg-[#3B82F6]/30 text-[#60A5FA]'
                : 'bg-white/10 text-white hover:bg-white/15'
          }`}
          whileHover={!downloading && !downloaded ? { scale: 1.05 } : {}}
          whileTap={!downloading && !downloaded ? { scale: 0.98 } : {}}
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Downloading...
            </>
          ) : downloaded ? (
            <>
              <Check className="w-4 h-4" />
              Downloaded
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download
            </>
          )}
        </motion.button>
      </div>

      {createPortal(
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={handleCancelDownload}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card max-w-md w-full p-6 border border-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Confirm purchase</h3>
                  <button
                    type="button"
                    onClick={handleCancelDownload}
                    className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-white/80 mb-6">
                  Are you sure you want to pay <span className="font-bold text-[#3B82F6]">{dataset.price} TAO</span> to download this dataset?
                </p>
                <p className="text-sm text-white/50 mb-6">{dataset.name}</p>
                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    onClick={handleCancelDownload}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/15 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleConfirmDownload}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Pay {dataset.price} TAO
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  )
}
