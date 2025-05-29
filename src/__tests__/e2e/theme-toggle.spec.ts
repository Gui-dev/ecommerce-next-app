import { expect, test } from '@playwright/test'

test('Toggle theme light/dark', async ({ page }) => {
  await page.goto('/')

  await page.getByPlaceholder(/e-mail/i).fill('test@example.com')
  await page.getByPlaceholder(/senha/i).fill('123456')
  await page.getByRole('button', { name: /entrar/i }).click()

  await expect(page).toHaveURL(/\/dashboard/)

  const toggle = page.getByLabel('Alternar tema')

  const html = page.locator('html')
  const before = await html.getAttribute('class')

  await toggle.click()

  const after = await html.getAttribute('class')
  expect(after).not.toBe(before)
})
