let adminRoutes = ['entries', 'entries/new'];

describe('login worflow', () => {
  describe('when logged in', () => {
    it('provides access to restricted pages and allows you to logout', () => {
      cy.visit('/');
      cy.findByLabelText(/diary key/i).type('hello');
      cy.findAllByText(/login/i)
        .last()
        .click();

      adminRoutes.forEach((route: string) => {
        cy.visit(route);
        cy.url().should('eql', `http://localhost:3000/${route}`);
      });

      cy.visit('/logout');

      cy.visit('/entries');

      cy.url().should('eql', 'http://localhost:3000/');
    });
  });

  describe('when logged out', () => {
    it('denies access to restricted pages ', () => {
      adminRoutes.forEach((route: string) => {
        cy.visit(route);
        cy.url().should('eql', 'http://localhost:3000/');
      });
    });
  });
});
