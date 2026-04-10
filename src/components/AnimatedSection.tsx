import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
}

export function AnimatedSection({ 
  children, 
  className, 
  delay = 0,
  direction = 'up' 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const variants = {
    up: { opacity: 0, y: 50 },
    down: { opacity: 0, y: -50 },
    left: { opacity: 0, x: 50 },
    right: { opacity: 0, x: -50 },
    scale: { opacity: 0, scale: 0.8 },
  }

  const animateVariants = {
    up: { opacity: 1, y: 0 },
    down: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    scale: { opacity: 1, scale: 1 },
  }

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? animateVariants[direction] : variants[direction]}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
