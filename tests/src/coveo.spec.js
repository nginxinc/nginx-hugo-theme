import { expect, test } from '@playwright/test';
import { handleConsentPopup, runSmokeTestCoveo, waitFor } from './utils';

const mockData = {
  validQuery: 'proxy',
  invalidQuery: 'abcdefghijkl',
  filters: [
    'f-f5_product=NGINX Open Source',
    'f-f5_product_grouping=NGINX One',
  ],
};

async function submitSearchQuery(page, query) {
  const headerSearchBarContainer = page.getByTestId('header__search');
  const searchBar = headerSearchBarContainer.locator('[part="textarea"]');
  await searchBar.fill(query);
  await page.keyboard.press('Enter');
  await page.waitForURL(`**/search.html#q=${query}`);
  await page.waitForLoadState('load');
}

function buildFilter() {
  return mockData.filters
    .map((filter) => `&${filter}`)
    .join('')
    .replaceAll(' ', '%20');
}

test.describe('Coveo test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    await waitFor(async () => await handleConsentPopup(page));
  });

  test.afterEach(async ({ page }) => {
    // Run basic smoke tests on all valid queries
    if (!test.info().title.includes('invalid search query')) {
      await runSmokeTestCoveo(page);
    }
  });

  test('valid search query', async ({ page }) => {
    await submitSearchQuery(page, mockData.validQuery);
  });

  test('invalid search query', async ({ page }) => {
    await submitSearchQuery(page, mockData.invalidQuery);
    const resultsPage = page.getByTestId('search-results-page');
    const main = resultsPage.locator('atomic-layout-section[section="main"]');
    const noResultsMessage = main.locator('[part="no-results"]');
    await expect(noResultsMessage).toBeVisible();
  });

  test('inbound link', async ({ page }) => {
    const endpoint = `/search.html#q=${mockData.validQuery}${buildFilter()}`;
    await page.goto(endpoint);
    await page.waitForSelector('#search-v2');

    // should retain the same link instead of resetting
    expect(page.url()).toContain(endpoint);
  });
});
