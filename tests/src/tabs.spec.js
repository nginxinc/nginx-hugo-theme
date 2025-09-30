import { expect, test } from '@playwright/test';
import { handleConsentPopup, waitFor } from './utils';

test.describe('Testing for tabs shortcode', () => {
  test.beforeEach(async ({ page }) => {
    const tabsUrl = 'test-product/tab-group/tab-group/';
    await page.goto(`/${tabsUrl}`);
    await page.waitForLoadState('load');
    await waitFor(async () => await handleConsentPopup(page));
  });

  test('tabs render', async ({ page }) => {
    const section = page.getByTestId('tabs-test__basic');
    const tabsContainer = section.getByTestId('tabs-container');
    const tabLabels = tabsContainer.getByTestId('tab-labels');
    const tabContents = tabsContainer.getByTestId('tab-contents');

    expect(await tabsContainer.count()).toBeTruthy();
    expect(await tabLabels.count()).toBeTruthy();
    expect(await tabContents.count()).toBeTruthy();
  });

  test('tabs shift content when clicked', async ({ page }) => {
    const section = page.getByTestId('tabs-test__basic');
    const tabsContainer = section.getByTestId('tabs-container');
    const tabLabels = tabsContainer.getByTestId('tab-labels');
    const tabContents = tabsContainer.getByTestId('tab-contents');

    const tabsList = await tabLabels.locator('li').all();
    for (const tab of tabsList) {
      const label = tab.getByTestId('tab-label');
      const labelId = await label.getAttribute('id');
      const title = labelId.substring(0, labelId.lastIndexOf('tab') - 1);
      const labelIndex = Number.parseInt(
        labelId.substring(labelId.lastIndexOf('-') + 1)
      );

      await label.click();
      const content = tabContents.locator(`#${title}-panel-${labelIndex}`);
      await expect(content).toBeVisible();
    }
  });
});
