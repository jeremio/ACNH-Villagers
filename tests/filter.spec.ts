import { expect, test } from '@playwright/test'

test.describe('Filtering functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.mosaique img')).toHaveCount(391)
  })

  test('should filter villagers by gender and reset', async ({ page }) => {
    await page.locator('//div[text()="Mâle"]').click()
    await expect(page.locator('.mosaique img')).toHaveCount(204)
    await page.getByRole('button', { name: 'Réinitialiser' }).click()
    await expect(page.locator('.mosaique img')).toHaveCount(391)
  })

  test('should apply multiple filters', async ({ page }) => {
    await page.locator('//div[text()="Mâle"]').click()
    await page.locator('//div[text()="Musique"]').click()
    await expect(page.locator('.mosaique img')).toHaveCount(30)
  })
})
