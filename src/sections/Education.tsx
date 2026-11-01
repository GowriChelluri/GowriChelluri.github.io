import { Award, ArrowUpRight, Copy, FileText, GraduationCap, ShieldCheck } from 'lucide-react'
import { certifications, education, type Certification, type Education as EducationEntry } from '../data/education'
import { isConfigured, publicAsset, showPlaceholders } from '../lib/placeholder'
import { toast } from '../lib/toast'
import { cn } from '../lib/cn'
import { Section, SectionHeading } from '../components/ui/Section'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { PlaceholderHint } from '../components/ui/PlaceholderHint'

const FILE = 'src/data/education.ts'

/** Renders a configured value, or a dev-only placeholder hint. */
function Field({ value, className }: { value: string; className?: string }) {
  if (isConfigured(value)) return <span className={className}>{value}</span>
  return <PlaceholderHint value={value} file={FILE} />
}

const hasContent = (e: EducationEntry) => isConfigured(e.degree) || isConfigured(e.institution)

const actionLink =
  'group/link link-underline gap-1.5 text-sm font-medium text-accent transition-colors hover:text-fg'

function CertificationActions({ cert }: { cert: Certification }) {
  const verify = cert.credentialUrl && isConfigured(cert.credentialUrl) ? cert.credentialUrl : null
  if (!cert.file && !verify) {
    return cert.credentialUrl ? <PlaceholderHint value={cert.credentialUrl} file={FILE} /> : null
  }

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(cert.credentialId!)
      toast('Verification number copied', 'success')
    } catch {
      toast('Copy failed. Please select the number manually.')
    }
  }

  return (
    <div className="space-y-3 pt-2">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {cert.file && (
          <a href={publicAsset(cert.file)} target="_blank" rel="noopener noreferrer" className={actionLink}>
            <FileText size={14} />
            View certificate
          </a>
        )}
        {verify && (
          <a href={verify} target="_blank" rel="noopener noreferrer" className={actionLink}>
            <ShieldCheck size={14} />
            Verify
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
        )}
      </div>
      {cert.credentialId && (
        <p className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-muted">
          <span className="shrink-0">Verification no.</span>
          <span className="truncate" title={cert.credentialId}>
            {cert.credentialId}
          </span>
          <button
            type="button"
            onClick={copyId}
            aria-label="Copy verification number"
            title="Copy"
            className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line transition-colors hover:border-accent/50 hover:text-fg"
          >
            <Copy size={11} />
          </button>
        </p>
      )}
    </div>
  )
}

export function Education() {
  const visibleEducation = education.filter((e) => showPlaceholders || hasContent(e))
  const cardCount = visibleEducation.length + certifications.length
  // With an odd number of cards, the first spans the full row to keep the grid balanced.
  const wideFirst = cardCount > 1 && cardCount % 2 === 1

  return (
    <Section id="education">
      <SectionHeading
        id="education-title"
        eyebrow="Education & certifications"
        title={
          <>
            Foundations & <span className="text-gradient">credentials</span>.
          </>
        }
      />

      <RevealGroup staggerBy={0.1} className={cn('grid gap-5', cardCount > 1 && 'md:grid-cols-2')}>
        {visibleEducation.map((e, i) => (
          <RevealItem
            key={i}
            className={cn(
              'card group p-6 transition-colors duration-300 hover:border-accent/40 sm:p-8',
              wideFirst && i === 0 && 'md:col-span-2',
            )}
          >
            <div className="flex items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-surface-2 text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                <GraduationCap size={22} />
              </span>
              <div className="min-w-0 flex-1 sm:flex sm:items-start sm:justify-between sm:gap-6">
                <div className="space-y-2">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Education</p>
                  <h3 className="font-display text-xl font-semibold text-fg">
                    <Field value={e.degree} />
                  </h3>
                  <p className="text-muted">
                    <Field value={e.institution} />
                  </p>
                  {e.details && isConfigured(e.details) && <p className="text-sm font-medium text-fg/85">{e.details}</p>}
                </div>
                {(isConfigured(e.year) || showPlaceholders) && (
                  <p className="mt-3 shrink-0 sm:mt-0">
                    <Field value={e.year} className="chip" />
                  </p>
                )}
              </div>
            </div>
          </RevealItem>
        ))}

        {certifications.map((c, i) => (
          <RevealItem
            key={c.name}
            className={cn(
              'card group relative overflow-hidden p-6 transition-colors duration-300 hover:border-accent/40 sm:p-8',
              wideFirst && visibleEducation.length === 0 && i === 0 && 'md:col-span-2',
            )}
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-accent/25 to-accent-2/20 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
            />
            <div className="relative flex items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-glow transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]">
                <Award size={22} />
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Certification</p>
                <h3 className="font-display text-xl font-semibold text-fg">{c.name}</h3>
                <p className="text-muted">
                  {c.issuer}
                  {c.date && (
                    <>
                      <span className="mx-1.5 text-line">·</span>
                      {c.date}
                    </>
                  )}
                </p>
                {c.note && <p className="text-sm text-muted">{c.note}</p>}
                <CertificationActions cert={c} />
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
