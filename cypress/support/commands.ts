import '@testing-library/cypress/add-commands';
import { join } from 'path';

let railsRunnerPrefix = 'rails runner -e test ';

Cypress.Commands.add('callRuby', (relativeFilePath: string) => {
  let railsRunnerFilePath = join('cypress/ruby', relativeFilePath);

  cy.log('Attempting to call ' + relativeFilePath);
  cy.exec(railsRunnerPrefix + railsRunnerFilePath, {
    failOnNonZeroExit: false,
  }).then(({ stderr, code }: { stderr?: string; code?: number }) => {
    let success = code === 0;
    if (success) {
      return cy.log('Successully ran ' + relativeFilePath + '!');
    }

    throw new Error(`Error: ${stderr}`);
  });
});

Cypress.Commands.add('cleanDatabase', () => {
  cy.log('Attempting to clean database...');
  cy.exec(railsRunnerPrefix + 'cypress/ruby/clean_database.rb');
  cy.log('Successully cleaned database!');
});

Cypress.Commands.add('login', () => {
  cy.request('POST', 'http://localhost:3000/login', { diary_key: 'hello' });
});

beforeEach(() => {
  cy.cleanDatabase();
});
