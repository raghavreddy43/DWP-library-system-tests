import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { BooksPage } from '../../pages/BooksPage';
import { bookTestData } from '../../data/testData';

test.describe('Books Management - Positive Scenarios', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let booksPage: BooksPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    booksPage = new BooksPage(page);

    // Login before each test
    await loginPage.navigateToLogin();
    await page.waitForTimeout(2000);
    await loginPage.loginWithValidCredentials();
    await page.waitForTimeout(2000);
  });

  test('TC_BOOKS_001: User should be able to add a new book with valid data', async () => {
    // Arrange
    const testData = bookTestData.positive[0];

    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      testData.title,
      testData.author,
      testData.isbn,
      testData.price,
      testData.quantity
    );
    await booksPage.saveBook();

    // Assert
    expect(await booksPage.isSuccessMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_002: Add book form should display all required fields', async () => {
    // Act
    await dashboardPage.clickAddBook();

    // Assert
    expect(await booksPage.isBookFormVisible()).toBe(true);
  });

  test('TC_BOOKS_003: User should be able to fill book title', async () => {
    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookTitle('Test Book Title');

    // Assert
    const value = await booksPage.page.inputValue(booksPage.bookTitle);
    expect(value).toBe('Test Book Title');
  });

  test('TC_BOOKS_004: User should be able to fill book author', async () => {
    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookAuthor('Test Author');

    // Assert
    const value = await booksPage.page.inputValue(booksPage.bookAuthor);
    expect(value).toBe('Test Author');
  });

  test('TC_BOOKS_005: User should be able to fill book ISBN', async () => {
    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookISBN('978-0743273565');

    // Assert
    const value = await booksPage.page.inputValue(booksPage.bookISBN);
    expect(value).toBe('978-0743273565');
  });

  test('TC_BOOKS_006: User should be able to fill book price', async () => {
    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookPrice('19.99');

    // Assert
    const value = await booksPage.page.inputValue(booksPage.bookPrice);
    expect(value).toBe('19.99');
  });

  test('TC_BOOKS_007: User should be able to fill book quantity', async () => {
    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookQuantity('10');

    // Assert
    const value = await booksPage.page.inputValue(booksPage.bookQuantity);
    expect(value).toBe('10');
  });

  test('TC_BOOKS_008: User should be able to cancel adding a book', async () => {
    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookTitle('Test Book');
    await booksPage.cancelBookForm();

    // Assert
    expect(await booksPage.isBookFormVisible()).toBe(false);
  });

  test('TC_BOOKS_009: Books table should be visible on dashboard', async () => {
    // Assert
    expect(await booksPage.isBooksTableVisible()).toBe(true);
  });

  test('TC_BOOKS_010: Add book button should be visible on dashboard', async () => {
    // Assert
    expect(await dashboardPage.isAddBookButtonVisible()).toBe(true);
  });

  test('TC_BOOKS_011: User should be able to add multiple books', async () => {
    // Arrange
    const testData1 = bookTestData.positive[0];
    const testData2 = bookTestData.positive[1];

    // Act - Add first book
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      testData1.title,
      testData1.author,
      testData1.isbn,
      testData1.price,
      testData1.quantity
    );
    await booksPage.saveBook();

    // Assert first book added
    expect(await booksPage.isSuccessMessageVisible()).toBe(true);

    // Act - Add second book
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      testData2.title,
      testData2.author,
      testData2.isbn,
      testData2.price,
      testData2.quantity
    );
    await booksPage.saveBook();

    // Assert second book added
    expect(await booksPage.isSuccessMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_012: Book list should be displayed after adding books', async () => {
    // Arrange
    const testData = bookTestData.positive[0];

    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      testData.title,
      testData.author,
      testData.isbn,
      testData.price,
      testData.quantity
    );
    await booksPage.saveBook();

    // Assert
    expect(await booksPage.isBooksTableVisible()).toBe(true);
  });
});
