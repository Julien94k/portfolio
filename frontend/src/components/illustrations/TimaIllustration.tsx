/** Un e-mail client devient un brouillon de mission. L'IA remplit les faits ; l'avis reste au recruteur. */
export function TimaIllustration() {
  const fields = ['Intitulé', 'Durée', 'Lieu', 'Compétences']
  return (
    <svg
      className="ill"
      viewBox="0 0 520 320"
      role="img"
      aria-label="Schéma : un e-mail client et sa pièce jointe passent par un LLM, qui produit un brouillon de mission. Les champs factuels sont pré-remplis, le champ Avis reste vide pour le recruteur."
    >
      <rect className="ill-paper" x="28" y="104" width="128" height="88" rx="6" />
      <polyline className="ill-line" points="28,108 92,154 156,108" />
      <path className="ill-accent-line" d="M138 92 v34 a8 8 0 0 1 -16 0 v-28 a5 5 0 0 1 10 0 v24" />
      <text className="ill-label" x="92" y="222" textAnchor="middle">
        E-mail du client
      </text>

      <path className="ill-arrow" d="M168 148 h40 m-8 -6 l8 6 l-8 6" />

      <rect className="ill-solid" x="220" y="112" width="96" height="72" rx="8" />
      <text className="ill-solid-text" x="268" y="155" textAnchor="middle">
        LLM
      </text>
      <text className="ill-label" x="268" y="210" textAnchor="middle">
        sortie JSON
      </text>

      <path className="ill-arrow" d="M328 148 h32 m-8 -6 l8 6 l-8 6" />

      <rect className="ill-paper" x="372" y="40" width="124" height="240" rx="6" />
      <text className="ill-title" x="384" y="66">
        Brouillon
      </text>
      {fields.map((field, index) => (
        <g key={field}>
          <text className="ill-small" x="384" y={92 + index * 40}>
            {field}
          </text>
          <rect className="ill-mark" x="384" y={98 + index * 40} width={index === 3 ? 92 : 70 + index * 6} height="12" rx="2" />
        </g>
      ))}
      <text className="ill-small" x="384" y="252">
        Avis
      </text>
      <rect className="ill-empty" x="384" y="258" width="100" height="12" rx="2" />
    </svg>
  )
}
