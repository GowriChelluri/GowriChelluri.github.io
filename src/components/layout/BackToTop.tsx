import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrolled } from '../../hooks/useScrolled'

export function scrollToTop(reduce: boolean | null) {
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

/** Floating button with a ring that fills as the page scrolls. */
export function BackToTop() {
  const visible = useScrolled(700)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollToTop(reduce)}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="group fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-surface/85 text-fg shadow-card backdrop-blur-xl sm:bottom-8 sm:right-8"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <motion.circle
              cx="24"
              cy="24"
              r="22.5"
              fill="none"
              stroke="url(#btt-gradient)"
              strokeWidth="1.5"
              style={{ pathLength: scrollYProgress }}
            />
            <defs>
              <linearGradient id="btt-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgb(var(--accent))" />
                <stop offset="1" stopColor="rgb(var(--accent-2))" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
