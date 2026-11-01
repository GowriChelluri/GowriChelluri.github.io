import { Play, ShoppingBag, Sparkles } from 'lucide-react'
import type { ProjectVisual as VisualKind } from '../data/projects'

/**
 * Stylised illustrations used until real screenshots are added. They show the
 * kind of product (store, video app, ML model), not real UI or results.
 */

function Bar({ w, className = '' }: { w: string; className?: string }) {
  return <span className={`block h-2 rounded-full bg-fg/10 ${className}`} style={{ width: w }} />
}

function ShopVisual() {
  const tints = ['from-violet-500/50 to-fuchsia-500/30', 'from-blue-500/50 to-cyan-400/30', 'from-indigo-500/50 to-violet-400/30', 'from-sky-500/40 to-indigo-500/30']
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-accent">
          <ShoppingBag size={14} />
          <Bar w="3.5rem" className="bg-accent/40" />
        </span>
        <span className="flex gap-2">
          <Bar w="2rem" />
          <Bar w="2rem" />
          <Bar w="2rem" />
        </span>
      </div>
      <div className="grid flex-1 grid-cols-4 content-center gap-2.5">
        {tints.map((tint) => (
          <div key={tint} className="flex flex-col gap-1.5 rounded-lg border border-line/60 bg-surface/60 p-1.5">
            <div className={`aspect-[4/5] rounded-md bg-gradient-to-br ${tint}`} />
            <Bar w="80%" />
            <Bar w="45%" className="bg-accent/30" />
          </div>
        ))}
      </div>
    </div>
  )
}

function VideoVisual() {
  return (
    <div className="flex h-full gap-3">
      <div className="hidden w-1/5 flex-col gap-2 pt-1 sm:flex">
        <Bar w="90%" className="bg-accent/40" />
        <Bar w="70%" />
        <Bar w="80%" />
        <Bar w="60%" />
      </div>
      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-2.5">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div
              className={`relative grid flex-1 place-items-center rounded-md bg-gradient-to-br ${
                i % 2 ? 'from-blue-500/40 to-indigo-600/30' : 'from-violet-500/40 to-blue-500/25'
              }`}
            >
              {i === 0 && (
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-violet-700 shadow-lg">
                  <Play size={12} fill="currentColor" />
                </span>
              )}
            </div>
            <Bar w="85%" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** KPI tiles, a bar chart and a donut, in the style of a BI report page. */
function DashboardVisual() {
  const bars = [45, 62, 52, 78, 66, 88, 72, 95]
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="grid grid-cols-3 gap-2.5">
        {['from-violet-500/40', 'from-blue-500/40', 'from-indigo-500/40'].map((tint) => (
          <div key={tint} className={`rounded-md border border-line/60 bg-gradient-to-br ${tint} to-transparent p-2`}>
            <Bar w="50%" className="bg-fg/20" />
            <span className="mt-1.5 block h-3 w-3/4 rounded bg-fg/25" />
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-[1.6fr_1fr] gap-2.5">
        <div className="flex items-end gap-1.5 rounded-md border border-line/60 bg-surface/60 p-2.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-500/70 to-blue-400/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="grid place-items-center rounded-md border border-line/60 bg-surface/60 p-2">
          <svg viewBox="0 0 36 36" className="h-full max-h-24 w-full" aria-hidden="true">
            <circle cx="18" cy="18" r="13" fill="none" stroke="rgb(var(--fg) / 0.1)" strokeWidth="5" />
            <circle cx="18" cy="18" r="13" fill="none" stroke="rgb(var(--accent))" strokeWidth="5" strokeDasharray="45 82" transform="rotate(-90 18 18)" />
            <circle cx="18" cy="18" r="13" fill="none" stroke="rgb(var(--accent-2))" strokeWidth="5" strokeDasharray="22 82" strokeDashoffset="-45" transform="rotate(-90 18 18)" />
          </svg>
        </div>
      </div>
    </div>
  )
}

/** A small "forest" of decision trees beside abstract feature bars. */
function MlVisual() {
  return (
    <div className="grid h-full grid-cols-[1fr_1.4fr] items-center gap-4">
      <div className="flex flex-col gap-2.5">
        {['92%', '74%', '58%', '41%', '27%'].map((w, i) => (
          <span
            key={i}
            className="block h-2.5 rounded-full bg-gradient-to-r from-violet-500/70 to-blue-500/50"
            style={{ width: w, opacity: 1 - i * 0.12 }}
          />
        ))}
      </div>
      <svg viewBox="0 0 180 100" className="h-full w-full" aria-hidden="true">
        {[30, 90, 150].map((x, t) => (
          <g key={x} className="text-accent" opacity={1 - t * 0.2}>
            <line x1={x} y1="18" x2={x - 14} y2="50" stroke="currentColor" strokeOpacity=".5" />
            <line x1={x} y1="18" x2={x + 14} y2="50" stroke="currentColor" strokeOpacity=".5" />
            <line x1={x - 14} y1="50" x2={x - 22} y2="82" stroke="currentColor" strokeOpacity=".35" />
            <line x1={x - 14} y1="50" x2={x - 6} y2="82" stroke="currentColor" strokeOpacity=".35" />
            <line x1={x + 14} y1="50" x2={x + 22} y2="82" stroke="currentColor" strokeOpacity=".35" />
            <circle cx={x} cy="18" r="6" fill="currentColor" />
            <circle cx={x - 14} cy="50" r="5" fill="rgb(var(--accent-2))" />
            <circle cx={x + 14} cy="50" r="5" fill="rgb(var(--accent-2))" />
            {[x - 22, x - 6, x + 22].map((cx) => (
              <circle key={cx} cx={cx} cy="82" r="3.5" fill="currentColor" fillOpacity=".6" />
            ))}
          </g>
        ))}
      </svg>
    </div>
  )
}

function AiVisual() {
  return (
    <div className="grid h-full place-items-center text-accent">
      <Sparkles size={40} />
    </div>
  )
}

const visuals: Record<VisualKind, () => JSX.Element> = {
  shop: ShopVisual,
  video: VideoVisual,
  dashboard: DashboardVisual,
  ml: MlVisual,
  ai: AiVisual,
}

export function ProjectVisual({ kind, label }: { kind: VisualKind; label: string }) {
  const Visual = visuals[kind]
  return (
    <div
      role="img"
      aria-label={`Illustration for ${label}`}
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-line/70 bg-surface-2/80 shadow-card"
    >
      <div className="flex items-center gap-1.5 border-b border-line/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-fg/20" />
        <span className="h-2 w-2 rounded-full bg-fg/20" />
        <span className="h-2 w-2 rounded-full bg-fg/20" />
        <span className="ml-2 truncate rounded-md bg-fg/5 px-2 py-0.5 font-mono text-[10px] text-muted">
          {label.toLowerCase().replace(/\s+/g, '-')}
        </span>
      </div>
      <div className="flex-1 p-3.5">
        <Visual />
      </div>
    </div>
  )
}
