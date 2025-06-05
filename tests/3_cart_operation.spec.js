const { test, expect } = require('@playwright/test');

test.describe('Check cart function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Add product to cart after login', async ({ page }) => {
    page.on('dialog', async dialog => {
      if (dialog.message() === 'Đăng nhập thành công!') {
        await dialog.accept();
      } else if (dialog.message() === 'Đã thêm vào giỏ hàng!') {
        expect(dialog.message()).toBe('Đã thêm vào giỏ hàng!');
        await dialog.accept();
      }
    });

    await page.locator('#loginLink').click();
    await page.fill('#loginEmail', 'test@gmail.com');
    await page.fill('#loginPassword', '123456');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await page.getByText('Thêm vào giỏ').first().click();
    await expect(page.getByText('Giỏ hàng (1)')).toBeVisible();
    await page.locator('#cartLink').click();
    await expect(page.locator('#cartSection')).toBeVisible();
    await expect(page.locator('#cartItems').getByText('Ghế sofa - 2,000,000 VND')).toBeVisible();
  });

  test('Remove product from cart', async ({ page }) => {
    page.on('dialog', async dialog => {
      if (dialog.message() === 'Đăng nhập thành công!') {
        await dialog.accept();
      } else if (dialog.message() === 'Đã thêm vào giỏ hàng!') {
        await dialog.accept();
      }
    });

    await page.locator('#loginLink').click();
    await page.fill('#loginEmail', 'test@gmail.com');
    await page.fill('#loginPassword', '123456');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await page.getByText('Thêm vào giỏ').first().click();
    await page.locator('#cartLink').click();
    await page.getByText('Xóa').click();
    await expect(page.getByText('Giỏ hàng (0)')).toBeVisible();
    await expect(page.getByText('Tổng tiền: 0 VND')).toBeVisible();
  });
});