import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, Check } from 'lucide-react'
import { experience, type ExperienceItem } from '../data/experience'
import { isConfigured } from '../lib/placeholder'
import { easeOut, fadeUp, stagger, viewportOnce } from '../lib/motion'
import { Section, SectionHeading } from '../components/ui/Section'
import { PlaceholderHint } from '../components/ui/PlaceholderHint'

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <div className="relative">
      {/* Timeline marker */}
      <motion.span
        aria-hidden="true"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
        style={{ x: '-50%' }}
        className="absolute -left-10 top-7 grid h-8 w-8 place-items-center sm:-left-14"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/25 [animation-duration:2.6s]" />
        <span className="relative h-3.5 w-3.5 rounded-full border-2 border-bg bg-gradient-to-br from-accent to-accent-2 shadow-glow" />
      </motion.span>

      <motion.article
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: easeOut }}
        className="card card-spotlight glow-border p-6 sm:p-8"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
          e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
        }}
      >
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-glow">
              <Briefcase size={20} />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-fg sm:text-2xl">{item.role}</h3>
              <p className="mt-1 text-[15px] text-muted">
                <span className="font-medium text-fg/90">{item.company}</span>
                <span className="mx-2 text-line">/</span>
                {item.team}
                {item.location && (
                  <>
                    <span className="mx-2 text-line">·</span>
                    {item.location}
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
            {item.current && (
              <span className="chip border-success/30 bg-success/10">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Current role
              </span>
            )}
            {isConfigured(item.period) ? (
              <span className="font-mono text-xs text-muted">{item.period}</span>
            ) : (
              <>
                <span className="font-mono text-xs text-muted">{item.duration}</span>
                <PlaceholderHint value={item.period} file="src/data/experience.ts" />
              </>
            )}
          </div>
        </header>

        <p className="mt-6 leading-relaxed text-muted">{item.summary}</p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.08, 0.2)}
          className="mt-6 grid gap-3"
        >
          {item.highlights.map((h) => (
            <motion.li key={h} variants={fadeUp} className="flex gap-3 text-[15px] leading-relaxed text-fg/90">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Check size={12} strokeWidth={3} />
              </span>
              {h}
            </motion.li>
          ))}
        </motion.ul>

        <ul className="mt-7 flex flex-wrap gap-2 border-t border-line/60 pt-6" aria-label="Technologies used">
          {item.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  )
}

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <Section id="experience">
      <SectionHeading
        id="experience-title"
        eyebrow="Experience"
        title={
          <>
            Where I've been <span className="text-gradient">building</span>.
          </>
        }
        description="Frontend engineering on an enterprise application performance monitoring platform."
      />

      <div ref={timelineRef} className="relative pl-10 sm:pl-14">
        <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-line/70" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: reduce ? 1 : scaleY }}
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent/0"
        />
        <div className="space-y-10">
          {experience.map((item) => (
            <ExperienceCard key={`${item.company}-${item.role}`} item={item} />
          ))}
        </div>
      </div>
    </Section>
  )
}
