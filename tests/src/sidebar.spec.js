import { expect, test } from '@playwright/test';
import { runSmokeTestOnPage } from './util';

async function openPage(page, sidebarPage) {
  // Find all toggles
  let currentElement = sidebarPage;
  const toggles = [];

  while (currentElement) {
    const parentElement = await currentElement.locator('..');
    const isSuperParent = await parentElement.evaluate(
      (el) => el.getAttribute('data-testid') === 'sidebar__content'
    );
    if (isSuperParent) break;

    const parentElementClass = await parentElement.getAttribute('class');
    if (parentElementClass === 'sidebar__section') {
      const toggle = parentElement.locator(
        'data-testid=sidebar__section__toggle'
      );
      if ((await toggle.count()) > 0) {
        toggles.unshift(toggle.first());
      }
    }

    currentElement = parentElement;
  }

  // Click all toggles found top-down
  for (const toggle of toggles) {
    const isCollapsed =
      (await toggle.first().getAttribute('aria-expanded')) === 'false';
    if (isCollapsed) {
      await toggle.first().click();
    }
  }

  // Click on the page
  await sidebarPage.click();
  const content = await page.locator('data-testid=content');
  await content.waitFor();
}

test.describe('Smoke test for sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-product/');
  });

  test('should test sidebar renders', async ({ page }) => {
    await expect(
      await page.locator('data-testid=sidebar__header').count()
    ).toBeTruthy();
    await expect(
      await page.locator('data-testid=sidebar__content').count()
    ).toBeTruthy();
  });

  test('should test each section page on sidebar renders', async ({ page }) => {
    /* Click on each link */
    const sidebarPages = await page.locator('data-testid=sidebar__page').all();
    for (const sidebarPage of sidebarPages) {
      await openPage(page, sidebarPage);
      await runSmokeTestOnPage(page);
    }
  });
});
