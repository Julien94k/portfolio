import type { Project } from '../content/types'
import { JobRadarIllustration } from './illustrations/JobRadarIllustration'
import { PortfolioIllustration } from './illustrations/PortfolioIllustration'
import { TimaIllustration } from './illustrations/TimaIllustration'

const illustrations = {
  tima: TimaIllustration,
  jobradar: JobRadarIllustration,
  portfolio: PortfolioIllustration,
}

/**
 * Le visuel d'un projet dans un cadre teinté : sa vraie capture si elle existe, sinon un schéma.
 * `decorative` sur l'accueil, où le titre du projet suit juste après.
 */
export function ProjectVisual({ project, decorative = false }: { project: Project; decorative?: boolean }) {
  if (project.image) {
    return (
      <div className={`visual visual-${project.image.kind}`}>
        <img
          src={project.image.src}
          alt={decorative ? '' : project.image.alt}
          width={project.image.width}
          height={project.image.height}
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }
  if (project.illustration) {
    const Illustration = illustrations[project.illustration]
    return (
      <div className="visual visual-illustration" aria-hidden={decorative ? true : undefined}>
        <Illustration />
      </div>
    )
  }
  return null
}
