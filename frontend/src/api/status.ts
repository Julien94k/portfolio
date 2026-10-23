import { request } from './http'

export type PiStatus = {
  temperatureCelsius?: number
  uptimeSeconds: number
  load: number
}

export function fetchStatus(): Promise<PiStatus> {
  return request('/api/status')
}
