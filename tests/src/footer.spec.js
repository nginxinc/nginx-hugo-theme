import { expect, test } from '@playwright/test';

test.describe('Smoke test for footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should test footer renders', async ({ page }) => {
    await expect(
      await page.locator('data-testid=footer-f5-trademark').count()
    ).toBeTruthy();
    await expect(
      await page.locator('data-testid=footer-useful-links').count()
    ).toBeTruthy();
  });
});
