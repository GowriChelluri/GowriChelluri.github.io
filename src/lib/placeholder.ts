/** True when a config value has been filled in (not empty, not a "TODO" placeholder). */
export function isConfigured(value: string | undefined | null): value is string {
  return !!value && !value.trim().toUpperCase().startsWith('TODO')
}

/** Placeholders are surfaced in development only, so production never shows them. */
export const showPlaceholders = import.meta.env.DEV

/** Strip the "TODO:" prefix for display in dev hints. */
export function placeholderLabel(value: string) {
  return value.replace(/^TODO:?\s*/i, '')
}

/** Resolve a file in /public against Vite's base URL (works on GitHub Pages sub-paths). */
export function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
