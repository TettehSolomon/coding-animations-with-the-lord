import { motion } from 'framer-motion'

export default function ProgressBar({ progress }) {
  return (
    <div className="progress-track">
      <motion.div className="progress-fill" style={{ scaleX: progress }} />
    </div>
  )
}
