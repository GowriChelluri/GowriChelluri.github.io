import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted, open-source variable fonts (no external requests, no cost).
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './styles/index.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
