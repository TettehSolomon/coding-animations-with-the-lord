import { useMemo } from 'react'
import { motion } from 'framer-motion'
import LightMote from '../primitives/LightMote.jsx'

const MOTE_COUNT = 46

export default function SceneHeavenlyHost({ scrollRoot }) {
  const motes = useMemo(
    () =>
      Array.from({ length: MOTE_COUNT }, () => {
        const angle = Math.random() * Math.PI * 2
        const dist = 60 + Math.random() * 150
        return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist - 40 }
      }),
    [],
  )

  return (
    <motion.div
      style={{ position: 'absolute', left: '50%', top: '36%' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ root: scrollRoot, once: true, amount: 0.6 }}
      variants={{ visible: { transition: { staggerChildren: 0.035 } } }}
    >
      {motes.map((m, i) => (
        <LightMote key={i} x={m.x} y={m.y} />
      ))}
    </motion.div>
  )
}
