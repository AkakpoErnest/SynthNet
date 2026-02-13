import { useRef, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'

export default function Layout() {
  const location = useLocation()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.play().catch(() => {})
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Video background - full site (MP4 for Chrome/Firefox, MOV fallback for Safari) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none -z-10"
      >
        <source src="/0212.mp4" type="video/mp4" />
        <source src="/0212.mov" type="video/quicktime" />
      </video>
      <div className="fixed inset-0 bg-[#0F172A]/60 pointer-events-none -z-[9]" aria-hidden />
      <Navbar />
      <main className="flex-1 pt-16 flex flex-col relative z-0">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
