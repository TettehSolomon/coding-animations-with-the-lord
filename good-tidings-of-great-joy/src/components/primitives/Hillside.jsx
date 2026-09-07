export default function Hillside({ tone = 'night' }) {
  return (
    <div className={`hillside hillside--${tone}`}>
      <div className="ridge ridge-back" />
      <div className="ridge ridge-front" />
    </div>
  )
}
