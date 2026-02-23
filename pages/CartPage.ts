import {type Locator, type Page} from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly inventoryPrice: Locator;
  readonly checkoutButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.inventoryPrice = page.getByTestId('inventory-item-price');
    this.checkoutButton = page.getByTestId('checkout');

  }

  async getCartTotal(): Promise<number> {
    const totalText = await this.inventoryPrice.allTextContents();
    const prices = totalText.map(price => parseFloat(price.replace('$', '')));
    return prices.reduce((total, price) => total + price, 0);
  }
}