import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Database,
  Network,
  FileJson,
  Menu,
  X,
  Zap,
  Wallet,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Home', icon: Zap },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/request', label: 'Request Data', icon: Database },
  { to: '/explorer', label: 'Miner Explorer', icon: Network },
  { to: '/marketplace', label: 'Marketplace', icon: FileJson },
]

export default function Navbar() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/synthnet-logo.png"
              alt="SynthNet"
              className="w-9 h-9 rounded-lg object-contain shadow-lg shadow-[#3B82F6]/20 group-hover:shadow-[#3B82F6]/30 transition-shadow"
            />
            <span className="font-semibold text-lg text-white">SynthNet</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}>
                <motion.span
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === to
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </motion.span>
              </Link>
            ))}
            <motion.button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </motion.button>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 overflow-hidden"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                    location.pathname === to ? 'bg-white/10 text-white' : 'text-white/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white mt-2"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
