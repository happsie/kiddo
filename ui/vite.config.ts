import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  server: {
    host: true,
    proxy: {
      '/api/kiddo': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
      manifest: 'manifest.json'
  }
})
