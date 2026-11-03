class OverviewPage {
  get finishButton() {
    return cy.get('[data-test="finish"]');
  }

  confirmPurchase() {
    this.finishButton.should('be.visible').click();
  }
}

export default new OverviewPage();