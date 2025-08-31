// eslint.config.mjs
import antfu from '@antfu/eslint-config'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'

// Créez un tableau unique pour toutes les configurations liées à vue-i18n
const i18nConfigs = [
  ...vueI18n.configs.recommended, // La configuration recommandée du plugin
  {
    // Votre configuration personnalisée pour les règles et les paramètres
    files: ['**/*.{js,vue,ts,json,json5,yaml,yml}'], // Assurez-vous d'inclure toutes les extensions pertinentes
    rules: {
      '@intlify/vue-i18n/no-dynamic-keys': 'error',
      '@intlify/vue-i18n/no-unused-keys': [
        'error',
        {
          extensions: ['.js', '.vue', '.ts', '.json', '.json5', '.yaml', '.yml'],
        },
      ],
      // Ajoutez d'autres règles si nécessaire
    },
    settings: {
      'vue-i18n': {
        // C'est crucial : adaptez ce chemin à la structure de votre projet
        localeDir: './src/locales/*.{json,json5,yaml,yml}',
        // Spécifiez la version de vue-i18n que vous utilisez
        // Vue-i18n 11.x correspond à la syntaxe messageSyntaxVersion: '^9.0.0' ou plus.
        messageSyntaxVersion: '^11.0.0', // Ou '^11.0.0' si vous voulez être plus précis sur la version majeure
      },
    },
  },
]

export default antfu(
  {
    // Vos configurations Antfu existantes
    vue: true,
    typescript: true,
    // ...
  },
  // Propager le tableau de configurations i18n ici
  ...i18nConfigs,
  {
    // C'est ici que vous ajoutez les règles à désactiver
    // Cet objet s'appliquera globalement (à moins que vous ne définissiez `files` pour le limiter)
    rules: {
      '@intlify/vue-i18n/no-raw-text': 'off',
      'vue/block-order': ['error', {
        order: [['template', 'script'], 'style'],
      }],
      'no-console': 'off',
    },
  },
)
