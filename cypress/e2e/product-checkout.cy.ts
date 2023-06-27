describe('Product checkout', () => {
  it('Should successfully add a product to the cart and submit checkout', () => {
    cy.visit('http://localhost:3000');

    cy.contains(/see product/i).click();
    cy.url().should('include', '/product');

    // Add a product to the cart with a quantity of 3
    cy.get('[aria-label="plus"]').click().click();
    cy.contains(/add to cart/i).click();

    // Show cart
    cy.get('[aria-label="cart button"]').click();

    cy.contains(/cart \(3\)/i);

    cy.contains(/checkout/i).click();
    cy.url().should('include', '/checkout');

    cy.get('[id="name"]').type('John Doe');
    cy.get('[id="email"]').type('johndoe@mail.com');
    cy.get('[id="phone"]').type('+1 202-555-0136');
    cy.get('[id="address"]').type('1137 Williams Avenue');
    cy.get('[id="zip"]').type('10001');
    cy.get('[id="city"]').type('New York');
    cy.get('[id="country"]').type('United States');
    cy.get('[id="emoney_number"]').type('238521993');
    cy.get('[id="emoney_pin"]').type('6891');

    cy.contains(/continue & pay/i).click();

    cy.contains(/thank you/i);
    cy.contains(/back to home/i).click();
    cy.url().should('not.include', '/checkout');
  });
});
