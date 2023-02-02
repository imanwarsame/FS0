const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');

const api = supertest(app);


const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
});










/* This is a test that checks that the response is in JSON format. */
test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
}, 100000);


/* This is a test that checks that all blogs are returned. */
test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs');

	// execution gets here only after the HTTP request is complete
	// the result of HTTP request is saved in variable response
	expect(response.body).toHaveLength(initialBlogs.length);
});


/* This is a test that checks that any blog is about react patterns. */
test('a specific blog is within the returned blogs', async () => {
	const response = await api.get('/api/blogs');

	const contents = response.body.map(r => r.title);
	expect(contents).toContain('React patterns');
});

/* Closes the connection to the database after all tests have been run. */
afterAll(async () => {
	await mongoose.connection.close();
});