import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { easeOut, fadeUp, stagger, viewportOnce } from '../../lib/motion'

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
}

/** Fades and slides its content up the first time it scrolls into view. */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay } },
  }
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={variants} {...props}>
      {children}
    </motion.div>
  )
}

interface RevealGroupProps extends HTMLMotionProps<'div'> {
  staggerBy?: number
  delay?: number
}

/** Container that reveals its <RevealItem> children one after another. */
export function RevealGroup({ staggerBy = 0.08, delay = 0, children, ...props }: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(staggerBy, delay)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ variants = fadeUp, children, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={variants} {...props}>
      {children}
    </motion.div>
  )
}
