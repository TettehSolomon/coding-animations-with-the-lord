import { useMemo } from 'react'
import { motion, useTransform } from 'framer-motion'

const COUNT = 110

export default function StarsLayer({ progress }) {
  const stars = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 70}%`,
        size: Math.random() * 1.6 + 0.8,
        delay: `${Math.random() * 3.2}s`,
        duration: `${Math.random() * 2.5 + 2.5}s`,
      })),
    [],
  )

  // Stars kindle as dusk falls, hold through the night, and fade with the dawn.
  const opacity = useTransform(progress, [0, 0.05, 0.2, 0.86, 1], [0, 0, 0.9, 0.9, 0.35])

  return (
    <motion.div className="stars-layer" style={{ opacity }}>
      {stars.map((s, i) => (
        <div
          key={i}
          className="star-dot"
          style={{
            left: s.left,
            top: s.top,
            width: s.size * 2,
            height: s.size * 2,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </motion.div>
  )
}
