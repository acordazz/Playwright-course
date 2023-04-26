import { Page, expect, Locator } from '@playwright/test';

export class TopMenu {

    
    private readonly Register: Locator;;
    private readonly LogIn: Locator;
    private readonly LogOut: Locator;
    private readonly ShoppingCart: Locator;
    private readonly WishList: Locator;
    readonly MyAccountInfo: Locator;
    private readonly page: Page;    

    constructor(page: Page, email = "") {
        this.page = page;
        this.Register = page.getByRole('link', { name: 'Register' })
        this.LogIn = this.page.getByRole('link', { name: 'Log in' })
        this.LogOut = this.page.getByRole('link', { name: 'Log out' })
        this.ShoppingCart = page.getByRole('link', { name: 'Shopping cart' })
        this.WishList = page.getByRole('link', { name: 'Wishlist (0)' })
        this.MyAccountInfo = page.getByRole('link', { name: email })
    }

    async gotoLogin() {
        // FILL UP
        this.LogIn.click();
    }



}

