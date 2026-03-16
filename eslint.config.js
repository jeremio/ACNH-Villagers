// eslint.config.mjs
import antfu from '@antfu/eslint-config'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'

export default antfu(
  {
    pnpm: true,
    vue: true,
    typescript: true,
  },
  {
    files: ['**/*.vue'],
    plugins: {
      '@intlify/vue-i18n': vueI18n,
    },
    rules: {
      '@intlify/vue-i18n/no-raw-text': 'off',
      '@intlify/vue-i18n/no-dynamic-keys': 'warn',
      '@intlify/vue-i18n/no-unused-keys': [
        'warn',
        {
          extensions: ['.js', '.vue', '.ts', '.json', '.json5', '.yaml', '.yml'],
        },
      ],
      'vue/block-order': ['error', {
        order: [['template', 'script'], 'style'],
      }],
    },
    settings: {
      'vue-i18n': {
        localeDir: './src/locales/*.{json,json5,yaml,yml}',
        messageSyntaxVersion: '^11.0.0',
      },
    },
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
)
