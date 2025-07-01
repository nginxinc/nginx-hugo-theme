import { test } from '@playwright/test';
import { runSmokeTestOnPage } from './util';

test.describe('Smoke test for landing page', () => {
  test('should test each product landing page renders', async ({ page }) => {
    const products = ['test-products', 'nginx'];

    for (const product of products) {
      await page.goto(`/${product}/`);
      await runSmokeTestOnPage(page);
    }
  });
});
