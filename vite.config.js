/// <reference types="vitest" />

import { dirname, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import VueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vitest/config'

export default defineConfig(({
  mode,
  // command
}) => {
  const isProduction = mode === 'production'
  const isDevelopment = mode === 'development'
  const isAnalyze = mode === 'analyze'
  // const isBuild = command === 'build'

  const plugins = [
    vue({
      // Optimisations Vue en production
      template: {
        compilerOptions: {
          // Supprimer les commentaires en production
          comments: !isProduction,
        },
      },
    }),

    // DevTools uniquement en développement
    ...(isDevelopment ? [VueDevTools()] : []),

    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
      // Optimisations i18n
      compositionOnly: true,
      runtimeOnly: isProduction,
      fullInstall: false,
      forceStringify: isProduction,
    }),
  ]

  // Plugin d'analyse de bundle (sécurisé pour CI/CD)
  if (isAnalyze) {
    plugins.push(visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // Visualisation plus détaillée
    }))
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    // Configuration du serveur de développement
    server: {
      host: true,

      // Configuration CORS pour le développement
      cors: {
        origin: true,
        credentials: true,
      },

    },

    // Configuration du serveur de preview
    preview: {
      host: true,
    },

    // Configuration des tests
    test: {
      environment: 'happy-dom',
      globals: true,
      exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**'],

      // Coverage configuration
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/test/',
          '**/*.d.ts',
          '**/*.test.{ts,js}',
          '**/*.spec.{ts,js}',
        ],
      },
    },

    // Optimisations des dépendances
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'vue-i18n',
      ],
      exclude: [],
    },

    // Variables d'environnement
    define: {
      __VUE_OPTIONS_API__: false, // Désactiver Options API si non utilisé
      __VUE_PROD_DEVTOOLS__: false, // Désactiver devtools en production
      __INTLIFY_PROD_DEVTOOLS__: false, // Désactiver i18n devtools en production

      // Variables personnalisées
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },

    // Configuration ESBuild pour des transformations supplémentaires
    esbuild: {
      // Supprimer les console.log en production via esbuild
      drop: isProduction ? ['console', 'debugger'] : [],

      // Support des décorateurs si nécessaire
      // experimentalDecorators: true,

      // Optimisations de caractères
      charset: 'utf8',
    },
  }
})
