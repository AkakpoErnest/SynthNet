import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'

const lineData = [
  { day: 'Mon', score: 92 },
  { day: 'Tue', score: 94 },
  { day: 'Wed', score: 91 },
  { day: 'Thu', score: 95 },
  { day: 'Fri', score: 94 },
  { day: 'Sat', score: 96 },
  { day: 'Sun', score: 94 },
]

const radarData = [
  { metric: 'Diversity', value: 88, fullMark: 100 },
  { metric: 'Accuracy', value: 94, fullMark: 100 },
  { metric: 'Coherence', value: 91, fullMark: 100 },
  { metric: 'Format', value: 97, fullMark: 100 },
  { metric: 'Creativity', value: 85, fullMark: 100 },
]

export function QualityLineChart() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card"
    >
      <h2 className="text-lg font-semibold text-white mb-4">Quality over time</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} domain={[88, 100]} />
            <Tooltip
              contentStyle={{
                background: '#1E293B',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export function QualityRadarChart() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card"
    >
      <h2 className="text-lg font-semibold text-white mb-4">Quality metrics</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.2)" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: 'rgba(255,255,255,0.5)' }}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
