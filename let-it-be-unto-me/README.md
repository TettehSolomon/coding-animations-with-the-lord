# Coding Animations with the Lord — Episode 3

## The Annunciation · "Let It Be Unto Me" (Luke 1:26–38)

A **slide-based** animation (no long scroll): Gabriel descends, Mary kneels and
receives the good news, the dove of the Holy Ghost comes upon her on Luke 1:35,
and she gives her yes — *"be it unto me according to thy word."* Built with
**React + Vite** and **framer-motion**.

### Run it

```bash
cd let-it-be-unto-me
npm install
npm run dev
```

Then open the printed URL (default http://localhost:5173).

- **Record on desktop** at a mobile size (DevTools device toolbar → e.g. iPhone 390×844), or
- **Record on your phone**: run `npm run dev -- --host` and open the `Network:` URL
  it prints on a phone connected to the same Wi-Fi.

Build a static version with `npm run build` (outputs to `dist/`).

### Controls

- **Autoplay** advances each slide and rests on the final one.
- Tap ‹ / › , swipe left/right, or use the arrow keys. **Space** toggles play/pause.
- Tap a dot to jump to any slide.

### Artwork

The slides feature six **public-domain** masterpiece paintings of the Annunciation
(Fra Angelico, Leonardo da Vinci, Botticelli, El Greco, Rossetti, Henry Ossawa
Tanner) — see [`public/art/CREDITS.md`](public/art/CREDITS.md). To swap a painting,
replace the file in [`public/art/`](public/art/) (same name) or point a slide at a
different `image` in [`src/data/slides.js`](src/data/slides.js). Each slide also has a
`focal` (keeps the key figure in frame on a portrait screen) and a `zoom` direction.
