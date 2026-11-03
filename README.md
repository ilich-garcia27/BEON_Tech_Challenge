# Cypress E2E Automation

End-to-end tests for the Swag Labs shopping flow. Tests are written in Gherkin and run with Cypress and the Badeball Cucumber preprocessor.

## Requirements

- Node.js supported by the installed Cypress version
- npm

## Setup

Install the project dependencies:

```bash
npm ci
```

Create the QA environment file from the example:

```powershell
Copy-Item .env.example .env.qa
```

Update `.env.qa` with credentials for the target test account:

```dotenv
BASE_URL=https://www.saucedemo.com
VALID_USERNAME=your_test_username
VALID_PASSWORD=your_test_password
```

Do not commit `.env.qa` or put private credentials in source files. Cypress reads the credentials with `cy.env()`.

## Run Tests

Open Cypress and select scenarios tagged `@wip` or `@e2e`:

```bash
npm run test:wip:qa
npm run test:e2e:qa
```

Run either selection headlessly:

```bash
npx cypress run --env environment=qa --expose "tags=@wip"
npx cypress run --env environment=qa --expose "tags=@e2e"
```

The Cucumber preprocessor reads its tag expression from Cypress's exposed `tags` value. Tag expressions can also be combined, for example:

```bash
npx cypress run --env environment=qa --expose "tags=@regression and not @wip"
```

The feature has the `@e2e` and `@regression` tags, and its only scenario currently has the `@wip` tag. Feature tags are inherited by the scenario, so both `@wip` and `@e2e` currently select the same scenario.

## Current Scenario

The scenario in `cypress/e2e/swagLabsPurchase.feature`:

1. Logs in to Swag Labs with the QA account.
2. Adds Sauce Labs Bike Light and Sauce Labs Bolt T-Shirt to the cart.
3. Checks that both products are present with quantity 1.
4. Completes checkout and verifies the order confirmation.

## Project Structure

```text
cypress/
  e2e/                         Gherkin feature files
  fixtures/                    Test fixtures
  page_objects/                Page objects for login, cart, and checkout
  support/
    step_definitions/          Cucumber step definitions
    commands.js                Custom Cypress commands
    e2e.js                     Cypress support entry point
cypress.config.js              Cypress and Cucumber configuration
package.json                   Dependencies and npm scripts
```

Cypress saves videos, screenshots, and downloads under `cypress/`; these generated artifacts are excluded from Git.