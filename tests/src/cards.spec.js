import { expect, test } from '@playwright/test';

test.describe('Testing for cards shortcode', () => {
  test.beforeEach(async ({ page }) => {
    const cardsUrl = 'test-product/cards/permitted';
    await page.goto(`/${cardsUrl}`);
  });

  test('should test basic section', async ({ page }) => {
    const section = await page.locator('data-testid=cards-test__basic');
    const basicCode = await section.locator('data-testid=card-section-content');
    const showAsCardCode = await section.locator(
      'data-testid=card-section-content__card-grid'
    );

    expect(await basicCode.count()).toBeTruthy();
    expect(await showAsCardCode.count()).toBe(0);
  });

  test('should test showAsCard section', async ({ page }) => {
    const section = await page.locator('data-testid=cards-test__showAsCards');
    const showAsCardCode = await section.locator(
      'data-testid=card-section-content__card-grid'
    );

    expect(await showAsCardCode.count()).toBeTruthy();
  });

  test('should test featured section', async ({ page }) => {
    const section = await page.locator(
      'data-testid=cards-test__featuredSection'
    );
    const featuredSection = await section.locator(
      'data-testid=card-section__featured-section'
    );
    const cards = await (
      await featuredSection.locator('data-testid=card')
    ).all();

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
