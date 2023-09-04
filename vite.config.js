import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3005,
  },
  resolve: {
    alias: {
      '@': path.resolve("./src"),
      components: path.resolve('./src/components'),
      pages: path.resolve('./src/pages'),
      utils: path.resolve('./src/utils'),
      store: path.resolve('./src/store'),
    },
  }
})
