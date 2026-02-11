import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Database, Network, FileJson, Zap } from 'lucide-react'

const items = [
  { to: '/', label: 'Home', icon: Zap },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/request', label: 'Request Data', icon: Database },
  { to: '/explorer', label: 'Explorer', icon: Network },
  { to: '/marketplace', label: 'Marketplace', icon: FileJson },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-white/5 glass min-h-[calc(100vh-4rem)] pt-6 pb-8">
      <nav className="px-3 space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to}>
            <motion.span
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === to
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </motion.span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
