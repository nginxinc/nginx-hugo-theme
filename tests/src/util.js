import { expect } from '@playwright/test';

export async function runSmokeTest(page) {
  /* Ensure each page follows the following dom structure */
  await expect(await page.locator('data-testid=content').count()).toBeTruthy();
  await expect(await page.locator('data-testid=header').count()).toBeTruthy();
  await expect(await page.locator('data-testid=sidebar').count()).toBeTruthy();
  await expect(await page.locator('data-testid=footer').count()).toBeTruthy();
  await expect(
    await page.locator('data-testid=not-found-container').count()
  ).toBe(0);
}
