import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const envs = [
    'GLOBAL_ENV',
    'BASE_API_URL',
    'FRONTEND_URL',
    'SENTRY_DSN',
    'TASK_MANAGER_API_URL',
    'CONTACT_MANAGER_API_URL',
    'BOAT_MANAGER_API_URL',
  ].filter(v => !!env[v]);

  return {
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 8082,
      host: '127.0.0.1'
    },
    define: {
      'my_envs': envs.reduce((acc, v) => {
        return { ...acc, [v]: env[v] }
      }, {}),
    },
    build: {
      sourcemap: true,
    }
  }
})
