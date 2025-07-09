/// <reference types="vitest" />

import { dirname, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import VueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => {
  const plugins = [
    vue(),
    VueDevTools(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
    }),
  ]

  if (mode === 'analyze') {
    plugins.push(visualizer({
      open: true,
      filename: 'stats.html',
    }))
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      environment: 'happy-dom',
      globals: true,
      exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**'],
    },
  }
})
