import { expect, test } from '@playwright/test'

test.describe('Filtering functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    // Attendre que la mosaïque soit complètement chargée avant de continuer.
    await expect(page.locator('.mosaique .villager-card')).toHaveCount(391)
  })

  test('should filter villagers by gender and reset', async ({ page }) => {
    await page.getByText(/^(Mâle|Male)$/).click()
    await expect(page.locator('.mosaique .villager-card')).toHaveCount(204)

    await page.getByRole('button', { name: /^(Réinitialiser|Reset)$/ }).click()
    await expect(page.locator('.mosaique .villager-card')).toHaveCount(391)
  })

  test('should apply multiple filters', async ({ page }) => {
    await page.getByText(/^(Mâle|Male)$/).click()
    await page.getByText(/^(Musique|Music)$/).click()
    await expect(page.locator('.mosaique .villager-card')).toHaveCount(30)
  })
})
