import { motion } from 'framer-motion'

// Generic scene shell: a full-height section holding a scene-specific
// visual (built from CSS/DOM only) behind a verse panel that animates in
// as it scrolls into the shared scroll container's viewport.
export default function Scene({ scene, scrollRoot, Visual }) {
  return (
    <section className="scene" id={scene.id}>
      <div className="scene-visual">
        <Visual scrollRoot={scrollRoot} scene={scene} />
      </div>

      <motion.div
        className="scene-panel"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ root: scrollRoot, once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="caption">{scene.caption}</div>
        <p className="verse-strong">{scene.strong}</p>
        <p className="verse-rest">{scene.rest}</p>
        <div className="verse-ref">{scene.ref}</div>
      </motion.div>
    </section>
  )
}
