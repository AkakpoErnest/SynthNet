import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import StepIndicator from '../components/request/StepIndicator'
import DataTypeSelector from '../components/request/DataTypeSelector'
import SpecificationForm from '../components/request/SpecificationForm'
import { useToast } from '../context/ToastContext'

export default function RequestData() {
  const [step, setStep] = useState(1)
  const [dataType, setDataType] = useState<'text' | 'code' | 'conversations' | ''>('')
  const [topic, setTopic] = useState('')
  const [quantity, setQuantity] = useState(1000)
  const [format, setFormat] = useState('jsonl')
  const [diversity, setDiversity] = useState(70)
  const [creativity, setCreativity] = useState(60)
  const { toast } = useToast()

  const estimatedCost = Math.round((quantity / 500) * (diversity / 50) * 2.5)

  const handleSubmit = () => {
    toast('Request submitted successfully. Miners are generating your dataset.', 'success')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto px-4 py-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white mb-2"
      >
        Request synthetic data
      </motion.h1>
      <p className="text-white/60 mb-10">Multi-step form with live cost estimate.</p>

      <StepIndicator step={step} setStep={setStep} />

      <div className="glass-card min-h-[320px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">Choose data type</h2>
              <DataTypeSelector value={dataType} onChange={setDataType} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">Specifications</h2>
              <SpecificationForm
                topic={topic}
                onTopicChange={setTopic}
                quantity={quantity}
                onQuantityChange={setQuantity}
                format={format}
                onFormatChange={setFormat}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-white">Quality settings</h2>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Diversity: {diversity}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={diversity}
                  onChange={(e) => setDiversity(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-white/10 accent-[#3B82F6]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Creativity: {creativity}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={creativity}
                  onChange={(e) => setCreativity(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-white/10 accent-[#8B5CF6]"
                />
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-white">Review & submit</h2>
              <div className="space-y-2 text-sm">
                <p className="text-white/80"><span className="text-white/50">Type:</span> {dataType || '—'}</p>
                <p className="text-white/80"><span className="text-white/50">Topic:</span> {topic || '—'}</p>
                <p className="text-white/80"><span className="text-white/50">Quantity:</span> {quantity.toLocaleString()}</p>
                <p className="text-white/80"><span className="text-white/50">Format:</span> {format}</p>
                <p className="text-white/80"><span className="text-white/50">Diversity / Creativity:</span> {diversity}% / {creativity}%</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60">Estimated cost</p>
                <p className="text-2xl font-bold text-[#3B82F6]">~{estimatedCost} TAO</p>
              </div>
              <motion.button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold btn-glow"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Submit request
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step >= 2 && step < 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 glass-card flex items-center justify-between"
        >
          <span className="text-white/70">Estimated cost</span>
          <span className="text-xl font-bold text-[#3B82F6]">~{estimatedCost} TAO</span>
        </motion.div>
      )}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        {step < 4 && (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
