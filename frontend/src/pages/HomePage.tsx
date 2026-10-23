import { ContactForm } from '../components/ContactForm'
import { homelab, profile, testimonial, tools } from '../content/profile'
import { projects } from '../content/projects'
import { Link } from '../router/router'

export function HomePage() {
  return (
    <div className="home">
      <section className="intro" aria-labelledby="intro-titre">
        <h1 id="intro-titre">
          Bonjour, je suis {profile.name}.
        </h1>
        <p className="intro-role">{profile.role}.</p>
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
      </section>

      <section className="block" id="projets" tabIndex={-1} aria-labelledby="projets-titre">
        <h2 id="projets-titre">Ce que j’ai construit</h2>
        <ol className="projects">
          {projects.map((project) => (
            <li key={project.slug} className={`project ${project.image ? `project-${project.image.kind}` : ''}`}>
              {project.image && (
                <Link href={`/projets/${project.slug}`} className="project-image" tabIndex={-1} aria-hidden="true">
                  <img
                    src={project.image.src}
                    alt=""
                    width={project.image.width}
                    height={project.image.height}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
              )}
              <div className="project-text">
                <h3>
                  <Link href={`/projets/${project.slug}`}>{project.title}</Link>
                </h3>
                <p className="entry-meta">
                  {project.context}, {project.period}
                </p>
                <p>{project.summary}</p>
                {project.slug === 'tima' && (
                  <blockquote className="project-quote">
                    <p>« {testimonial.quote[1]} »</p>
                    <footer>{testimonial.author}, ma tech lead chez Takima</footer>
                  </blockquote>
                )}
                <p className="stack">{project.stack.join(', ')}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="block" id="outils" tabIndex={-1} aria-labelledby="outils-titre">
        <h2 id="outils-titre">Des outils plus petits, écrits pour moi</h2>
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
        <h2 id="contact-titre">Me contacter</h2>
        <p>
          Un poste à pourvoir, une question sur un projet ou sur mon stage  : écrivez-moi ici, le message arrive
          directement sur mon téléphone. Vous pouvez aussi passer par <a href={profile.linkedin}>LinkedIn</a>.
        </p>
        <ContactForm />
      </section>
    </div>
  )
}
