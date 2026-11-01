import { forwardRef, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface StyleProps {
  variant?: Variant
  size?: Size
  children?: ReactNode
}

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-300 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.6)] hover:shadow-[0_10px_40px_-6px_rgba(99,102,241,0.75)]',
  secondary:
    'border border-line bg-surface/60 text-fg backdrop-blur hover:border-accent/50 hover:bg-surface-2/80',
  ghost: 'text-muted hover:bg-surface-2/70 hover:text-fg',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

const motionProps = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 400, damping: 25 },
} as const

/** Light sweep across primary buttons on hover. */
function Shine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
    />
  )
}

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md', className?: string) =>
  cn(base, variants[variant], sizes[size], className)

type ButtonLinkProps = Omit<HTMLMotionProps<'a'>, 'children'> & StyleProps

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant = 'primary', size = 'md', className, children, ...props },
  ref,
) {
  return (
    <motion.a ref={ref} {...motionProps} className={buttonClasses(variant, size, className)} {...props}>
      {variant === 'primary' && <Shine />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </motion.a>
  )
})

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & StyleProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, type = 'button', ...props },
  ref,
) {
  return (
    <motion.button ref={ref} type={type} {...motionProps} className={buttonClasses(variant, size, className)} {...props}>
      {variant === 'primary' && <Shine />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </motion.button>
  )
})
