const { expect } = require('@playwright/test');

exports.PlaywrightDevPage = class PlaywrightDevPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.tshirt = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.fleeceJacket = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    this.cart = page.locator('[data-test="shopping-cart-link"]');
    this.addedItemLink = page.locator('[data-test="item-1-title-link"]');
    this.addedItemPrice = page.locator('[data-test="inventory-item-price"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('[data-test="complete-header"]');
  }


  async login() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.username.fill('standard_user');
    await this.password.fill('secret_sauce');
    await this.loginButton.click();
  }

  async addTshirt() {
    await this.tshirt.click();
  }

  async addFleeceJacket() {
    await this.fleeceJacket.click();
  }

  async validateCart(price) {
    await this.cart.click();
    await expect(this.addedItemPrice).toContainText(price);
  }

  async checkOut() {
    await this.checkoutButton.click();
    await this.firstName.fill('Ashish');
    await this.lastName.fill('Ghosh');
    await this.postCode.fill('1181AC');
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async validateCompletion() {
    await expect(this.successMessage).toBeVisible();
  }

};