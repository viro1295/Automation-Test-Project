const { test, expect } = require('@playwright/test');

test.describe('Check negative cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Not allow adding products to cart without logging in', async ({ page }) => {
    await page.getByText('Thêm vào giỏ').first().click();
    await expect(page.locator('#authSection')).toBeVisible();
    await expect(page.getByText('Giỏ hàng (0)')).toBeVisible();
  });

  test('No more than 5 items allowed in cart', async ({ page }) => {
    page.on('dialog', async dialog => {
      if (dialog.message() === 'Đăng nhập thành công!') {
        await dialog.accept();
      } else if (dialog.message() === 'Đã thêm vào giỏ hàng!') {
        await dialog.accept();
      } else if (dialog.message() === 'Giỏ hàng đã đầy (tối đa 5 sản phẩm)!') {
        expect(dialog.message()).toBe('Giỏ hàng đã đầy (tối đa 5 sản phẩm)!');
        await dialog.accept();
      }
    });

    await page.locator('#loginLink').click();
    await page.fill('#loginEmail', 'test@gmail.com');
    await page.fill('#loginPassword', '123456');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    
    const addButton = page.getByText('Thêm vào giỏ').first();
    for (let i = 0; i < 5; i++) {
      await addButton.click();
    }
    await expect(page.getByText('Giỏ hàng (5)')).toBeVisible();
    await addButton.click();
    await expect(page.getByText('Giỏ hàng (5)')).toBeVisible();
  });

  test('Not allow access to shopping cart without logging in', async ({ page }) => {
    await page.locator('#cartLink').click();
    await expect(page.locator('#authSection')).toBeVisible();
    await expect(page.locator('#cartSection')).not.toBeVisible();
  });
});