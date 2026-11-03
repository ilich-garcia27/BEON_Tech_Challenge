class CompleteCheckoutPage {
  get thankYouMessage() {
    return cy.get('[data-test="complete-header"]');
  }
}

export default new CompleteCheckoutPage();