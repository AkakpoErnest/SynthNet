import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const STEPS = [
  { id: 1, title: 'Data type' },
  { id: 2, title: 'Specifications' },
  { id: 3, title: 'Quality' },
  { id: 4, title: 'Review' },
]

export default function StepIndicator({
  step,
  setStep,
}: {
  step: number
  setStep: (s: number) => void
}) {
  return (
    <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <motion.button
            type="button"
            onClick={() => setStep(s.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              step >= s.id ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/70'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {step > s.id ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-white" />
              </motion.span>
            ) : (
              <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-xs">
                {s.id}
              </span>
            )}
            {s.title}
          </motion.button>
          {i < STEPS.length - 1 && (
            <div className="w-6 sm:w-8 h-0.5 bg-white/20 mx-1 rounded" />
          )}
        </div>
      ))}
    </div>
  )
}
