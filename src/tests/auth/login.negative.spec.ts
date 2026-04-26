import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginTestData } from '../../data/testData';

test.describe('Login - Negative Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await page.waitForTimeout(2000);
  });

  test('TC_LOGIN_NEG_001: Login should fail with invalid username and password', async () => {
    // Arrange
    const testData = loginTestData.negative[0];

    // Act
    await loginPage.login(testData.username, testData.password);

    // Assert
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg.toLowerCase()).toContain('invalid');
  });

  test('TC_LOGIN_NEG_002: Login should fail with valid username and wrong password', async () => {
    // Arrange
    const testData = loginTestData.negative[1];

    // Act
    await loginPage.login(testData.username, testData.password);

    // Assert
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_LOGIN_NEG_003: Login should fail with invalid username and valid password', async () => {
    // Arrange
    const testData = loginTestData.negative[2];

    // Act
    await loginPage.login(testData.username, testData.password);

    // Assert
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_LOGIN_NEG_004: Login should fail with empty username', async () => {
    // Arrange
    const testData = loginTestData.negative[3];

    // Act
    await loginPage.login(testData.username, testData.password);

    // Assert
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_LOGIN_NEG_005: Login should fail with empty password', async () => {
    // Arrange
    const testData = loginTestData.negative[4];

    // Act
    await loginPage.login(testData.username, testData.password);

    // Assert
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_LOGIN_NEG_006: Login should fail with empty username and password', async () => {
    // Arrange
    const testData = loginTestData.negative[5];

    // Act
    await loginPage.submitLoginForm();

    // Assert
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_LOGIN_NEG_007: Error message should be displayed on failed login', async () => {
    // Act
    await loginPage.loginWithInvalidCredentials();

    // Assert
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_LOGIN_NEG_008: User should remain on login page after failed login', async () => {
    // Act
    await loginPage.loginWithInvalidCredentials();

    // Assert
    expect(await loginPage.isLoginFormVisible()).toBe(true);
  });

  test('TC_LOGIN_NEG_009: Login form should be visible after failed login attempt', async () => {
    // Act
    await loginPage.loginWithInvalidCredentials();

    // Assert
    expect(await loginPage.isUsernameFieldVisible()).toBe(true);
    expect(await loginPage.isPasswordFieldVisible()).toBe(true);
  });

  test('TC_LOGIN_NEG_010: Multiple failed login attempts should show error', async () => {
    // Act
    await loginPage.loginWithInvalidCredentials();
    let isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    // Act - Second attempt
    await loginPage.clearUsername();
    await loginPage.clearPassword();
    await loginPage.loginWithInvalidCredentials();

    // Assert
    isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);
  });

  test('TC_LOGIN_NEG_011: SQL injection attempt should be handled safely', async () => {
    // Act
    await loginPage.login("admin' OR '1'='1", "password");

    // Assert
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_LOGIN_NEG_012: XSS attempt should be handled safely', async () => {
    // Act
    await loginPage.login('<script>alert("xss")</script>', 'password');

    // Assert
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
  });
});
