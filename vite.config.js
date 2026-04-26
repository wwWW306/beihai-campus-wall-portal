import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    base: mode === 'production' ? '/beihai-campus-wall-portal/' : '/',
    server: {
      port: 5173,
      open: true
    }
  }
})
