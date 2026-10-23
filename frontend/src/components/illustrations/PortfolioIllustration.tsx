/** Les pages sont du HTML pré-généré ; seul le formulaire de contact atteint l'API et la base. */
export function PortfolioIllustration() {
  return (
    <svg
      className="ill"
      viewBox="0 0 520 320"
      role="img"
      aria-label="Schéma : une fenêtre de navigateur affiche des pages HTML pré-générées ; seul le formulaire de contact passe par l’API Spring Boot, qui écrit dans PostgreSQL."
    >
      <rect className="ill-paper" x="28" y="44" width="246" height="210" rx="8" />
      <line className="ill-line" x1="28" y1="72" x2="274" y2="72" />
      <text className="ill-small" x="44" y="63">
        julienhome.com
      </text>
      <rect className="ill-bar-strong" x="48" y="92" width="150" height="14" rx="3" />
      {[118, 132, 146].map((y, index) => (
        <rect key={y} className="ill-bar" x="48" y={y} width={190 - index * 24} height="6" rx="3" />
      ))}
      <rect className="ill-mark" x="48" y="166" width="118" height="10" rx="2" />
      <rect className="ill-empty" x="48" y="196" width="200" height="16" rx="3" />
      <rect className="ill-solid" x="48" y="222" width="64" height="18" rx="3" />
      <text className="ill-label" x="151" y="282" textAnchor="middle">
        HTML pré-généré
      </text>

      <path className="ill-arrow" d="M120 231 C 210 231, 250 160, 322 160 m-8 -6 l8 6 l-8 6" />
      <text className="ill-small" x="292" y="214">
        /api/contact
      </text>

      <rect className="ill-solid" x="332" y="128" width="160" height="64" rx="8" />
      <text className="ill-solid-text ill-solid-text-small" x="412" y="166" textAnchor="middle">
        API Spring Boot
      </text>
      <path className="ill-arrow" d="M412 200 v24 m-6 -8 l6 8 l6 -8" />
      <path className="ill-paper" d="M372 236 v36 a40 9 0 0 0 80 0 v-36" />
      <ellipse className="ill-paper" cx="412" cy="236" rx="40" ry="9" />
      <text className="ill-label" x="412" y="300" textAnchor="middle">
        PostgreSQL
      </text>
    </svg>
  )
}
