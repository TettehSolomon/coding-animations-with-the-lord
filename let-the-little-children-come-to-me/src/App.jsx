import { useCallback, useEffect, useState } from 'react'
import { cards, DWELL_MS } from './data/cards.js'
import Card from './components/Card.jsx'
import './styles/app.css'

export default function App() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % cards.length)
  }, [])

  // Autoplay loops forever — there is no "end" to rest on.
  useEffect(() => {
    if (!playing) return
    const t = setTimeout(advance, DWELL_MS)
    return () => clearTimeout(t)
  }, [playing, index, advance])

  return (
    <div className="app" onClick={() => setPlaying(false)}>
      <Card card={cards[index]} />

      <div className="ui-top">
        <div className="story-bar">
          {cards.map((card, i) => (
            <div key={card.id} className="story-segment">
              {i < index && <div className="story-fill" style={{ width: '100%' }} />}
              {i === index && (
                <div
                  key={`${card.id}-${index}`}
                  className="story-fill story-fill--active"
                  style={{
                    animationDuration: `${DWELL_MS}ms`,
                    animationPlayState: playing ? 'running' : 'paused',
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="episode-tag">Coding Animations with the Lord</div>
      </div>

      <div className="ui-bottom">
        <button
          className="play-btn"
          onClick={(e) => {
            e.stopPropagation()
            setPlaying((p) => !p)
          }}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? '❙❙' : '▶'}
        </button>
      </div>
    </div>
  )
}
