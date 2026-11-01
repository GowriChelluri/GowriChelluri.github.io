import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { siteConfig } from '../config/site'
import { socialItems } from '../components/ui/SocialLinks'
import { isConfigured, showPlaceholders } from '../lib/placeholder'
import { toast } from '../lib/toast'
import { Section, SectionHeading } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { PlaceholderHint } from '../components/ui/PlaceholderHint'
import { ContactForm } from '../components/ContactForm'

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      toast('Email address copied', 'success')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast('Copy failed. Please select the address manually.')
    }
  }

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={{ scale: 0.9 }}
      aria-label="Copy email address"
      title="Copy email"
      className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
    >
      {copied ? <Check size={15} className="text-success" /> : <Copy size={15} />}
    </motion.button>
  )
}

export function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="min-w-0">
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title={siteConfig.contact.closingMessage}
            description="I'm open to Software Engineering opportunities. Whether it's a role, a collaboration or a question about my work, my inbox is open."
            className="mb-10"
          />

          <RevealGroup staggerBy={0.08} className="grid gap-3">
            {socialItems.map(({ label, value, href, icon: Icon, external }) => {
              const configured = isConfigured(value)
              if (!configured && !showPlaceholders) return null
              const display = label === 'Email' ? value : value.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

              return (
                <RevealItem key={label}>
                  <div className="card group relative flex items-center gap-4 p-4 transition-colors duration-300 hover:border-accent/40 sm:p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent transition-transform duration-300 group-hover:scale-105">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{label}</p>
                      {configured ? (
                        <a
                          href={href(value)}
                          {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                          className="mt-0.5 block truncate font-medium text-fg after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                        >
                          {display}
                        </a>
                      ) : (
                        <PlaceholderHint value={value} file="src/config/site.ts" className="mt-1" />
                      )}
                    </div>
                    {configured && label === 'Email' && <CopyEmail email={value} />}
                    {configured && (
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    )}
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>

        <Reveal delay={0.15} className="min-w-0 lg:self-end">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
