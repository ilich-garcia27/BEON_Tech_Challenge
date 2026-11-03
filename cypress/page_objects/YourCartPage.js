class YourCartPage {
  get cartList() {
    return cy.get('[data-test="cart-list"]');
  }

  get checkout() {
    return cy.get('[data-test="checkout"]');
  }

  validateItemNamesAndQuantity() {
    const items = [
      { name: 'Sauce Labs Bike Light', quantity: '1' },
      { name: 'Sauce Labs Bolt T-Shirt', quantity: '1' }
    ];

    this.cartList.should('be.visible').within(() => {
      cy.get('.cart_item').should('have.length', items.length);

      items.forEach((item) => {
        cy.contains('.cart_item', item.name).within(() => {
          cy.get('[data-test="inventory-item-name"]').should('have.text', item.name);
          cy.get('[data-test="item-quantity"]').should('have.text', item.quantity);
        });
      });
    });
  }

  proceedToCheckout() {
    this.checkout.should('be.visible').click();
  }
}

export default new YourCartPage();