/// <reference path="../support/index.d.ts" />

describe('entries', () => {
  it('allows you to toggle entries open/collapsed', () => {
    cy.viewport('iphone-5');
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
});
