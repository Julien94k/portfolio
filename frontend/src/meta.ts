import { findProject } from './content/projects'
import { profile } from './content/profile'

export type PageMeta = {
  title: string
  description: string
  /** Pages à ne pas référencer (administration, 404). */
  noindex?: boolean
}

const siteName = profile.name

export const notFoundMeta: PageMeta = {
  title: `Page introuvable · ${siteName}`,
  description: 'Cette page n’existe pas.',
  noindex: true,
}

export function metaFor(path: string): PageMeta {
  if (path === '/') {
    return {
      title: `${siteName}, développeur full-stack Java et React`,
      description:
        'Développeur full-stack Java, Spring Boot et React. Stage de six mois chez Takima, sur un logiciel de recrutement en production, et des outils que je me fabrique sur un Raspberry Pi. Je cherche un CDI en Île-de-France.',
    }
  }
  if (path === '/parcours') {
    return {
      title: `Parcours · ${siteName}`,
      description:
        'Expérience chez Takima, compétences avec le contexte où je m’en suis servi, formation : la version CV de mon portfolio.',
    }
  }
  if (path === '/admin') {
    return { title: `Messages · ${siteName}`, description: 'Administration des messages.', noindex: true }
  }
  const project = path.startsWith('/projets/') ? findProject(path.slice('/projets/'.length)) : undefined
  if (project) {
    return { title: `${project.title} · ${siteName}`, description: project.tagline }
  }
  return notFoundMeta
}
