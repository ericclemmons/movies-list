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

    describe('delete button', function() {
      beforeEach(function() {
        cy
          .get('@firstMovie')
          .get('.title button:first')
          .click()

        cy.get('[role=dialog]').as('dialog')
      })

      it('shows dialog', function() {
        cy.get('@dialog').contains('Are you sure?')
      })

      it('does nothing when cancelled', function() {
        cy
          .get('@dialog')
          .contains('Cancel')
          .click()

        cy.get('@firstMovie').contains('12 Angry Men')
      })

      it('removes 12 Angry Men when confirmed', function() {
        cy
          .get('@dialog')
          .contains('Ok')
          .click()

        cy.get('@firstMovie').should('not.contain', '12 Angry Men')

        // @TODO Move to a separate test
        cy.root().contains('Movie was deleted')

        // Dialog dismissal has an animation
        cy.wait(1000)
        cy.screenshot()
      })
    })
  })
})
