import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useFinePointer } from '../../hooks/useFinePointer'

/**
 * Fixed, non-interactive page backdrop: faint grid, slow gradient blobs and a
 * pointer-following spotlight (desktop only). Sits behind all content.
 */
export function Background() {
  const spotRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const spotlight = fine && !reduce

  useEffect(() => {
    if (!spotlight) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        spotRef.current?.style.setProperty('--x', `${e.clientX}px`)
        spotRef.current?.style.setProperty('--y', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [spotlight])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_30%,transparent_75%)]" />

      <div
        className="absolute -left-[15%] -top-[20%] h-[34rem] w-[34rem] animate-blob rounded-full bg-accent blur-[110px] will-change-transform sm:h-[42rem] sm:w-[42rem]"
        style={{ opacity: 'var(--blob-opacity)' }}
      />
      <div
        className="absolute -right-[18%] top-[10%] h-[30rem] w-[30rem] animate-blob rounded-full bg-accent-2 blur-[120px] will-change-transform [animation-delay:-7s] sm:h-[38rem] sm:w-[38rem]"
        style={{ opacity: 'calc(var(--blob-opacity) * 0.8)' }}
      />
      <div
        className="absolute -bottom-[25%] left-[25%] h-[28rem] w-[28rem] animate-blob rounded-full bg-violet-500 blur-[130px] will-change-transform [animation-delay:-14s]"
        style={{ opacity: 'calc(var(--blob-opacity) * 0.45)' }}
      />

      {spotlight && (
        <div
          ref={spotRef}
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(600px circle at var(--x, -1000px) var(--y, -1000px), rgb(var(--accent) / 0.07), transparent 45%)',
          }}
        />
      )}

      {/* Fade into the page background so the blobs never compete with text further down */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg/80" />
    </div>
  )
}
