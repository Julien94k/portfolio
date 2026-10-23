import { Blocks } from '../components/Blocks'
import { ProjectVisual } from '../components/ProjectVisual'
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

      {(project.image || project.illustration) && (
        <figure className="case-visual">
          <ProjectVisual project={project} />
        </figure>
      )}

      {project.sections.map((section) => (
        <section key={section.heading} className="case-section">
          <h2>{section.heading}</h2>
          <Blocks blocks={section.blocks} />
        </section>
      ))}

      {project.testimonial && (
        <section className="case-section">
          <h2>Ce qu’en dit ma tech lead</h2>
          <figure className="testimonial">
            <blockquote>
              {project.testimonial.quote.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </blockquote>
            <figcaption>
              <strong>{project.testimonial.author}</strong>, {project.testimonial.role}.
              <span className="testimonial-context">{project.testimonial.context}.</span>
            </figcaption>
          </figure>
        </section>
      )}

      <nav className="case-next" aria-label="Projet suivant">
        <p>
          Projet suivant : <Link href={`/projets/${next.slug}`}>{next.title}</Link>
        </p>
      </nav>
    </article>
  )
}
