import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  // Selectors - Updated for actual application
  readonly welcomeMessage = 'h1, .welcome-message, [data-testid="welcome"], .dashboard-title';
  readonly logoutButton = 'button:has-text("Logout"), button:has-text("Sign Out"), a:has-text("Logout"), [data-testid="logout"], button[class*="logout"]';
  readonly booksTable = 'table, [data-testid="books-table"], .books-list, [class*="table"]';
  readonly addBookButton = 'button:has-text("Add Book"), button:has-text("Add"), [data-testid="add-book"], button[class*="add"]';
  readonly bookRows = 'tbody tr, [data-testid="book-row"], tr[class*="book"]';
  readonly userMenu = '[data-testid="user-menu"], .user-menu, .navbar-menu';
  readonly navBar = '//*[@id="root"]/div/div/h2'
  //readonly navBar = 'nav, [data-testid="navbar"], header, [class*="navbar"]';

  constructor(page: Page) {
    super(page);
  }

  async isLogoutButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.logoutButton);
  }

  async logout(): Promise<void> {
    await this.click(this.logoutButton);
  }

  async isDashboardVisible(): Promise<boolean> {
    return await this.isVisible(this.navBar);
  }

  async getWelcomeMessage(): Promise<string> {
    return await this.getText(this.welcomeMessage);
  }

  async isAddBookButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.addBookButton);
  }

  async clickAddBook(): Promise<void> {
    await this.click(this.addBookButton);
  }

  async isBooksTableVisible(): Promise<boolean> {
    return await this.isVisible(this.booksTable);
  }

  async getBookCount(): Promise<number> {
    const rows = await this.page.locator(this.bookRows).count();
    return rows;
  }
}
