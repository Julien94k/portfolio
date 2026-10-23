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
  tagline: string
  context: string
  period: string
  role: string
  stack: string[]
  links: Link[]
  image?: { src: string; alt: string; width: number; height: number }
  sections: CaseSection[]
}

export type SideProject = {
  title: string
  description: string
  stack: string[]
  note: string
}

export type SkillGroup = {
  name: string
  skills: string[]
}

export type Testimonial = {
  quote: string[]
  author: string
  role: string
  context: string
}
