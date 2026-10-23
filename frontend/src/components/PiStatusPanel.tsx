import { useQuery } from '@tanstack/react-query'

import { fetchStatus, type PiStatus } from '../api/status'
import { PiBoard } from './illustrations/PiBoard'

const decimal = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })
const loadFormat = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function days(status: PiStatus): string {
  const count = Math.floor(status.uptimeSeconds / 86_400)
  if (count === 0) return 'redémarré aujourd’hui'
  return `${count} jour${count > 1 ? 's' : ''}`
}

/**
 * La signature du site : le Pi qui le sert, avec des mesures prises à l'instant. Les pages sont
 * statiques ; seules ces valeurs arrivent après coup, et leur absence n'empêche rien.
 */
export function PiStatusPanel() {
  const status = useQuery({ queryKey: ['status'], queryFn: fetchStatus, refetchInterval: 60_000 })
  const data = status.data

  return (
    <figure className="pi">
      <PiBoard live={status.isSuccess} />
      <dl className="pi-readout" aria-live="polite">
        <div>
          <dt>Température</dt>
          <dd>{data?.temperatureCelsius != null ? `${decimal.format(data.temperatureCelsius)} °C` : '…'}</dd>
        </div>
        <div>
          <dt>Allumé depuis</dt>
          <dd>{data ? days(data) : '…'}</dd>
        </div>
        <div>
          <dt>Charge</dt>
          <dd>{data ? loadFormat.format(data.load) : '…'}</dd>
        </div>
      </dl>
      <figcaption>
        {status.isError
          ? 'Le Raspberry Pi 5 qui sert ce site, chez moi. Les mesures sont indisponibles pour le moment.'
          : 'Le Raspberry Pi 5 qui sert ce site, chez moi. Mesures prises en direct.'}
      </figcaption>
    </figure>
  )
}
