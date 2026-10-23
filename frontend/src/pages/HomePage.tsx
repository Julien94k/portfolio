import { BrowserFrame, PhoneFrame } from '../components/DeviceFrames'
import { ContactForm } from '../components/ContactForm'
import { PiSpecs } from '../components/PiSpecs'
import { ProjectVisual } from '../components/ProjectVisual'
import { homelab, profile, testimonial, tools } from '../content/profile'
import { findProject, projects } from '../content/projects'
import { Link } from '../router/router'

export function HomePage() {
  const manguessr = findProject('manguessr')
  const pianolearn = findProject('pianolearn')

  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-titre">
        <h1 id="hero-titre">{profile.name}</h1>
        <p className="hero-lede">
          Développeur full-stack Java et React.
          <span>Je construis des applis, et les outils qui me manquent.</span>
        </p>
        <p className="hero-actions">
          <Link href="/#contact" className="pill">
            M’écrire
          </Link>
          <Link href="/parcours" className="pill pill-quiet">
            Voir mon parcours
          </Link>
        </p>
        <p className="hero-status">{profile.availability}</p>

        {manguessr?.image && pianolearn?.image && (
          <div className="hero-devices" aria-hidden="true">
            <BrowserFrame {...manguessr.image} alt="" url="manguessr.julienhome.com" eager />
            <PhoneFrame {...pianolearn.image} alt="" eager />
          </div>
        )}
      </section>

      <section className="band band-grey" aria-label="En bref">
        <p className="story">
          {profile.story.map(([text, strong]) => (strong ? <strong key={text}>{text}</strong> : text))}
        </p>
      </section>

      <div id="projets" tabIndex={-1} className="anchor" />
      {projects.map((project, index) => (
        <section
          key={project.slug}
          className={index % 2 === 1 ? 'band band-grey project' : 'band project'}
          aria-labelledby={`projet-${project.slug}`}
        >
          <div className="project-head">
            <p className="project-label">{project.name}</p>
            <h2 id={`projet-${project.slug}`} className="split-title">
              {project.headline[0]}
              <span>{project.headline[1]}</span>
            </h2>
          </div>
          <Link href={`/projets/${project.slug}`} className="project-visual" tabIndex={-1} aria-hidden="true">
            <ProjectVisual project={project} decorative />
          </Link>
          <div className="project-foot">
            <p>{project.summary}</p>
            <p className="project-links">
              <Link href={`/projets/${project.slug}`}>Lire l’étude de cas</Link>
              {project.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </p>
          </div>
        </section>
      ))}

      <section className="band band-grey" aria-labelledby="pi-titre">
        <div className="project-head">
          <p className="project-label">Hébergement</p>
          <h2 id="pi-titre" className="split-title">
            Servi depuis un Raspberry Pi 5.
            <span>Chez moi, mesuré à l’instant.</span>
          </h2>
        </div>
        <PiSpecs />
        <p className="band-text">{homelab}</p>
      </section>

      <section className="band" aria-labelledby="outils-titre">
        <div className="project-head">
          <p className="project-label">Petits outils</p>
          <h2 id="outils-titre" className="split-title">
            Quand un outil me manque, je l’écris.
            <span>Ceux-là ne servent qu’à moi.</span>
          </h2>
        </div>
        <ul className="tiles">
          {tools.map((tool) => (
            <li key={tool.title} className="tile">
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              {tool.image && (
                <img
                  src={tool.image.src}
                  alt={tool.image.caption}
                  width={tool.image.width}
                  height={tool.image.height}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <p className="tile-stack">{tool.stack}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band band-grey quote" aria-label="Recommandation">
        <figure>
          <blockquote>
            <p>{testimonial.quote[1]}</p>
          </blockquote>
          <figcaption>
            {testimonial.author}, ma tech lead chez Takima
          </figcaption>
        </figure>
      </section>

      <section className="band contact" id="contact" tabIndex={-1} aria-labelledby="contact-titre">
        <h2 id="contact-titre" className="split-title split-title-center">
          Un poste à pourvoir{' '}?
          <span>Écrivez-moi, je réponds par e-mail.</span>
        </h2>
        <ContactForm />
        <p className="contact-alt">
          Ou sur <a href={profile.linkedin}>LinkedIn</a>.
        </p>
      </section>
    </div>
  )
}
