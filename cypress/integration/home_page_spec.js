describe('Home Page', function() {
  it('has title of "Movie List"', function() {
    cy.visit('/');
  });

  context('elements', function() {
    beforeEach(function() {
      cy.visit('/');
    });

    it('has a search bar', function() {
      cy.get('#filter-bar');
    });

    it('has a movie list', function() {
      cy.get('#movie-list');
    });
  });

  after(cy.screenshot);
});
