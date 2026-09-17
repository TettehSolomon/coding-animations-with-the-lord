# Coding Animations with the Lord

## Let the Little Children Come to Me

A looping 4-card reel — talking to Jesus, praying to Him, listening to Him,
trusting Him — each paired with a KJV verse. Built with React, Vite and
framer-motion; each card tilts in and out (carried over from the CSS
carousel this project started as) while a blurred, slow-zooming copy of
its own image drifts behind it.

### Run it

```bash
npm install
npm run dev
```

Then open the printed URL (default http://localhost:5173).

### Controls

- Autoplay holds each card ~5s (tracked by the segmented bar at the top),
  then advances — looping back to the first card after the fourth.
- Tap/click anywhere to pause; the ⏸/▶ button toggles play.

### The four cards

| Image | Theme | Verse |
|---|---|---|
| `public/art/talking.jpg` | Talking to Jesus | John 15:15 |
| `public/art/praying.jpg` | Praying to Him | Philippians 4:6 |
| `public/art/listening.jpg` | Listening to Him | John 10:27 |
| `public/art/trusting.jpg` | Trusting Him | Proverbs 3:5 |

Edit `src/data/cards.js` to change text, verses, or the per-card dwell time.
