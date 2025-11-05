import { expect, test } from '@playwright/test';
import { COVEO_CREDENTIALS_ENDPOINT } from './constants';
import { mockCoveoCredentials, mockCoveoData } from './mock';
import {
  buildURLFragment,
  handleConsentPopup,
  runSmokeTestCoveo,
  waitFor,
} from './utils';

async function submitSearchQuery(page, query) {
  const headerSearchBarContainer = page.getByTestId('header__search');
  const searchBar = headerSearchBarContainer.locator('[part="textarea"]');
  await searchBar.fill(query);
  await page.keyboard.press('Enter');
  await page.waitForURL(`**/search.html#q=${query}`);
  await page.waitForSelector('#search-v2');
}

test.describe('Coveo test', () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    await waitFor(async () => await handleConsentPopup(page));
    await mockCoveoCredentials(page, request);
  });

  test.afterEach(async ({ page }) => {
    // Run basic smoke tests on all valid queries
    const excludedTests = ['invalid search query', 'missing coveo credentials'];
    if (!excludedTests.includes(test.info().title)) {
      await runSmokeTestCoveo(page);
    }
  });

  test('valid search query', async ({ page }) => {
    await submitSearchQuery(page, mockCoveoData.validQuery);
  });

  test('invalid search query', async ({ page }) => {
    await submitSearchQuery(page, mockCoveoData.invalidQuery);
    const resultsPage = page.getByTestId('search-results-page');
    const main = resultsPage.locator('atomic-layout-section[section="main"]');
    const noResultsMessage = main.locator('[part="no-results"]');
    await expect(noResultsMessage).toBeVisible();
  });

  test('inbound link do not reset URL', async ({ page }) => {
    // Use ONLY generic filters. Do not add any product specific filters, particularly from the facet.
    // If these basic filters work, then its safe to assume, adding facet filters will not reset the URL.
    const endpoint = `/search.html#q=${mockCoveoData.validQuery}${buildURLFragment(mockCoveoData.filters)}`;
    await page.goto(endpoint);
    await page.waitForSelector('#search-v2');

    // should retain the same link instead of resetting
    expect(page.url()).toContain(endpoint);

    // reloading should retain the same link instead of resetting
    await page.reload();
    expect(page.url()).toContain(endpoint);
  });

  test('missing coveo credentials', async ({ page }) => {
    const searchEndpoint = 'search.html';
    await page.unroute(`**/${COVEO_CREDENTIALS_ENDPOINT}`);
    await page.evaluate(() => window.localStorage.clear());
    await page.route(`**/${COVEO_CREDENTIALS_ENDPOINT}`, async (route) => {
      await route.fulfill({
        status: 404,
        contentType: 'text/html; charset=utf-8',
      });
    });
    await page.goto(`/${searchEndpoint}`);

    const coveoErrorContent = page.getByTestId('coveo-error-content');
    await expect(coveoErrorContent).toBeVisible();
  });
});
