import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config/config';

export class LoginPage extends BasePage {
  // Selectors - Updated with correct IDs from actual application
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly loginButton = 'button[type="submit"]';
  readonly errorMessage = '[role="alert"], .error-message, .alert-danger, .text-danger, [class*="error"]';
  readonly loginForm = 'form';
  readonly pageTitle = 'h2#login-heading, h1, h2, .title';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin(): Promise<void> {
    await this.goto(config.baseURL);
    // Wait for login form to be visible
    await this.page.waitForSelector(this.loginForm, { timeout: 30000 }).catch(() => {
      // Continue even if form doesn't appear
    });
    await this.page.waitForTimeout(1000);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.waitForSelector(this.usernameInput, { timeout: 15000 });
    await this.fill(this.usernameInput, username);
    await this.page.waitForTimeout(500);
    await this.fill(this.passwordInput, password);
    await this.page.waitForTimeout(500);
    await this.click(this.loginButton);
    await this.page.waitForTimeout(2000);
  }

  async loginWithValidCredentials(): Promise<void> {
    await this.login(config.adminUsername, config.adminPassword);
  }

  async loginWithInvalidCredentials(): Promise<void> {
    await this.login(config.invalidUsername, config.invalidPassword);
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForSelector(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  async isLoginFormVisible(): Promise<boolean> {
    return await this.isVisible(this.loginForm);
  }

  async isUsernameFieldVisible(): Promise<boolean> {
    return await this.isVisible(this.usernameInput);
  }

  async isPasswordFieldVisible(): Promise<boolean> {
    return await this.isVisible(this.passwordInput);
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.loginButton);
  }

  async clearUsername(): Promise<void> {
    await this.page.fill(this.usernameInput, '');
  }

  async clearPassword(): Promise<void> {
    await this.page.fill(this.passwordInput, '');
  }

  async submitLoginForm(): Promise<void> {
    await this.click(this.loginButton);
  }
}
