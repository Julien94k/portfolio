type Shot = { src: string; alt: string; width: number; height: number; eager?: boolean }

/** Une capture de site dans une fenêtre de navigateur, avec son adresse. */
export function BrowserFrame({ src, alt, width, height, url, eager }: Shot & { url: string }) {
  return (
    <div className="device-browser">
      <div className="device-browser-bar" aria-hidden="true">
        <span className="device-browser-url">{url}</span>
      </div>
      <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </div>
  )
}

/** Une capture d'appli mobile dans un téléphone : bord fin, coins arrondis, îlot en haut de l'écran. */
export function PhoneFrame({ src, alt, width, height, eager }: Shot) {
  return (
    <div className="device-phone">
      <div className="device-phone-screen">
        <span className="device-phone-island" aria-hidden="true" />
        <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </div>
    </div>
  )
}
