import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { slides } from './data/slides.js'
import Stage from './components/Stage.jsx'
import './styles/app.css'

const AUTOPLAY_MS = 6500

export default function App() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [playing, setPlaying] = useState(true)
  const touchX = useRef(null)

  const slide = slides[index]
  const atEnd = index === slides.length - 1

  const go = useCallback((next) => {
    setIndex((cur) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, next))
      setDirection(clamped >= cur ? 1 : -1)
      return clamped
    })
  }, [])

  const nextSlide = useCallback(() => {
    setIndex((cur) => {
      setDirection(1)
      return cur >= slides.length - 1 ? cur : cur + 1
    })
  }, [])

  const prevSlide = useCallback(() => {
    setIndex((cur) => {
      setDirection(-1)
      return cur <= 0 ? cur : cur - 1
    })
  }, [])

  // Autoplay — advances until the last slide, then rests.
  useEffect(() => {
    if (!playing || atEnd) return
    const t = setTimeout(nextSlide, AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [playing, atEnd, index, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { setPlaying(false); nextSlide() }
      else if (e.key === 'ArrowLeft') { setPlaying(false); prevSlide() }
      else if (e.key === ' ') { e.preventDefault(); setPlaying((p) => !p) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nextSlide, prevSlide])

  // Touch swipe
  const onTouchStart = (e) => { touchX.current = e.changedTouches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 45) {
      setPlaying(false)
      dx < 0 ? nextSlide() : prevSlide()
    }
    touchX.current = null
  }

  const variants = {
    enter: (dir) => ({ opacity: 0, y: 30 * dir }),
    center: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: -30 * dir }),
  }

  return (
    <div className="app" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Stage slide={slide} index={index} />

      <div className="ui">
        {/* top overlay */}
        <div className="ui-top">
          <div className="progress-track">
            <motion.div
              key={`${index}-${playing}`}
              className="progress-fill"
              initial={{ width: '0%' }}
              animate={{ width: playing && !atEnd ? '100%' : `${((index + 1) / slides.length) * 100}%` }}
              transition={{ duration: playing && !atEnd ? AUTOPLAY_MS / 1000 : 0.4, ease: 'linear' }}
            />
          </div>
          <div className="episode-tag">Coding Animations with the Lord · Episode 3</div>
        </div>

        {/* bottom overlay: verse + controls */}
        <div className="ui-bottom">
          <div className="panel">
            <div className="caption">{slide.caption}</div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="verse"
              >
                <p className="verse-strong">{slide.strong}</p>
                <p className="verse-rest">{slide.rest}</p>
                <div className="verse-ref">{slide.ref}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="controls">
            <button className="nav-btn" onClick={() => { setPlaying(false); prevSlide() }} disabled={index === 0} aria-label="Previous">‹</button>

            <div className="dots" role="tablist">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === index ? 'active' : ''}`}
                  onClick={() => { setPlaying(false); go(i) }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button className="nav-btn" onClick={() => { setPlaying(false); nextSlide() }} disabled={atEnd} aria-label="Next">›</button>

            <button className="play-btn" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? '❙❙' : '▶'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
