describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			name: 'Matti Luukkainen',
			username: 'mluukkai',
			password: 'salainen'
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('Login form is shown', function() {
		cy.visit('http://localhost:3000');
		cy.contains('blogs');
		cy.contains('username');
		cy.contains('password');
		cy.contains('login');
	});


	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('mluukkai');
			cy.get('#password').type('salainen');
			cy.get('#login-button').click();

			cy.contains('Matti Luukkainen logged in');
		});

		it('fails with wrong credentials', function() {
			cy.get('#username').type('mluukkai');
			cy.get('#password').type('wrong');
			cy.get('#login-button').click();

			cy.get('.errorMsg').contains('invalid username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid');
		});
	});

});