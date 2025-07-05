import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
       port: 3000, // Or 5173, depending on your setup
       mimeTypes: {
         'text/javascript': ['js', 'jsx'],
       },
     },
     build: {
       outDir: 'dist',
     },
})

