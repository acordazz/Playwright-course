import { test, expect } from "@playwright/test";

// tests in file run in parallel
test.describe.configure({ mode: "parallel" });

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

test("Wrong expect", async ({ page }) => {
  await page.goto("http://advantageonlineshopping.com/#/");
  expect(
    await page
      .getByRole("link", { name: "TabletsCategory", exact: true })
      .isVisible()
  ).toBe(true);
});

test("Right expect (web-first assertions)", async ({ page }) => {
  await page.goto("http://advantageonlineshopping.com/#/");
  await expect(
    page.getByRole("link", { name: "TabletsCategory", exact: true })
  ).toBeVisible();
});
