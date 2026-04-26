import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { BooksPage } from '../../pages/BooksPage';
import { bookTestData } from '../../data/testData';

test.describe('Authentication & Books Integration', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let booksPage: BooksPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    booksPage = new BooksPage(page);
  });

  test('TC_INT_001: Complete workflow - Login and add book', async ({ page }) => {
    // Arrange
    const testData = bookTestData.positive[0];

    // Act - Login
    await loginPage.navigateToLogin();
    await page.waitForTimeout(2000);
    await loginPage.loginWithValidCredentials();
    await page.waitForTimeout(2000);

    // Assert - Dashboard visible
    expect(await dashboardPage.isDashboardVisible()).toBe(true);

    // Act - Add book
    await dashboardPage.clickAddBook();
    await page.waitForTimeout(500);
    await booksPage.fillBookDetails(
      testData.title,
      testData.author,
      testData.isbn,
      testData.price,
      testData.quantity
    );
    await booksPage.saveBook();
    await page.waitForTimeout(1000);

    // Assert - Book added successfully
    const isSuccess = await booksPage.isSuccessMessageVisible();
    expect(isSuccess).toBe(true);
  });

  test('TC_INT_002: User cannot access books without login', async ({ page }) => {
    // Act - Try to access books page directly
    await page.goto('https://frontendui-librarysystem.onrender.com/books', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Assert - Should be redirected to login
    const url = page.url();
    expect(url.toLowerCase()).toContain('login');
  });

  test('TC_INT_003: Logout should redirect to login page', async ({ page }) => {
    // Arrange
    await loginPage.navigateToLogin();
    await loginPage.loginWithValidCredentials();
    await page.waitForNavigation();

    // Act
    await dashboardPage.logout();
    await page.waitForNavigation();

    // Assert
    expect(await loginPage.isLoginFormVisible()).toBe(true);
  });

  test('TC_INT_004: Login, add book, and logout workflow', async ({ page }) => {
    // Arrange
    const testData = bookTestData.positive[0];

    // Act - Login
    await loginPage.navigateToLogin();
    await loginPage.loginWithValidCredentials();
    await page.waitForNavigation();

    // Assert - Dashboard visible
    expect(await dashboardPage.isDashboardVisible()).toBe(true);

    // Act - Add book
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      testData.title,
      testData.author,
      testData.isbn,
      testData.price,
      testData.quantity
    );
    await booksPage.saveBook();

    // Assert - Book added
    expect(await booksPage.isSuccessMessageVisible()).toBe(true);

    // Act - Logout
    await dashboardPage.logout();
    await page.waitForNavigation();

    // Assert - Back to login
    expect(await loginPage.isLoginFormVisible()).toBe(true);
  });

  test('TC_INT_005: Failed login should not allow access to books', async ({ page }) => {
    // Act - Try to login with invalid credentials
    await loginPage.navigateToLogin();
    await loginPage.loginWithInvalidCredentials();

    // Assert - Should remain on login page
    expect(await loginPage.isLoginFormVisible()).toBe(true);
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
  });

  test('TC_INT_006: Multiple books can be added in single session', async ({ page }) => {
    // Arrange
    const testData1 = bookTestData.positive[0];
    const testData2 = bookTestData.positive[1];
    const testData3 = bookTestData.positive[2];

    // Act - Login
    await loginPage.navigateToLogin();
    await loginPage.loginWithValidCredentials();
    await page.waitForNavigation();

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
    expect(await booksPage.isSuccessMessageVisible()).toBe(true);

    // Act - Add third book
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      testData3.title,
      testData3.author,
      testData3.isbn,
      testData3.price,
      testData3.quantity
    );
    await booksPage.saveBook();

    // Assert - All books added
    expect(await booksPage.isSuccessMessageVisible()).toBe(true);
  });

  test('TC_INT_007: Session should persist after adding book', async ({ page }) => {
    // Arrange
    const testData = bookTestData.positive[0];

    // Act - Login
    await loginPage.navigateToLogin();
    await loginPage.loginWithValidCredentials();
    await page.waitForNavigation();

    // Act - Add book
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      testData.title,
      testData.author,
      testData.isbn,
      testData.price,
      testData.quantity
    );
    await booksPage.saveBook();

    // Assert - Still logged in
    expect(await dashboardPage.isLogoutButtonVisible()).toBe(true);
  });

  test('TC_INT_008: Invalid book data should not affect session', async ({ page }) => {
    // Arrange
    const invalidData = bookTestData.negative[0];

    // Act - Login
    await loginPage.navigateToLogin();
    await loginPage.loginWithValidCredentials();
    await page.waitForNavigation();

    // Act - Try to add invalid book
    await dashboardPage.clickAddBook();
    await booksPage.fillBookDetails(
      invalidData.title,
      invalidData.author,
      invalidData.isbn,
      invalidData.price,
      invalidData.quantity
    );
    await booksPage.saveBook();

    // Assert - Error shown but still logged in
    expect(await booksPage.isErrorMessageVisible()).toBe(true);
    expect(await dashboardPage.isLogoutButtonVisible()).toBe(true);
  });
});
