import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Database, Shield, Zap, ArrowRight, Activity } from 'lucide-react'
import NetworkVisualization from '../components/3d/NetworkVisualization'
import ScrollReveal from '../components/ScrollReveal'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'
import {
  NETWORK_STATS,
  RECENT_GENERATIONS,
  MOCK_ACTIVITY,
} from '../utils/mockData'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Landing() {
  const datasets = useAnimatedCounter({
    end: NETWORK_STATS.totalDatasetsGenerated,
    duration: 1600,
    startInView: true,
  })
  const miners = useAnimatedCounter({
    end: NETWORK_STATS.activeMiners,
    duration: 1200,
    startInView: true,
  })
  const quality = useAnimatedCounter({
    end: NETWORK_STATS.averageQualityScore,
    duration: 1000,
    startInView: true,
    decimals: 1,
    suffix: '/100',
  })
  const uptime = useAnimatedCounter({
    end: NETWORK_STATS.networkUptime,
    duration: 1200,
    startInView: true,
    decimals: 1,
    suffix: '%',
  })

  return (
    <div className="relative">
      {/* Hero with parallax-style gradient overlay */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-transparent to-[#0F172A] z-10 pointer-events-none" />
        <NetworkVisualization />
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="text-white">Decentralized </span>
            <span className="text-gradient">Synthetic Data</span>
            <br />
            <span className="text-white">Generation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto"
          >
            Request high-quality synthetic datasets from a decentralized network of miners.
            Powered by Bittensor. Train better models with verifiable, on-chain quality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10"
          >
            <Link to="/request">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold text-lg btn-glow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Request Data
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats with animated counters */}
      <section className="relative z-20 -mt-20 px-6 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div variants={item} ref={datasets.ref as React.RefObject<HTMLDivElement>} className="glass-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Database className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white tabular-nums">{datasets.display}</p>
              <p className="text-sm text-white/60">Total datasets generated</p>
            </div>
          </motion.div>
          <motion.div variants={item} ref={miners.ref as React.RefObject<HTMLDivElement>} className="glass-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white tabular-nums">{miners.display}</p>
              <p className="text-sm text-white/60">Active miners</p>
            </div>
          </motion.div>
          <motion.div variants={item} ref={quality.ref as React.RefObject<HTMLDivElement>} className="glass-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white tabular-nums">{quality.display}</p>
              <p className="text-sm text-white/60">Average quality score</p>
            </div>
          </motion.div>
          <motion.div variants={item} ref={uptime.ref as React.RefObject<HTMLDivElement>} className="glass-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white tabular-nums">{uptime.display}</p>
              <p className="text-sm text-white/60">Network uptime</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Recent generations (spec example data) */}
      <section className="relative z-20 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-[#10B981]" />
              <h2 className="text-2xl font-bold text-white">Recent generations</h2>
            </div>
          </ScrollReveal>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="glass-card space-y-4"
          >
            {RECENT_GENERATIONS.map((gen) => (
              <motion.div
                key={gen.id}
                variants={item}
                className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0"
              >
                <p className="text-white font-medium">{gen.name}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-white/60">{gen.samples.toLocaleString()} samples</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#10B981]/20 text-[#10B981] font-semibold">
                    Quality: {gen.qualityScore}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-20 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
              Why <span className="text-gradient">SynthNet</span>?
            </h2>
          </ScrollReveal>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: 'Decentralized quality', desc: 'Miners compete to produce the best synthetic data. Validators score and reward quality on-chain.', icon: Shield },
              { title: 'Any data type', desc: 'Text, code, conversations — request the format you need. Multi-step forms with real-time validation.', icon: Database },
              { title: 'Real-time pipeline', desc: 'Watch generations in progress, inspect samples, and download verified datasets from the marketplace.', icon: Zap },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={item}
                className="glass-card group hover:border-white/15 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-7 h-7 text-[#60A5FA]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/60">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live activity */}
      <section className="relative z-20 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-[#10B981]" />
              <h2 className="text-2xl font-bold text-white">Live activity</h2>
            </div>
          </ScrollReveal>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card space-y-3"
          >
            {MOCK_ACTIVITY.map((a, i) => (
              <div
                key={a.id}
                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm capitalize">{a.type}</span>
                  <span className="text-white/40 text-xs">Miner {a.minerId.replace('miner-', '')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
                      initial={{ width: 0 }}
                      animate={{ width: `${a.progress}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                  <span className="text-xs text-white/50 w-16 capitalize">{a.status}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-20 py-24 px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center glass-card">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to request synthetic data?
            </h2>
            <p className="text-white/60 mb-8">
              Choose type, set specs, and get high-quality datasets from the SynthNet subnet.
            </p>
            <Link to="/request">
              <motion.span
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-medium hover:bg-white/15 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
