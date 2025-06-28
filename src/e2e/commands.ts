// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to search for movies
       * @example cy.searchMovies('Inception')
       */
      searchMovies(query: string): Chainable<Element>;

      /**
       * Custom command to wait for search results
       * @example cy.waitForSearchResults()
       */
      waitForSearchResults(): Chainable<Element>;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

Cypress.Commands.add('searchMovies', (query: string) => {
  cy.get('[data-cy="search-input"]').clear().type(query);
  cy.get('[data-cy="search-button"]').click();
});

Cypress.Commands.add('waitForSearchResults', () => {
  cy.get('[data-cy="loading-spinner"]').should('be.visible');
  cy.get('[data-cy="loading-spinner"]').should('not.exist');
});

export {};
