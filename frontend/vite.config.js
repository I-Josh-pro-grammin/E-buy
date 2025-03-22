import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  resolve: {
      alias: {
          buffer: 'buffer', // Polyfill for the buffer module
        },
    },
  optimizeDeps: {
        include: ['buffer'], // Ensure buffer is included in the build
    },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    proxy: {
      '/api/': 'http://localhost:5000',
      '/uploads/': 'http://localhost:5000'
    }
  }
});
