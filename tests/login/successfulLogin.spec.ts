import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { standardUser } from '../../utils/testData';

test.describe('Login Page tests - successful cases', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    test('User is able to login via UI using valid credentials of Standard User', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        
        await loginPage.loginInput.fill(standardUser.username);
        await loginPage.passwordInput.fill(standardUser.password);
        await loginPage.submitButton.click();

        await expect(page).toHaveURL('/inventory.html');
        await expect(productsPage.inventoryList).toBeVisible();
    });

    test.skip('User is able to login via UI using valid credentials of Problem User', async ({ page }) => {
        //TODO...
    });
});
