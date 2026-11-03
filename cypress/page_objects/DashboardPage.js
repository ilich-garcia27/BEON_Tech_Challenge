class DashboardPage {
  get shoppingCart() {
    return cy.get('[data-test="shopping-cart-link"]');
  }

  get bikeLightAddToCartButton() {
    return cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]');
  }

  get boltTShirtAddToCartButton() {
    return cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  }

  addSecondAndThirdProductToCart() {
    this.bikeLightAddToCartButton.click();
    this.boltTShirtAddToCartButton.click();
    this.shoppingCart.should('be.visible').click();
  }
}

export default new DashboardPage();