import { useState, type ChangeEvent, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { siteConfig } from '../config/site'
import { isConfigured } from '../lib/placeholder'
import { cn } from '../lib/cn'
import { Button } from './ui/Button'

type Field = 'name' | 'email' | 'message'
type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

const initial: Record<Field, string> = { name: '', email: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: Record<Field, string>) {
  const errors: Partial<Record<Field, string>> = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.message.trim().length < 10) errors.message = 'Please write at least a short message (10+ characters).'
  return errors
}

/**
 * Sends through a free form endpoint (e.g. Formspree) when configured,
 * otherwise opens the visitor's email app with the message pre-filled.
 */
export function ContactForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const endpoint = siteConfig.contact.formEndpoint
  const toEmail = siteConfig.links.email

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as Field
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    // Honeypot: real visitors never fill this hidden field.
    if ((form.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value) return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    if (endpoint) {
      setStatus({ kind: 'sending' })
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error(String(res.status))
        setValues(initial)
        setStatus({ kind: 'success', message: "Thanks! Your message has been sent. I'll get back to you soon." })
      } catch {
        setStatus({ kind: 'error', message: 'Something went wrong sending your message. Please try LinkedIn instead.' })
      }
      return
    }

    if (isConfigured(toEmail)) {
      const subject = `Portfolio inquiry from ${values.name.trim()}`
      const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`
      window.location.href = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus({ kind: 'success', message: 'Your email app should open with the message ready to send.' })
      return
    }

    setStatus({
      kind: 'error',
      message: import.meta.env.DEV
        ? 'No email or form endpoint configured yet. Set links.email or contact.formEndpoint in src/config/site.ts.'
        : 'Messaging is being set up. Please reach out on LinkedIn for now.',
    })
  }

  const inputClass = (field: Field) =>
    cn(
      'w-full rounded-xl border bg-surface-2/60 px-4 py-3 text-[15px] text-fg placeholder:text-muted/70 transition-[border-color,box-shadow,background-color] duration-300 focus:bg-surface-2 focus:outline-none focus:ring-4',
      errors[field]
        ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/15'
        : 'border-line focus:border-accent/70 focus:ring-accent/15',
    )

  const fields: Array<{ name: Field; label: string; type?: string; autoComplete?: string; placeholder: string }> = [
    { name: 'name', label: 'Name', autoComplete: 'name', placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@company.com' },
  ]

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={`contact-${f.name}`} className="mb-2 block text-sm font-medium text-fg/90">
              {f.label}
            </label>
            <input
              id={`contact-${f.name}`}
              name={f.name}
              type={f.type ?? 'text'}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={onChange}
              aria-invalid={!!errors[f.name]}
              aria-describedby={errors[f.name] ? `contact-${f.name}-error` : undefined}
              className={inputClass(f.name)}
            />
            {errors[f.name] && (
              <p id={`contact-${f.name}-error`} className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                {errors[f.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-fg/90">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about the role or project…"
          value={values.message}
          onChange={onChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={cn(inputClass('message'), 'resize-y')}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          {endpoint ? 'Your message is sent securely via a form service.' : 'Opens your email app with the message pre-filled.'}
        </p>
        <Button type="submit" size="lg" disabled={status.kind === 'sending'} className="w-full sm:w-auto">
          {status.kind === 'sending' ? (
            <>
              <LoaderCircle size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </div>

      <div aria-live="polite">
        <AnimatePresence>
          {(status.kind === 'success' || status.kind === 'error') && (
            <motion.p
              key={status.message}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                'mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm',
                status.kind === 'success'
                  ? 'border-success/30 bg-success/10 text-fg'
                  : 'border-amber-500/30 bg-amber-500/10 text-fg',
              )}
            >
              {status.kind === 'success' ? (
                <CircleCheck size={17} className="mt-px shrink-0 text-success" />
              ) : (
                <CircleAlert size={17} className="mt-px shrink-0 text-amber-500" />
              )}
              <span>
                {status.message}{' '}
                {status.kind === 'error' && (
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent underline-offset-2 hover:underline"
                  >
                    Open LinkedIn
                  </a>
                )}
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
