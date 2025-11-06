import { expect } from '@playwright/test';
import { COVEO_CREDENTIALS_ENDPOINT } from '../constants';

export const mockCoveoData = {
  validQuery: 'proxy',
  invalidQuery: 'abcdefghijkl',
  filters: ['numberOfResults=100', 'sortCriteria=date descending'],
};

export async function mockCoveoCredentials(page, request) {
  // Get credentials
  const username = process.env.FRONT_DOOR_USERNAME;
  const password = process.env.FRONT_DOOR_PASSWORD;
  const baseURL = process.env.COVEO_CREDENTIALS_BASE_URL;
  const response = await request.get(
    `${baseURL}/${COVEO_CREDENTIALS_ENDPOINT}`,
    {
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
      },
    }
  );

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const credentials = await response.json();

  // Mock the local request to be successful, then reload the page.
  await page.route(`**/${COVEO_CREDENTIALS_ENDPOINT}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(credentials),
    });
  });
  await page.reload();
}
