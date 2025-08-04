import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// import { imagetools } from 'vite-imagetools';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(),
    react(),
    // imagetools({
    //   defaultDirectives: new URLSearchParams({
    //     format: 'webp',
    //     quality: '75',
    //     w: '300;600;1200',
    //   }),
    // }),
    visualizer({
      filename: 'bundle-stats.html',
      open: true, // Open the file automatically after build
      gzipSize: true, // Show gzip sizes
      brotliSize: true, // Show brotli sizes
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          notifications: ['react-hot-toast'],
          axios: ['axios'],
        },
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
  },
});