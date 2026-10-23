import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'

import { deleteMessage, listMessages, markRead, type AdminMessage, type Credentials } from '../api/admin'
import { ApiError } from '../api/http'

const dateFormat = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Europe/Paris',
})

function errorMessage(error: unknown): string {
  if (error instanceof ApiError && error.problem.status === 401) return 'Identifiant ou mot de passe incorrect.'
  if (error instanceof ApiError && error.problem.status === 429) return 'Trop de tentatives. Réessayez dans une minute.'
  if (error instanceof ApiError && error.problem.detail) return error.problem.detail
  return 'Le serveur ne répond pas.'
}

/**
 * Les identifiants ne vivent qu'en mémoire : ni cookie ni stockage local. Recharger la page déconnecte,
 * c'est voulu.
 */
export function AdminPage() {
  const [credentials, setCredentials] = useState<Credentials | null>(null)
  return credentials ? (
    <Inbox credentials={credentials} onLogout={() => setCredentials(null)} />
  ) : (
    <Login onSuccess={setCredentials} />
  )
}

function Login({ onSuccess }: { onSuccess: (credentials: Credentials) => void }) {
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = useMutation({
    mutationFn: (credentials: Credentials) => listMessages(credentials),
    onSuccess: (messages, credentials) => {
      queryClient.setQueryData(['messages'], messages)
      onSuccess(credentials)
    },
  })

  function submit(event: FormEvent) {
    event.preventDefault()
    login.mutate({ username, password })
  }

  return (
    <section className="admin">
      <h1>Messages</h1>
      <form className="admin-login" onSubmit={submit}>
        <div className="field">
          <label htmlFor="admin-username">Identifiant</label>
          <input
            id="admin-username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="admin-password">Mot de passe</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {login.isError && (
          <p className="form-error" role="alert">
            {errorMessage(login.error)}
          </p>
        )}
        <div className="form-actions">
          <button type="submit" className="button" disabled={login.isPending}>
            {login.isPending ? 'Connexion…' : 'Se connecter'}
          </button>
        </div>
      </form>
    </section>
  )
}

function Inbox({ credentials, onLogout }: { credentials: Credentials; onLogout: () => void }) {
  const queryClient = useQueryClient()
  const messages = useQuery({ queryKey: ['messages'], queryFn: () => listMessages(credentials) })

  const read = useMutation({
    mutationFn: (id: string) => markRead(credentials, id),
    onSuccess: (updated) =>
      queryClient.setQueryData<AdminMessage[]>(['messages'], (current) =>
        current?.map((message) => (message.id === updated.id ? updated : message)),
      ),
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteMessage(credentials, id),
    onSuccess: (_, id) =>
      queryClient.setQueryData<AdminMessage[]>(['messages'], (current) =>
        current?.filter((message) => message.id !== id),
      ),
  })

  function logout() {
    queryClient.removeQueries({ queryKey: ['messages'] })
    onLogout()
  }

  const list = messages.data ?? []
  const unread = list.filter((message) => !message.readAt).length
  const actionError = read.error ?? remove.error

  return (
    <section className="admin">
      <div className="admin-header">
        <h1>Messages</h1>
        <button type="button" className="button-quiet" onClick={logout}>
          Se déconnecter
        </button>
      </div>

      {messages.isPending && <p className="muted">Chargement des messages…</p>}

      {messages.isError && (
        <div className="form-error" role="alert">
          <p>{errorMessage(messages.error)}</p>
          <button type="button" className="button-quiet" onClick={() => messages.refetch()}>
            Réessayer
          </button>
        </div>
      )}

      {messages.isSuccess && list.length === 0 && <p className="muted">Aucun message pour l’instant.</p>}

      {messages.isSuccess && list.length > 0 && (
        <p className="muted">
          {list.length} message{list.length > 1 ? 's' : ''}, dont {unread} non lu{unread > 1 ? 's' : ''}.
        </p>
      )}

      {actionError && (
        <p className="form-error" role="alert">
          {errorMessage(actionError)}
        </p>
      )}

      <ol className="inbox">
        {list.map((message) => (
          <li key={message.id} className={message.readAt ? 'inbox-item' : 'inbox-item inbox-item-unread'}>
            <article aria-labelledby={`message-${message.id}`}>
              <h2 id={`message-${message.id}`}>
                {message.name}
                {message.company && <span className="muted">, {message.company}</span>}
                {!message.readAt && <span className="badge">non lu</span>}
              </h2>
              <p className="entry-meta">
                <a href={`mailto:${message.email}`}>{message.email}</a>, le{' '}
                {dateFormat.format(new Date(message.createdAt))}
              </p>
              <p className="inbox-text">{message.message}</p>
              <p className="inbox-actions">
                {!message.readAt && (
                  <button
                    type="button"
                    className="button-quiet"
                    disabled={read.isPending}
                    onClick={() => read.mutate(message.id)}
                  >
                    Marquer comme lu
                  </button>
                )}
                <button
                  type="button"
                  className="button-quiet button-danger"
                  disabled={remove.isPending}
                  onClick={() => {
                    if (window.confirm(`Supprimer le message de ${message.name} ?`)) remove.mutate(message.id)
                  }}
                >
                  Supprimer
                </button>
              </p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
