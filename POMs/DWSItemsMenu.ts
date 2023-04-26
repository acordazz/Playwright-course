import { Page, expect, Locator } from "@playwright/test";

export class ItemsMenu {
  private readonly page: Page;
  private readonly MenuOptions: any;

  constructor(page: Page) {
    this.page = page;
    this.MenuOptions = {
      Electronics: this.page
        .getByRole("list")
        .filter({
          hasText:
            "Books Computers Desktops Notebooks Accessories Electronics Camera, photo Cell ph",
        })
        .getByRole("link", { name: "Electronics" }),
      Computers: this.page
        .getByRole("list")
        .filter({
          hasText:
            "Books Computers Desktops Notebooks Accessories Electronics Camera, photo Cell ph",
        })
        .getByRole("link", { name: "Computers" }),
      Apparel: this.page
        .getByRole("list")
        .filter({
          hasText:
            "Books Computers Desktops Notebooks Accessories Electronics Camera, photo Cell ph",
        })
        .getByRole("link", { name: "Apparel & Shoes" }),
    };
  }

  async goToMenuOption(option: string) {
    await this.MenuOptions[option].click();
  }
}
