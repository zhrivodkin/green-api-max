import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import path from 'node:path'

const src = path.resolve(__dirname, 'src')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': src,
      '@api': path.resolve(src, 'api'),
      '@layouts': path.resolve(src, 'layouts'),
      '@pages': path.resolve(src, 'pages'),
      '@shared': path.resolve(src, 'shared'),
      '@utils': path.resolve(src, 'utils'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
