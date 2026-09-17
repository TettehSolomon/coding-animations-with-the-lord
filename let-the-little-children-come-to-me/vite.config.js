import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset paths relative so the built app can be opened
// from a static host or a project subpath (e.g. GitHub Pages).
export default defineConfig({
  plugins: [react()],
  base: './',
})
