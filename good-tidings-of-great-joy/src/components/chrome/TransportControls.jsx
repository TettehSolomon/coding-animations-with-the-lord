export default function TransportControls({ playing, onToggle, onRestart }) {
  return (
    <div className="controls">
      <button className="restart-btn" onClick={onRestart} aria-label="Restart">↺</button>
      <button className="play-btn" onClick={onToggle} aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? '❙❙' : '▶'}
      </button>
    </div>
  )
}
