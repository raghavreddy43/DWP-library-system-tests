import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BooksPage extends BasePage {
  // Selectors - Updated for actual application
  readonly bookTitle = 'input[name="title"], input[placeholder*="Title"], input[placeholder*="title"], input[id*="title"]';
  readonly bookAuthor = 'input[name="author"], input[placeholder*="Author"], input[placeholder*="author"], input[id*="author"]';
  readonly bookISBN = 'input[name="isbn"], input[placeholder*="ISBN"], input[placeholder*="isbn"], input[id*="isbn"]';
  readonly bookPrice = 'input[name="price"], input[placeholder*="Price"], input[placeholder*="price"], input[id*="price"], input[type="number"]';
  readonly bookQuantity = 'input[name="quantity"], input[placeholder*="Quantity"], input[placeholder*="quantity"], input[id*="quantity"]';
  readonly saveButton = 'button:has-text("Save"), button:has-text("Add"), button:has-text("Submit"), [data-testid="save-book"], button[class*="save"], button[class*="submit"]';
  readonly cancelButton = 'button:has-text("Cancel"), [data-testid="cancel"], button[class*="cancel"]';
  readonly successMessage = '.success-message, .alert-success, [role="status"], .text-success, [class*="success"]';
  readonly errorMessage = '.error-message, .alert-danger, [role="alert"], .text-danger, [class*="error"]';
  readonly bookForm = 'form, [role="form"], [class*="form"]';
  readonly deleteButton = 'button:has-text("Delete"), [data-testid="delete-book"], button[class*="delete"]';
  readonly editButton = 'button:has-text("Edit"), [data-testid="edit-book"], button[class*="edit"]';
  readonly searchInput = 'input[placeholder*="Search"], input[name="search"], input[id*="search"]';
  readonly bookList = 'table, [data-testid="books-list"], .books-list, [class*="table"]';

  constructor(page: Page) {
    super(page);
  }

  async fillBookTitle(title: string): Promise<void> {
    await this.fill(this.bookTitle, title);
  }

  async fillBookAuthor(author: string): Promise<void> {
    await this.fill(this.bookAuthor, author);
  }

  async fillBookISBN(isbn: string): Promise<void> {
    await this.fill(this.bookISBN, isbn);
  }

  async fillBookPrice(price: string): Promise<void> {
    await this.fill(this.bookPrice, price);
  }

  async fillBookQuantity(quantity: string): Promise<void> {
    await this.fill(this.bookQuantity, quantity);
  }

  async fillBookDetails(title: string, author: string, isbn: string, price: string, quantity: string): Promise<void> {
    await this.fillBookTitle(title);
    await this.fillBookAuthor(author);
    await this.fillBookISBN(isbn);
    await this.fillBookPrice(price);
    await this.fillBookQuantity(quantity);
  }

  async saveBook(): Promise<void> {
    await this.click(this.saveButton);
  }

  async cancelBookForm(): Promise<void> {
    await this.click(this.cancelButton);
  }

  async getSuccessMessage(): Promise<string> {
    await this.waitForSelector(this.successMessage);
    return await this.getText(this.successMessage);
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.successMessage);
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForSelector(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  async isBookFormVisible(): Promise<boolean> {
    return await this.isVisible(this.bookForm);
  }

  async deleteBook(): Promise<void> {
    await this.click(this.deleteButton);
  }

  async editBook(): Promise<void> {
    await this.click(this.editButton);
  }

  async searchBook(searchTerm: string): Promise<void> {
    await this.fill(this.searchInput, searchTerm);
  }

  async isBookListVisible(): Promise<boolean> {
    return await this.isVisible(this.bookList);
  }
}
