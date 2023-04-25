import { Page, expect, Locator } from '@playwright/test';

export class Login {

  readonly emailField: Locator;
  readonly PasswordField: Locator;
  readonly LoginButton: Locator;
  readonly page: Page;
  readonly email = ''
  readonly password = ''


  constructor(page: Page) {
      this.page = page;
      this.emailField = page.getByLabel('Email:')
      this.PasswordField = page.getByLabel('Password:')
      this.LoginButton = page.getByRole('button', { name: 'Log in' })
  }

  async doLogin() {
    
    await this.emailField.fill(this.email);
    await this.emailField.press('Tab');
    await this.PasswordField.fill(this.password);
    await this.LoginButton.click();
  }

}