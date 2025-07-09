import { fireEvent, render } from '@testing-library/vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import { useGlobalStore } from '@/store/global'
import GenericFilter from './GenericFilter.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      all: 'All',
      filters: {
        genders: 'Genders',
      },
      genders: {
        Male: 'Male',
        Female: 'Female',
      },
    },
  },
})

describe('genericFilter.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly and updates store on change', async () => {
    const store = useGlobalStore()
    const { getByLabelText } = render(GenericFilter, {
      props: {
        type: 'gender',
        data: ['Male', 'Female'],
      },
      global: {
        plugins: [i18n],
      },
    })

    // Check initial state
    expect(store.selectedGender).toBe('all')

    // Find the radio button for "Male" and click it
    const maleRadio = getByLabelText('Male')
    await fireEvent.click(maleRadio)

    // Check if the store was updated
    expect(store.selectedGender).toBe('Male')
  })
})
