describe('Test the contact us form', () => {
  it('Empty fields test', () => {
    cy.visit('http://localhost:3000/contact-us')
    cy.get('[data-cy="contact-us-submit"]')
      .scrollIntoView()
      .then(() => {
        cy.wait(2000)
        cy.get('body').then($body => {
          if ($body.find('[data-cy="subscribe-pop-up"]').length) {
            cy.get('[data-cy="subscribe-pop-up"]').click()
          }
          cy.get('[data-cy="contact-us-full-name"]')
            .scrollIntoView()
            .type('Test')
          cy.get('[data-cy="contact-us-address"]').type('Test Address')
          cy.get('[data-cy="contact-us-email"]').type('test@gmail.com')
          cy.get('[data-cy="contact-us-select"]').click().get('li')[0].click()
        })
      })

    // cy.get('[data-cy="contact-us-submit"]').scrollIntoView().click()
  })
})
