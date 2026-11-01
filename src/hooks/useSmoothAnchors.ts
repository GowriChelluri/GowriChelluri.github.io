import { useEffect } from 'react'

/**
 * Smoothly scrolls to in-page "#section" links with an exact offset for the
 * fixed navbar. More reliable than native anchor jumps on mobile browsers,
 * and respects prefers-reduced-motion.
 */
export function useSmoothAnchors(offset = 80) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return

      e.preventDefault()
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const top = id === 'home' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
      history.replaceState(null, '', `#${id}`)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [offset])
}
