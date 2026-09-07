import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Hillside from '../primitives/Hillside.jsx'
import ShepherdSilhouettes from '../primitives/ShepherdSilhouettes.jsx'

export default function SceneGlory({ scrollRoot }) {
  const ref = useRef(null)
  const inView = useInView(ref, { root: scrollRoot, amount: 0.6, once: true })

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0 }}>
      <Hillside tone="night" />
      <ShepherdSilhouettes variant="watching" />
      <motion.div
        className="glory-flash"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 0.35] } : { opacity: 0 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
      />
    </div>
  )
}
