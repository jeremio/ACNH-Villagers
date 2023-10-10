import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))    },
  },
  plugins: [
    vue(),
    visualizer(),
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
      include: [path.resolve(__dirname, './src/locales/**')],
    }),
  ],
  define: { 'process.env': {} },

})
