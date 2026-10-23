import { request } from './http'

export type ContactPayload = {
  name: string
  email: string
  company: string
  message: string
  website: string
  elapsedMs: number
}

export function sendContact(payload: ContactPayload): Promise<void> {
  return request<void>('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
