describe('Note App', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains('Browser can execute only JavaScript');
  });

  it('login form can be opened', function () {
    cy.contains('login').click();
  });
  it('user can login', function () {
    cy.contains('login').click();
    cy.get('#username').type('admin');
    cy.get('#password').type('admin');
    cy.get('#login-button').click();

    cy.contains('admin logged in');
  });
  describe('when logged in ', function () {
    beforeEach(function () {
      cy.contains('login').click();
      cy.get('#username').type('admin');
      cy.get('#password').type('admin');
      cy.get('#login-button').click();
    });

    it('a new note can be created', function () {
      cy.contains('New Note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('Save').click();
      cy.contains('a note created by cypress');
    });
  });
});
