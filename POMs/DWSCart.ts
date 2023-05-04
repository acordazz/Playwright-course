import { Page, expect, Locator } from '@playwright/test';

export class Cart {

    
    private readonly RemoveFromCart: Locator;
    private readonly UpdateShoppingCart: Locator;
    private readonly page: Page;    

    constructor(page: Page, email = "") {
        this.page = page;
        this.RemoveFromCart = page.locator('input[name="removefromcart"]');
        this.UpdateShoppingCart = page.getByRole('button', { name: 'Update shopping cart' });
    }
    
    async removeFromCart(){
        await this.RemoveFromCart.check();
        await this.UpdateShoppingCart.click();
    }



}

