import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    // Add CORS headers during development
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: ['pdf-lib']
  }
})
