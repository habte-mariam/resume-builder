import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Docker ውስጥ ለውጦችን ለማየት ይረዳል
    },
    host: true, // ለ Docker አስፈላጊ ነው
    port: 5173,
  },
})