describe('Testing the newsletter in the footer', () => {
  it('should subscribe users using the pop up newsletter', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy="newsletter-footer-email"]')
      .scrollIntoView()
      .type('bagheri.danial@gmail.com')
    cy.wait(2000)
    cy.get('body').type('{esc}')
    cy.get('[data-cy="newsletter-footer-button"]').click({force: true})
    cy.get('[data-cy="newsletter-footer-success"]').should('exist')
    cy.request(
      'POST',
      'https://service.calypsosun.com/api/users/validate/mailjet/',
      {email: 'bagheri.danial@gmail.com'},
    ).then(response => {
      // response.body is automatically serialized into JSON
      expect(response.body).to.have.property('is_subscribed', true)
      if (response.body.is_subscribed) {
        cy.request(
          'POST',
          'https://service.calypsosun.com/api/users/remove/mailjet/',
          {email: 'bagheri.danial@gmail.com'},
        ).then(response => {
          expect(response.status).to.eq(200)
        })
      }
    })
  })
})
