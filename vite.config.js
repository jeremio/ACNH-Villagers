import { dirname, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// import { VitePWA } from 'vite-plugin-pwa'
// import { visualizer } from 'rollup-plugin-visualizer'

import Inspect from 'vite-plugin-inspect'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    Inspect(),
    VueDevTools(),
    // visualizer(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: true,
    //   },
    // }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
