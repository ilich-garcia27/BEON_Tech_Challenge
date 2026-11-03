import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../page_objects/LoginPage';
import DashboardPage from '../../page_objects/DashboardPage';
import YourCartPage from '../../page_objects/YourCartPage';
import OverviewPage from '../../page_objects/OverviewPage';
import CompleteCheckoutPage from '../../page_objects/CompleteCheckoutPage';
import CheckoutPage from '../../page_objects/CheckoutYourInformationPage';

// GIVENs.

Given('the user opens the Login page', () => {
  LoginPage.visit();
});

// WHENs.

When('the user enters valid credentials', () => {
  cy.env(['VALID_USERNAME', 'VALID_PASSWORD'], { log: false }).then(({ VALID_USERNAME, VALID_PASSWORD }) => {
    LoginPage.enterCredentials(VALID_USERNAME, VALID_PASSWORD);
  });
});

When('the user clicks the Login button', () => {
  LoginPage.loginButton.should('be.visible').click();
});

When('the user adds the second and third product to the cart', () => {
  DashboardPage.addSecondAndThirdProductToCart();
});

When('the user follows the checkout process', () => {
  YourCartPage.validateItemNamesAndQuantity();
  YourCartPage.proceedToCheckout();
  CheckoutPage.enterPersonalInformation();
});

When('the user confirms their purchase', () => {
  OverviewPage.confirmPurchase();
});

// THENs.

Then('the user should be logged in successfully', () => {
  DashboardPage.shoppingCart.should('be.visible');
});

Then('the user gets a confirmation page', () => {
  CompleteCheckoutPage.thankYouMessage.should('be.visible').and('have.text', 'Thank you for your order!');
});