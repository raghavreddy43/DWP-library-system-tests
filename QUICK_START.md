# Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and update with your application URL:

```
BASE_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

### 3. Install Browsers

```bash
npx playwright install
```

### 4. Run Tests

```bash
npm test
```

## Common Commands

| Command                    | Purpose                         |
| -------------------------- | ------------------------------- |
| `npm test`                 | Run all tests                   |
| `npm run test:ui`          | Interactive test runner         |
| `npm run test:headed`      | Run with visible browser        |
| `npm run test:auth`        | Run authentication tests only   |
| `npm run test:books`       | Run books management tests only |
| `npm run test:integration` | Run integration tests only      |
| `npm run test:report`      | View HTML test report           |

## Test Structure

```
Tests (55 total)
├── Authentication (20 tests)
│   ├── Positive (8 tests)
│   └── Negative (12 tests)
├── Books Management (27 tests)
│   ├── Positive (12 tests)
│   └── Negative (15 tests)
└── Integration (8 tests)
```

## Key Features

✅ **Page Object Model** - Maintainable and reusable code
✅ **Comprehensive Test Data** - Positive and negative scenarios
✅ **Security Testing** - SQL injection and XSS tests
✅ **Multi-browser Support** - Chrome, Firefox, Safari
✅ **Detailed Reporting** - HTML, JSON, JUnit reports
✅ **Screenshots & Videos** - On failure for debugging
✅ **TypeScript** - Type-safe test code

## Project Layout

```
src/
├── config/          # Configuration
├── pages/           # Page objects
├── data/            # Test data
├── utils/           # Utilities
└── tests/           # Test files
    ├── auth/        # Login tests
    ├── books/       # Books tests
    └── integration/ # Integration tests
```

## Debugging

### Run in UI Mode

```bash
npm run test:ui
```

### Run in Debug Mode

```bash
npm run test:debug
```

### Run with Browser Visible

```bash
npm run test:headed
```

### View Test Report

```bash
npm run test:report
```

## Next Steps

1. Update selectors in page objects to match your application
2. Customize test data in `src/data/testData.ts`
3. Add more test scenarios as needed
4. Integrate with CI/CD pipeline
5. Set up test result notifications

## Troubleshooting

**Tests not running?**

- Check if application is running at BASE_URL
- Verify .env file is configured
- Run `npx playwright install`

**Selectors not working?**

- Use browser DevTools to inspect elements
- Update selectors in page objects
- Use data-testid attributes

**Timeout errors?**

- Increase TIMEOUT in .env
- Check application performance
- Verify network connectivity

## Documentation

- Full documentation: See `FRAMEWORK_SETUP.md`
- Playwright docs: https://playwright.dev
- TypeScript docs: https://www.typescriptlang.org

---

Happy testing! 🚀
