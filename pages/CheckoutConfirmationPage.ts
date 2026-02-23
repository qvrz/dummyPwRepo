import {type Locator, type Page} from '@playwright/test';

export class CheckoutConfirmationPage {
  readonly page: Page;
  readonly itemTotalPriceLabel: Locator;
  readonly taxPriceLabel: Locator;
  readonly orderTotalPriceLabel: Locator;
  readonly finishOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemTotalPriceLabel = page.getByTestId('subtotal-label');
    this.taxPriceLabel = page.getByTestId('tax-label');
    this.orderTotalPriceLabel = page.getByTestId('total-label');
    this.finishOrderButton = page.getByTestId('finish');
  }

  async getItemTotal(): Promise<number> {
    const priceText = await this.itemTotalPriceLabel.textContent();
    return priceText ? parseFloat(priceText.replace('Item total: $', '')) : 0;
  }

  async getTax(): Promise<number> {
    const taxText = await this.taxPriceLabel.textContent();
    return taxText ? parseFloat(taxText.replace('Tax: $', '')) : 0;
  }

  async getOrderTotal(): Promise<number> {
    const totalText = await this.orderTotalPriceLabel.textContent();
    return totalText ? parseFloat(totalText.replace('Total: $', '')) : 0;
  }
}