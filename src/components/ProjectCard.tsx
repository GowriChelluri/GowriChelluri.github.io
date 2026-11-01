import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { isConfigured, publicAsset, showPlaceholders } from '../lib/placeholder'
import { fadeUp } from '../lib/motion'
import { cn } from '../lib/cn'
import { TiltCard } from './ui/TiltCard'
import { ButtonLink } from './ui/Button'
import { PlaceholderHint } from './ui/PlaceholderHint'
import { GithubIcon } from './icons/BrandIcons'
import { ProjectVisual } from './ProjectVisual'

function ProjectLinks({ project }: { project: Project }) {
  const hasGithub = isConfigured(project.github)
  const hasDemo = isConfigured(project.demo)

  if (!hasGithub && !hasDemo && !showPlaceholders) {
    return <p className="font-mono text-xs text-muted">Links coming soon</p>
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {hasGithub ? (
        <ButtonLink
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
          aria-label={`${project.title} source code on GitHub`}
        >
          <GithubIcon size={15} />
          Code
        </ButtonLink>
      ) : (
        project.github && <PlaceholderHint value={project.github} file="src/data/projects.ts" />
      )}
      {hasDemo ? (
        <ButtonLink
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          aria-label={`${project.title} live demo`}
        >
          Live demo
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </ButtonLink>
      ) : (
        project.demo && <PlaceholderHint value={project.demo} file="src/data/projects.ts" />
      )}
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  /** Full-width, side-by-side layout. */
  wide?: boolean
}

export function ProjectCard({ project, wide = false }: ProjectCardProps) {
  return (
    <motion.div variants={fadeUp} className={cn('h-full', wide && 'md:col-span-2')}>
      <TiltCard max={wide ? 3 : 5} className="card group h-full overflow-hidden">
        <article className={cn('relative flex h-full flex-col', wide && 'lg:grid lg:grid-cols-[1.1fr_1fr]')}>
          {/* Preview */}
          <div className="relative overflow-hidden border-b border-line/60 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10 p-5 sm:p-6 lg:border-b-0">
            <div
              className={cn(
                'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]',
                wide ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[280px]' : 'aspect-[16/10]',
              )}
            >
              {project.image ? (
                <img
                  src={publicAsset(project.image)}
                  alt={`Screenshot of ${project.title}`}
                  loading="lazy"
                  decoding="async"
                  width={1280}
                  height={800}
                  className="h-full w-full rounded-xl border border-line/70 object-cover object-top shadow-card"
                />
              ) : (
                <ProjectVisual kind={project.visual} label={project.title} />
              )}
            </div>
          </div>

          {/* Content */}
          <div className={cn('flex flex-1 flex-col p-6 sm:p-7', wide && 'lg:border-l lg:border-line/60 lg:p-9')}>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{project.tagline}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg">{project.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>

            {project.features.length > 0 && (
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-fg/85" aria-label="Key features">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-7">
              <ProjectLinks project={project} />
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  )
}
