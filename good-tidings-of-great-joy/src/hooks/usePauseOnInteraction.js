import { useEffect } from 'react'

// Any manual scroll, touch, or key input yields control back to the
// reader immediately, mirroring Episodes 1 & 2's pause-on-interaction feel.
export function usePauseOnInteraction(onInteract) {
  useEffect(() => {
    const events = ['wheel', 'touchstart', 'keydown']
    const handle = () => onInteract()
    events.forEach((evt) => window.addEventListener(evt, handle, { passive: true }))
    return () => events.forEach((evt) => window.removeEventListener(evt, handle))
  }, [onInteract])
}
