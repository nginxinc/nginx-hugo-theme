import { expect, test } from '@playwright/test';
import { handleConsentPopup, runSmokeTestOnPage, waitFor } from './utils';

test.describe('Smoke test for sidebar', () => {
  // Slow test
  test.setTimeout(100_000);

  test.beforeEach(async ({ page }) => {
    await page.goto('/test-product/');
    await page.waitForLoadState('load');
    await waitFor(async () => await handleConsentPopup(page));
  });

  test('sidebar renders', async ({ page }) => {
    await expect(page.getByTestId('sidebar__header')).toBeVisible();
    await expect(page.getByTestId('product-selector')).toBeVisible();
    await expect(page.getByTestId('sidebar__content')).toBeVisible();
  });

  test('product selector renders when clicked', async ({ page }) => {
    // Click on product selector
    const productSelector = page.getByTestId('product-selector');
    await productSelector.click();

    // Ensure the product selector has items visible
    const productSelectorContent = productSelector.getByTestId(
      'product-selector__content'
    );
    const products = await productSelectorContent
      .getByTestId('product-selector__product')
      .all();

    expect(products.length).toBeGreaterThan(0);
    for (const product of products) {
      await expect(product).toBeVisible();
    }
  });

  test('clicking on a link', async ({ page }) => {
    // Greedy logic assumes there is at least one link without having to open a dropdown.

    // Fetch only visible links (aka ones not nested in a dropdown)
    const sidebarContent = page.getByTestId('sidebar__content');
    const pages = await sidebarContent.getByTestId('sidebar__page').all();
    const visibleResults = await Promise.all(
      pages.map(async (page) => await page.isVisible())
    );
    const visiblePages = pages.filter((_, index) => visibleResults[index]);
    expect(visiblePages.length).toBeGreaterThan(0);

    // Click on link
    const firstPage = visiblePages.at(0);
    await firstPage.click();
    await waitFor(async () => await handleConsentPopup(page));
    const content = page.getByTestId('content');
    await content.waitFor();

    // Run smoke test to validate page is not 404
    await runSmokeTestOnPage(page);
  });

  test('clicking on a dropdown', async ({ page }) => {
    // Greedy logic assumes there is at least one dropdown at the first level.

    // Fetch only visible dropdowns (aka ones not nested in a dropdown)
    const sidebarContent = page.getByTestId('sidebar__content');
    const dropdowns = await sidebarContent
      .getByTestId('sidebar__section__toggle')
      .all();
    const visibleResults = await Promise.all(
      dropdowns.map(async (dropdown) => await dropdown.isVisible())
    );
    const visibleDropdowns = dropdowns.filter(
      (_, index) => visibleResults[index]
    );

    // Since it is not guaranteed there will be any links under a dropdown, we should check the chevron changes.
    // Also this should not check if links work. That is the job of the 'clicking on a link' test.
    const firstDropdown = visibleDropdowns.at(0);
    const chevron = (
      await firstDropdown.getByTestId('sidebar__chevron').all()
    ).at(0);
    const openClassName = 'sidebar__chevron--open';
    expect(await chevron.getAttribute('class')).not.toContain(openClassName);

    // Open the dropdown
    await firstDropdown.click();
    expect(await chevron.getAttribute('class')).toContain(openClassName);

    // Close the dropdown
    await firstDropdown.click();
    expect(await chevron.getAttribute('class')).not.toContain(openClassName);
  });
});
