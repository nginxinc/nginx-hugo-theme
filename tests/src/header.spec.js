import { expect, test } from '@playwright/test';

test.describe('Smoke test for header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should test header renders', async ({ page }) => {
    await expect(
      await page.locator('data-testid=header__product-selector').count()
    ).toBeTruthy();
    await expect(
      await page.locator('data-testid=header__search').count()
    ).toBeTruthy();
    await expect(
      await page.locator('data-testid=header__f5sites').count()
    ).toBeTruthy();
  });

  test('should test product selector renders', async ({ page }) => {
    // Check it renders
    const productSelectorButton = await page.locator(
      'data-testid=product-selector__button'
    );
    await productSelectorButton.click();
    const productSelector = await page.locator('data-testid=product-selector');
    await expect(productSelector.count()).toBeTruthy();

    // Check it has four product groups. Usually this is frowned upon but is fine since it is a static number of groups for a while.
    const productSelectorContent = productSelector.locator(
      'data-testid=product-selector-content'
    );
    expect((await productSelectorContent.all()).length).toBe(4);
  });

  test('should test F5 Sites button works', async ({ page }) => {
    const f5SitesButton = await page.locator(
      'data-testid=header__f5sites__button'
    );
    await f5SitesButton.click();
    const f5SitesContent = await page.locator(
      'data-testid=header__f5sites-content'
    );
    await expect(f5SitesContent.count()).toBeTruthy();
  });
});
