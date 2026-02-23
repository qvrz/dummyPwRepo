import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutInformationPage } from '../../pages/checkoutInformationPage';
import { CheckoutConfirmationPage } from '../../pages/checkoutConfirmationPage';

test.describe('Process Checkout', () => {
  const productsToAdd = ['Sauce Labs Backpack']; 

  test('should add products to cart and verify total price', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutConfirmationPage = new CheckoutConfirmationPage(page);

    await page.goto('/inventory.html');

    // Add products to cart
    const productPrices = [];
    for (const product of productsToAdd) {
      const price = await productsPage.addProductToCartAndGetPrice(product);
      productPrices.push(price);
    }

    // Calculate expected total price
    const expectedItemsTotalPrice = productPrices.reduce((total, price) => total + price, 0);

    // Navigate to cart page
    await productsPage.shoppingCartLink.click();

    // Verify total price in cart
    const cartTotal = await cartPage.getCartTotal();
    expect(cartTotal).toBe(expectedItemsTotalPrice);

    // Proceed to checkout
    await cartPage.checkoutButton.click();

    // Fill in checkout details
    await checkoutInformationPage.fillCheckoutDetails('John', 'Doe', '12345');
    await checkoutInformationPage.continueButton.click();

    // Verify total price on checkout confirmation page
    const checkoutTotalPrice = await checkoutConfirmationPage.getItemTotal();
    expect(checkoutTotalPrice).toBe(expectedItemsTotalPrice);
    const tax = await checkoutConfirmationPage.getTax();
    const finalTotalPrice = expectedItemsTotalPrice + tax;
    const orderTotal = await checkoutConfirmationPage.getOrderTotal();
    expect(orderTotal).toBe(finalTotalPrice);

    await expect(checkoutConfirmationPage.finishOrderButton).toBeEnabled();
  });
});

