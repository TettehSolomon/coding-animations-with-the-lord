import Hillside from '../primitives/Hillside.jsx'
import ShepherdSilhouettes from '../primitives/ShepherdSilhouettes.jsx'

export default function SceneField() {
  return (
    <>
      <Hillside tone="night" />
      <ShepherdSilhouettes variant="watching" />
    </>
  )
}
