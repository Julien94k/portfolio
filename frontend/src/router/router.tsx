import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'

import { normalizePath, RouterContext, useRouter } from './context'

type Location = { path: string; hash: string; key: number }

/**
 * Routeur minimal : cinq pages ne justifient pas une bibliothèque. Les pages sont pré-générées en HTML ;
 * côté navigateur, les liens internes changent de page sans rechargement.
 */
export function Router({ initialPath, children }: { initialPath: string; children: ReactNode }) {
  const [location, setLocation] = useState<Location>({ path: normalizePath(initialPath), hash: '', key: 0 })

  useEffect(() => {
    const onPopState = () =>
      setLocation((current) => ({
        path: normalizePath(window.location.pathname),
        hash: window.location.hash,
        key: current.key + 1,
      }))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Après un changement de page : ancre visée, sinon haut de page, et focus sur le contenu pour les
  // lecteurs d'écran (sinon il reste sur le lien cliqué, qui n'existe plus).
  useEffect(() => {
    if (location.key === 0) return
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null
    if (target) {
      target.scrollIntoView()
      target.focus({ preventScroll: true })
    } else {
      window.scrollTo(0, 0)
      document.getElementById('contenu')?.focus({ preventScroll: true })
    }
  }, [location])

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.href)
    window.history.pushState(null, '', url)
    setLocation((current) => ({ path: normalizePath(url.pathname), hash: url.hash, key: current.key + 1 }))
  }, [])

  const value = useMemo(() => ({ path: location.path, navigate }), [location.path, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** Lien interne : navigation sans rechargement, sauf si l'utilisateur veut un nouvel onglet. */
export function Link({ href, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    const newTab = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
    if (event.defaultPrevented || newTab || rest.target === '_blank') return
    event.preventDefault()
    navigate(href)
  }

  return <a href={href} onClick={handleClick} {...rest} />
}
