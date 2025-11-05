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

async function mockCoveo(page, request) {
  // Get credentials
  const tokenBaseURL = 'https://docs-dev.nginx.com';
  const tokenEndpoint = '/api/v1/auth/search_token';
  const username = process.env.FRONT_DOOR_USERNAME;
  const password = process.env.FRONT_DOOR_PASSWORD;
  const response = await request.get(tokenBaseURL + tokenEndpoint, {
    headers: {
      Authorization:
        'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const credentials = await response.json();

  // Mock the local request to be successful, then reload the page.
  await page.route(`**${tokenEndpoint}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(credentials),
    });
  });
  await page.reload();
}

test.describe('Coveo test', () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    await waitFor(async () => await handleConsentPopup(page));
    await mockCoveo(page, request);
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

    // reloading should retain the same link instead of resetting
    await page.reload();
    expect(page.url()).toContain(endpoint);
  });
});
