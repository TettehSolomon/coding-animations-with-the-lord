import { motion } from 'framer-motion'
import Hillside from '../primitives/Hillside.jsx'

export default function SceneDecree({ scrollRoot }) {
  return (
    <>
      <Hillside tone="dusk" />
      <div className="road" />
      <motion.div
        className="traveler-glow"
        style={{ left: '10%' }}
        whileInView={{ left: '82%' }}
        viewport={{ root: scrollRoot, once: true, amount: 0.6 }}
        transition={{ duration: 5, ease: 'easeInOut' }}
      />
    </>
  )
}
