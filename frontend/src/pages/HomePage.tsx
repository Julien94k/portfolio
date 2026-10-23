import { ContactForm } from '../components/ContactForm'
import { PiStatusPanel } from '../components/PiStatusPanel'
import { ProjectVisual } from '../components/ProjectVisual'
import { homelab, profile, testimonial, tools } from '../content/profile'
import { projects } from '../content/projects'
import { Link } from '../router/router'

export function HomePage() {
  const [featured, ...others] = projects

  return (
    <div className="home">
      <section className="hero" aria-labelledby="intro-titre">
        <h1 id="intro-titre" className="hero-title">
          <strong>Je m’appelle {profile.name}.</strong> Je construis des applications web de bout en bout, et les
          outils qui me manquent.
        </h1>
        <div className="hero-grid">
          <div className="hero-text">
            <p className="hero-role">{profile.role}.</p>
            {profile.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              <mark>{profile.availability}</mark>
            </p>
            <p className="intro-links">
              <Link href="/#contact">M’écrire</Link>
              <Link href="/parcours">Mon parcours, version CV</Link>
              <a href={profile.linkedin}>LinkedIn</a>
              <a href={profile.github}>GitHub</a>
            </p>
          </div>
          <PiStatusPanel />
        </div>
      </section>

      <section className="block" id="projets" tabIndex={-1} aria-labelledby="projets-titre">
        <h2 id="projets-titre" className="block-title">
          Ce que j’ai construit
        </h2>

        <article className="project project-featured">
          <Link href={`/projets/${featured.slug}`} className="project-visual" tabIndex={-1} aria-hidden="true">
            <ProjectVisual project={featured} decorative />
          </Link>
          <div className="project-text">
            <h3>
              <Link href={`/projets/${featured.slug}`}>{featured.title}</Link>
            </h3>
            <p className="entry-meta">
              {featured.context}, {featured.period}
            </p>
            <p>{featured.summary}</p>
            <p className="stack">{featured.stack.join(', ')}</p>
          </div>
        </article>

        <div className="project-grid">
          {others.map((project) => (
            <article key={project.slug} className="project">
              <Link href={`/projets/${project.slug}`} className="project-visual" tabIndex={-1} aria-hidden="true">
                <ProjectVisual project={project} decorative />
              </Link>
              <div className="project-text">
                <h3>
                  <Link href={`/projets/${project.slug}`}>{project.title}</Link>
                </h3>
                <p className="entry-meta">
                  {project.context}, {project.period}
                </p>
                <p>{project.summary}</p>
                <p className="stack">{project.stack.join(', ')}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <figure className="pull-quote">
        <blockquote>
          <p>{testimonial.quote[1]}</p>
        </blockquote>
        <figcaption>
          <strong>{testimonial.author}</strong>, ma tech lead chez Takima.{' '}
          <Link href={`/projets/${featured.slug}`}>Lire le récit du stage</Link>
        </figcaption>
      </figure>

      <section className="block" id="outils" tabIndex={-1} aria-labelledby="outils-titre">
        <h2 id="outils-titre" className="block-title">
          Des outils plus petits, écrits pour moi
        </h2>
        <p>
          Quand quelque chose me fait perdre du temps, je finis souvent par écrire l’outil. Ceux-là ne
          serviront probablement qu’à moi, et c’est très bien comme ça.
        </p>
        <dl className="tools">
          {tools.map((tool) => (
            <div key={tool.title}>
              <dt>{tool.title}</dt>
              <dd>
                {tool.description} <span className="stack">{tool.stack}.</span>
                {tool.image && (
                  <figure className="tool-figure">
                    <img
                      src={tool.image.src}
                      alt=""
                      width={tool.image.width}
                      height={tool.image.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{tool.image.caption}</figcaption>
                  </figure>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p>{homelab}</p>
      </section>

      <section className="block" id="contact" tabIndex={-1} aria-labelledby="contact-titre">
        <h2 id="contact-titre" className="block-title">
          Me contacter
        </h2>
        <p>
          Un poste à pourvoir, une question sur un projet ou sur mon stage{' '}: écrivez-moi ici, le message
          arrive directement sur mon téléphone. Vous pouvez aussi passer par <a href={profile.linkedin}>LinkedIn</a>.
        </p>
        <ContactForm />
      </section>
    </div>
  )
}
