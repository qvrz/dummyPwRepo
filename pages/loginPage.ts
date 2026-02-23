import {type Locator, type Page} from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.submitButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }
}