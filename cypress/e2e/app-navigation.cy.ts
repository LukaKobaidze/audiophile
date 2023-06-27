describe('Application main navigation', () => {
  it('Should navigate to pages', () => {
    cy.visit('http://localhost:3000');

    cy.contains(/headphones/i).click();
    cy.url().should('include', '/headphones');

    cy.contains(/speakers/i).click();
    cy.url().should('include', '/speakers');

    cy.contains(/earphones/i).click();
    cy.url().should('include', '/earphones');

    cy.contains(/home/i).click();
    cy.url().should('include', '/');
  });
});
