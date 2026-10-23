import { ContactForm } from '../components/ContactForm'
import { education, experiences, languages, profile, skills, testimonial } from '../content/profile'
import { projects, sideProjects } from '../content/projects'
import { Link } from '../router/router'

export function HomePage() {
  return (
    <>
      <section className="intro" aria-labelledby="intro-titre">
        <h1 id="intro-titre">{profile.name}</h1>
        <p className="intro-role">
          {profile.role}, en {profile.location}.
        </p>
        {profile.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          <mark>{profile.availability}</mark>
        </p>
        <p className="intro-links">
          <Link href="/#contact">M’écrire</Link>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={profile.github}>GitHub</a>
        </p>
      </section>

      <section className="row" id="parcours" tabIndex={-1} aria-labelledby="parcours-titre">
        <h2 id="parcours-titre" className="row-label">
          Expérience
        </h2>
        <div className="row-body">
          {experiences.map((experience) => (
            <article key={experience.title} className="entry">
              <h3>{experience.title}</h3>
              <p className="entry-meta">
                {experience.organization}, {experience.place}, {experience.period}
              </p>
              <p>{experience.summary}</p>
              <ul className="entry-list">
                {experience.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {experience.caseStudy && (
                <p>
                  <Link href={`/projets/${experience.caseStudy}`}>Lire le récit détaillé de ce stage</Link>
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="row" id="projets" tabIndex={-1} aria-labelledby="projets-titre">
        <h2 id="projets-titre" className="row-label">
          Projets
        </h2>
        <div className="row-body">
          {projects.map((project) => (
            <article key={project.slug} className="project-row">
              <h3>
                <Link href={`/projets/${project.slug}`}>{project.title}</Link>
              </h3>
              <p className="entry-meta">
                {project.context}, {project.period}
              </p>
              <p>{project.tagline}</p>
              <p className="stack">{project.stack.join(', ')}</p>
            </article>
          ))}

          <h3 className="subheading">D’autres choses que j’ai construites</h3>
          <dl className="side-projects">
            {sideProjects.map((project) => (
              <div key={project.title}>
                <dt>
                  {project.title} <span className="note">{project.note}</span>
                </dt>
                <dd>
                  <p>{project.description}</p>
                  <p className="stack">{project.stack.join(', ')}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="row" aria-labelledby="recommandation-titre">
        <h2 id="recommandation-titre" className="row-label">
          Recommandation
        </h2>
        <div className="row-body">
          <figure className="testimonial">
            <blockquote>
              {testimonial.quote.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </blockquote>
            <figcaption>
              <strong>{testimonial.author}</strong>, {testimonial.role}.
              <span className="testimonial-context">{testimonial.context}.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="row" id="competences" tabIndex={-1} aria-labelledby="competences-titre">
        <h2 id="competences-titre" className="row-label">
          Compétences
        </h2>
        <div className="row-body">
          <dl className="skills">
            {skills.map((group) => (
              <div key={group.name}>
                <dt>{group.name}</dt>
                <dd>{group.skills.join(', ')}</dd>
              </div>
            ))}
            <div>
              <dt>Langues</dt>
              <dd>{languages}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="row" id="formation" tabIndex={-1} aria-labelledby="formation-titre">
        <h2 id="formation-titre" className="row-label">
          Formation
        </h2>
        <div className="row-body">
          <ol className="timeline">
            {education.map((item) => (
              <li key={item.title}>
                <p className="timeline-period">{item.period}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p className="entry-meta">{item.organization}</p>
                  {item.detail && <p>{item.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="row" id="contact" tabIndex={-1} aria-labelledby="contact-titre">
        <h2 id="contact-titre" className="row-label">
          Contact
        </h2>
        <div className="row-body">
          <p>
            Un poste à pourvoir, une question sur un projet ou sur mon stage : écrivez-moi ici. Vous pouvez aussi
            passer par <a href={profile.linkedin}>LinkedIn</a>.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
