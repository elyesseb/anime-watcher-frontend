describe('Visitor wants to search for Naruto Shippuuden anime and see an episode', () => {
  it('Home page should return anime catalog', () => {
    cy.visit('/home');
    cy.get('[data-cy-global-status]');
    cy.should('be.ok');
  });
  it('Search Naruto Shippuuden from home page', () => {
    cy.get('input')
      .type('Naruto');
    cy.get('.btn')
      .click();
    cy.wait(500);
    cy.get('.liste-content')
      .find('h3')
      .contains('Naruto Shippuuden')
      .click();
  });
  it('See episode from Naruto Shippuuden page', () => {
    cy.get('.btn')
      .contains('Voir tout les episodes')
      .click();
  });
  it('Click on episode', () => {
    cy.get('.list-group-item')
      .first()
      .click();
  });
});

describe('Visitor wants to register', () => {
  it('Register page should be return', () => {
    cy.visit('/register');
    cy.get('[data-cy-global-status]');
    cy.should('be.ok');
  });
  it('Fill wrong in the form and see alert', () => {
    // fill the form
    cy.get('#username')
      .type('Lu');
    cy.get('#email')
      .type('Lulu');
    cy.get('#password')
      .type('1234');  
    cy.get('#cgu')
      .click();
    cy.get('button')
      .contains('S\'inscrire')
      .click();
    // See alert messages  
    cy.get('div.alert-danger') 
      .contains('L\'adresse e-mail doit être une adresse e-mail valide')
      .should('be.visible');
    cy.get('div.alert-danger')
      .contains('Le mot de passe doit comporter au moins 6 caractères')
      .should('be.visible');
    cy.get('div.alert-danger') 
      .contains('Le captcha est requis.')
      .should('be.visible');
  });

});
