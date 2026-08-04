import { motion, AnimatePresence } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

/* A cinematic slideshow of public-domain Annunciation paintings.
   Each painting crossfades in and drifts with a slow Ken Burns
   push, kept on its focal point so the key figure stays in frame
   on a portrait screen. A gold light bloom + scrim add the divine
   glow and keep the verse text readable. */
export default function Stage({ slide, index }) {
  const zoomIn = slide.zoom !== 'out'

  return (
    <div className="stage" style={{ background: slide.tint }}>
      <AnimatePresence>
        <motion.div
          key={index}
          className="painting-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <motion.img
            className="painting"
            src={`${BASE}art/${slide.image}`}
            alt=""
            draggable="false"
            style={{ objectPosition: slide.focal, transformOrigin: slide.focal }}
            initial={{ scale: zoomIn ? 1.02 : 1.16 }}
            animate={{ scale: zoomIn ? 1.16 : 1.02 }}
            transition={{ duration: 9, ease: 'easeOut' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* divine light bloom from above */}
      <div className="bloom" aria-hidden="true" />
      {/* vignette + bottom scrim for text legibility */}
      <div className="scrim" aria-hidden="true" />
    </div>
  )
}
