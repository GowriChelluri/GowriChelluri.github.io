import { useSyncExternalStore } from 'react'

export interface ToastMessage {
  id: number
  message: string
  tone: 'info' | 'success'
}

let toasts: ToastMessage[] = []
let nextId = 1
const listeners = new Set<() => void>()

const emit = () => listeners.forEach((l) => l())

/** Show a short, non-blocking notification. */
export function toast(message: string, tone: ToastMessage['tone'] = 'info') {
  const id = nextId++
  toasts = [...toasts, { id, message, tone }]
  emit()
  window.setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    emit()
  }, 3800)
}

export function useToasts() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => toasts,
  )
}
