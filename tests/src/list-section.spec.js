import { expect, test } from '@playwright/test';
import { handleConsentPopup, waitFor } from './utils';

// Regression tests for https://github.com/nginxinc/nginx-hugo-theme/issues/498
// A section's own body content must render whether or not it sets
// f5-landing-page, and the generated card grid must not be replaced by it.
test.describe('Section pages render their own content', () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForLoadState('load');
    await waitFor(async () => await handleConsentPopup(page));
  });

  test('section with body and children renders body and cards', async ({
    page,
  }) => {
    await page.goto('/theme-overview/custom-frontmatter/body-and-cards/');
    const content = page.getByTestId('content');
    await expect(content).toContainText(
      'Section body content shown alongside the child card grid.'
    );
    await expect(content.getByText('In this section')).toBeVisible();
    await expect(content.locator('.card-grid .card')).toHaveCount(2);
  });

  test('f5-landing-page renders body without cards', async ({ page }) => {
    await page.goto('/theme-overview/custom-frontmatter/custom-landing-page/');
    const content = page.getByTestId('content');
    await expect(content).toContainText('This is a custom landing page.');
    await expect(content.getByText('In this section')).toHaveCount(0);
    await expect(content.locator('.card-grid .card')).toHaveCount(0);
  });

  test('section with children and no body renders cards', async ({ page }) => {
    await page.goto('/theme-overview/custom-frontmatter/default-landing-page/');
    const content = page.getByTestId('content');
    await expect(content.getByText('In this section')).toBeVisible();
    await expect(content.locator('.card-grid .card')).toHaveCount(2);
  });

  test('section with body and no children renders no empty heading', async ({
    page,
  }) => {
    await page.goto('/theme-overview/custom-frontmatter/body-only/');
    const content = page.getByTestId('content');
    await expect(content).toContainText(
      'Section body content shown without an empty section heading.'
    );
    await expect(content.getByText('In this section')).toHaveCount(0);
    await expect(content.locator('.card-grid .card')).toHaveCount(0);
  });
});
