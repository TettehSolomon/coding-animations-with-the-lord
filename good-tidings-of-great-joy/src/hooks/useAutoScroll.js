import { useEffect, useRef } from 'react'

// React-idiomatic replacement for Episode 2's window.scrollTo frame loop:
// same rAF-driven constant-speed glide, re-scoped to a container's own
// scrollTop instead of the document, and expressed as a hook.
export function useAutoScroll(scrollRef, { speed = 60, enabled, onEnd }) {
  const rafId = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined

    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      const el = scrollRef.current
      if (!el) return
      const max = el.scrollHeight - el.clientHeight
      el.scrollTop = Math.min(el.scrollTop + speed * dt, max)
      if (el.scrollTop < max) {
        rafId.current = requestAnimationFrame(tick)
      } else {
        onEnd?.()
      }
    }

    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [scrollRef, enabled, speed, onEnd])
}
