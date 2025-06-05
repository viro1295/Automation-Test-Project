const { test, expect } = require('@playwright/test');

test.describe('Check product information', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Show product list on home page', async ({ page }) => {
    await expect(page.locator('#productsSection')).toBeVisible();
    await expect(page.locator('#productList').getByText('Ghế sofa')).toBeVisible();
    await expect(page.locator('#productList').getByText('Bàn ăn')).toBeVisible();
    await expect(page.locator('#productList').getByText('Kệ sách')).toBeVisible();
  });

  test('View product details', async ({ page }) => {
    await page.getByText('Xem chi tiết').first().click();
    await expect(page.locator('#productDetail')).toBeVisible();
    await expect(page.locator('#productDetail').getByText('Ghế sofa')).toBeVisible();
    await expect(page.locator('#productDetail').getByText('2,000,000 VND')).toBeVisible();
    await expect(page.locator('#productDetail').getByText('Sofa thoải mái cho phòng khách')).toBeVisible();
    await page.getByText('Quay lại').click();
    await expect(page.locator('#productsSection')).toBeVisible();
  });
});