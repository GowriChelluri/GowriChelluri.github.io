import type { MouseEvent } from 'react'
import { Download, FileText } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { resumeUrl, useResumeAvailable } from '../../hooks/useResume'
import { toast } from '../../lib/toast'
import { ButtonLink } from './Button'

interface ResumeButtonProps {
  label?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  icon?: 'download' | 'file'
  className?: string
  onClick?: () => void
}

/**
 * Downloads public/resume.pdf. If the file hasn't been added yet, it shows a
 * friendly notice instead of a broken download.
 */
export function ResumeButton({
  label = 'Resume',
  variant = 'primary',
  size = 'md',
  icon = 'download',
  className,
  onClick,
}: ResumeButtonProps) {
  const available = useResumeAvailable()
  const Icon = icon === 'download' ? Download : FileText

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.()
    if (available === false) {
      e.preventDefault()
      toast(
        import.meta.env.DEV
          ? 'Resume not found. Add your PDF at public/resume.pdf.'
          : 'Resume is being updated. Please connect on LinkedIn in the meantime.',
      )
    }
  }

  return (
    <ButtonLink
      href={resumeUrl}
      download={siteConfig.resume.downloadName}
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
      aria-label={`${label} (PDF)`}
    >
      <Icon size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
      {label}
    </ButtonLink>
  )
}
