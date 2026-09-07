import { motion, useTransform, useReducedMotion } from 'framer-motion'

// A single shared timeline: rises from the horizon over the journey and
// the manger, then flares brightest during "the glory of the Lord shone
// round about them" (progress ~0.36–0.46), and holds steady overhead
// through the shepherds' visit before fading into the dawn.
const STOPS = [0, 0.05, 0.3, 0.36, 0.4, 0.46, 0.86, 1]
const TOP = ['48%', '46%', '12%', '10%', '9%', '8%', '8%', '6%']
const OPACITY = [0, 0.15, 0.55, 0.6, 1, 0.85, 0.85, 0.35]
const SCALE = [0.6, 0.7, 0.95, 1, 1.5, 1.05, 1.05, 0.9]

export default function StarOfBethlehem({ progress }) {
  const reduceMotion = useReducedMotion()
  const top = useTransform(progress, STOPS, TOP)
  const opacity = useTransform(progress, STOPS, OPACITY)
  const scale = useTransform(progress, STOPS, SCALE)

  return (
    <motion.div className="star-of-bethlehem" style={{ top, opacity, scale }}>
      <div className="star-core" />
      <motion.div
        className="star-rays"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 50, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
}
