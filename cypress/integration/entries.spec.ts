/// <reference path="../support/index.d.ts" />

describe('entries', () => {
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

    cy.findAllByText(/.*\+/g)
      .first()
      .next()
      .click();

    cy.findByText(/i'm grateful for/gi);
    cy.findByText(/today i'm doing/gi);
    cy.findByText(/i'm a/gi);
    cy.findByText(/was great today when/gi);
    cy.findByText(/will improve on/gi);

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