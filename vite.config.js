import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   base: '/',
  plugins: [
    tailwindcss(),
    react(),
  ],
   build: {
    chunkSizeWarningLimit: 1000 // in KB (default is 500)
  }
})

