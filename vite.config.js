import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Los tests importan desde "@taller". Normalmente es src/ejercicios.
// Con "npm run test:soluciones" apunta a src/soluciones.
const carpeta = process.env.SOLUCIONES ? 'soluciones' : 'ejercicios'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@taller': fileURLToPath(new URL(`./src/${carpeta}`, import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
    include: ['src/tests/**/*.test.jsx'],
    // Sin completar, algunos ejercicios dejan promesas rechazadas sin manejar
    dangerouslyIgnoreUnhandledErrors: true,
  },
})
