import { education, experiences, languages, skills } from '../content/profile'
import { Link } from '../router/router'

/** La version CV du site, pour qui veut tout voir d'un coup. */
export function ParcoursPage() {
  return (
    <div className="parcours">
      <header className="parcours-header">
        <h1>Mon parcours</h1>
        <p className="lead">
          La version CV : expérience, compétences et formation. Les projets, eux, sont racontés{' '}
          <Link href="/#projets">sur l’accueil</Link>.
        </p>
      </header>

      <section className="row" aria-labelledby="experience-titre">
        <h2 id="experience-titre" className="row-label">
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
                  <Link href={`/projets/${experience.caseStudy}`}>Lire le récit de ce stage</Link>
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="row" aria-labelledby="competences-titre">
        <h2 id="competences-titre" className="row-label">
          Compétences
        </h2>
        <div className="row-body">
          <p className="muted">Chaque compétence avec l’endroit où je m’en suis vraiment servi.</p>
          <dl className="skills">
            {skills.map((skill) => (
              <div key={skill.name}>
                <dt>{skill.name}</dt>
                <dd>{skill.context}</dd>
              </div>
            ))}
            <div>
              <dt>Langues</dt>
              <dd>{languages}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="row" aria-labelledby="formation-titre">
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
    </div>
  )
}
