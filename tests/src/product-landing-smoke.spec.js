import { test } from '@playwright/test';
import { runSmokeTest } from './util';

test.describe('Smoke test', () => {
  test('should test each product landing page renders correctly', async ({
    page,
  }) => {
    const products = ['test-products', 'nginx'];

    for (const product of products) {
      await page.goto(`/${product}/`);
      await runSmokeTest(page);
    }
  });
});
