import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

const username = "fakeuser";
const email = "fakeemail@fake.com";
const password = "FakeEmail.01";

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://advantageonlineshopping.com/#/');
  
  await page.getByRole('link', { name: 'UserMenu' }).getByTitle('USER').click();
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'SIGN IN' }).click();
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('link', { name: 'UserMenu' }).getByText(username)).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});