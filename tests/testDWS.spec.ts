import { test, expect } from "@playwright/test";
import { Login } from "../POMs/DWSLogin";
import { TopMenu } from "../POMs/DWSTopMenu";
import { ItemsMenu } from "../POMs/DWSItemsMenu";
import { Item } from "../POMs/DWSItem";
import { Cart } from "../POMs/DWSCart";

const email = "acordazz@example1.test";
const password = "Tosca123!";
const useAuthConfig = true; //toggle to use auth.setup.ts as authentication procedure

if (!useAuthConfig) {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const topMenu = new TopMenu(page);
    const loginPage = new Login(page);
    await topMenu.gotoLogin();

    await expect
      .soft(loginPage.recurringCustomer)
      .toBeVisible({ timeout: 3000 });
    await loginPage.doLogin(email, password);
  });
}

test("Buy jeans", async ({ page }) => {
  if (useAuthConfig) { // you need to enter the address in the browser only if you haven't called test.beforeEach()
    await page.goto("https://demowebshop.tricentis.com/");
  }
  const itemsMenu = new ItemsMenu(page);
  await itemsMenu.goToMenuOption("Apparel");
  await page.getByRole("link", { name: "Blue Jeans", exact: true }).click();
  const blueJeans = new Item(page, "Blue Jeans");
  await blueJeans.addItemsToCart("5");

  //assertion
  await expect(
    page.getByText("The product has been added to your shopping cart")
  ).toBeVisible();
});

test.afterAll(async ({ page }) => {
  const topMenu = new TopMenu(page);
  await topMenu.goToCart();
  const cart = new Cart(page);
  await cart.removeFromCart();
  await topMenu.logOut();
});
