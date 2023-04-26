import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://advantageonlineshopping.com/#/');
  await page.getByRole('link', { name: 'SpeakersCategoryTxt' }).click();
  await page.getByRole('link', { name: 'TabletsCategoryTxt' }).click();
  await page.getByText('HP ElitePad 1000 G2 Tablet', { exact: true }).click();
  await page.locator('input[name="quantity"]').click();
  await page.locator('e-sec-plus-minus div').nth(3).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.getByRole('button', { name: 'CHECKOUT ($2,018.00)' }).click();
  await page.getByRole('link', { name: 'dvantage DEMO' }).click();
});


test('login', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('acordazz@example1.test');
  await page.getByLabel('Email:').press('Tab');
  await page.getByLabel('Password:').fill('Tosca123!');
  await page.getByRole('button', { name: 'Log in' }).click();
});
