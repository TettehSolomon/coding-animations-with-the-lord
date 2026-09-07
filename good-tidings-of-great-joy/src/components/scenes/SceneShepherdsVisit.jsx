import MangerGlow from '../primitives/MangerGlow.jsx'
import ShepherdSilhouettes from '../primitives/ShepherdSilhouettes.jsx'

export default function SceneShepherdsVisit({ scrollRoot }) {
  return (
    <>
      <MangerGlow scrollRoot={scrollRoot} />
      <ShepherdSilhouettes variant="kneeling" />
    </>
  )
}
