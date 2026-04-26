# Test Case Combinations & Coverage Matrix

## Overview

This document outlines all test case combinations and coverage for the Books Inventory App testing framework.

## Test Coverage Summary

| Category         | Positive | Negative | Integration | Total  |
| ---------------- | -------- | -------- | ----------- | ------ |
| Authentication   | 8        | 12       | -           | 20     |
| Books Management | 12       | 15       | -           | 27     |
| Integration      | -        | -        | 8           | 8      |
| **TOTAL**        | **20**   | **27**   | **8**       | **55** |

## Authentication Test Combinations

### Positive Test Combinations (8 tests)

#### 1. Valid Credentials Combinations

| Test ID      | Username | Password | Expected Result          |
| ------------ | -------- | -------- | ------------------------ |
| TC_LOGIN_001 | admin    | admin    | ✅ Login Success         |
| TC_LOGIN_007 | admin    | admin    | ✅ Redirect to Dashboard |
| TC_LOGIN_008 | admin    | admin    | ✅ Logout Button Visible |

#### 2. Form Validation Combinations

| Test ID      | Field         | Action      | Expected Result   |
| ------------ | ------------- | ----------- | ----------------- |
| TC_LOGIN_003 | Username      | Enter Value | ✅ Value Accepted |
| TC_LOGIN_004 | Password      | Enter Value | ✅ Value Accepted |
| TC_LOGIN_005 | Submit Button | Click       | ✅ Form Submitted |

#### 3. UI Element Combinations

| Test ID      | Element    | Expected Result           |
| ------------ | ---------- | ------------------------- |
| TC_LOGIN_002 | Login Form | ✅ All Fields Visible     |
| TC_LOGIN_006 | Login Page | ✅ Loads on Initial Visit |

### Negative Test Combinations (12 tests)

#### 1. Invalid Credentials Combinations

| Test ID          | Username    | Password      | Expected Result |
| ---------------- | ----------- | ------------- | --------------- |
| TC_LOGIN_NEG_001 | invaliduser | wrongpassword | ❌ Login Failed |
| TC_LOGIN_NEG_002 | admin       | wrongpassword | ❌ Login Failed |
| TC_LOGIN_NEG_003 | invaliduser | admin         | ❌ Login Failed |

#### 2. Empty Field Combinations

| Test ID          | Username | Password | Expected Result  |
| ---------------- | -------- | -------- | ---------------- |
| TC_LOGIN_NEG_004 | (empty)  | admin    | ❌ Error Message |
| TC_LOGIN_NEG_005 | admin    | (empty)  | ❌ Error Message |
| TC_LOGIN_NEG_006 | (empty)  | (empty)  | ❌ Error Message |

#### 3. Error Handling Combinations

| Test ID          | Scenario          | Expected Result          |
| ---------------- | ----------------- | ------------------------ |
| TC_LOGIN_NEG_007 | Failed Login      | ❌ Error Displayed       |
| TC_LOGIN_NEG_008 | Failed Login      | ❌ Remain on Login Page  |
| TC_LOGIN_NEG_009 | Failed Login      | ❌ Form Still Visible    |
| TC_LOGIN_NEG_010 | Multiple Failures | ❌ Error on Each Attempt |

#### 4. Security Test Combinations

| Test ID          | Attack Type   | Payload                       | Expected Result   |
| ---------------- | ------------- | ----------------------------- | ----------------- |
| TC_LOGIN_NEG_011 | SQL Injection | admin' OR '1'='1              | ❌ Safely Handled |
| TC_LOGIN_NEG_012 | XSS           | <script>alert("xss")</script> | ❌ Safely Handled |

## Books Management Test Combinations

### Positive Test Combinations (12 tests)

#### 1. Add Book with Valid Data Combinations

| Test ID      | Title            | Author              | ISBN           | Price   | Quantity | Expected Result |
| ------------ | ---------------- | ------------------- | -------------- | ------- | -------- | --------------- |
| TC_BOOKS_001 | The Great Gatsby | F. Scott Fitzgerald | 978-0743273565 | 10.99   | 5        | ✅ Book Added   |
| TC_BOOKS_011 | Multiple Books   | Various             | Various        | Various | Various  | ✅ All Added    |

#### 2. Form Field Combinations

| Test ID      | Field    | Action | Expected Result   |
| ------------ | -------- | ------ | ----------------- |
| TC_BOOKS_003 | Title    | Fill   | ✅ Value Accepted |
| TC_BOOKS_004 | Author   | Fill   | ✅ Value Accepted |
| TC_BOOKS_005 | ISBN     | Fill   | ✅ Value Accepted |
| TC_BOOKS_006 | Price    | Fill   | ✅ Value Accepted |
| TC_BOOKS_007 | Quantity | Fill   | ✅ Value Accepted |

#### 3. UI Element Combinations

| Test ID      | Element         | Expected Result       |
| ------------ | --------------- | --------------------- |
| TC_BOOKS_002 | Add Book Form   | ✅ All Fields Visible |
| TC_BOOKS_008 | Cancel Button   | ✅ Form Cancelled     |
| TC_BOOKS_009 | Books Table     | ✅ Visible            |
| TC_BOOKS_010 | Add Book Button | ✅ Visible            |
| TC_BOOKS_012 | Book List       | ✅ Displayed          |

### Negative Test Combinations (15 tests)

#### 1. Missing Required Fields Combinations

| Test ID          | Title   | Author  | ISBN    | Price   | Quantity | Expected Result |
| ---------------- | ------- | ------- | ------- | ------- | -------- | --------------- |
| TC_BOOKS_NEG_001 | (empty) | Author  | ISBN    | Price   | Qty      | ❌ Error        |
| TC_BOOKS_NEG_002 | Title   | (empty) | ISBN    | Price   | Qty      | ❌ Error        |
| TC_BOOKS_NEG_003 | Title   | Author  | (empty) | Price   | Qty      | ❌ Error        |
| TC_BOOKS_NEG_004 | Title   | Author  | ISBN    | (empty) | Qty      | ❌ Error        |
| TC_BOOKS_NEG_005 | Title   | Author  | ISBN    | Price   | (empty)  | ❌ Error        |
| TC_BOOKS_NEG_011 | (empty) | (empty) | (empty) | (empty) | (empty)  | ❌ Error        |

#### 2. Invalid Format Combinations

| Test ID          | Field    | Invalid Value | Expected Result |
| ---------------- | -------- | ------------- | --------------- |
| TC_BOOKS_NEG_006 | Price    | invalid       | ❌ Error        |
| TC_BOOKS_NEG_007 | Quantity | invalid       | ❌ Error        |
| TC_BOOKS_NEG_008 | ISBN     | invalid-isbn  | ❌ Error        |

#### 3. Invalid Value Combinations

| Test ID          | Field    | Invalid Value | Expected Result |
| ---------------- | -------- | ------------- | --------------- |
| TC_BOOKS_NEG_009 | Price    | -10.99        | ❌ Error        |
| TC_BOOKS_NEG_010 | Quantity | -5            | ❌ Error        |

#### 4. Security Test Combinations

| Test ID          | Field        | Attack Type   | Payload                       | Expected Result   |
| ---------------- | ------------ | ------------- | ----------------------------- | ----------------- |
| TC_BOOKS_NEG_012 | Title        | XSS           | <script>alert("xss")</script> | ❌ Safely Handled |
| TC_BOOKS_NEG_013 | Author       | SQL Injection | '; DROP TABLE books; --       | ❌ Safely Handled |
| TC_BOOKS_NEG_014 | Title/Author | Special Chars | @#$%                          | ❌ Handled        |
| TC_BOOKS_NEG_015 | Title        | Long Input    | A\*500                        | ❌ Handled        |

## Integration Test Combinations (8 tests)

### Complete Workflow Combinations

| Test ID    | Workflow         | Steps                                | Expected Result      |
| ---------- | ---------------- | ------------------------------------ | -------------------- |
| TC_INT_001 | Login → Add Book | 1. Login 2. Add Book                 | ✅ Complete          |
| TC_INT_002 | Direct Access    | Access /books without login          | ❌ Redirect to Login |
| TC_INT_003 | Logout           | Login → Logout                       | ✅ Redirect to Login |
| TC_INT_004 | Full Cycle       | Login → Add Book → Logout            | ✅ Complete          |
| TC_INT_005 | Failed Login     | Invalid Credentials → Access Books   | ❌ Denied            |
| TC_INT_006 | Multiple Books   | Login → Add 3 Books                  | ✅ All Added         |
| TC_INT_007 | Session Persist  | Login → Add Book → Check Session     | ✅ Active            |
| TC_INT_008 | Error Recovery   | Login → Invalid Book → Check Session | ✅ Active            |

## Test Execution Combinations

### By Feature

```
Authentication Tests (20)
├── Positive (8)
│   ├── Valid Login (3)
│   ├── Form Validation (3)
│   └── UI Elements (2)
└── Negative (12)
    ├── Invalid Credentials (3)
    ├── Empty Fields (3)
    ├── Error Handling (4)
    └── Security (2)

Books Management Tests (27)
├── Positive (12)
│   ├── Add Book (2)
│   ├── Form Fields (5)
│   └── UI Elements (5)
└── Negative (15)
    ├── Missing Fields (6)
    ├── Invalid Formats (3)
    ├── Invalid Values (2)
    └── Security (4)

Integration Tests (8)
├── Workflows (8)
```

### By Execution Time

```
Quick Tests (< 1 min)
├── Form Validation Tests (5)
├── UI Element Tests (5)
└── Error Handling Tests (4)

Standard Tests (1-2 min)
├── Login Tests (10)
├── Book Management Tests (15)
└── Integration Tests (4)

Full Suite (5-10 min)
└── All 55 Tests
```

### By Risk Level

```
Critical Tests (Must Pass)
├── TC_LOGIN_001 - Valid Login
├── TC_BOOKS_001 - Add Book
├── TC_INT_001 - Login & Add Book
└── TC_INT_003 - Logout

High Priority Tests
├── All Negative Login Tests (12)
├── All Negative Books Tests (15)
└── All Integration Tests (8)

Medium Priority Tests
├── Form Validation Tests (8)
├── UI Element Tests (10)
└── Error Handling Tests (4)
```

## Test Data Combinations

### Login Test Data Matrix

```
Valid Credentials:
├── admin / admin ✅

Invalid Credentials:
├── invaliduser / wrongpassword ❌
├── admin / wrongpassword ❌
├── invaliduser / admin ❌
├── (empty) / admin ❌
├── admin / (empty) ❌
├── (empty) / (empty) ❌
├── admin' OR '1'='1 / password ❌
└── <script>alert("xss")</script> / password ❌
```

### Books Test Data Matrix

```
Valid Books:
├── The Great Gatsby / F. Scott Fitzgerald / 978-0743273565 / 10.99 / 5 ✅
├── To Kill a Mockingbird / Harper Lee / 978-0061120084 / 12.99 / 3 ✅
└── 1984 / George Orwell / 978-0451524935 / 13.99 / 10 ✅

Invalid Books:
├── (empty) / Author / ISBN / Price / Qty ❌
├── Title / (empty) / ISBN / Price / Qty ❌
├── Title / Author / (empty) / Price / Qty ❌
├── Title / Author / ISBN / (empty) / Qty ❌
├── Title / Author / ISBN / Price / (empty) ❌
├── Title / Author / ISBN / invalid / Qty ❌
├── Title / Author / ISBN / Price / invalid ❌
├── Title / Author / invalid-isbn / Price / Qty ❌
├── Title / Author / ISBN / -10.99 / Qty ❌
├── Title / Author / ISBN / Price / -5 ❌
├── <script>alert("xss")</script> / Author / ISBN / Price / Qty ❌
├── Title / '; DROP TABLE books; -- / ISBN / Price / Qty ❌
├── Title@#$% / Author@#$% / ISBN / Price / Qty ❌
└── A*500 / Author / ISBN / Price / Qty ❌
```

## Coverage Analysis

### Feature Coverage

- **Authentication**: 100% (20/20 tests)
- **Books Management**: 100% (27/27 tests)
- **Integration**: 100% (8/8 tests)

### Scenario Coverage

- **Positive Scenarios**: 36% (20/55 tests)
- **Negative Scenarios**: 49% (27/55 tests)
- **Integration Scenarios**: 15% (8/55 tests)

### Test Type Coverage

- **Functional Tests**: 80% (44/55 tests)
- **Security Tests**: 11% (6/55 tests)
- **UI Tests**: 9% (5/55 tests)

## Execution Recommendations

### Daily Execution

```bash
npm test
# Runs all 55 tests
# Expected time: 5-10 minutes
```

### Pre-Release Execution

```bash
npm run test:auth
npm run test:books
npm run test:integration
npm run test:report
# Comprehensive testing with detailed report
```

### Smoke Testing

```bash
npx playwright test --grep "TC_LOGIN_001|TC_BOOKS_001|TC_INT_001"
# Quick validation of critical paths
# Expected time: < 1 minute
```

### Regression Testing

```bash
npm run test:negative
# Focus on negative scenarios
# Expected time: 3-5 minutes
```

## Summary

The framework provides comprehensive test coverage with:

- **55 total test cases**
- **20 authentication tests** (8 positive, 12 negative)
- **27 books management tests** (12 positive, 15 negative)
- **8 integration tests**
- **Security testing** (SQL injection, XSS)
- **Multiple execution combinations**
- **Flexible test selection options**

This ensures thorough validation of the Books Inventory App across all features and scenarios.
