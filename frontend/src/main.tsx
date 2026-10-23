import '@fontsource-variable/onest/wght.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import { App } from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
)

// En production, la page arrive déjà rendue : React s'y rattache. En développement, il la construit.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
