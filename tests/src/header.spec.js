import { expect, test } from '@playwright/test';
import { handleConsentPopup, waitFor } from './utils';

test.describe('Smoke test for header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-product');
    await page.waitForLoadState('load');
    await waitFor(async () => await handleConsentPopup(page));
  });

  test('header renders', async ({ page }) => {
    await expect(
      await page.getByTestId('header__control').count()
    ).toBeTruthy();
    await expect(await page.getByTestId('header__search').count()).toBeTruthy();
    await expect(
      await page.getByTestId('header__f5sites').count()
    ).toBeTruthy();
  });

  test('header control works', async ({ page }) => {
    const sidebarButtonClose = page.getByTestId(
      'header__control--sidebar--close'
    );
    const sidebarButtonOpen = page.getByTestId(
      'header__control--sidebar--open'
    );
    const sidebar = page.getByTestId('sidebar');

    // Close the sidebar
    await expect(sidebarButtonClose).toBeVisible();
    await expect(sidebarButtonOpen).toBeHidden();
    await expect(sidebar).toBeVisible();
    await sidebarButtonClose.click();
    await expect(sidebarButtonClose).toBeHidden();
    await expect(sidebarButtonOpen).toBeVisible();

    // Open the sidebar
    await expect(sidebarButtonClose).toBeHidden();
    await expect(sidebarButtonOpen).toBeVisible();
    await expect(sidebar).toBeHidden();
    await sidebarButtonOpen.click();
    await expect(sidebarButtonClose).toBeVisible();
    await expect(sidebarButtonOpen).toBeHidden();
  });

  test('F5 Sites button works', async ({ page }) => {
    const f5SitesButton = page.getByTestId('header__f5sites_button');
    await expect(async () => {
      await f5SitesButton.click();
      const f5SitesContent = page.getByTestId('header__f5sites_content');
      await expect(f5SitesContent).toBeVisible();
    }).toPass();
  });
});
