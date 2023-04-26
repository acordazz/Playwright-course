import * as fs from "fs";
const path = require("path");
import { test, expect } from "@playwright/test";
import { Login } from "../POMs/DWSLogin";
import { TopMenu } from "../POMs/DWSTopMenu";
import { ItemsMenu } from "../POMs/DWSItemsMenu";
import { Item } from "../POMs/DWSItem";

const email = "acordazz@example1.test";
const password = "Tosca123!";

// test.beforeEach(async ({ page }) => {
//   await page.goto("https://demowebshop.tricentis.com/");
//   const topMenu = new TopMenu(page);
//   const loginPage = new Login(page);
//   await topMenu.gotoLogin();

//   await expect.soft(loginPage.recurringCustomer).toBeVisible({ timeout: 3000 });
//   await loginPage.doLogin(email, password);

//   await expect.soft(topMenu.MyAccountInfo).toBeVisible();
// });

test("Buy jeans", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");
  const itemsMenu = new ItemsMenu(page);
  await itemsMenu.goToMenuOption("Apparel");
  await page.getByRole("link", { name: "Blue Jeans", exact: true }).click();
  const blueJeans = new Item(page, "Blue Jeans");
  await blueJeans.addItemsToCart("5");
  
  // await page.getByRole('button', {name: 'Add to cart'}) // too many
  // await page.locator('#product-details-form div').filter({ hasText: 'Blue Jeans Jeans Availability: In stock 342 review(s) | Add your review 2.9 342 ' }) // still too many unless we use .nth(1)
  //   await page.locator(".product-item").filter({ hasText: "Blue and green Sneaker" }).getByRole("button", { name: "Add to cart" }).click(); // better, but dependent on a specific text
  //   await page.locator(".product-item").filter({ has: page.getByRole('link', { name: 'Blue and green Sneaker', exact: true })}).getByRole("button", { name: "Add to cart" }).click(); // also interesting, but notice that the Pick Locator doesn't find it
  //   await page.locator('#product-details-form > div > div.product-collateral > div.also-purchased-products-grid.product-grid').locator('div.item-box').nth(1).getByRole("button", { name: "Add to cart" }); // notice that I cannot get the sneaker

  //assertion
  await expect(
    page.getByText("The product has been added to your shopping cart")
  ).toBeVisible();
});

test.afterAll(async ({}) => {
  fs.writeFile(
    path.join(__dirname, "../playwright/.auth/user.json"),
    "{}",
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
});
