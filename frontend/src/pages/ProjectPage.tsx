import { Blocks } from '../components/Blocks'
import { projects } from '../content/projects'
import type { Project } from '../content/types'
import { Link } from '../router/router'

export function ProjectPage({ project }: { project: Project }) {
  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="case">
      <p className="case-back">
        <Link href="/#projets">Tous les projets</Link>
      </p>
      <header className="case-header">
        <h1>{project.title}</h1>
        <p className="lead">{project.tagline}</p>
        <dl className="case-facts">
          <div>
            <dt>Cadre</dt>
            <dd>{project.context}</dd>
          </div>
          <div>
            <dt>Période</dt>
            <dd>{project.period}</dd>
          </div>
          <div>
            <dt>Rôle</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Technologies</dt>
            <dd>{project.stack.join(', ')}</dd>
          </div>
        </dl>
        {project.links.length > 0 && (
          <p className="case-links">
            {project.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </p>
        )}
      </header>

      {project.image && (
        <figure className="case-image">
          <img
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            loading="lazy"
            decoding="async"
          />
        </figure>
      )}

      {project.sections.map((section) => (
        <section key={section.heading} className="case-section">
          <h2>{section.heading}</h2>
          <Blocks blocks={section.blocks} />
        </section>
      ))}

      <nav className="case-next" aria-label="Projet suivant">
        <p>
          Projet suivant : <Link href={`/projets/${next.slug}`}>{next.title}</Link>
        </p>
      </nav>
    </article>
  )
}
