import { motion } from 'framer-motion'

export default function LightMote({ x, y }) {
  return (
    <motion.div
      className="light-mote"
      style={{ left: '50%', top: '50%' }}
      variants={{
        hidden: { opacity: 0, scale: 0, x: 0, y: 0 },
        visible: {
          opacity: [0, 1, 0],
          scale: 1,
          x,
          y,
          transition: { duration: 1.8, ease: 'easeOut' },
        },
      }}
    />
  )
}
