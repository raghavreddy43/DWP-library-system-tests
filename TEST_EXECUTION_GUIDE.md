# Test Execution Guide

## Overview

This guide provides detailed instructions on how to execute tests in the Books Inventory App Playwright framework.

## Prerequisites

- Node.js v14+ installed
- npm installed
- Application running at configured BASE_URL
- All dependencies installed (`npm install`)
- Playwright browsers installed (`npx playwright install`)

## Test Execution Methods

### 1. Command Line Execution

#### Run All Tests

```bash
npm test
```

#### Run Tests in Specific Directory

```bash
# Authentication tests
npm run test:auth

# Books management tests
npm run test:books

# Integration tests
npm run test:integration
```

#### Run Tests by Browser

```bash
# Chromium only
npm run test:chromium

# Firefox only
npm run test:firefox

# WebKit only
npm run test:webkit
```

### 2. Interactive UI Mode

```bash
npm run test:ui
```

**Features:**

- Visual test runner
- Watch mode for file changes
- Filter tests by name
- Run individual tests
- View test details
- Debug mode integration

### 3. Headed Mode (Browser Visible)

```bash
npm run test:headed
```

**Use when:**

- Debugging test failures
- Verifying test behavior
- Demonstrating tests
- Visual validation needed

### 4. Debug Mode

```bash
npm run test:debug
```

**Features:**

- Step through tests
- Inspect page state
- Pause execution
- Evaluate expressions
- Browser DevTools integration

## Test Filtering

### Run Specific Test File

```bash
npx playwright test src/tests/auth/login.positive.spec.ts
```

### Run Tests Matching Pattern

```bash
npx playwright test --grep "TC_LOGIN_001"
```

### Run Tests Excluding Pattern

```bash
npx playwright test --grep-invert "negative"
```

## Test Reporting

### View HTML Report

```bash
npm run test:report
```

### Generate Reports

Reports are automatically generated in:

- `playwright-report/` - HTML report
- `test-results/results.json` - JSON report
- `test-results/junit.xml` - JUnit report

### Report Contents

- Test execution summary
- Pass/fail status
- Execution time
- Screenshots (on failure)
- Videos (on failure)
- Trace files (on first retry)

## Parallel Execution

### Run Tests in Parallel (Default)

```bash
npm test
```

### Run Tests Sequentially

```bash
npx playwright test --workers=1
```

### Specify Number of Workers

```bash
npx playwright test --workers=4
```

## Retry Configuration

### Run with Retries

```bash
npx playwright test --retries=2
```

### Run Without Retries

```bash
npx playwright test --retries=0
```

## Test Execution Scenarios

### Scenario 1: Full Test Suite Execution

```bash
# 1. Install dependencies
npm install

# 2. Install browsers
npx playwright install

# 3. Run all tests
npm test

# 4. View report
npm run test:report
```

**Expected Output:**

- 55 tests executed
- Results summary
- HTML report generated

### Scenario 2: Authentication Testing Only

```bash
# Run all authentication tests
npm run test:auth

# Run only positive login tests
npx playwright test src/tests/auth/login.positive.spec.ts

# Run only negative login tests
npx playwright test src/tests/auth/login.negative.spec.ts
```

### Scenario 3: Books Management Testing

```bash
# Run all books tests
npm run test:books

# Run only positive books tests
npx playwright test src/tests/books/books.positive.spec.ts

# Run only negative books tests
npx playwright test src/tests/books/books.negative.spec.ts
```

### Scenario 4: Integration Testing

```bash
# Run all integration tests
npm run test:integration

# Run specific integration test
npx playwright test src/tests/integration/auth-books.integration.spec.ts
```

### Scenario 5: Debugging Failed Tests

```bash
# Run in debug mode
npm run test:debug

# Run with headed browser
npm run test:headed

# Run in UI mode
npm run test:ui
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run tests
        run: npm test

      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## Test Execution Best Practices

### 1. Pre-Execution Checklist

- [ ] Application is running
- [ ] .env file is configured
- [ ] Dependencies are installed
- [ ] Browsers are installed
- [ ] Network connectivity is stable

### 2. During Execution

- [ ] Monitor test progress
- [ ] Check for unexpected failures
- [ ] Note any environment issues
- [ ] Capture screenshots of failures

### 3. Post-Execution

- [ ] Review test report
- [ ] Analyze failures
- [ ] Check logs for errors
- [ ] Document issues found

## Troubleshooting Test Execution

### Issue: Tests Not Running

**Solution:**

```bash
# Verify Node.js
node --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Install browsers
npx playwright install
```

### Issue: Application Not Found

**Solution:**

```bash
# Check BASE_URL in .env
cat .env

# Verify application is running
curl http://localhost:3000

# Update BASE_URL if needed
```

### Issue: Timeout Errors

**Solution:**

```bash
# Increase timeout in .env
TIMEOUT=60000

# Run with increased timeout
npx playwright test --timeout=60000
```

### Issue: Selector Not Found

**Solution:**

```bash
# Run in debug mode to inspect
npm run test:debug

# Check selectors in page objects
# Update selectors to match application UI
```

### Issue: Memory Issues

**Solution:**

```bash
# Run with fewer workers
npx playwright test --workers=1

# Run specific test file
npx playwright test src/tests/auth/login.positive.spec.ts
```

## Performance Optimization

### Reduce Execution Time

```bash
# Run only critical tests
npx playwright test --grep "TC_LOGIN_001|TC_BOOKS_001"

# Run in parallel with more workers
npx playwright test --workers=8
```

### Optimize for CI/CD

```bash
# Run without retries in CI
npx playwright test --retries=0

# Run only on specific browser
npx playwright test --project=chromium
```

## Test Execution Metrics

### Typical Execution Times

- Full suite (55 tests): ~5-10 minutes
- Authentication tests (20 tests): ~2-3 minutes
- Books tests (27 tests): ~3-4 minutes
- Integration tests (8 tests): ~1-2 minutes

### Success Rate Targets

- Positive tests: 100% pass rate
- Negative tests: 100% pass rate
- Integration tests: 100% pass rate

## Reporting and Analysis

### Generate Custom Report

```bash
# JSON report
npx playwright test --reporter=json

# JUnit report
npx playwright test --reporter=junit

# Multiple reporters
npx playwright test --reporter=html --reporter=json
```

### Analyze Test Results

```bash
# View HTML report
npm run test:report

# Check JSON results
cat test-results/results.json

# Check JUnit results
cat test-results/junit.xml
```

## Advanced Execution

### Run with Specific Configuration

```bash
# Custom timeout
npx playwright test --timeout=120000

# Custom retries
npx playwright test --retries=3

# Custom workers
npx playwright test --workers=2
```

### Run with Environment Variables

```bash
BASE_URL=http://staging.example.com npm test
ADMIN_USERNAME=testuser npm run test:auth
```

### Run with Custom Reporter

```bash
npx playwright test --reporter=html,json,junit
```

## Summary

The framework provides multiple ways to execute tests based on your needs:

- **Quick execution**: `npm test`
- **Interactive debugging**: `npm run test:ui`
- **Specific tests**: `npm run test:auth`
- **Detailed analysis**: `npm run test:report`

Choose the execution method that best fits your workflow and requirements.
