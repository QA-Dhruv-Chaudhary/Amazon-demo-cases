const { test } = require('@playwright/test');
const LoginMethod = require('../page/LoginMethod');

test.describe('Login Tests', () => {
  test('Test case 1: Positive LogIn test', async ({ page }) => {
    const loginPage = new LoginMethod(page);
    await loginPage.runPositiveLoginTest();
  });

  test('Test case 2: Negative username test', async ({ page }) => {
    const loginPage = new LoginMethod(page);
    await loginPage.runInvalidUsernameTest();
  });

  test('Test case 3: Negative password test', async ({ page }) => {
    const loginPage = new LoginMethod(page);
    await loginPage.runInvalidPasswordTest();
  });
});
