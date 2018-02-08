describe('Search', function() {
  beforeEach(function() {
    cy.visit('/')
    cy.get('#filter-bar').as('filterBar')
    cy.get('#movie-list').as('movieList')
  })

  it('has "Sort By"', function() {
    cy.get('@filterBar').contains('Sort By')
  })

  it('has input', function() {
    cy.get('@filterBar').find('input')
  })

  it('has Search button', function() {
    cy
      .get('@filterBar')
      .contains('Search')
      .should('match', 'button')
  })

  it('has 10 default results', function() {
    cy
      .get('@movieList')
      .find('.movie-row')
      .should('have.length', 10)
  })

  describe('when sorted', function() {
    context('by Year', function() {
      beforeEach(function() {
        cy
          .get('@filterBar')
          .contains('Sort By')
          .click()
        cy
          .get('@filterBar')
          .contains('Year')
          .click()
      })

      it('sorts earliest first', function() {
        cy
          .get('@movieList')
          .first('.movie-row')
          .contains('All Quiet on the Western Front')

        cy.screenshot()
      })
    })

    context('by Movie runtime', function() {
      beforeEach(function() {
        cy
          .get('@filterBar')
          .contains('Sort By')
          .click()
        cy
          .get('@filterBar')
          .contains('Movie runtime')
          .click()
      })

      it('sorts shortest first', function() {
        cy
          .get('@movieList')
          .first('.movie-row')
          .contains('Shogun')

        cy.screenshot()
      })
    })
  })

  context('for 12 Angry Men', function() {
    beforeEach(function() {
      cy
        .get('@filterBar')
        .find('input')
        .as('input')
        .type('12 Angry Men')
        .should('have.value', '12 Angry Men')

      cy
        .get('@filterBar')
        .contains('Search')
        .as('search')
        .click()
    })

    it('returns 12 Angry Men', function() {
      cy.get('@movieList').contains('12 Angry Men')
      cy
        .get('@movieList')
        .find('.movie-row')
        .should('have.length', 1)

      cy.screenshot()
    })

    it('has a single page', function() {
      cy
        .get('@filterBar')
        .find('.pagination li')
        .should('have.length', 3) // [«, 1, »]
    })

    context('when cleared', function() {
      beforeEach(function() {
        cy.get('@input').clear()
        cy.get('@search').click()
      })

      it('shows all movies again', function() {
        cy
          .get('@movieList')
          .find('.movie-row')
          .should('have.length', 10)
      })

      it('resets pagination', function() {
        cy
          .get('@filterBar')
          .find('.pagination li')
          .should('have.length', 9) // [«, 1, 2, 3, 4, 5, …, 15, »]
      })
    })
  })
})
