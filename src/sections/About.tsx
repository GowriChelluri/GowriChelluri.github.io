import { siteConfig } from '../config/site'
import { aboutHighlights, aboutParagraphs } from '../data/about'
import { Section, SectionHeading } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Avatar } from '../components/ui/Avatar'

/** Small editor-style card describing the profile as a TypeScript object. */
function ProfileCode() {
  const k = 'text-accent-2' // keys
  const s = 'text-success' // strings
  const p = 'text-muted' // punctuation

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line/70 px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">about.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:p-6 sm:text-sm">
        <code>
          <span className="text-accent">const</span> <span className="text-fg">engineer</span> <span className={p}>=</span>{' '}
          <span className={p}>{'{'}</span>
          {'\n  '}
          <span className={k}>name</span>
          <span className={p}>: </span>
          <span className={s}>'{siteConfig.name}'</span>
          <span className={p}>,</span>
          {'\n  '}
          <span className={k}>role</span>
          <span className={p}>: </span>
          <span className={s}>'Software Engineer'</span>
          <span className={p}>,</span>
          {'\n  '}
          <span className={k}>company</span>
          <span className={p}>: </span>
          <span className={s}>'Cisco AppDynamics'</span>
          <span className={p}>,</span>
          {'\n  '}
          <span className={k}>stack</span>
          <span className={p}>: [</span>
          <span className={s}>'Angular'</span>
          <span className={p}>, </span>
          <span className={s}>'React'</span>
          <span className={p}>, </span>
          <span className={s}>'Node.js'</span>
          <span className={p}>],</span>
          {'\n  '}
          <span className={k}>learning</span>
          <span className={p}>: [</span>
          <span className={s}>'LLMs'</span>
          <span className={p}>, </span>
          <span className={s}>'RAG'</span>
          <span className={p}>, </span>
          <span className={s}>'AI Agents'</span>
          <span className={p}>],</span>
          {'\n  '}
          <span className={k}>openToWork</span>
          <span className={p}>: </span>
          <span className="text-accent">true</span>
          <span className={p}>,</span>
          {'\n'}
          <span className={p}>{'}'}</span>
        </code>
      </pre>
    </div>
  )
}

export function About() {
  return (
    <Section id="about">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative lg:sticky lg:top-28">
          {siteConfig.profileImage && (
            <Avatar className="mb-6 h-28 w-28 border border-line shadow-card" />
          )}
          <ProfileCode />
        </Reveal>

        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About me"
            title={
              <>
                Engineering interfaces people <span className="text-gradient">enjoy using</span>.
              </>
            }
            className="mb-8"
          />

          <RevealGroup staggerBy={0.12} className="space-y-5 text-base leading-relaxed text-muted sm:text-[17px]">
            {aboutParagraphs.map((para) => (
              <RevealItem key={para.slice(0, 24)}>
                <p>{para}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup staggerBy={0.08} className="mt-10 grid gap-3 sm:grid-cols-2">
            {aboutHighlights.map(({ icon: Icon, label, value }) => (
              <RevealItem
                key={label}
                className="card group flex items-start gap-4 p-5 transition-colors duration-300 hover:border-accent/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{label}</span>
                  <span className="mt-1 block text-sm font-medium text-fg">{value}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}
