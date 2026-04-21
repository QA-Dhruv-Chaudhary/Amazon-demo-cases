const { expect } = require('@playwright/test');
const loginLocators = require('../locator/LoginLocator');
const loginData = require('../data/LoginData.json');

class LoginMethod {
  constructor(page) {
    this.page = page;
    this.userNameInput = page.locator(loginLocators.userNameInput);
    this.passwordInput = page.locator(loginLocators.passwordInput);
    this.loginButton = page.locator(loginLocators.loginButton);
    this.errorMessage = page.locator(loginLocators.errorMessage);
    this.logoutButton = page.locator(loginLocators.logoutButton);
  }

  async openPage(url) {
    await this.page.goto(url);
  }

  async login(username, password) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    // Perform button click action
    await this.loginButton.click();
  }

  async logoutIfLoggedIn() {
    await expect(this.logoutButton).toBeVisible();
    // Perform button click action
    await this.logoutButton.click();
  }

  async verifyInvalidLogin() {
    await expect(this.errorMessage).toBeVisible();
  }

  async runPositiveLoginTest() {
    await this.openPage(loginData.baseUrl);
    await this.login(loginData.validUser.username, loginData.validUser.password);
    await this.logoutIfLoggedIn();
  }

  async runInvalidUsernameTest() {
    await this.openPage(loginData.baseUrl);
    await this.login(
      loginData.invalidUsername.username,
      loginData.invalidUsername.password
    );
    await this.verifyInvalidLogin();
  }

  async runInvalidPasswordTest() {
    await this.openPage(loginData.baseUrl);
    await this.login(
      loginData.invalidPassword.username,
      loginData.invalidPassword.password
    );
    await this.verifyInvalidLogin();
  }
}

module.exports = LoginMethod;
