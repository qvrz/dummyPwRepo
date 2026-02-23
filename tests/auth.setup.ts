import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { standardUser } from '../utils/testData';

const authFile = 'auth/user.json';

/**
 * Setup project - Authenticates as standard_user and saves storage state
 * This runs once before all tests and creates an authentication file
 * that can be reused by tests to avoid re-authenticating
 */
setup('authenticate as standard user', async ({ page }) => {
  // Navigate to login page
  await page.goto('/');

  // Perform login
  const loginPage = new LoginPage(page);
  await loginPage.loginInput.fill(standardUser.username);
  await loginPage.passwordInput.fill(standardUser.password);
  await loginPage.submitButton.click();

  await page.waitForURL('/inventory.html');

  await page.context().storageState({ path: authFile });
});
