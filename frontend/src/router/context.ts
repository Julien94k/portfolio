import { createContext, useContext } from 'react'

type RouterValue = {
  path: string
  navigate: (to: string) => void
}

export const RouterContext = createContext<RouterValue>({ path: '/', navigate: () => {} })

export function useRouter(): RouterValue {
  return useContext(RouterContext)
}

/** « /projets/tima/ » et « /projets/tima » désignent la même page. */
export function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}
