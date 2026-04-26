import { Page, expect } from '@playwright/test';

export class TestUtils {
  static async waitForElement(page: Page, selector: string, timeout: number = 5000): Promise<void> {
    await page.waitForSelector(selector, { timeout });
  }

  static async verifyPageTitle(page: Page, expectedTitle: string): Promise<void> {
    const title = await page.title();
    expect(title).toContain(expectedTitle);
  }

  static async verifyPageURL(page: Page, expectedURL: string): Promise<void> {
    const url = page.url();
    expect(url).toContain(expectedURL);
  }

  static async verifyElementText(page: Page, selector: string, expectedText: string): Promise<void> {
    const text = await page.textContent(selector);
    expect(text).toContain(expectedText);
  }

  static async verifyElementVisible(page: Page, selector: string): Promise<void> {
    const isVisible = await page.isVisible(selector);
    expect(isVisible).toBe(true);
  }

  static async verifyElementNotVisible(page: Page, selector: string): Promise<void> {
    const isVisible = await page.isVisible(selector);
    expect(isVisible).toBe(false);
  }

  static async verifyElementExists(page: Page, selector: string): Promise<void> {
    const count = await page.locator(selector).count();
    expect(count).toBeGreaterThan(0);
  }

  static async verifyElementDoesNotExist(page: Page, selector: string): Promise<void> {
    const count = await page.locator(selector).count();
    expect(count).toBe(0);
  }

  static async takeScreenshot(page: Page, filename: string): Promise<void> {
    await page.screenshot({ path: `screenshots/${filename}.png` });
  }

  static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomISBN(): string {
    const prefix = '978';
    const group = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    const publisher = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const check = Math.floor(Math.random() * 10).toString();
    return `${prefix}-${group}-${publisher}-${check}`;
  }

  static generateRandomPrice(): string {
    return (Math.random() * 100 + 1).toFixed(2);
  }

  static generateRandomQuantity(): string {
    return Math.floor(Math.random() * 100 + 1).toString();
  }
}
