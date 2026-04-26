import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      // Wait for React app to hydrate - look for any interactive element
      await this.page.waitForFunction(() => {
        const inputs = document.querySelectorAll('input');
        const buttons = document.querySelectorAll('button');
        return inputs.length > 0 || buttons.length > 1;
      }, { timeout: 60000 }).catch(() => {
        // Continue even if function times out
      });
      await this.page.waitForTimeout(2000);
    } catch (error) {
      // Retry once on failure
      await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await this.page.waitForTimeout(2000);
    }
  }

  async click(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { timeout: 10000 });
    await this.page.click(selector, { timeout: 10000 });
    await this.page.waitForTimeout(500);
  }

  async fill(selector: string, text: string): Promise<void> {
    await this.page.waitForSelector(selector, { timeout: 10000 });
    await this.page.fill(selector, text, { timeout: 10000 });
    await this.page.waitForTimeout(500);
  }

  async getText(selector: string): Promise<string> {
    await this.page.waitForSelector(selector, { timeout: 10000 });
    return await this.page.textContent(selector) || '';
  }

  async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.isVisible(selector, { timeout: 5000 });
    } catch {
      return false;
    }
  }

  async waitForSelector(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getURL(): Promise<string> {
    return this.page.url();
  }

  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForTimeout(2000);
  }

  async waitForNavigation(): Promise<void> {
    await this.page.waitForNavigation({ timeout: 60000 }).catch(() => {
      // Continue even if navigation times out
    });
  }
}
