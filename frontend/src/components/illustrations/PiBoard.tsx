/** La carte du Raspberry Pi 5 qui sert le site, dessinée à la main. Proportions de la vraie carte (85 × 56 mm). */
export function PiBoard({ live }: { live: boolean }) {
  const pins = Array.from({ length: 20 }, (_, index) => 52 + index * 10)
  return (
    <svg
      className="ill pi-board"
      viewBox="0 0 420 290"
      role="img"
      aria-label="Dessin d’un Raspberry Pi 5 : processeur, mémoire, connecteurs USB et Ethernet, et une diode d’activité."
    >
      <rect className="ill-board" x="20" y="30" width="340" height="224" rx="14" />
      {[
        [34, 44],
        [34, 240],
        [265, 44],
        [265, 240],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} className="ill-hole" cx={cx} cy={cy} r="6" />
      ))}

      {pins.map((x) => (
        <g key={x}>
          <rect className="ill-pin" x={x} y="38" width="6" height="6" />
          <rect className="ill-pin" x={x} y="48" width="6" height="6" />
        </g>
      ))}

      <rect className="ill-chip" x="100" y="104" width="76" height="76" rx="4" />
      <text className="ill-chip-text" x="138" y="146" textAnchor="middle">
        BCM2712
      </text>
      <rect className="ill-chip" x="196" y="112" width="44" height="60" rx="3" />
      <text className="ill-chip-text ill-chip-text-small" x="218" y="146" textAnchor="middle">
        RAM
      </text>

      <rect className="ill-port" x="322" y="72" width="64" height="44" rx="3" />
      <rect className="ill-port" x="322" y="128" width="64" height="44" rx="3" />
      <rect className="ill-port" x="322" y="184" width="64" height="52" rx="3" />
      <line className="ill-line" x1="332" y1="94" x2="376" y2="94" />
      <line className="ill-line" x1="332" y1="150" x2="376" y2="150" />
      <rect className="ill-socket" x="342" y="200" width="24" height="20" rx="2" />

      <rect className="ill-port" x="54" y="244" width="30" height="16" rx="5" />
      <rect className="ill-port" x="110" y="246" width="22" height="12" rx="2" />
      <rect className="ill-port" x="150" y="246" width="22" height="12" rx="2" />

      <circle className={live ? 'ill-led ill-led-live' : 'ill-led'} cx="300" cy="226" r="5" />
      <text className="ill-small" x="290" y="230" textAnchor="end">
        activité
      </text>
    </svg>
  )
}
