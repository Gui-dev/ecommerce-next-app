import { test, expect } from '@playwright/test'

test('Completed Cart Flow: login -> dashboard -> cart', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await page.getByPlaceholder(/e-mail/i).fill('test@example.com')
  await page.getByPlaceholder(/senha/i).fill('123456')
  await page.getByRole('button', { name: /entrar/i }).click()

  await expect(page).toHaveURL(/\/dashboard/)

  await page
    .getByRole('button', { name: /adicionar no carrinho/i })
    .first()
    .click()

  await page.goto('http://localhost:3000/cart')

  await expect(page.getByText(/carrinho de compras/i)).toBeVisible()
  await expect(page.getByText(/total/i)).toContainText('R$')
})
