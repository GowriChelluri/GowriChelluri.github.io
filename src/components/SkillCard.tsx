import type { PointerEvent } from 'react'
import { motion } from 'framer-motion'
import type { SkillCategory } from '../data/skills'
import { fadeUp } from '../lib/motion'
import { cn } from '../lib/cn'

const trackPointer = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function SkillCard({ category }: { category: SkillCategory }) {
  const { icon: Icon, title, description, skills, wide } = category

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onPointerMove={trackPointer}
      className={cn(
        'card card-spotlight group flex flex-col p-6 transition-colors duration-300 hover:border-accent/40 sm:p-7',
        wide && 'lg:col-span-2',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-fg">{title}</h3>
          <p className="mt-1 text-sm text-muted">{description}</p>
        </div>
        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-surface-2 text-accent transition-[border-color,box-shadow] duration-300 group-hover:animate-float group-hover:border-accent/50 group-hover:shadow-glow">
          <Icon size={20} />
        </span>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="chip transition-[transform,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
          >
            {skill.name}
            {skill.note && (
              <span className="rounded-full bg-accent/15 px-1.5 py-px font-mono text-[10px] uppercase tracking-wider text-accent">
                {skill.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}
