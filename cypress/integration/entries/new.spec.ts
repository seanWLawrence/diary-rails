describe('entries/new', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/entries/new');
  });

  it('allows you to create a new entry', () => {
    let text = 'some text';
    let todayAsDay = new Date().getDate();

    cy.findByLabelText(/agradecio/gi).type(text);
    cy.findByLabelText(/metra/gi).type(text);
    cy.findByLabelText(/affirma/gi).type(text);

    cy.findByText(/save/i).click();

    cy.url().should('eql', 'http://localhost:3000/entries');

    cy.findByText(new RegExp(String(todayAsDay), 'ig')).click();

    cy.findAllByText(text).should('have.length', 3);
  });

  it('allows you to fill out all fields', () => {
    let text = 'some text';
    let todayAsDay = new Date().getDate();

    cy.findAllByLabelText(/cosa/gi).should('have.length', 0);
    cy.findAllByLabelText(/mejorado/gi).should('have.length', 0);

    cy.findByText(/view all fields/i).click();

    cy.findByLabelText(/agradecio/gi).type(text);
    cy.findByLabelText(/metra/gi).type(text);
    cy.findByLabelText(/affirma/gi).type(text);
    cy.findByLabelText(/cosa/gi).type(text);
    cy.findByLabelText(/mejorado/gi).type(text);

    cy.findByText(/save/i).click();

    cy.url().should('eql', 'http://localhost:3000/entries');

    cy.findByText(new RegExp(String(todayAsDay), 'ig')).click();

    cy.findAllByText(text).should('have.length', 5);
  });

  it.only('allows you to add and remove fields', () => {
    let text = 'some text';
    let todayAsDay = new Date().getDate();

    cy.findByText(/view all fields/i).click();

    cy.get('input').should('have.length', 5);

    /**
     * Add new input fields and then remove them
     */
    cy.findAllByText(/add new/i).each($addButton => {
      $addButton.click();
    });

    cy.get('input').should('have.length', 10);

    cy.findAllByTestId('input-group-remove-button').each($button => {
      $button.click();
    });

    cy.get('input').should('have.length', 5);

    /**
     * Add new input fields again and fill them out
     */

    cy.findAllByText(/add new/i).each($addButton => {
      $addButton.click();
    });

    cy.get('input').each($input => {
      cy.wrap($input).type(text);
    });

    cy.findByText(/save/i).click();

    cy.url().should('eql', 'http://localhost:3000/entries');

    cy.findByText(new RegExp(String(todayAsDay), 'ig')).click();

    cy.findAllByText(text).should('have.length', 10);
  });
});
