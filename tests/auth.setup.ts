import { expect, test as setup } from '@playwright/test';
import { TopMenu } from '../POMs/DWSTopMenu';
import { Login } from '../POMs/DWSLogin';

const authFile = 'playwright/.auth/user.json';

const email = 'acordazz@example1.test';
const password = "Tosca123!";

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.

  console.log("in setup");
  await page.goto("https://demowebshop.tricentis.com/");
  const topMenu = new TopMenu(page, email);
  const loginPage = new Login(page);
  await topMenu.gotoLogin();

  await expect.soft(loginPage.recurringCustomer).toBeVisible({ timeout: 10000 });
  await loginPage.doLogin(email, password);

  await expect(topMenu.MyAccountInfo).toBeVisible();
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});