import { motion, useTransform, useMotionTemplate } from 'framer-motion'

/* Dusk over Bethlehem's hills → deep night through the angels' visit →
   dawn gold as the shepherds return glorifying God. Colours are plain
   hex strings; framer-motion interpolates them directly, no manual lerp. */
const STOPS = [0, 0.10, 0.24, 0.60, 0.86, 1]
const TOP = ['#231a30', '#120e22', '#060612', '#03030c', '#140e14', '#3a2c10']
const BOTTOM = ['#5c343a', '#301c34', '#0e0c1e', '#080814', '#3c221e', '#ffdf9c']

export default function SkyLayer({ progress }) {
  const top = useTransform(progress, STOPS, TOP)
  const bottom = useTransform(progress, STOPS, BOTTOM)
  const background = useMotionTemplate`linear-gradient(to bottom, ${top}, ${bottom})`

  return <motion.div className="sky-layer" style={{ background }} />
}
