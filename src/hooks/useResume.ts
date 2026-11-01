import { useEffect, useState } from 'react'
import { siteConfig } from '../config/site'
import { publicAsset } from '../lib/placeholder'

export const resumeUrl = publicAsset(siteConfig.resume.path)

let cached: Promise<boolean> | null = null

/**
 * Checks once whether the resume PDF actually exists. The content-type check
 * matters: dev servers and some hosts answer missing files with index.html (200).
 */
function checkResume() {
  cached ??= fetch(resumeUrl, { method: 'HEAD' })
    .then((res) => res.ok && (res.headers.get('content-type') ?? '').includes('pdf'))
    .catch(() => false)
  return cached
}

/** `null` while checking, then whether public/resume.pdf is available. */
export function useResumeAvailable() {
  const [available, setAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    let alive = true
    checkResume().then((ok) => alive && setAvailable(ok))
    return () => {
      alive = false
    }
  }, [])

  return available
}
