import { test, expect } from '@playwright/test';
import { Login } from '../POMs/DWSLogin';
import { TopMenu } from '../POMs/DWSTopMenu';

const email = 'acordazz@example1.test'
const password = 'Tosca123!'

test.beforeEach(async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/')
    const topMenu = new TopMenu(page);
    const loginPage = new Login(page);
    await topMenu.gotoLogin();

    await expect.soft(loginPage.recurringCustomer).toBeVisible({timeout: 3000});
    await loginPage.doLogin(email, password);

    await expect.soft(topMenu.MyAccountInfo).toBeVisible();
})

test('test', async ({ page }) => {
    await page.getByRole('list').filter({ hasText: 'Books Computers Desktops Notebooks Accessories Electronics Camera, photo Cell ph' }).getByRole('link', { name: 'Apparel & Shoes' }).click();
    await page.getByRole('link', { name: 'Blue Jeans', exact: true }).click();
    await page.getByLabel('Qty:').click();
    await page.getByLabel('Qty:').fill('5');
    await page.locator('#add-to-cart-button-36').click();
});