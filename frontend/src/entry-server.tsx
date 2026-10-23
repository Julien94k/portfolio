import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import { App } from './App'
import { metaFor, notFoundMeta, type PageMeta } from './meta'

export { projects } from './content/projects'

export function render(path: string): { html: string; meta: PageMeta } {
  const html = renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  )
  return { html, meta: path === '/404' ? notFoundMeta : metaFor(path) }
}
