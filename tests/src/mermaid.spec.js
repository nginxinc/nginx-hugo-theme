import { expect, test } from '@playwright/test';
import { handleConsentPopup, waitFor } from './utils';

async function getPropertyValue(element, property) {
  return element.evaluate(
    (el, property) => window.getComputedStyle(el).getPropertyValue(property),
    property
  );
}

async function validateDiagramsGrid(diagrams, expectedGridColumn) {
  for (const diagram of diagrams) {
    const gridColumn = await getPropertyValue(diagram, 'grid-column');
    expect(gridColumn.trim()).toBe(expectedGridColumn);
  }
}

test.describe('Testing for mermaid', () => {
  test.beforeEach(async ({ page }) => {
    const mermaidUrl = 'test-product/mermaid/mermaid-grid';
    await page.goto(`/${mermaidUrl}`);
    await page.waitForLoadState('load');
    await waitFor(async () => await handleConsentPopup(page));
  });

  test('options', async ({ page }) => {
    // Wide
    let expectedGridColumn = '1 / -1';
    const wideDiagrams = await page.locator('[data-grid="wide"]').all();
    await validateDiagramsGrid(wideDiagrams, expectedGridColumn);

    // Last third
    expectedGridColumn = '8 / -1';
    const lastThirdDiagrams = await page
      .locator('[data-grid="last-third"]')
      .all();
    await validateDiagramsGrid(lastThirdDiagrams, expectedGridColumn);

    // First third
    expectedGridColumn = '1 / 4';
    const firstThirdDiagrams = await page
      .locator('[data-grid="first-third"]')
      .all();
    await validateDiagramsGrid(firstThirdDiagrams, expectedGridColumn);

    // First two thirds
    expectedGridColumn = '1 / 8';
    const firstTwoThirdsDiagrams = await page
      .locator('[data-grid="first-two-third"]')
      .all();
    await validateDiagramsGrid(firstTwoThirdsDiagrams, expectedGridColumn);
  });
});
