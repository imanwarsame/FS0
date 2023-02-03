const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const { usersInDB } = require('./test_helper');
const api = supertest(app);

const User = require('../models/user');

describe('when there is some users in the db', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sekret', 10);
		const user = new User({ username: 'root', passwordHash });

		await user.save();
	});


	/* This is a test that checks that all users are returned. */
	test('all users are returned', async () => {
		const response = await api.get('/api/users');

		// execution gets here only after the HTTP request is complete
		// the result of HTTP request is saved in variable response
		expect(response.body).toHaveLength(1);
	});

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await usersInDB();

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await usersInDB();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map(u => u.username);
		expect(usernames).toContain(newUser.username);
	});


	test('creation fails with proper status code and message if username already taken', async () => {
		const usersAtStart = await usersInDB();

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('expected `username` to be unique');

		const usersAtEnd = await usersInDB();
		expect(usersAtEnd).toEqual(usersAtStart);
	});

	test('creation fails if password not entered', async () => {
		const usersAtStart = await usersInDB();

		const newUser = {
			username: 'Bobby',
			name: 'Bob45',
		};

		await api.post('/api/users').send(newUser).expect(400);

		const usersAtEnd = await usersInDB();
		expect(usersAtEnd).toEqual(usersAtStart);
	});

	test('creation fails if username not entered', async () => {
		const usersAtStart = await usersInDB();

		const newUser = {
			name: 'Bob45',
			password: 'as',
		};

		await api.post('/api/users').send(newUser).expect(400);

		const usersAtEnd = await usersInDB();
		expect(usersAtEnd).toEqual(usersAtStart);
	});

	test('creation fails with proper status code if password is less than 3 characters', async () => {
		const usersAtStart = await usersInDB();

		const newUser = {
			username: 'Bobby',
			name: 'Bob45',
			password: 'as',
		};

		await api.post('/api/users').send(newUser).expect(400);

		const usersAtEnd = await usersInDB();
		expect(usersAtEnd).toEqual(usersAtStart);
	});
});



/* Closes the connection to the database after all tests have been run. */
afterAll(async () => {
	await mongoose.connection.close();
});