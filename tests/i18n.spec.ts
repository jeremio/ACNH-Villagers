import { expect, test } from '@playwright/test'

test.describe('Internationalization', () => {
  test('should switch language and translate content', async ({ page }) => {
    await page.goto('/')

    // Check initial language (French)
    await expect(page.getByRole('button', { name: 'Réinitialiser' })).toBeVisible()

    // Switch to English
    await page.locator('//div[text()="FR"]').click()
    await page.locator('//div[text()="EN"]').click()

    // Check for translated content
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible()
    await expect(page.locator('//div[text()="Genders"]')).toBeVisible()
  })
})
