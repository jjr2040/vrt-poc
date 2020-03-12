


describe('Screenshot color palette', () => {

  beforeEach(() => {
    cy.visit('https://random-color-palette.glitch.me/')
  })

  it('Take screenshot', () => {

    cy.get('#new-palette').click()
    cy.screenshot('color-palette-one')

    cy.get('#new-palette').click()
    cy.screenshot('color-palette-two')
  })

})