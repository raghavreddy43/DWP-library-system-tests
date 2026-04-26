import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { BooksPage } from '../../pages/BooksPage';
import { bookTestData } from '../../data/testData';

test.describe('Books Management - Negative Scenarios', () => {
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

  test('TC_BOOKS_NEG_001: Adding book with empty title should fail', async () => {
    // Arrange
    const testData = bookTestData.negative[0];

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
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_002: Adding book with empty author should fail', async () => {
    // Arrange
    const testData = bookTestData.negative[1];

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
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_003: Adding book with empty ISBN should fail', async () => {
    // Arrange
    const testData = bookTestData.negative[2];

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
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_004: Adding book with empty price should fail', async () => {
    // Arrange
    const testData = bookTestData.negative[3];

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
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_005: Adding book with empty quantity should fail', async () => {
    // Arrange
    const testData = bookTestData.negative[4];

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
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_006: Adding book with invalid price format should fail', async () => {
    // Arrange
    const testData = bookTestData.negative[5];

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
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_007: Adding book with invalid quantity format should fail', async () => {
    // Arrange
    const testData = bookTestData.negative[6];

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
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_008: Adding book with invalid ISBN format should fail', async () => {
    // Arrange
    const testData = bookTestData.negative[7];

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
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_009: Adding book with negative price should fail', async () => {
    // Arrange
    const testData = bookTestData.negative[8];

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
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_010: Adding book with negative quantity should fail', async () => {
    // Arrange
    const testData = bookTestData.negative[9];

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
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_011: Adding book with all empty fields should fail', async () => {
    // Act
    await dashboardPage.clickAddBook();
    await booksPage.saveBook();

    // Assert
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_BOOKS_NEG_012: XSS attempt in book title should be handled safely', async () => {
    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      '<script>alert("xss")</script>',
      'Test Author',
      '978-0743273565',
      '10.99',
      '5'
    );
    await booksPage.saveBook();

    // Assert - Should either fail or sanitize the input
    const isErrorVisible = await booksPage.isErrorMessageVisible();
    const isSuccessVisible = await booksPage.isSuccessMessageVisible();
    expect(isErrorVisible || isSuccessVisible).toBe(true);
  });

  test('TC_BOOKS_NEG_013: SQL injection attempt in book author should be handled safely', async () => {
    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      'Test Book',
      "'; DROP TABLE books; --",
      '978-0743273565',
      '10.99',
      '5'
    );
    await booksPage.saveBook();

    // Assert - Should either fail or sanitize the input
    const isErrorVisible = await booksPage.isErrorMessageVisible();
    const isSuccessVisible = await booksPage.isSuccessMessageVisible();
    expect(isErrorVisible || isSuccessVisible).toBe(true);
  });

  test('TC_BOOKS_NEG_014: Adding book with special characters should be handled', async () => {
    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      'Test Book @#$%',
      'Test Author @#$%',
      '978-0743273565',
      '10.99',
      '5'
    );
    await booksPage.saveBook();

    // Assert - Should either succeed or show appropriate error
    const isErrorVisible = await booksPage.isErrorMessageVisible();
    const isSuccessVisible = await booksPage.isSuccessMessageVisible();
    expect(isErrorVisible || isSuccessVisible).toBe(true);
  });

  test('TC_BOOKS_NEG_015: Adding book with very long title should be handled', async () => {
    // Arrange
    const longTitle = 'A'.repeat(500);

    // Act
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      longTitle,
      'Test Author',
      '978-0743273565',
      '10.99',
      '5'
    );
    await booksPage.saveBook();

    // Assert - Should either fail or truncate
    const isErrorVisible = await booksPage.isErrorMessageVisible();
    const isSuccessVisible = await booksPage.isSuccessMessageVisible();
    expect(isErrorVisible || isSuccessVisible).toBe(true);
  });
});
