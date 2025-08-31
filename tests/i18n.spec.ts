import * as console from 'node:console'
import { expect, test } from '@playwright/test'

test.describe('Internationalization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Attendre que la mosaïque soit complètement chargée avant de continuer.
    await expect(page.locator('.mosaique .villager-card')).toHaveCount(391)
  })

  test('should switch language and translate content, regardless of starting language', async ({ page }) => {
    // Utiliser une expression régulière pour trouver le sélecteur de langue, quelle que soit la langue actuelle.
    const langSelector = page.getByText(/🇫🇷 Français|🇺🇸 English/)
    const currentLangText = await langSelector.textContent()

    console.log(currentLangText)
    if (currentLangText === '🇫🇷 Français') {
      // L'application est en français, on passe à l'anglais.
      await langSelector.click()
      await page.getByText('🇺🇸 English').click()

      // Vérifier que le contenu est bien en anglais.
      await expect(page.getByText('Reset')).toBeVisible()
      await expect(page.getByText('Genders')).toBeVisible()
    }
    else {
      // L'application est en anglais, on passe au français.
      await langSelector.click()
      await page.getByText('🇫🇷 Français').click()

      // Vérifier que le contenu est bien en français.
      await expect(page.getByText('Réinitialiser')).toBeVisible()
      await expect(page.getByText('Genres')).toBeVisible()
    }
  })
})
