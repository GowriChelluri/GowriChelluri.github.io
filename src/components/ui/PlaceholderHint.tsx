import { showPlaceholders, placeholderLabel } from '../../lib/placeholder'
import { cn } from '../../lib/cn'

interface PlaceholderHintProps {
  /** The placeholder value from config, e.g. "TODO: University name". */
  value: string
  /** Where to edit it, e.g. "src/data/education.ts". */
  file: string
  className?: string
}

/**
 * Dev-only marker for unfilled config values. Renders nothing in production,
 * so visitors never see placeholders.
 */
export function PlaceholderHint({ value, file, className }: PlaceholderHintProps) {
  if (!showPlaceholders) return null
  return (
    <span
      title={`Edit in ${file}`}
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 break-all rounded-md border border-dashed border-amber-500/60 bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] text-amber-600 dark:text-amber-300',
        className,
      )}
    >
      TODO · {placeholderLabel(value)}
    </span>
  )
}
