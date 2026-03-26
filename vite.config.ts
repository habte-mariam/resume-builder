import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ይህን ጨምር

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ይህን እዚህ ውስጥ ጨምር
  ],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    }
  }
})