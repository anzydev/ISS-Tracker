import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/iss-now': {
        target: 'http://api.open-notify.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/iss-now/, '/iss-now.json')
      },
      '/api/astros': {
        target: 'http://api.open-notify.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/astros/, '/astros.json')
      },
      '/api/news': {
        target: 'https://gnews.io',
        changeOrigin: true,
        rewrite: (path) => {
          const url = new URL('http://localhost' + path);
          const q = url.searchParams.get('q');
          const category = url.searchParams.get('category') || 'general';
          const apiKey = '7f6f6f207c4e3f2cfcffb1388e659738';
          if (q) {
            return `/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=10&apikey=${apiKey}`;
          }
          return `/api/v4/top-headlines?category=${category}&lang=en&max=5&apikey=${apiKey}`;
        }
      }
    }
  }
})

