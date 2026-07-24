import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://ai-powered-analyzer.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
