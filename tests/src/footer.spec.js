import { expect, test } from '@playwright/test';
import { handleConsentPopup, waitFor } from './utils';

test.describe('Smoke test for footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-product');
    await page.waitForLoadState('load');
    await waitFor(async () => await handleConsentPopup(page));
  });

  test('footer renders', async ({ page }) => {
    await expect(
      await page.getByTestId('footer-f5-trademark').count()
    ).toBeTruthy();
    await expect(
      await page.getByTestId('footer-useful-links').count()
    ).toBeTruthy();
  });
});
