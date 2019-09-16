describe('entries', () => {
  beforeEach(() => {
    cy.login();
  });

  it('allows you to toggle entries open/collapsed', () => {
    cy.callRuby('./entries_seed.rb');
    cy.visit('/entries');

    /**
     * Toggle all entries
     */

    cy.findByText(/open all/i).click();

    cy.findAllByText(/.*-/g).then($elements => {
      // created entries, plus the toggle all button
      expect($elements.length).to.eq(11);
    });

    cy.findByText(/collapse all/i).click();

    cy.findAllByText(/.*\+/g).then($elements => {
      // created entries, plus the toggle all button
      expect($elements.length).to.eq(11);
    });

    /**
     * Toggle individual entry
     */

    cy.get('section').within(() => {
      cy.findAllByText(/.*\+/g)
        .first()
        .click();
      cy.findByText(/estoy agradecido por/gi);
      cy.findByText(/¿Qué haría grandioso hoy/gi);
      cy.findByText(/Estoy\.\.\./i);
      cy.findByText(/Cosas increíbles que sucedieron hoy/gi);
      cy.findByText(/¿Cómo podría haber mejorado aún más hoy/gi);
    });

    cy.get('section')
      .first()
      .within(() => {
        cy.findByText(/.*-/g).click();
      });

    cy.findAllByText(/.*\+/g).then($elements => {
      // created entries, plus the toggle all button
      expect($elements.length).to.eq(11);
    });
  });

  it('allows you to create an entry', () => {
    cy.visit('/entries/new');

    // These searh by label text to assert there is a form
    cy.findByLabelText(/estoy agradecido por/gi);
    cy.findByLabelText(/¿Qué haría grandioso hoy/gi);
    cy.findByLabelText(/Estoy\.\.\./i);
    cy.findByLabelText(/Cosas increíbles que sucedieron hoy/gi);
    cy.findByLabelText(/¿Cómo podría haber mejorado aún más hoy/gi);

    /**
     * Test navigation works
     */
    cy.visit('/entries');

    cy.findByText(/nueva entrada/i).click();

    cy.findByLabelText(/estoy agradecido por/gi);
    cy.findByLabelText(/¿Qué haría grandioso hoy/gi);
    cy.findByLabelText(/Estoy\.\.\./i);
    cy.findByLabelText(/Cosas increíbles que sucedieron hoy/gi);
    cy.findByLabelText(/¿Cómo podría haber mejorado aún más hoy/gi);
  });
});
