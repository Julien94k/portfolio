export type Link = {
  label: string
  href: string
}

export type Experience = {
  title: string
  organization: string
  place: string
  period: string
  summary: string
  items: string[]
  caseStudy?: string
}

export type Education = {
  period: string
  title: string
  organization: string
  detail?: string
}

/** Un paragraphe de texte, ou un court extrait de code avec sa légende. */
export type Block = string | { code: string; language: string; caption: string }

export type CaseSection = {
  heading: string
  blocks: Block[]
}

export type Project = {
  slug: string
  title: string
  /** Une phrase pour l'accueil : le problème que le projet résout. */
  summary: string
  tagline: string
  context: string
  period: string
  role: string
  stack: string[]
  links: Link[]
  /** « phone » : capture verticale d'appli mobile, affichée étroite. */
  image?: { src: string; alt: string; width: number; height: number; kind: 'screen' | 'phone' }
  /** Projet sans capture montrable : un schéma dessiné à la place. */
  illustration?: 'tima' | 'jobradar' | 'portfolio'
  sections: CaseSection[]
  /** Recommandation affichée à la fin de l'étude de cas, là où elle a le plus de poids. */
  testimonial?: Testimonial
}

/** Petit outil écrit pour moi, présenté en une ligne. */
export type Tool = {
  title: string
  description: string
  stack: string
  image?: { src: string; caption: string; width: number; height: number }
}

/** Une compétence et l'endroit où je m'en suis réellement servi. */
export type Skill = {
  name: string
  context: string
}

export type Testimonial = {
  quote: string[]
  author: string
  role: string
  context: string
}
