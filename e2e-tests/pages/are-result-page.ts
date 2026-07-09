import { expect, Page } from '@playwright/test';
import { basePage } from './base-page';

export class areResultPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async assertCalculatedAreDatePageContent() {
    await expect(this.page.getByRole('heading', { name: 'Calculated ARE date' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'The calculation is based on the following information:' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Current range of exclusion dates:' })).toBeVisible();
  }

  async clickChangeLink() {
    await this.clickChangeButton('appeal-stage-change');
  }
}
