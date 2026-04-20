const { expect } = require('@playwright/test');
const { amazonDemoLocators } = require('../locator/amazonDemo.locator');

class AmazonDemoPage {
  constructor(page) {
    this.page = page;
    this.activePage = page;
  }

  async open(url = '/') {
    console.log(`[AmazonDemoPage] Opening URL: ${url}`);
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
    this.activePage = this.page;
  }

  async amazonDemo(searchQuery) {
    console.log(`[AmazonDemoPage] Performing search with query: ${searchQuery}`);
    await this.page.locator(amazonDemoLocators.searchInput).fill(searchQuery);
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      this.page.locator(amazonDemoLocators.searchButton).click(),
    ]);
  }

  async expectAmazonDemoSuccess() {
    console.log('[AmazonDemoPage] Verifying search results are visible');
    await expect(this.page.locator(amazonDemoLocators.compareSearchResult).first()).toBeVisible();
    await expect(this.page.locator(amazonDemoLocators.fourthFromList)).toBeVisible();
  }

  async selectFourthFromList() {
    console.log('[AmazonDemoPage] Selecting fourth from list');
    const fourthItem = this.page.locator(amazonDemoLocators.fourthFromList).first();
    await fourthItem.waitFor({ state: 'visible' });

    const [productPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      fourthItem.click(),
    ]);

    await productPage.waitForLoadState('domcontentloaded');
    this.activePage = productPage;
  }

  async addToCart() {
    console.log('[AmazonDemoPage] Adding item to cart');
    const addToCartButton = this.activePage.locator(amazonDemoLocators.addToCart);
    await addToCartButton.waitFor({ state: 'visible' });
    await Promise.all([
      this.activePage.waitForLoadState('domcontentloaded'),
      addToCartButton.click(),
    ]);
  }

  async goToCart() {
    console.log('[AmazonDemoPage] Going to cart');
    const goToCartLink = this.activePage.locator(amazonDemoLocators.goToCart);
    await goToCartLink.waitFor({ state: 'visible' });
    await Promise.all([
      this.activePage.waitForLoadState('domcontentloaded'),
      goToCartLink.click(),
    ]);
  }

  async deleteFromCart() {
    console.log('[AmazonDemoPage] Deleting from cart');
    const deleteFromCartButton = this.activePage.locator(amazonDemoLocators.deleteFromCart).first();
    await deleteFromCartButton.waitFor({ state: 'visible' });
    await deleteFromCartButton.click();
  }

  async testCase1() {
    await this.open();
    await this.amazonDemo('boat');
    await this.expectAmazonDemoSuccess();
  }
  async testCase2() {
    await this.testCase1();
    await this.selectFourthFromList();
  }
  async testCase3() {
    await this.testCase2();
    await this.addToCart();
    await this.goToCart();
    await this.deleteFromCart();
  } 
}

module.exports = { AmazonDemoPage };
