import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import RequestData from './pages/RequestData'
import Explorer from './pages/Explorer'
import Marketplace from './pages/Marketplace'

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageWrapper><Landing /></PageWrapper>} />
          <Route path="dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="request" element={<PageWrapper><RequestData /></PageWrapper>} />
          <Route path="explorer" element={<PageWrapper><Explorer /></PageWrapper>} />
          <Route path="marketplace" element={<PageWrapper><Marketplace /></PageWrapper>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
