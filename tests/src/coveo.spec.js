import { expect, test } from '@playwright/test';
import { handleConsentPopup, runSmokeTestCoveo, waitFor } from './utils';

const mockData = {
  validQuery: 'proxy',
  invalidQuery: 'abcdefghijkl',
  filters: ['numberOfResults=100', 'sortCriteria=date descending'],
};

async function submitSearchQuery(page, query) {
  const headerSearchBarContainer = page.getByTestId('header__search');
  const searchBar = headerSearchBarContainer.locator('[part="textarea"]');
  await searchBar.fill(query);
  await page.keyboard.press('Enter');
  await page.waitForURL(`**/search.html#q=${query}`);
  await page.waitForSelector('#search-v2');
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

  test('inbound link do not reset URL', async ({ page }) => {
    // Use ONLY generic filters. Do not add any product specific filters, particularly from the facet.
    // If these basic filters work, then its safe to assume, adding facet filters will not reset the URL.
    const endpoint = `/search.html#q=${mockData.validQuery}${buildFilter()}`;
    await page.goto(endpoint);
    await page.waitForSelector('#search-v2');

    // should retain the same link instead of resetting
    expect(page.url()).toContain(endpoint);
  });
});
