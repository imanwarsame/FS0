const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');
const { initialBlogs, blogsInDB } = require('./test_helper');
const api = supertest(app);


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


/* This is a test that checks that the id property exists. */
test('id property exists', async () => {
	const allBlogs = await blogsInDB();
	allBlogs.forEach(blog => {
		expect(blog.id).toBeDefined();
	});
});

/* This is a test that checks that a valid blog can be added. */
test('a valid blog can be added', async () => {
	const newBlog = {
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const blogsAtEnd = await blogsInDB();
	expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

	const contents = blogsAtEnd.map(n => n.title);
	expect(contents).toContain(
		'Canonical string reduction'
	);
});


test('if likes are missing it will default to zero', async () => {
	const newBlog = {
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		__v: 0
	};

	const response = await api.post('/api/blogs').send(newBlog);
	console.log(response);
	expect(response.body.likes).toBe(0);
});


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