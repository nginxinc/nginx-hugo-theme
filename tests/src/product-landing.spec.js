import { test } from '@playwright/test';
import { runSmokeTestOnPage } from './util';

test.describe('Smoke test for landing page', () => {
  test('product landing page renders', async ({ page }) => {
    const products = ['test-product', 'nginx'];

    for (const product of products) {
      await page.goto(`/${product}/`);
      await page.waitForLoadState('load');
      await runSmokeTestOnPage(page);
    }
  });
});
