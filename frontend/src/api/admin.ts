import { request } from './http'

export type Credentials = { username: string; password: string }

export type AdminMessage = {
  id: string
  name: string
  email: string
  company?: string
  message: string
  createdAt: string
  readAt?: string
}

/** btoa ne gère que le Latin-1 : on encode d'abord en UTF-8 pour accepter tout mot de passe. */
function authorization({ username, password }: Credentials): HeadersInit {
  const bytes = new TextEncoder().encode(`${username}:${password}`)
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')
  return { Authorization: `Basic ${btoa(binary)}` }
}

export function listMessages(credentials: Credentials): Promise<AdminMessage[]> {
  return request('/api/admin/messages', { headers: authorization(credentials) })
}

export function markRead(credentials: Credentials, id: string): Promise<AdminMessage> {
  return request(`/api/admin/messages/${encodeURIComponent(id)}/read`, {
    method: 'PATCH',
    headers: authorization(credentials),
  })
}

export function deleteMessage(credentials: Credentials, id: string): Promise<void> {
  return request(`/api/admin/messages/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authorization(credentials),
  })
}
