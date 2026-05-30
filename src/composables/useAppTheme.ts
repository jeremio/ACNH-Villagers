import type { GlobalTheme } from 'naive-ui'
import { darkTheme, dateEnUS, dateFrFR, enUS, frFR } from 'naive-ui'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * Gere le theme (clair/sombre) et la locale de naive-ui consommes par
 * NConfigProvider. Le theme sombre est actif par defaut.
 */
export function useAppTheme() {
  const { locale } = useI18n()

  const theme = ref<GlobalTheme | null>(darkTheme)

  function handleThemeChange(isDark: boolean) {
    theme.value = isDark ? darkTheme : null
  }

  const currentLocale = computed(() => (locale.value === 'fr' ? frFR : enUS))
  const currentDateLocale = computed(() =>
    locale.value === 'fr' ? dateFrFR : dateEnUS,
  )

  return {
    theme,
    currentLocale,
    currentDateLocale,
    handleThemeChange,
  }
}
