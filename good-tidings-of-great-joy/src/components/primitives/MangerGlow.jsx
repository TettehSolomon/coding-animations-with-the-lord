import { motion } from 'framer-motion'

export default function MangerGlow({ scrollRoot, animateIn = false }) {
  return (
    <div className="manger">
      <motion.div
        className="manger-glow"
        initial={animateIn ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ root: scrollRoot, once: true, amount: 0.6 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      <div className="manger-trough" />
    </div>
  )
}
