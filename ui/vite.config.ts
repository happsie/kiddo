import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/modules/core')
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
      '/api/v1': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
      manifest: 'manifest.json'
  }
})
