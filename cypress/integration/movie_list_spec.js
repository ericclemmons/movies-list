describe('Movie List', function() {
  beforeEach(function() {
    cy.visit('/')
  })

  context('12 Angry Men', function() {
    beforeEach(function() {
      cy.get('#movie-list .movie-row:first').as('firstMovie')
    })

    it('should be first', function() {
      cy.get('@firstMovie').contains('12 Angry Men')
    })

    it('should have a title image', function() {
      cy
        .get('@firstMovie')
        .find('.image img')
        .should('have.attr', 'title', '12 Angry Men')
    })

    it('should have a linked title heading', function() {
      cy
        .get('@firstMovie')
        .find('.title')
        .contains('12 Angry Men')
        .should('match', 'a')
    })

    it('should have movie info', function() {
      cy.get('@firstMovie').find('.movie-info')
    })

    it('should have actors', function() {
      cy.get('@firstMovie').find('.actors')
    })

    it('should have the plot', function() {
      cy.get('@firstMovie').find('.plot')
    })
  })
})
