import { Page, expect, Locator } from '@playwright/test';

export class Login {

  private readonly emailField: Locator;
  private readonly PasswordField: Locator;
  private readonly LoginButton: Locator;
  readonly recurringCustomer: Locator;
  private readonly page: Page;


  constructor(page: Page) {
      this.page = page;
      this.emailField = page.getByLabel('Email:')
      this.PasswordField = page.getByLabel('Password:')
      this.LoginButton = page.getByRole('button', { name: 'Log in' })
      this.recurringCustomer = page.getByText('Returning Customer')
  }

  async doLogin(email, password) {
    
    await this.emailField.fill(email);
    await this.emailField.press('Tab');
    await this.PasswordField.fill(password);
    await this.LoginButton.click();
  }

}