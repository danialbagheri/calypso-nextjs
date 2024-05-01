describe('Testing the newsletter subscribe pop up', () => {
  it('should subscribe users using the pop up newsletter', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy="newsletter-showpopup"]').click() // pop up opens
    cy.get('[data-cy="newsletter-popup-email"]').type('bagheri.danial@gmail.com') 
    cy.get('[data-cy="newsletter-popup-container"]').click() // submit buttons can be clicked
    cy.get('[data-cy="newsletter-popup-success"]').should('exist') // success message appears
  })

  it('if actually added to mailjet', ()=>{
    cy.request('POST', 'https://service.calypsosun.com/api/users/validate/mailjet/', { email: 'bagheri.danial@gmail.com' }).then(
  (response) => {
    // response.body is automatically serialized into JSON
    expect(response.body).to.have.property('is_subscribed', true)
    if (response.body.is_subscribed){
      cy.request('POST', 'https://service.calypsosun.com/api/users/remove/mailjet/', { email: 'bagheri.danial@gmail.com' }).then(
        response => {
          expect(response.status).to.eq(200)
        }
      )
    }
  })
  })
})
