export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Call ruby file in rails context for things like seeding data.
       * Uses the relative path from the test.
       * @example cy.callRuby('./my_ruby_file.rb')
       */
      callRuby(relativeFilePath: string): void;
      /**
       * Cleans the rails test database
       * @example cy.cleanDatabase()
       */
      cleanDatabase(): void;
    }
  }
}
