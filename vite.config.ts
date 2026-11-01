import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` produces relative asset URLs, so the same build works on
// GitHub Pages project sites (username.github.io/repo/), user sites,
// Netlify, Vercel and Cloudflare Pages without any changes.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
