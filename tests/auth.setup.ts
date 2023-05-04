import * as fs from "fs";
import { expect, test as setup } from '@playwright/test';
import { TopMenu } from '../POMs/DWSTopMenu';
import { Login } from '../POMs/DWSLogin';
import path = require('path');

const authFile = 'playwright/.auth/user.json';

const email = 'acordazz@example1.test';
const password = "Tosca123!";

setup('authenticate', async ({ page }) => {

  // clean user.json file before usage
    fs.writeFile(
      path.join(__dirname, "../playwright/.auth/user.json"),
      "{}",
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );


  // Perform authentication steps. 

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