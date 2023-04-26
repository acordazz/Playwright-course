import { Page, expect, Locator } from '@playwright/test';

export class Item {

    private readonly page: Page;
  private readonly MenuOptions: any;
  private readonly quantity: Locator;
  private addButton: Locator;


  constructor(page: Page, itemName: string) {
      this.page = page;
      this.quantity = page.getByLabel('Qty:');
      this.addButton = page.locator(".product-essential").filter({ hasText: "Blue Jeans" }).getByRole("button", { name: "Add to cart" });
  }
  
  async addItemsToCart(quantity: string) {
    await this.quantity.fill(quantity);
    await this.addButton.click();
  }

}