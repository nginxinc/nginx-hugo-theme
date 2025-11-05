import { expect } from '@playwright/test';

export const mockCoveoData = {
  validQuery: 'proxy',
  invalidQuery: 'abcdefghijkl',
  filters: ['numberOfResults=100', 'sortCriteria=date descending'],
};

export async function mockCoveoCredentials(page, request) {
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
