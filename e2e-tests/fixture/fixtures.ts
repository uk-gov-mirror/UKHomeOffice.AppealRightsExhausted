import { test as base } from 'playwright-bdd';
import { areFirstPage } from '../pages/are-first-page';
import { areResultPage } from '../pages/are-result-page';

type Pages = {
  areFirstPage: areFirstPage;
  areResultPage: areResultPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      areFirstPage: new areFirstPage(page),
      areResultPage: new areResultPage(page),
    });
  },
});

export const expect = test.expect;
