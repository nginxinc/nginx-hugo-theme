import { expect, test } from '@playwright/test';

// test.describe('Testing old theme', () => {
//   test('should ensure the old theme does not visually regress', async ({
//     page,
//   }) => {
//     const currentPlus = 'nginx/installing-nginx-open-source/';
//     await page.goto(`/${currentPlus}`);
//     await expect(
//       await page.locator('data-testid=base-layout').count()
//     ).toBeTruthy();

//     await page.waitForFunction(() => window.scrollY === 0);
//     await expect(page).toHaveScreenshot('example-site-screenshot.png', {
//       fullPage: true,
//     });
//   });
// });
