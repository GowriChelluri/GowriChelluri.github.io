import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '../config/site'
import { useTypewriter } from '../hooks/useTypewriter'
import { easeOut, fadeUp, scaleIn, stagger } from '../lib/motion'
import { ButtonLink } from '../components/ui/Button'
import { ResumeButton } from '../components/ui/ResumeButton'
import { SocialLinks } from '../components/ui/SocialLinks'
import { Avatar } from '../components/ui/Avatar'

const charVariants: Variants = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: easeOut } },
}

/** Name revealed character by character; the last word fades from violet to blue. */
function AnimatedName({ name }: { name: string }) {
  const words = name.split(' ')

  return (
    <motion.h1
      variants={stagger(0.03)}
      aria-label={name}
      className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-[4.25rem]"
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden="true" className="mr-[0.25em] inline-block whitespace-nowrap last:mr-0">
          {word.split('').map((char, c) => {
            const isLastWord = w === words.length - 1
            const t = c / Math.max(word.length - 1, 1)
            return (
              <motion.span
                key={c}
                variants={charVariants}
                className="inline-block will-change-transform"
                style={
                  isLastWord
                    ? { color: `color-mix(in oklab, rgb(var(--accent)) ${100 - t * 100}%, rgb(var(--accent-2)))` }
                    : undefined
                }
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </motion.h1>
  )
}

function TypedRole() {
  const reduce = useReducedMotion()
  const text = useTypewriter(siteConfig.roles, { enabled: !reduce })

  return (
    <motion.p variants={fadeUp} className="mt-4 flex h-8 items-center font-mono text-base text-fg/90 sm:text-lg">
      <span className="text-accent" aria-hidden="true">
        &gt;&nbsp;
      </span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="ml-0.5 inline-block h-5 w-[2px] animate-blink bg-accent" />
      <span className="sr-only">{siteConfig.roles.join(', ')}</span>
    </motion.p>
  )
}

// Fixed positions so particles don't jump between renders.
const particles = [
  [8, 22, 0], [18, 70, 2.5], [27, 38, 5], [36, 84, 1.2], [44, 16, 6.4], [52, 62, 3.3],
  [61, 30, 7.5], [68, 78, 0.8], [76, 46, 4.6], [84, 18, 2], [91, 66, 5.8], [96, 36, 3.9],
] as const

function Particles() {
  return (
    <div aria-hidden="true" className="motion-decor pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map(([left, top, delay], i) => (
        <span
          key={i}
          className="absolute h-1 w-1 animate-drift rounded-full bg-accent/70 shadow-[0_0_10px_2px_rgb(var(--accent)/0.5)]"
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s`, animationDuration: `${8 + (i % 4) * 2}s` }}
        />
      ))}
    </div>
  )
}

const badges = [
  { label: 'Angular', className: '-left-6 top-10 sm:-left-12', delay: '0s' },
  { label: 'React', className: '-right-4 top-1/3 sm:-right-10', delay: '1.5s' },
  { label: 'TypeScript', className: '-left-2 bottom-12 sm:-left-8', delay: '3s' },
  { label: 'GenAI', className: 'right-0 -bottom-2 sm:right-2', delay: '4.5s' },
]

function HeroPortrait() {
  return (
    <motion.div variants={scaleIn} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="relative mx-auto w-fit">
      {/* Soft glow + rotating gradient ring */}
      <div aria-hidden="true" className="absolute inset-[-18%] rounded-full bg-gradient-to-br from-accent/25 to-accent-2/25 blur-3xl" />
      <div className="relative rounded-full p-[3px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,rgb(var(--accent)),rgb(var(--accent-2)),transparent_55%,rgb(var(--accent)))]"
        />
        <div className="relative rounded-full bg-bg p-2">
          <Avatar priority className="h-56 w-56 sm:h-72 sm:w-72" />
        </div>
      </div>

      {badges.map((b) => (
        <span
          key={b.label}
          className={`absolute ${b.className} animate-float rounded-full border border-line bg-surface/85 px-3 py-1.5 font-mono text-xs text-fg/90 shadow-card backdrop-blur`}
          style={{ animationDelay: b.delay }}
        >
          {b.label}
        </span>
      ))}
    </motion.div>
  )
}

export function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28 lg:pt-44">
      <Particles />

      <div className="container grid items-center gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
        <motion.div variants={stagger(0.1, 0.15)} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5 text-xs font-medium text-fg/90 sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {siteConfig.availability}
            </span>
          </motion.div>

          <AnimatedName name={siteConfig.name} />
          <TypedRole />

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl font-display text-xl font-medium leading-snug text-fg/90 sm:text-2xl"
          >
            {siteConfig.headline}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-[17px]">
            {siteConfig.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <ResumeButton label="Download Resume" size="lg" />
            <ButtonLink href="#projects" variant="secondary" size="lg">
              View Projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <SocialLinks include={['LinkedIn', 'GitHub']} />
          </motion.div>
        </motion.div>

        <HeroPortrait />
      </div>
    </section>
  )
}
