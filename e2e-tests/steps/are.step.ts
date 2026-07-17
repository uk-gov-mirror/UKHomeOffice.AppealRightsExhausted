import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { getAreScenarioDataById } from '../utility-helper/are-scenarios-lib';

export const { Given, When, Then } = createBdd(test);

let selectedAreScenarioId = '';

Given('Test data has been created for {string} scenarios', async ({}, serviceName: string) => {
  if (serviceName !== 'ARE') {
    throw new Error(`Unexpected service name: ${serviceName}`);
  }
});

Given('I selected the data for scenario {string} - {string}', async ({}, scenarioId: string, _description: string) => {
  selectedAreScenarioId = scenarioId;
});

When('I visit the Appeal Rights Exhausted Date Calculator page', async ({ pages }) => {
  await pages.areFirstPage.navigateToUrl();
  await pages.areFirstPage.acceptCookiesIfPresent();
});

Then('the user should be on {string} page', async ({ pages }, expectedPage: string) => {
  await pages.areFirstPage.assertPageTitleOrHeader(expectedPage);
});

When('I fill out my answers for ARE and continue', async ({ pages }) => {
  const scenarioData = getAreScenarioDataById(selectedAreScenarioId);
  await pages.areFirstPage.fillAreDateCalculatorPageData(
    scenarioData.countryOfHearing,
    scenarioData.appealStage,
    scenarioData.promulgationDate
  );
  await pages.areFirstPage.clickCalculateButton();
});

Then('I can validate content for ARE', async ({ pages }) => {
  await pages.areFirstPage.assertAreDateCalculatorPageContent();
  const scenarioData = getAreScenarioDataById(selectedAreScenarioId);
  await pages.areFirstPage.fillAreDateCalculatorPageData(
    scenarioData.countryOfHearing,
    scenarioData.appealStage,
    scenarioData.promulgationDate
  );
  await pages.areFirstPage.clickCalculateButton();
  await pages.areResultPage.assertCalculatedAreDatePageContent();
});

Then('I can validate error for ARE', async ({ pages }) => {
  await pages.areFirstPage.validateRequiredErrors();
});

When('I click Start Again button from Calculated ARE date page', async ({ pages }) => {
  await pages.areResultPage.clickStartAgainButton();
});

When('the user selected {string}, {string} and valid {string} and click on Calculate button', async ({ pages }, country: string, appealStage: string, promulgationDate: string) => {
  await pages.areFirstPage.fillAreDateCalculatorPageData(country, appealStage, promulgationDate);
  await pages.areFirstPage.clickCalculateButton();
});

Then('the user should see appeal stage {string} error', async ({ pages }, error: string) => {
  await pages.areFirstPage.assertAppealStageError(error);
});

Then('the user should see Promulgation Date {string} error', async ({ pages }, error: string) => {
  await pages.areFirstPage.assertPromulgationDateError(error);
});

When('I click on Change link from Calculated ARE date page', async ({ pages }) => {
  await pages.areResultPage.clickChangeLink();
});
