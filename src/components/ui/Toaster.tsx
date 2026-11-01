import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheck, Info } from 'lucide-react'
import { useToasts } from '../../lib/toast'

export function Toaster() {
  const toasts = useToasts()

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex flex-col items-center gap-2 px-4"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 text-sm text-fg shadow-card backdrop-blur-xl"
          >
            {t.tone === 'success' ? (
              <CircleCheck size={18} className="shrink-0 text-success" />
            ) : (
              <Info size={18} className="shrink-0 text-accent" />
            )}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
