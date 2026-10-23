import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { Layout } from './components/Layout'
import { findProject } from './content/projects'
import { metaFor } from './meta'
import { AdminPage } from './pages/AdminPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectPage } from './pages/ProjectPage'
import { useRouter } from './router/context'
import { Router } from './router/router'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/pages.css'
import './styles/forms.css'

function CurrentPage() {
  const { path } = useRouter()

  useEffect(() => {
    document.title = metaFor(path).title
  }, [path])

  if (path === '/') return <HomePage />
  if (path === '/admin') return <AdminPage />
  const project = path.startsWith('/projets/') ? findProject(path.slice('/projets/'.length)) : undefined
  if (project) return <ProjectPage key={project.slug} project={project} />
  return <NotFoundPage />
}

export function App({ path }: { path: string }) {
  // Un client par rendu : au pré-rendu, rien ne doit fuiter d'une page à l'autre.
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Router initialPath={path}>
        <Layout>
          <CurrentPage />
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}
