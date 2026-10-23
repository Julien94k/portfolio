// Rend chaque page en HTML statique après le build : le contenu est lisible sans JavaScript,
// immédiatement affiché, et indexable. React s'y rattache ensuite dans le navigateur.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const serverDir = join(root, 'dist-server')
const siteUrl = 'https://julienhome.com'

const { render, projects } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href)
const template = await readFile(join(dist, 'index.html'), 'utf8')

const escape = (text) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

// La police du premier écran est préchargée : sans ça, le texte s'affiche d'abord dans la police de
// secours puis se décale quand elle arrive.
const assets = await readdir(join(dist, 'assets'))
const preloads = [/^onest-latin-wght-normal-.*\.woff2$/]
  .map((pattern) => assets.find((file) => pattern.test(file)))
  .filter(Boolean)
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
if (preloads.length !== 1) throw new Error('Police à précharger introuvable dans dist/assets')

const routes = ['/', '/parcours', ...projects.map((project) => `/projets/${project.slug}`), '/admin', '/404']

function head(path, meta) {
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    ...preloads,
  ]
  if (meta.noindex) {
    tags.push('<meta name="robots" content="noindex" />')
  } else {
    const url = `${siteUrl}${path}`
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      '<meta property="og:type" content="website" />',
      '<meta property="og:locale" content="fr_FR" />',
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:title" content="${escape(meta.title)}" />`,
      `<meta property="og:description" content="${escape(meta.description)}" />`,
    )
  }
  return tags.join('\n    ')
}

function outputFile(path) {
  if (path === '/') return join(dist, 'index.html')
  if (path === '/404') return join(dist, '404.html')
  return join(dist, path, 'index.html')
}

const indexable = []
for (const path of routes) {
  const { html, meta } = render(path)
  const page = template.replace('<!--app-head-->', head(path, meta)).replace('<!--app-html-->', html)
  const file = outputFile(path)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page)
  if (!meta.noindex) indexable.push(path)
  console.log(`pré-rendu ${path.padEnd(22)} ${file.slice(root.length + 1)}`)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap)
await rm(serverDir, { recursive: true, force: true })
