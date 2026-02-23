import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'retain-on-failure',
    testIdAttribute: 'data-test',
  },

  /* Configure projects for major browsers */
  projects: [
    /* Setup project - runs authentication once before all tests */
    {
      name: 'setup',
      testMatch: '**/*auth.setup.ts',
    },

    /* Chromium - Login tests (NO storage state - test from unauthenticated state) */
    {
      name: 'chromium-login',
      testMatch: '**/login/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    /* Chromium - Authenticated tests (uses storage state from setup) */
    {
      name: 'chromium',
      testMatch: '**/checkout/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
