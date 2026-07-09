# E2E Tests

This folder contains the Playwright BDD end-to-end tests for the ARE service.

## Structure

- `features/` contains Gherkin scenarios.
- `steps/` contains step definitions.
- `fixture/` contains shared Playwright fixtures and page object wiring.
- `pages/` contains page objects for page-level interactions.
- `utility-helper/` contains reusable test data and helper methods.

## Run

1. Install dependencies: `npm install`
2. Install Playwright browser: `npx playwright install chromium`
3. Run tests: `npm run test:e2e`
