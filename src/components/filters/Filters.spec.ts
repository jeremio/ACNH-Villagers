import { fireEvent, render } from '@testing-library/vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { useGlobalStore } from '@/store/global'
import Filters from './Filters.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  messages: {
    fr: {
      reset: 'Réinitialiser',
      all: 'Tous',
      filters: {
        genders: 'Genres',
        hobbies: 'Hobbies',
        personalities: 'Personnalités',
        species: 'Espèces',
      },
    },
  },
})

describe('filters.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('calls resetFilters action when reset button is clicked', async () => {
    const store = useGlobalStore()
    const spy = vi.spyOn(store, 'resetFilters')

    const { getByText } = render(Filters, {
      props: {
        characters: [],
      },
      global: {
        plugins: [i18n],
      },
    })

    const resetButton = getByText('Réinitialiser')
    await fireEvent.click(resetButton)

    expect(spy).toHaveBeenCalled()
  })
})
