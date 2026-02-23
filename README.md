# Project Overview

This repository contains end-to-end tests for the application using Playwright. The tests are written in TypeScript and follow the Page Object Model (POM) design pattern to ensure maintainability and scalability.

## How to Run the Tests

1. **Install Dependencies**:
   Make sure you have Node.js installed. Then, install the required dependencies:
   ```bash
   npm install
   ```

2. **Install Playwright and Browsers**:
   Playwright requires its own browsers to be installed. Run the following command to install them:
   ```bash
   npx playwright install
   ```

3. **Run Tests**:
   To execute the tests, use the following command:
   ```bash
   npm run test
   ```
   This will run all the tests in the `tests/` directory.

4. **Run Tests in UI Mode**:
   If you want to debug tests using the Playwright Test Runner UI:
   ```bash
   npm run test:ui
   ```

5. **View Test Reports**:
   After running the tests, you can view the HTML report:
   ```bash
   npx playwright show-report
   ```

## Design Decisions

### Page Object Model (POM)
- **Why POM?**
  The Page Object Model is used to separate the test logic from the UI structure. This makes the tests easier to maintain and update when the UI changes.
- **Where are Page Objects stored?**
  All page objects are located in the `pages/` directory. Each file represents a specific page of the application (e.g., `ProductsPage.ts`, `CartPage.ts`, `CheckoutConfirmationPage.ts`).

### Test Structure
- **Test Files**:
  Test files are located in the `tests/` directory. They are organized by feature (e.g., `login/`, `checkout/`).
- **Authentication**:
  The `auth.setup.ts` file logs in a user and saves the storage state for authenticated tests.

### Configuration
- **Playwright Config**:
  The `playwright.config.ts` file contains shared settings, such as the `baseURL` and browser configurations. It also defines separate projects for unauthenticated and authenticated tests.
- **Environment Variables**:
  Sensitive data, such as credentials, should be stored in environment variables. Use a `.env` file for local development.

### Ignored Files
- Files like `auth/user.json` (used for storing authentication state) are ignored in `.gitignore` to prevent sensitive data from being committed.

## Notes
- Ensure that the `baseURL` in `playwright.config.ts` matches the environment you are testing.
- Use the `test:ui` mode for debugging failing tests.
