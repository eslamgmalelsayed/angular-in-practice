/// <reference types="cypress" />

describe('🎬 Movie Search User Flow', () => {
  beforeEach(() => {
    // Start fresh on each test
    cy.visit('/');
  });

  it('🚀 Core User Journey: Search → Results → Movie Details', () => {
    // ========================================
    // 1. USER LANDS ON THE APPLICATION
    // ========================================
    cy.log('👤 User opens the Movie Search App');

    // Verify the app loaded correctly
    cy.get('mat-toolbar')
      .should('be.visible')
      .and('contain.text', '🎬 Movie Search App');

    // Verify search interface is ready
    cy.get('app-search-bar').should('be.visible');
    cy.get('input[matInput]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Search for movies...');
    cy.get('button[type="submit"]').should('be.visible').and('be.enabled');

    // ========================================
    // 2. USER SEARCHES FOR A MOVIE
    // ========================================
    cy.log('🔍 User searches for a movie');

    // Type movie name in search input
    cy.get('input[matInput]')
      .clear({ force: true })
      .type('Inception', { force: true });

    // Verify the input has the correct value
    cy.get('input[matInput]').should('have.value', 'Inception');

    // Click search button
    cy.get('button[type="submit"]').click({ force: true });

    // ========================================
    // 3. USER WAITS FOR SEARCH RESULTS
    // ========================================
    cy.log('⏳ User waits for search results to load');

    // Wait for real API response and UI to update
    cy.wait(3000);

    // ========================================
    // 4. USER SEES MOVIE CARDS LOADED
    // ========================================
    cy.log('🎯 User sees movie cards loaded');

    // Verify movie cards are displayed
    cy.get('app-movie-card').should('have.length.greaterThan', 0);

    // Verify movies grid layout
    cy.get('.movies-grid').should('be.visible');
    cy.get('.movies-grid-container').should('be.visible');

    // Check that movie cards have required elements
    cy.get('.movie-title').should('have.length.greaterThan', 0);
    cy.get('.year-badge').should('have.length.greaterThan', 0);
    cy.get('.view-details-btn').should('have.length.greaterThan', 0);

    // Verify first movie card content
    cy.get('app-movie-card')
      .first()
      .within(() => {
        cy.get('.movie-title').should('be.visible');
        cy.get('.year-badge').should('be.visible');
        cy.get('.movie-actors').should('be.visible');
        cy.get('.view-details-btn')
          .should('be.visible')
          .and('contain.text', 'View Details');
      });

    // ========================================
    // 5. USER NAVIGATES TO MOVIE DETAILS
    // ========================================
    cy.log('📄 User clicks on a movie to view details');

    // Click on the first movie's "View Details" button
    cy.get('.view-details-btn').first().click();

    // Verify navigation to movie details page
    cy.url().should('include', '/movie/');

    // Verify movie details page loaded
    cy.get('.movie-details').should('be.visible');

    // Verify movie details content
    cy.get('.details-card').within(() => {
      // Check movie title exists
      cy.get('.movie-title').should('be.visible');

      // Check movie year and actors exist
      cy.get('.movie-year-actors').should('be.visible');

      // Check movie poster exists
      cy.get('.movie-poster-large')
        .should('be.visible')
        .and('have.attr', 'src');

      // Check movie information rows exist
      cy.get('.info-row').should('have.length.greaterThan', 0);

      // Check IMDB button exists
      cy.get('.imdb-btn')
        .should('be.visible')
        .and('contain.text', 'View on IMDB')
        .and('have.attr', 'href');
      cy.get('.imdb-btn').should('have.attr', 'target', '_blank');
    });

    // ========================================
    // 6. VERIFY COMPLETE USER JOURNEY
    // ========================================
    cy.log('✅ Complete user journey successful');

    cy.log('🎉 User successfully completed the movie search journey!');
  });

  it('🔄 Alternative Search Scenarios', () => {
    cy.log('🎬 Testing different search scenarios');

    const testScenarios = [
      { query: 'Action', description: 'Genre search' },
      { query: 'Tom Hanks', description: 'Actor search' },
      { query: '2023', description: 'Year search' },
    ];

    testScenarios.forEach(scenario => {
      cy.log(`Testing: ${scenario.description} - "${scenario.query}"`);

      // Search for movie
      cy.get('input[matInput]')
        .clear({ force: true })
        .type(scenario.query, { force: true });
      cy.get('button[type="submit"]').click({ force: true });

      // Wait for real API results
      cy.wait(3000);

      // Verify results loaded
      cy.get('app-movie-card').should('exist');
      cy.get('.view-details-btn').should('be.visible');

      // Test navigation to details (only for first scenario)
      if (scenario.query === 'Action') {
        cy.get('.view-details-btn').first().click();
        cy.get('.movie-details').should('be.visible');
        cy.go('back');
      }
    });

    cy.log('✅ Alternative search scenarios completed');
  });

  it('📱 Mobile User Experience', () => {
    cy.log('📱 Testing mobile user experience');

    // Set mobile viewport
    cy.viewport('iphone-x');

    // Verify app works on mobile
    cy.get('mat-toolbar').should('be.visible');
    cy.get('app-search-bar').should('be.visible');

    // Perform search on mobile
    cy.get('input[matInput]')
      .clear({ force: true })
      .type('Mobile Test', { force: true });
    cy.get('button[type="submit"]').click({ force: true });

    // Wait for real API results
    cy.wait(3000);

    // Verify mobile layout
    cy.get('app-movie-card').should('be.visible');
    cy.get('.movie-card').should('have.css', 'display');

    // Test mobile navigation
    cy.get('.view-details-btn').first().click();
    cy.get('.movie-details').should('be.visible');
    cy.get('.imdb-btn').should('be.visible');

    cy.log('✅ Mobile user experience test completed');
  });
});
