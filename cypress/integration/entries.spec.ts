/// <reference path="../support/index.d.ts" />

describe('entries', () => {
  it('allows you to view and toggle the collapse for each entry', () => {
    cy.callRuby('./entries_seed.rb');
    cy.visit('/entries');
  });
});
