import { test, expect } from '@playwright/test'

test('Checkout flow', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await page.getByPlaceholder(/e-mail/i).fill('test@example.com')
  await page.getByPlaceholder(/senha/i).fill('123456')
  await page.getByRole('button', { name: /entrar/i }).click()

  await expect(page).toHaveURL(/\/dashboard/)

  await page
    .getByRole('button', { name: /adicionar no carrinho/i })
    .first()
    .click()

  await page.getByRole('link', { name: /ir para o carrinho/i }).click()
  await page.getByRole('button', { name: /finalizar compra/i }).click()

  await page.getByPlaceholder(/nome igual do cartão/i).fill('Bruce Wayne')
  await page.getByPlaceholder(/número do cartão/i).fill('1234123412341234')

  await page.getByRole('button', { name: /finalizar compra/i }).click()

  await expect(page).toHaveURL('/success')
  await expect(page.getByText(/compra aprovada!/i)).toBeVisible()
})
