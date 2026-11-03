class LoginPage {
  visit() {
    cy.visit('/');
  }

  get usernameInput() {
    return cy.get('[data-test="username"]');
  }

  get passwordInput() {
    return cy.get('[data-test="password"]');
  }

  get loginButton() {
    return cy.get('[data-test="login-button"]');
  }

  enterCredentials(username, password) {
    this.usernameInput.should('be.visible').clear().type(username);
    this.passwordInput.should('be.visible').clear().type(password, { log: false });
  }
}

export default new LoginPage();