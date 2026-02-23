import {type Locator, type Page} from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.getByTestId('inventory-list');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
  }

  async addProductToCartAndGetPrice(productName: string): Promise<number> {
    const productLocator = this.page.getByTestId('inventory-item').filter({ hasText: productName });
    const priceText = await productLocator.getByTestId('inventory-item-price').textContent();
    const price = priceText ? parseFloat(priceText.replace('$', '')) : 0;
    await productLocator.getByRole('button', { name: 'Add to cart' }).click();
    return price;
  }
}