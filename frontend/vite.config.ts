import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const buildDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'Europe/Paris' }).format(new Date())

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
  server: {
    port: 3000,
    proxy: {
      '/api': process.env.VITE_PROXY_TARGET ?? 'http://localhost:8080',
    },
  },
})
