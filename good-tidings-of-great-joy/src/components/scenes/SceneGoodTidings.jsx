import { motion, useReducedMotion } from 'framer-motion'

// An abstract luminous form — no figurative art, just soft overlapping
// blurred glows loosely suggesting a standing presence beside the text.
export default function SceneGoodTidings() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="angel-glow"
      style={{ left: '50%', top: '28%', width: 160, height: 220, transform: 'translateX(-50%)' }}
      animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="blob" style={{ left: 40, top: 0, width: 80, height: 170 }} />
      <div className="blob" style={{ left: 0, top: 50, width: 60, height: 110 }} />
      <div className="blob" style={{ left: 100, top: 50, width: 60, height: 110 }} />
    </motion.div>
  )
}
