import { expect } from '@playwright/test';
import { TIMEOUT } from '../constants';

export async function runSmokeTestCoveo(page) {
  // Separate into variables in case we need to decouple from Coveo Atomic, but we still keep the basic structure of a search page.
  const resultsPage = page.getByTestId('search-results-page');
  const status = resultsPage.locator('atomic-layout-section[section="status"]');
  const facet = resultsPage.locator('atomic-layout-section[section="facets"]');
  const main = resultsPage.locator('atomic-layout-section[section="main"]');

  await expect(status).toBeVisible();
  await expect(facet).toBeVisible();
  await expect(main).toBeVisible();
}

export async function runSmokeTestOnPage(page) {
  /* Ensure each page follows the following dom structure */
  await expect(await page.getByTestId('content').count()).toBeTruthy();
  await expect(await page.getByTestId('header').count()).toBeTruthy();
  await expect(await page.getByTestId('sidebar').count()).toBeTruthy();
  await expect(await page.getByTestId('footer').count()).toBeTruthy();
  await expect(await page.getByTestId('not-found-container').count()).toBe(0);
}

// THE GDPR Consent button appears when test is run from EU locations. This handles that popup.
export async function handleConsentPopup(page) {
  await page.addLocatorHandler(
    page.locator('#truste-consent-content'),
    async () => {
      const consentButton = page.locator('#truste-consent-required');
      expect(consentButton).toBeVisible();
      await consentButton.click();
    }
  );
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const waitFor = async function waitFor(f, ftimeout = TIMEOUT) {
  while (!f()) await sleep(ftimeout);
  return f();
};
