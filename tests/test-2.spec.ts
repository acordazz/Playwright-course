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