import { motion, type Variants } from 'framer-motion'

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function ScrollReveal({
  children,
  className,
  variants = defaultVariants,
  once = true,
}: {
  children: React.ReactNode
  className?: string
  variants?: Variants
  once?: boolean
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
