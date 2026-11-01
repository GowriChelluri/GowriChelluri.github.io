import { siteConfig } from '../../config/site'
import { publicAsset } from '../../lib/placeholder'
import { cn } from '../../lib/cn'

interface AvatarProps {
  className?: string
  /** Load eagerly (hero) vs. lazily (below the fold). */
  priority?: boolean
}

/** Profile photo from config, or a monogram placeholder until one is added. */
export function Avatar({ className, priority = false }: AvatarProps) {
  const src = siteConfig.profileImage

  return (
    <div className={cn('relative overflow-hidden rounded-full bg-surface-2', className)}>
      {src ? (
        <img
          src={publicAsset(src)}
          alt={`Portrait of ${siteConfig.name}`}
          width={640}
          height={640}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority && { fetchpriority: 'high' })}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${siteConfig.name} (profile photo placeholder)`}
          className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent)/0.35),transparent_60%),radial-gradient(circle_at_80%_90%,rgb(var(--accent-2)/0.35),transparent_55%)]"
        >
          <span className="text-gradient font-display text-[clamp(3rem,9vw,5.5rem)] font-semibold tracking-tight">
            {siteConfig.initials}
          </span>
        </div>
      )}
    </div>
  )
}
