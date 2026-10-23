import type { ReactNode } from 'react'

import { profile } from '../content/profile'
import { Link } from '../router/router'

const nav = [
  { href: '/#parcours', label: 'Parcours' },
  { href: '/#projets', label: 'Projets' },
  { href: '/#competences', label: 'Compétences' },
  { href: '/#contact', label: 'Contact' },
]

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="site-name">
            {profile.name}
          </Link>
          <nav aria-label="Sections">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="contenu" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <p>
          Servi depuis un Raspberry Pi 5 posé chez moi. Mis à jour le {__BUILD_DATE__}.
        </p>
        <p>
          <a href={profile.repository}>Code source du site</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={profile.github}>GitHub</a>
        </p>
      </footer>
    </>
  )
}
