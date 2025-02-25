import { expect, test } from '@playwright/test';

test.describe('Testing old theme', () => {
  test('should ensure the old theme does not visually regress', async ({
    page,
  }) => {
    const currentPlus = 'nginx/installing-nginx-open-source/';
    await page.goto(`/${currentPlus}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      // switch to old theme
      useNewTheme(false);
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(() => window.scrollY === 0);
    await expect(page).toHaveScreenshot('example-site-screenshot.png', {
      fullPage: true,
    });
  });
});
