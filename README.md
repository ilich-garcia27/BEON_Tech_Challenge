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

## Postman API Automation

The Postman files exercise the [Restful Booker API](https://restful-booker.herokuapp.com/apidoc/index.html), independently of the Swag Labs Cypress tests. The collection covers authentication and a booking lifecycle: create, read, update, delete, then verify the deleted booking returns `404`.

### Import and Configure

1. In Postman, choose **Import** and import both `BEON Tech.postman_collection.json` and `BEON Tech.postman_environment.json`.
2. Select the `BEON Tech` environment in the environment selector.
3. Set `baseUrl` to `https://restful-booker.herokuapp.com` (without a trailing slash).
4. Add `username` and `password` to the selected environment using credentials accepted by the target API. Environment values take precedence over the empty collection variables. Keep credentials in a private environment and do not export or commit them.
5. To run the full flow, open the collection, choose **Run**, select the `BEON Tech` environment, and run all requests in their existing order.

The requests depend on state created by earlier requests: `Create Token` stores `token`, and `Create Booking` stores `bookingid`. Run the full collection in order, or run individual requests only after their prerequisite variables have been set. The collection-level pre-request script initializes the JSON schemas used by the tests.

## Bug Report

### Title

Selecting a product opens the details page for a different product

### Description

When a user selects a product from the Swag Labs inventory, the application may navigate to the details page of a different product instead of the selected one. This can cause the user to view or choose the wrong item.

### Steps to Reproduce

1. Open the Swag Labs application.
2. Log in with the following test account credentials: Username - problem_user, Password - secret_sauce
3. On the inventory page, select a product by clicking its name or image.
4. Observe the product details page that opens.

### Expected vs Actual Results

- **Expected:** The details page matches the product selected from the inventory.
- **Actual:** The details page shows a different product.

### Severity

**Medium:** Product navigation is incorrect and may lead users to inspect or select the wrong item, but the issue does not prevent access to the application as a whole.