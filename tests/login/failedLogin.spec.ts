import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { lockedOutUser } from '../../utils/testData';

test.describe('Login Page tests - negative cases', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    test('User is not able to proceed using Locked Out User credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.loginInput.fill(lockedOutUser.username);
        await loginPage.passwordInput.fill(lockedOutUser.password);
        await loginPage.submitButton.click();

        await expect(page).not.toHaveURL('/inventory.html');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test.skip('User is NOT able to login with empty username and password', async ({ page }) => {
        //TODO...
    });
});
