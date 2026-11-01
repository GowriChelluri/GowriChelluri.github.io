import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { siteConfig } from '../../config/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { ThemeToggle } from '../ui/ThemeToggle'
import { ResumeButton } from '../ui/ResumeButton'

const sectionIds = navItems.map((n) => n.id)

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  // Close the mobile menu on Escape or when resizing up to desktop.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mql = window.matchMedia('(min-width: 1024px)')
    const onResize = () => mql.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mql.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      mql.removeEventListener('change', onResize)
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOut }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
      />

      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto flex max-w-[1160px] items-center justify-between gap-4 rounded-2xl border px-3 transition-all duration-500 sm:px-4',
          scrolled || open
            ? 'h-14 border-line/70 bg-surface/75 shadow-card backdrop-blur-xl'
            : 'h-16 border-transparent bg-transparent',
        )}
      >
        <a href="#home" className="group flex items-center gap-2.5" aria-label={`${siteConfig.name}, back to top`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface-2/80 font-display text-sm font-bold transition-colors group-hover:border-accent/60">
            <span className="text-gradient">{siteConfig.initials}</span>
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:block">
            {siteConfig.firstName}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300',
                    isActive ? 'text-fg' : 'text-muted hover:text-fg',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface-2/90"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ResumeButton size="sm" icon="file" className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/60 text-fg lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="mx-auto mt-2 max-w-[1160px] origin-top rounded-2xl border border-line/70 bg-surface/95 p-3 shadow-card backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
              className="grid gap-1"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3 text-[15px] transition-colors',
                      active === item.id ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface-2/60 hover:text-fg',
                    )}
                  >
                    {item.label}
                    {active === item.id && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-3 border-t border-line/70 pt-3 sm:hidden">
              <ResumeButton label="Download Resume" className="w-full" onClick={() => setOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
