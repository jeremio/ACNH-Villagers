import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  build: {
    analyze: {},
    transpile: ['vue-i18n'],
  },
  vite: {
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json'),
        ],
      }),
    ],
  },

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@bg-dev/nuxt-naiveui',
  ],

  // i18n: {
  //   locale: 'fr',
  //   messages,
  //   globalInjection: true,
  // },

  // experimental: {
  //   // when using generate, payload js assets included in sw precache manifest
  //   // but missing on offline, disabling extraction it until fixed
  //   payloadExtraction: false,
  //   inlineSSRStyles: false,
  //   renderJsonPayloads: true,
  //   typedPages: true,
  // },

  // colorMode: {
  //   classSuffix: '',
  // },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    // prerender: {
    //   crawlLinks: false,
    //   routes: ['/'],
    //   ignore: ['/hi'],
    // },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        {
          children: 'JavaScript is required',
        },
      ],
    },
  },

  devtools: {
    enabled: true,
  },
})
