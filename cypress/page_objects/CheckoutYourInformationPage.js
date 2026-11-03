class CheckoutYourInformationPage {
  get firstNameInput() {
    return cy.get('[data-test="firstName"]');
  }

  get lastNameInput() {
    return cy.get('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return cy.get('[data-test="postalCode"]');
  }

  get continueButton() {
    return cy.get('[data-test="continue"]');
  }

  enterPersonalInformation() {
    this.firstNameInput.type('John');
    this.lastNameInput.type('Doe');
    this.postalCodeInput.type('12345');
    this.continueButton.click();
  }
}

export default new CheckoutYourInformationPage();