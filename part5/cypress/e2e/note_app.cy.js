describe('Note App', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'John Doe',
      username: 'john',
      password: 'johndoe',
    };

    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
    cy.visit('');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
  });

  it('login form can be opened', function () {
    cy.contains('login').click();
  });

  it('user can login', function () {
    cy.contains('login').click();
    cy.get('#username').type('john');
    cy.get('#password').type('johndoe');
    cy.get('#login-button').click();

    cy.contains('John Doe logged in');
  });

  // it.only('login fails with wrong password', function () {
  //   cy.contains('login').click();
  //   cy.get('#username').type('john');
  //   cy.get('#password').type('janedoe');
  //   cy.get('#login-button').click();

  //   cy.get('.error')
  //     .should('contain', 'Wrong credentials')
  //     .should('have.css', 'color', 'rgb(255, 0, 0)')
  //     .should('have.css', 'border-style', 'solid');
  //   cy.get('html').should('not.contain', 'John Doe logged in');
  // });

  describe('when logged in ', function () {
    beforeEach(function () {
      cy.login({ username: 'john', password: 'johndoe' });
    });

    it('a new note can be created', function () {
      cy.contains('New Note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('Save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: true,
        });
      });

      it('can be made not important', function () {
        cy.contains('another note cypress')
          .parent()
          .find('button')
          .as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make important');
      });
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.login({ username: 'john', password: 'johndoe' });
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });
});
