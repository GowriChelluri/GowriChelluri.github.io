import { useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { navItems } from '../../data/navigation'
import { SocialLinks } from '../ui/SocialLinks'
import { scrollToTop } from './BackToTop'

export function Footer() {
  const reduce = useReducedMotion()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line/60">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
          <div>
            <a href="#home" className="font-display text-xl font-semibold tracking-tight">
              {siteConfig.name}
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Software Engineer building modern web experiences and exploring intelligent, AI-powered applications.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-4 text-muted">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="link-underline text-muted transition-colors hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4 text-muted">Connect</p>
            <SocialLinks size="sm" />
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line/60 pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. Built with React, TypeScript & Tailwind CSS.
          </p>
          <button
            type="button"
            onClick={() => scrollToTop(reduce)}
            className="group link-underline gap-1.5 text-muted transition-colors hover:text-fg"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
