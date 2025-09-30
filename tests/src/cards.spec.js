import { expect, test } from '@playwright/test';
import { handleConsentPopup, waitFor } from './utils';

test.describe('Testing for cards shortcode', () => {
  test.beforeEach(async ({ page }) => {
    const cardsUrl = 'test-product/cards/permitted';
    await page.goto(`/${cardsUrl}`);
    await page.waitForLoadState('load');
    await waitFor(async () => await handleConsentPopup(page));
  });

  test('basic section', async ({ page }) => {
    const section = page.getByTestId('cards-test__basic');
    const showAsCardCode = section.getByTestId('card-section-content');

    expect(await showAsCardCode.count()).toBe(0);
  });

  test('featured section', async ({ page }) => {
    const section = page.getByTestId('cards-test__featuredSection');
    const featuredSection = section.getByTestId(
      'card-section__featured-section'
    );
    const cards = await featuredSection.getByTestId('card').all();

    // Test featured section exists AND there are less than or equal to 3 cards.
    expect(await featuredSection.count()).toBeTruthy();
    const visibleCards = [];
    for (const card of cards) {
      if (await card.isVisible()) {
        visibleCards.push(card);
      }
    }
    expect(visibleCards.length).toBeLessThanOrEqual(3);
  });
});
