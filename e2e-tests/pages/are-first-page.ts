import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { mapCountryLabelToFieldValue, splitDate } from '../utility-helper/are-scenarios-lib';

export class areFirstPage extends basePage {
  readonly appealStageSelect: Locator;
  readonly startDateDay: Locator;
  readonly startDateMonth: Locator;
  readonly startDateYear: Locator;

  constructor(page: Page) {
    super(page);
    this.appealStageSelect = page.locator('#appeal-stage');
    this.startDateDay = page.locator('#start-date-day');
    this.startDateMonth = page.locator('#start-date-month');
    this.startDateYear = page.locator('#start-date-year');
  }

  async assertAreDateCalculatorPageContent() {
    await expect(this.page.getByText('Appeal Rights Exhausted Date Calculator')).toBeVisible();
    await expect(this.page.getByText('What country was the appeal lodged?')).toBeVisible();
    await expect(this.page.getByLabel('England & Wales')).toBeVisible();
    await expect(this.page.getByLabel('Scotland')).toBeVisible();
    await expect(this.page.getByLabel('Northern Ireland')).toBeVisible();
    await expect(this.page.getByText('What is the appeal stage?')).toBeVisible();
    await expect(this.page.getByText('Choose an appeal stage from the drop down menu')).toBeVisible();
    await expect(this.page.getByText('Promulgation date')).toBeVisible();
    await expect(this.page.getByText('For example, 11  6  2015')).toBeVisible();
  }

  async fillAreDateCalculatorPageData(country: string, appealStage: string, promulgationDate: string) {
    const countryValue = mapCountryLabelToFieldValue(country);
    const { day, month, year } = splitDate(promulgationDate);

    await this.page.locator(`#country-of-hearing-${countryValue}`).check({ force: true });
    await this.appealStageSelect.selectOption({ label: appealStage });
    await this.type(this.startDateDay, day);
    await this.type(this.startDateMonth, month);
    await this.type(this.startDateYear, year);
  }

  async validateRequiredErrors() {
    await this.clickCalculateButton();
    await this.assertErrorSummaryTitleContains('Please fix the following error');
    await this.assertErrorLinkIsVisible('Select where the appeal hearing is to be held');
    await this.assertErrorLinkIsVisible('Select an appeal stage');
    await this.assertErrorLinkIsVisible('Enter the promulgation date for the calculation');
  }

  async assertAppealStageError(error: string) {
    await this.assertErrorLinkIsVisible(error);
    await expect(this.page.locator('#country-of-hearing-error')).toContainText(error);
  }

  async assertPromulgationDateError(error: string) {
    await this.assertErrorLinkIsVisible(error);
    await expect(this.page.locator('#start-date-error')).toContainText(error);
  }
}
