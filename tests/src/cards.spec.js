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

  test('should test featured card', async ({ page }) => {
    const section = await page.locator('data-testid=cards-test__featuredCard');
    const featuredCard = await section.locator(
      'data-testid=card__featured-card'
    );
    const cards = await (await section.locator('data-testid=card')).all();
    const featuredCardOrder = await featuredCard.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('order');
    });

    // Test featured card exist AND is the first one in the order
    expect(await featuredCard.count()).toBeTruthy();
    expect(featuredCardOrder).toBe('1');
    for (const card of cards) {
      const order = await card.evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('order');
      });
      expect(order).toBe('2');
    }
  });
});
