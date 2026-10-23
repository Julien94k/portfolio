import { useQuery } from '@tanstack/react-query'

import { fetchStatus, type PiStatus } from '../api/status'

const decimal = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })
const loadFormat = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function uptime({ uptimeSeconds }: PiStatus): [string, string] {
  if (uptimeSeconds < 3_600) return [String(Math.max(1, Math.floor(uptimeSeconds / 60))), 'min']
  if (uptimeSeconds < 86_400) return [String(Math.floor(uptimeSeconds / 3_600)), 'h']
  const days = Math.floor(uptimeSeconds / 86_400)
  return [String(days), days > 1 ? 'jours' : 'jour']
}

/**
 * Les mesures du Pi qui sert le site, en grands chiffres comme une fiche technique. Les pages sont
 * statiques ; seules ces valeurs arrivent après coup, et leur absence n'empêche rien.
 */
export function PiSpecs() {
  const status = useQuery({ queryKey: ['status'], queryFn: fetchStatus, refetchInterval: 60_000 })
  const data = status.data
  const [upValue, upUnit] = data ? uptime(data) : ['…', '']

  return (
    <div className="specs">
      <dl className="specs-grid" aria-live="polite">
        <div>
          <dt>Température du processeur</dt>
          <dd>
            {data?.temperatureCelsius != null ? decimal.format(data.temperatureCelsius) : '…'}
            <span>{' '}°C</span>
          </dd>
        </div>
        <div>
          <dt>Allumé depuis</dt>
          <dd>
            {upValue}
            <span>{' '}{upUnit}</span>
          </dd>
        </div>
        <div>
          <dt>Charge sur une minute</dt>
          <dd>{data ? loadFormat.format(data.load) : '…'}</dd>
        </div>
      </dl>
      <p className="specs-note">
        {status.isError
          ? 'Les mesures sont indisponibles pour le moment. Le site, lui, reste en ligne.'
          : 'Mesures prises à l’instant, relues chaque minute.'}
      </p>
    </div>
  )
}
