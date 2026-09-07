# Coding Animations with the Lord — Episode 4

## The Nativity · "Good Tidings of Great Joy" (Luke 2:1–20)

A **scroll-driven** animation, built with **React + Vite** and **framer-motion**:
one continuous page carries you from Caesar's decree, to the manger, to the
shepherds in the field, the glory of the Lord, the angel's "good tidings of
great joy," the heavenly host's "Glory to God in the highest," and the
shepherds' visit — closing as they return glorifying and praising God.

Every visual — the sky, the star of Bethlehem, the hillsides, the manger, the
shepherds, the angel, the burst of the heavenly host — is built purely from
React + CSS (gradients, blur, clip-path, mask, box-shadow) driven by
framer-motion's scroll and viewport hooks. No images, no SVGs.

### Run it

```bash
cd good-tidings-of-great-joy
npm install
npm run dev
```

Then open the printed URL (default http://localhost:5173).

- **Record on desktop** at a mobile size (DevTools device toolbar → e.g. iPhone 390×844), or
- **Record on your phone**: run `npm run dev -- --host` and open the `Network:` URL
  it prints on a phone connected to the same Wi-Fi.

Build a static version with `npm run build` (outputs to `dist/`).

### Controls

- **Autoplay** glides through the whole page and rests on the final scene.
- Scroll, tap, or press any key to take over — autoplay yields immediately.
- The ↺ button restarts from the top; the play/pause button toggles autoplay.

### How the scenes work

`src/data/scenes.js` holds the verse text and each scene's `progressRange` —
the slice of total scroll (0–1) it occupies. The persistent background layers
(`src/components/background/`) read those ranges to line up the sky's
dusk-to-dawn gradient and the star of Bethlehem's rise/brightness with the
scene currently in view, while each scene's own visual
(`src/components/scenes/`) animates in independently via framer-motion's
`whileInView`/`useInView`, both anchored to the same scrolling container
(`App.jsx`'s `scrollRef`) so nothing drifts out of sync.
