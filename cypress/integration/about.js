describe('About page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('finds the "div.title"', () => {
    cy.get('[data-cy=title]')
      .should('exist')
  })

  it('should hide header on scroll', () => {
    cy.viewport('iphone-5')

    cy.get('[data-cy=title]')
      .should('have.css', 'height', '91px')

    cy.scrollTo(0, 150)

    cy.get('[data-cy=title]')
      .should('have.css', 'height', '40px')
  })

  it('should hide email on scroll', () => {
    cy.viewport('iphone-5')

    cy.get('[data-cy=email]')
      .should('be.visible')

    cy.scrollTo(0, 150)

    cy.get('[data-cy=email]')
      .should('have.css', 'opacity', '0')
  })

  it('should not display email on scroll', () => {
    cy.viewport('iphone-5')

    cy.get('[data-cy=email]')
      .should('have.css', 'display', 'block')

    cy.scrollTo(0, 150)

    cy.get('[data-cy=email]')
      .should('have.css', 'display', 'none')
  })
})
