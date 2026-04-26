# Books Inventory App - Playwright Test Framework

A comprehensive Playwright testing framework built with TypeScript for automating positive and negative test scenarios for the Books Inventory App.

## Project Structure

```
├── src/
│   ├── config/
│   │   └── config.ts                 # Configuration and environment variables
│   ├── pages/
│   │   ├── BasePage.ts              # Base page object with common methods
│   │   ├── LoginPage.ts             # Login page object
│   │   ├── DashboardPage.ts         # Dashboard page object
│   │   └── BooksPage.ts             # Books management page object
│   ├── data/
│   │   └── testData.ts              # Test data for positive and negative scenarios
│   ├── utils/
│   │   └── testUtils.ts             # Utility functions for tests
│   └── tests/
│       ├── auth/
│       │   ├── login.positive.spec.ts    # Positive login test scenarios
│       │   └── login.negative.spec.ts    # Negative login test scenarios
│       ├── books/
│       │   ├── books.positive.spec.ts    # Positive books management scenarios
│       │   └── books.negative.spec.ts    # Negative books management scenarios
│       └── integration/
│           └── auth-books.integration.spec.ts  # Integration tests
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
├── .env.example                      # Environment variables template
├── package.json                      # Project dependencies
└── README.md                         # This file
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**

   ```bash
   cd DWP-library-system-tests
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env
   ```

4. **Update .env file with your configuration**
   ```
   BASE_URL=https://frontendui-librarysystem.onrender.com/login
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin
   INVALID_USERNAME=invaliduser
   INVALID_PASSWORD=wrongpassword
   TIMEOUT=30000
   ```

## Test Scenarios

### Authentication Tests

#### Positive Scenarios (8 test cases)

- TC_LOGIN_001: Valid login with admin credentials
- TC_LOGIN_002: Login form displays all required fields
- TC_LOGIN_003: User can enter username
- TC_LOGIN_004: User can enter password
- TC_LOGIN_005: Login button is clickable
- TC_LOGIN_006: Page loads with login form
- TC_LOGIN_007: User redirected to dashboard after successful login
- TC_LOGIN_008: Logout button visible after successful login

#### Negative Scenarios (12 test cases)

- TC_LOGIN_NEG_001: Login fails with invalid username and password
- TC_LOGIN_NEG_002: Login fails with valid username and wrong password
- TC_LOGIN_NEG_003: Login fails with invalid username and valid password
- TC_LOGIN_NEG_004: Login fails with empty username
- TC_LOGIN_NEG_005: Login fails with empty password
- TC_LOGIN_NEG_006: Login fails with empty username and password
- TC_LOGIN_NEG_007: Error message displayed on failed login
- TC_LOGIN_NEG_008: User remains on login page after failed login
- TC_LOGIN_NEG_009: Login form visible after failed login attempt
- TC_LOGIN_NEG_010: Multiple failed login attempts show error
- TC_LOGIN_NEG_011: SQL injection attempt handled safely
- TC_LOGIN_NEG_012: XSS attempt handled safely

### Books Management Tests

#### Positive Scenarios (12 test cases)

- TC_BOOKS_001: Add new book with valid data
- TC_BOOKS_002: Add book form displays all required fields
- TC_BOOKS_003: User can fill book title
- TC_BOOKS_004: User can fill book author
- TC_BOOKS_005: User can fill book ISBN
- TC_BOOKS_006: User can fill book price
- TC_BOOKS_007: User can fill book quantity
- TC_BOOKS_008: User can cancel adding a book
- TC_BOOKS_009: Books table visible on dashboard
- TC_BOOKS_010: Add book button visible on dashboard
- TC_BOOKS_011: User can add multiple books
- TC_BOOKS_012: Book list displayed after adding books

#### Negative Scenarios (15 test cases)

- TC_BOOKS_NEG_001: Adding book with empty title fails
- TC_BOOKS_NEG_002: Adding book with empty author fails
- TC_BOOKS_NEG_003: Adding book with empty ISBN fails
- TC_BOOKS_NEG_004: Adding book with empty price fails
- TC_BOOKS_NEG_005: Adding book with empty quantity fails
- TC_BOOKS_NEG_006: Adding book with invalid price format fails
- TC_BOOKS_NEG_007: Adding book with invalid quantity format fails
- TC_BOOKS_NEG_008: Adding book with invalid ISBN format fails
- TC_BOOKS_NEG_009: Adding book with negative price fails
- TC_BOOKS_NEG_010: Adding book with negative quantity fails
- TC_BOOKS_NEG_011: Adding book with all empty fields fails
- TC_BOOKS_NEG_012: XSS attempt in book title handled safely
- TC_BOOKS_NEG_013: SQL injection attempt in book author handled safely
- TC_BOOKS_NEG_014: Adding book with special characters handled
- TC_BOOKS_NEG_015: Adding book with very long title handled

### Integration Tests (8 test cases)

- TC_INT_001: Complete workflow - Login and add book
- TC_INT_002: User cannot access books without login
- TC_INT_003: Logout redirects to login page
- TC_INT_004: Login, add book, and logout workflow
- TC_INT_005: Failed login prevents access to books
- TC_INT_006: Multiple books can be added in single session
- TC_INT_007: Session persists after adding book
- TC_INT_008: Invalid book data doesn't affect session

**Total Test Cases: 55**

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in UI mode (interactive)

```bash
npm run test:ui
```

### Run tests in headed mode (see browser)

```bash
npm run test:headed
```

### Run tests in debug mode

```bash
npm run test:debug
```

### Run specific test suites

```bash
# Authentication tests only
npm run test:auth

# Books management tests only
npm run test:books

# Integration tests only
npm run test:integration
```

### Run tests by browser

```bash
# Chromium only
npm run test:chromium

# Firefox only
npm run test:firefox

# WebKit only
npm run test:webkit
```

### View test report

```bash
npm run test:report
```

## Page Object Model

The framework uses the Page Object Model (POM) pattern for maintainability and reusability.

### BasePage

Base class containing common methods used across all pages:

- `goto()` - Navigate to URL
- `click()` - Click element
- `fill()` - Fill input field
- `getText()` - Get element text
- `isVisible()` - Check element visibility
- `waitForSelector()` - Wait for element
- `getTitle()` - Get page title
- `getURL()` - Get current URL

### LoginPage

Handles login functionality:

- `navigateToLogin()` - Go to login page
- `login()` - Login with credentials
- `loginWithValidCredentials()` - Login with admin credentials
- `loginWithInvalidCredentials()` - Login with invalid credentials
- `getErrorMessage()` - Get error message text
- `isErrorMessageVisible()` - Check if error is shown

### DashboardPage

Handles dashboard operations:

- `isLogoutButtonVisible()` - Check logout button
- `logout()` - Logout user
- `isDashboardVisible()` - Check dashboard visibility
- `getWelcomeMessage()` - Get welcome message
- `isAddBookButtonVisible()` - Check add book button
- `clickAddBook()` - Click add book button
- `isBooksTableVisible()` - Check books table
- `getBookCount()` - Get number of books

### BooksPage

Handles book management:

- `fillBookTitle()` - Fill book title
- `fillBookAuthor()` - Fill book author
- `fillBookISBN()` - Fill book ISBN
- `fillBookPrice()` - Fill book price
- `fillBookQuantity()` - Fill book quantity
- `fillBookDetails()` - Fill all book details
- `saveBook()` - Save book
- `cancelBookForm()` - Cancel book form
- `getSuccessMessage()` - Get success message
- `isSuccessMessageVisible()` - Check success message
- `getErrorMessage()` - Get error message
- `isErrorMessageVisible()` - Check error message
- `deleteBook()` - Delete book
- `editBook()` - Edit book
- `searchBook()` - Search for book

## Test Data

Test data is organized in `src/data/testData.ts`:

### Login Test Data

- **Positive**: Valid admin credentials
- **Negative**: Invalid credentials, empty fields, SQL injection, XSS attempts

### Books Test Data

- **Positive**: Valid book entries with all required fields
- **Negative**: Missing fields, invalid formats, negative values, security tests

## Configuration

### Environment Variables (.env)

```
BASE_URL=https://frontendui-librarysystem.onrender.com/login         # Application URL
ADMIN_USERNAME=admin                    # Admin username
ADMIN_PASSWORD=admin                    # Admin password
INVALID_USERNAME=invaliduser            # Invalid username for negative tests
INVALID_PASSWORD=wrongpassword          # Invalid password for negative tests
TIMEOUT=30000                           # Test timeout in milliseconds
```

### Playwright Configuration (playwright.config.ts)

- **Test Directory**: `src/tests`
- **Browsers**: Chromium, Firefox, WebKit
- **Reporters**: HTML, JSON, JUnit
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On first retry

## Best Practices

1. **Use Page Objects**: All page interactions go through page objects
2. **Separate Concerns**: Keep test logic separate from page logic
3. **Reusable Test Data**: Use centralized test data files
4. **Meaningful Assertions**: Use clear, specific assertions
5. **Proper Waits**: Use explicit waits instead of hard sleeps
6. **Error Handling**: Handle errors gracefully in tests
7. **Clean Code**: Follow naming conventions and keep code DRY

## Troubleshooting

### Tests not running

- Ensure Node.js is installed: `node --version`
- Install dependencies: `npm install`
- Check .env file is created and configured

### Browser not launching

- Install Playwright browsers: `npx playwright install`
- Check system requirements for browser compatibility

### Timeout errors

- Increase timeout in .env file
- Check if application is running
- Verify selectors are correct

### Selector issues

- Use browser DevTools to inspect elements
- Update selectors in page objects if UI changes
- Use data-testid attributes for more stable selectors

## CI/CD Integration

The framework is ready for CI/CD integration:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: npm install

- name: Install Playwright browsers
  run: npx playwright install

- name: Run tests
  run: npm test

- name: Upload report
  if: always()
  uses: actions/upload-artifact@v2
  with:
    name: playwright-report
    path: playwright-report/
```

## Contributing

When adding new tests:

1. Follow existing naming conventions
2. Use page objects for all interactions
3. Add test data to `testData.ts`
4. Include both positive and negative scenarios
5. Add descriptive test names and comments
6. Update this README with new test cases

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review Playwright documentation: https://playwright.dev
3. Check test reports in `playwright-report/`
4. Review video/trace files for failed tests

## License

ISC
