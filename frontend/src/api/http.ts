/** Erreur au format RFC 9457 renvoyée par l'API, ou reconstituée si le serveur n'a pas répondu. */
export type Problem = {
  status: number
  detail?: string
  errors?: Record<string, string>
}

export class ApiError extends Error {
  readonly problem: Problem

  constructor(problem: Problem) {
    super(problem.detail ?? `Erreur ${problem.status}`)
    this.problem = problem
  }
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(path, {
      ...init,
      headers: { Accept: 'application/json', ...init.headers },
    })
  } catch {
    throw new ApiError({ status: 0, detail: 'Le serveur ne répond pas. Vérifiez votre connexion et réessayez.' })
  }

  if (response.ok) {
    return (response.status === 204 || response.status === 202 ? undefined : await response.json()) as T
  }

  const body = await response.json().catch(() => ({}))
  throw new ApiError({ status: response.status, detail: body.detail, errors: body.errors })
}
