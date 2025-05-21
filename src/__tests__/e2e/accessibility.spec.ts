import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('Login page should have no accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  expect(accessibilityScanResults.violations).toEqual([])
})

test('Dashboard page should have no accessibility violations after login', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByPlaceholder(/e-mail/i).fill('test@example.com')
  await page.getByPlaceholder(/senha/i).fill('123456')
  await page.getByRole('button', { name: /entrar/i }).click()

  await expect(page).toHaveURL(/\/dashboard/)

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  expect(accessibilityScanResults.violations).toEqual([])
})

test('Cart page should have no accessibility violation', async ({ page }) => {
  await page.goto('/cart')

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  expect(accessibilityScanResults.violations).toEqual([])
})
