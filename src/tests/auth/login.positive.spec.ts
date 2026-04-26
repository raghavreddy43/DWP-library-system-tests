import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { loginTestData } from '../../data/testData';
import { config } from '../../config/config';

test.describe('Login - Positive Scenarios', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigateToLogin();
    // Don't wait for networkidle as it may timeout on slow servers
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Start Testing' }).click();
  });

  test('TC_LOGIN_001: User should be able to login with valid credentials', async ({ page }) => {
    // Arrange
    const testData = loginTestData.positive[0];

    // Act
    await loginPage.login(testData.username, testData.password);
    await page.waitForTimeout(1000);

    // Assert
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);
  });

  test('TC_LOGIN_002: Login form should display all required fields', async () => {
    // Assert
    expect(await loginPage.isLoginFormVisible()).toBe(true);
    expect(await loginPage.isUsernameFieldVisible()).toBe(true);
    expect(await loginPage.isPasswordFieldVisible()).toBe(true);
    expect(await loginPage.isLoginButtonVisible()).toBe(true);
  });

  test('TC_LOGIN_003: User should be able to enter username', async () => {
    // Act
    await loginPage.fill(loginPage.usernameInput, 'testuser');

    // Assert
    const value = await loginPage.page.inputValue(loginPage.usernameInput);
    expect(value).toBe('testuser');
  });

  test('TC_LOGIN_004: User should be able to enter password', async () => {
    // Act
    await loginPage.fill(loginPage.passwordInput, 'testpassword');

    // Assert
    const value = await loginPage.page.inputValue(loginPage.passwordInput);
    expect(value).toBe('testpassword');
  });

  test('TC_LOGIN_005: Login button should be clickable', async () => {
    // Assert
    expect(await loginPage.isLoginButtonVisible()).toBe(true);
  });

  test('TC_LOGIN_006: Page should load with login form on initial visit', async () => {
    // Assert
    expect(await loginPage.isLoginFormVisible()).toBe(true);
  });

  test('TC_LOGIN_007: User should be redirected to dashboard after successful login', async ({ page }) => {
    // Act
    await loginPage.loginWithValidCredentials();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Assert
    const url = await dashboardPage.getURL();
    expect(url).not.toContain('login');
  });

  test('TC_LOGIN_008: Logout button should be visible after successful login', async ({ page }) => {
    // Act
    await loginPage.loginWithValidCredentials();
    await page.waitForNavigation();

    // Assert
    expect(await dashboardPage.isLogoutButtonVisible()).toBe(true);
  });
});
