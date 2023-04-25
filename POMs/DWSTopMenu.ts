import { Page, expect, Locator } from '@playwright/test';

export class TopMenu {

    
    readonly Register: Locator;;
    readonly LogIn: Locator;
    readonly ShoppingCart: Locator;
    readonly WishList: Locator;
    readonly MyAccountInfo: Locator;
    readonly page: Page;    

    constructor(page: Page, email = "") {
        this.page = page;
        this.Register = page.getByRole('link', { name: 'Register' })
        this.LogIn = this.page.getByRole('link', { name: 'Log in' })
        this.ShoppingCart = page.getByRole('link', { name: 'Shopping cart (0)' })
        this.WishList = page.getByRole('link', { name: 'Wishlist (0)' })
        this.MyAccountInfo = page.getByRole('link', { name: email })
    }



}

