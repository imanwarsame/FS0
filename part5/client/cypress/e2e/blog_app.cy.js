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


	describe('When logged in', function() {
		//Bypass the UI and use HTTP request to login, much quicker
		beforeEach(function() {
			cy.request('POST', 'http://localhost:3003/api/login', {
				username: 'mluukkai', password: 'salainen'
			}).then(response => {
				localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body));
				cy.visit('http://localhost:3000');
			});
		});

		it('A blog can be created', function() {
			cy.contains('New blog').click();
			cy.get('input[placeholder="Blog title..."]').type('Test title');
			cy.get('input[placeholder="Blog author..."]').type('Test author');
			cy.get('input[placeholder="Blog URL..."]').type('www.testurl.com');
			cy.get('#add-blog').click();

			cy.get('.notification').contains('A new blog Test title by Test author has been added!')
				.and('have.css', 'color', 'rgb(0, 128, 0)')
				.and('have.css', 'border-style', 'solid');

			cy.contains('View').click();

			cy.contains('Test title Test author');
			cy.contains('www.testurl.com');
			cy.contains('Likes 0');
			cy.contains('Matti Luukkainen');

		});
	});




});