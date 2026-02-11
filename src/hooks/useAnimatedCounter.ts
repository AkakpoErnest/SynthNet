import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export interface UseAnimatedCounterOptions {
  end: number
  duration?: number
  /** Start animation when element is in view */
  startInView?: boolean
  decimals?: number
  easing?: 'linear' | 'easeOut'
  suffix?: string
  prefix?: string
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

export function useAnimatedCounter(
  options: UseAnimatedCounterOptions
): { value: number; display: string; ref: React.RefObject<HTMLElement | null> } {
  const {
    end,
    duration = 1500,
    startInView = false,
    decimals = 0,
    easing = 'easeOut',
    suffix = '',
    prefix = '',
  } = options

  const [value, setValue] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (startInView && !inView) return
    if (startInView && inView && hasStarted.current) return
    if (startInView && inView) hasStarted.current = true

    const startTime = performance.now()
    const startValue = 0

    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = easing === 'easeOut' ? easeOutQuart(t) : t
      const current = startValue + (end - startValue) * eased
      setValue(current)
      if (t < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [end, duration, startInView, inView, easing])

  const display =
    prefix +
    (decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()) +
    suffix

  return { value, display, ref }
}
