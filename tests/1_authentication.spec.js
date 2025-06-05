const { test, expect } = require('@playwright/test');

test.describe('Check authentication function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Login successful with valid credentials', async ({ page }) => {
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Đăng nhập thành công!');
      await dialog.accept();
    });

    await page.locator('#loginLink').click();
    await page.fill('#loginEmail', 'test@gmail.com');
    await page.fill('#loginPassword', '123456');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    
    await expect(page.getByText('test@gmail.com')).toBeVisible();
    await expect(page.getByText('Đăng xuất')).toBeVisible();
    await expect(page.locator('#productsSection')).toBeVisible();
  });

  test('Logout successful', async ({ page }) => {
    let loginAlertHandled = false;
    let logoutAlertHandled = false;

    page.on('dialog', async dialog => {
      if (dialog.message() === 'Đăng nhập thành công!' && !loginAlertHandled) {
        await dialog.accept();
        loginAlertHandled = true;
      } else if (dialog.message() === 'Đã đăng xuất!' && !logoutAlertHandled) {
        expect(dialog.message()).toBe('Đã đăng xuất!');
        await dialog.accept();
        logoutAlertHandled = true;
      }
    });

    await page.locator('#loginLink').click();
    await page.fill('#loginEmail', 'test@gmail.com');
    await page.fill('#loginPassword', '123456');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Đăng xuất')).toBeVisible({ timeout: 10000 });
    await page.getByText('Đăng xuất').click();
    await expect(page.locator('#loginLink')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('test@gmail.com')).not.toBeVisible({ timeout: 10000 });
    await expect(page.locator('#productsSection')).toBeVisible({ timeout: 10000 });
  });

  test('Login failed with invalid credentials', async ({ page }) => {
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Sai email hoặc mật khẩu!');
      await dialog.accept();
    });

    await page.locator('#loginLink').click();
    await page.fill('#loginEmail', 'wrong@gmail.com');
    await page.fill('#loginPassword', 'wrongpass');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Đăng xuất')).not.toBeVisible();
  });
});