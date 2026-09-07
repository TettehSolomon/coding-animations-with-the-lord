const LAYOUTS = {
  watching: {
    shepherds: [
      { left: '28%', bottom: '20%' },
      { left: '46%', bottom: '17%' },
      { left: '64%', bottom: '21%' },
    ],
    flock: [
      { left: '38%', bottom: '15%', size: 14 },
      { left: '44%', bottom: '13%', size: 11 },
      { left: '54%', bottom: '14%', size: 16 },
      { left: '60%', bottom: '12%', size: 10 },
    ],
  },
  kneeling: {
    shepherds: [
      { left: '30%', bottom: '19%' },
      { left: '68%', bottom: '19%' },
    ],
    flock: [],
  },
}

export default function ShepherdSilhouettes({ variant = 'watching' }) {
  const layout = LAYOUTS[variant]
  const shepherdClass = variant === 'kneeling' ? 'shepherd shepherd--kneeling' : 'shepherd'

  return (
    <>
      {layout.shepherds.map((s, i) => (
        <div key={i} className={shepherdClass} style={{ left: s.left, bottom: s.bottom }}>
          <div className="head" />
          <div className="robe" />
        </div>
      ))}
      {layout.flock.map((f, i) => (
        <div
          key={i}
          className="flock-dot"
          style={{ left: f.left, bottom: f.bottom, width: f.size, height: f.size * 0.75 }}
        />
      ))}
    </>
  )
}
