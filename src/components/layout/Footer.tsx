import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Twitter } from 'lucide-react'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/request', label: 'Request Data' },
  { to: '/explorer', label: 'Explorer' },
  { to: '/marketplace', label: 'Marketplace' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/synthnet-logo.png"
              alt="SynthNet"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="font-semibold text-white">SynthNet</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map(({ to, label }) => (
              <Link key={to} to={to}>
                <motion.span
                  className="text-sm text-white/60 hover:text-white transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {label}
                </motion.span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              className="text-white/50 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              className="text-white/50 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-white/40">
          Decentralized synthetic data generation on Bittensor. Not financial advice.
        </p>
      </div>
    </footer>
  )
}
