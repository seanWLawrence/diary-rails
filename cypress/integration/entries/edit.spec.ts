describe('entries/edit/:id', () => {
  beforeEach(() => {
    cy.login();
    cy.callRuby('./edit_entry_seed.rb');
    cy.visit('/entries');
  });

  it.only('allows you to edit an entry', () => {
    let editedText = 'some edited text';
    let todayAsDay = new Date().getDate();

    cy.findByText(new RegExp(String(todayAsDay), 'ig')).click();

    cy.findAllByText(/edit/gi).click();

    cy.url().should('eql', 'http://localhost:3000/entries/1/edit');

    cy.findByText(/view all fields/gi).click();

    cy.get('input[type="text"]').each($input => {
      cy.wrap($input)
        .clear()
        .type(editedText);
    });

    cy.findByText(/save/i).click();

    cy.url().should('eql', 'http://localhost:3000/entries');

    cy.findByText(new RegExp(String(todayAsDay), 'ig')).click();

    cy.findAllByText(editedText).should('have.length', 10);
  });
});
