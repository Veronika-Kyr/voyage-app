import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      open: true,
      https: true,
      port: 5500,
      host: 'localhost',
    },
    define: {
      'process.env': {},
    },
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      basicSsl()
    ],
  };
})
