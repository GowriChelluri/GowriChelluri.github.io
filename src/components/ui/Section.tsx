import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'

interface SectionProps {
  id: string
  className?: string
  children: ReactNode
  labelledBy?: string
}

export function Section({ id, className, children, labelledBy = `${id}-title` }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative py-20 sm:py-28', className)}>
      <div className="container">{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

/** Eyebrow, heading and description reveal one after another. */
export function SectionHeading({ id, eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(0.12)}
      // Pass a margin via className to override the default spacing below the heading.
      className={cn(className ?? 'mb-12 sm:mb-14', align === 'center' && 'mx-auto text-center')}
    >
      <motion.p variants={fadeUp} className={cn('eyebrow flex items-center gap-3', align === 'center' && 'justify-center')}>
        <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-accent to-accent-2" />
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        variants={fadeUp}
        className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={cn('mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg', align === 'center' && 'mx-auto')}
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  )
}
