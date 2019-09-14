import { join } from 'path';

let railsRunnerPrefix = 'rails runner -e test ';

Cypress.Commands.add('callRuby', (relativeFilePath: string) => {
  let railsRunnerFilePath = join('cypress/ruby', relativeFilePath);

  cy.log('Attempting to call ' + relativeFilePath);
  cy.exec(railsRunnerPrefix + railsRunnerFilePath);
  cy.log('Successully ran ' + relativeFilePath + '!');
});

Cypress.Commands.add('cleanDatabase', () => {
  cy.log('Attempting to clean database...');
  cy.exec(railsRunnerPrefix + 'cypress/ruby/clean_database.rb');
  cy.log('Successully cleaned database!');
});

beforeEach(() => {
  cy.cleanDatabase();
});
