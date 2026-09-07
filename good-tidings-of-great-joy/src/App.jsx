import { useCallback, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
import { scenes } from './data/scenes.js'
import { sceneVisuals } from './components/scenes/index.js'
import Scene from './components/Scene.jsx'
import SkyLayer from './components/background/SkyLayer.jsx'
import StarsLayer from './components/background/StarsLayer.jsx'
import StarOfBethlehem from './components/background/StarOfBethlehem.jsx'
import ProgressBar from './components/chrome/ProgressBar.jsx'
import TransportControls from './components/chrome/TransportControls.jsx'
import { useAutoScroll } from './hooks/useAutoScroll.js'
import { usePauseOnInteraction } from './hooks/usePauseOnInteraction.js'
import './styles/app.css'
import './styles/background.css'
import './styles/scene.css'

export default function App() {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: scrollRef })
  const [playing, setPlaying] = useState(true)

  const stop = useCallback(() => setPlaying(false), [])
  useAutoScroll(scrollRef, { speed: 55, enabled: playing, onEnd: stop })
  usePauseOnInteraction(stop)

  const restart = useCallback(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = 0
    setPlaying(true)
  }, [])

  return (
    <div className="app">
      <SkyLayer progress={scrollYProgress} />
      <StarsLayer progress={scrollYProgress} />
      <StarOfBethlehem progress={scrollYProgress} />

      <div className="scroll-container" ref={scrollRef}>
        {scenes.map((scene) => (
          <Scene key={scene.id} scene={scene} scrollRoot={scrollRef} Visual={sceneVisuals[scene.id]} />
        ))}
      </div>

      <div className="ui">
        <div className="ui-top">
          <ProgressBar progress={scrollYProgress} />
          <div className="episode-tag">Coding Animations with the Lord · Episode 4</div>
        </div>
        <div className="ui-bottom">
          <TransportControls
            playing={playing}
            onToggle={() => setPlaying((p) => !p)}
            onRestart={restart}
          />
        </div>
      </div>
    </div>
  )
}
