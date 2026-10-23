import type { Project } from '../content/types'
import { BrowserFrame, PhoneFrame } from './DeviceFrames'
import { JobRadarIllustration } from './illustrations/JobRadarIllustration'
import { PortfolioIllustration } from './illustrations/PortfolioIllustration'
import { TimaIllustration } from './illustrations/TimaIllustration'

const illustrations = {
  tima: TimaIllustration,
  jobradar: JobRadarIllustration,
  portfolio: PortfolioIllustration,
}

/** Le visuel d'un projet : sa capture dans le bon appareil, sinon un schéma sur une tuile grise. */
export function ProjectVisual({ project, decorative = false }: { project: Project; decorative?: boolean }) {
  const image = project.image
  if (image) {
    const shot = { ...image, alt: decorative ? '' : image.alt }
    return (
      <div className="visual">
        {image.kind === 'phone' ? (
          <PhoneFrame {...shot} />
        ) : (
          <BrowserFrame {...shot} url={project.links[0]?.href.replace(/^https?:\/\//, '') ?? ''} />
        )}
      </div>
    )
  }
  if (project.illustration) {
    const Illustration = illustrations[project.illustration]
    return (
      <div className="visual visual-tile" aria-hidden={decorative ? true : undefined}>
        <Illustration />
      </div>
    )
  }
  return null
}
