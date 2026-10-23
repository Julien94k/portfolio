/** Le radar balaie les sources ; les offres qui correspondent ressortent et partent en notification. */
export function JobRadarIllustration() {
  const cx = 190
  const cy = 165
  const offers: Array<[number, number, boolean]> = [
    [150, 96, false],
    [248, 120, true],
    [262, 160, true],
    [120, 190, false],
    [220, 232, false],
    [96, 140, false],
    [275, 92, true],
    [168, 250, false],
  ]
  return (
    <svg
      className="ill"
      viewBox="0 0 520 320"
      role="img"
      aria-label="Schéma : un radar balaie les offres de France Travail, Adzuna et Jooble ; trois offres ressortent et déclenchent une notification sur le téléphone."
    >
      {[45, 90, 130].map((r) => (
        <circle key={r} className="ill-ring" cx={cx} cy={cy} r={r} />
      ))}
      <line className="ill-ring" x1={cx - 130} y1={cy} x2={cx + 130} y2={cy} />
      <line className="ill-ring" x1={cx} y1={cy - 130} x2={cx} y2={cy + 130} />
      <path className="ill-sweep" d={`M${cx} ${cy} L${cx + 120} ${cy - 50} A130 130 0 0 1 ${cx + 128} ${cy + 22} Z`} />
      <line className="ill-accent-line" x1={cx} y1={cy} x2={cx + 120} y2={cy - 50} />
      {offers.map(([x, y, match]) => (
        <circle key={`${x}-${y}`} className={match ? 'ill-dot-match' : 'ill-dot'} cx={x} cy={y} r={match ? 6 : 4} />
      ))}
      <text className="ill-small" x="60" y="40">
        France Travail
      </text>
      <text className="ill-small" x="40" y="300">
        Adzuna
      </text>
      <text className="ill-small" x="250" y="306">
        Jooble
      </text>

      <path className="ill-arrow" d="M330 140 h34 m-8 -6 l8 6 l-8 6" />
      <rect className="ill-paper" x="376" y="78" width="118" height="150" rx="16" />
      <rect className="ill-mark" x="390" y="100" width="90" height="44" rx="6" />
      <text className="ill-title" x="398" y="120">
        ntfy
      </text>
      <rect className="ill-bar" x="398" y="128" width="64" height="6" rx="3" />
      <rect className="ill-bar" x="390" y="160" width="90" height="6" rx="3" />
      <rect className="ill-bar" x="390" y="174" width="70" height="6" rx="3" />
      <rect className="ill-bar" x="390" y="188" width="80" height="6" rx="3" />
    </svg>
  )
}
