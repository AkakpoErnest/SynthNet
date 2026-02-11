import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOCK_DATASETS, type Dataset } from '../utils/mockData'
import DatasetCard from '../components/marketplace/DatasetCard'
import FilterSidebar from '../components/marketplace/FilterSidebar'
import PreviewModal from '../components/marketplace/PreviewModal'

export default function Marketplace() {
  const [typeFilter, setTypeFilter] = useState<'all' | 'text' | 'code' | 'conversations'>('all')
  const [qualityMin, setQualityMin] = useState(0)
  const [preview, setPreview] = useState<Dataset | null>(null)

  const filtered = MOCK_DATASETS.filter((d) => {
    if (typeFilter !== 'all' && d.type !== typeFilter) return false
    if (d.qualityScore < qualityMin) return false
    return true
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white mb-2"
      >
        Dataset marketplace
      </motion.h1>
      <p className="text-white/60 mb-8">Browse and download generated synthetic datasets.</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar
          typeFilter={typeFilter}
          onTypeFilterChange={(v) => setTypeFilter(v as 'all' | 'text' | 'code' | 'conversations')}
          qualityMin={qualityMin}
          onQualityMinChange={setQualityMin}
        />

        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((d) => (
              <DatasetCard key={d.id} dataset={d} onPreview={() => setPreview(d)} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <PreviewModal dataset={preview} onClose={() => setPreview(null)} />
    </motion.div>
  )
}
