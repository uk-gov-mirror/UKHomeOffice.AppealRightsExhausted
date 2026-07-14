import { expect, Locator, Page } from '@playwright/test';

export class basePage {
  readonly page: Page;

  readonly headerText: Locator;
  readonly calculateButton: Locator;
  readonly startAgainButton: Locator;
  readonly errorSummaryTitle: Locator;
  readonly acceptCookieButton: Locator;
  readonly hideThisMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerText = page.locator('h1');
    this.calculateButton = page.locator("input[value='Calculate']");
    this.startAgainButton = page.locator("input[value='Start again']");
    this.errorSummaryTitle = page.locator('#error-summary-title');
    this.acceptCookieButton = page.locator('#accept-cookies-button');
    this.hideThisMessageButton = page.locator('#hide-accept-cookie-banner');
  }

  async navigateToUrl() {
    await this.page.goto('/');
  }

  async acceptCookiesIfPresent() {
    if (await this.acceptCookieButton.isVisible()) {
      await this.click(this.acceptCookieButton);
    }

    if (await this.hideThisMessageButton.isVisible()) {
      await this.click(this.hideThisMessageButton);
    }
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async type(locator: Locator, text: string) {
    await locator.fill(text);
    await this.page.keyboard.press('Tab');
  }

  async clickCalculateButton() {
    await this.click(this.calculateButton);
  }

  async clickStartAgainButton() {
    await this.click(this.startAgainButton);
  }

  async clickChangeButton(changeButtonId: string) {
    await this.page.locator(`#${changeButtonId}`).click();
  }

  async assertPageTitleOrHeader(expectedPage: string) {
    const title = await this.page.title();
    if (title === expectedPage) {
      await expect(this.page).toHaveTitle(expectedPage);
      return;
    }

    await expect(this.headerText).toHaveText(expectedPage);
  }

  async assertErrorSummaryTitleContains(expectedText: string) {
    await expect(this.errorSummaryTitle).toContainText(expectedText);
  }

  async assertErrorLinkIsVisible(errorLinkText: string) {
    await expect(this.page.getByRole('link', { name: errorLinkText })).toBeVisible();
  }
}