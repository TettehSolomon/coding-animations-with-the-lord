import Hillside from '../primitives/Hillside.jsx'
import MangerGlow from '../primitives/MangerGlow.jsx'

export default function SceneManger({ scrollRoot }) {
  return (
    <>
      <Hillside tone="dusk" />
      <MangerGlow scrollRoot={scrollRoot} animateIn />
    </>
  )
}
