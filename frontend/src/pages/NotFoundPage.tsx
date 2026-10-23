import { Link } from '../router/router'

export function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>Cette page n’existe pas</h1>
      <p>Le lien est peut-être ancien, ou mal recopié.</p>
      <p>
        <Link href="/">Revenir à l’accueil</Link>
      </p>
    </section>
  )
}
