import { expect, test } from '@playwright/test'

test('Full purchase flow: login -> dashboard -> add to cart -> view cart', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByPlaceholder(/e-mail/i).fill('test@example.com')
  await page.getByPlaceholder(/senha/i).fill('123456')
  await page.getByRole('button', { name: /entrar/i }).click()

  await expect(page).toHaveURL(/\/dashboard/)

  await page
    .getByRole('button', { name: /adicionar no carrinho/i })
    .first()
    .click()

  await page.goto('/cart')
  await expect(page).toHaveURL(/\/cart/)

  await expect(page.getByText(/carrinho de compras/i)).toBeVisible()
  await expect(page.getByText(/total/i)).toContainText('R$')

  await page.getByRole('button', { name: '+' }).click()
  const quantity = page.locator('[data-testid="quantity"]')
  await expect(quantity).toHaveText('2')
})
