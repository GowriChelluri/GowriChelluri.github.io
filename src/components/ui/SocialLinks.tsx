import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { isConfigured, showPlaceholders, placeholderLabel } from '../../lib/placeholder'
import { cn } from '../../lib/cn'
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons'

interface SocialItem {
  label: string
  value: string
  href: (value: string) => string
  icon: ComponentType<{ size?: number | string; className?: string }>
  external: boolean
}

export const socialItems: SocialItem[] = [
  { label: 'LinkedIn', value: siteConfig.links.linkedin, href: (v) => v, icon: LinkedinIcon, external: true },
  { label: 'GitHub', value: siteConfig.links.github, href: (v) => v, icon: GithubIcon, external: true },
  { label: 'Email', value: siteConfig.links.email, href: (v) => `mailto:${v}`, icon: Mail, external: false },
]

interface SocialLinksProps {
  className?: string
  /** Hide the email icon (e.g. when email is shown separately). */
  include?: Array<'LinkedIn' | 'GitHub' | 'Email'>
  size?: 'sm' | 'md'
}

export function SocialLinks({ className, include = ['LinkedIn', 'GitHub', 'Email'], size = 'md' }: SocialLinksProps) {
  const box = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
  const iconSize = size === 'sm' ? 16 : 18

  return (
    <ul className={cn('flex items-center gap-2.5', className)}>
      {socialItems
        .filter((item) => include.includes(item.label as 'LinkedIn'))
        .map(({ label, value, href, icon: Icon, external }) => {
          if (!isConfigured(value)) {
            if (!showPlaceholders) return null
            return (
              <li key={label}>
                <span
                  title={`TODO: set ${label} in src/config/site.ts (${placeholderLabel(value)})`}
                  className={cn(box, 'grid place-items-center rounded-full border border-dashed border-amber-500/60 text-amber-500/80')}
                >
                  <Icon size={iconSize} />
                  <span className="sr-only">{label} (not configured)</span>
                </span>
              </li>
            )
          }
          return (
            <li key={label}>
              <motion.a
                href={href(value)}
                aria-label={label}
                title={label}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={cn(
                  box,
                  'grid place-items-center rounded-full border border-line bg-surface/60 text-muted backdrop-blur transition-colors duration-300 hover:border-accent/60 hover:text-fg hover:shadow-glow',
                )}
              >
                <Icon size={iconSize} />
              </motion.a>
            </li>
          )
        })}
    </ul>
  )
}
