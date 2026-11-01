import { useEffect, useState } from 'react'

interface Options {
  enabled?: boolean
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
}

/** Types and deletes each word in turn. When disabled, shows the first word statically. */
export function useTypewriter(
  words: readonly string[],
  { enabled = true, typeSpeed = 75, deleteSpeed = 40, pause = 1800 }: Options = {},
) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(enabled ? '' : words[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setText(words[0])
      return
    }
    const word = words[index % words.length]
    let timer: number | undefined

    if (!deleting && text === word) {
      timer = window.setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      const next = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
      timer = window.setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed)
    }
    return () => window.clearTimeout(timer)
  }, [text, deleting, index, enabled, words, typeSpeed, deleteSpeed, pause])

  return text
}
