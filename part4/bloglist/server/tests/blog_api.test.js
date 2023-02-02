const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const { initialBlogs, nonExistingId, blogsInDB } = require('./test_helper');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(initialBlogs);
});







describe('when there are initially some blogs saved', () => {
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

	/* This is a test that checks that the id property exists. */
	test('id property exists', async () => {
		const allBlogs = await blogsInDB();
		allBlogs.forEach(blog => {
			expect(blog.id).toBeDefined();
		});
	});
});






describe('when viewing a specific blog', () => {
	/* This is a test that checks that a valid blog can be added. */
	test('succeeds with a valid id', async () => {
		const blogsAtStart = await blogsInDB();

		const blogToView = blogsAtStart[0];

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(resultBlog.body).toEqual(blogToView);
	});

	/* This is a test that checks that a non-existing blog returns a 404 status code. */
	test('fails with status code 404 if blog does not exist', async () => {
		const validNonexistingId = await nonExistingId();

		await api
			.get(`/api/blogs/${validNonexistingId}`)
			.expect(404);
	});

	/* This is a test that checks that an invalid id returns a 400 status code. */
	test('fails with status code 400 if id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445';

		await api
			.get(`/api/blogs/${invalidId}`)
			.expect(400);
	});
});









describe('addition of a new blog', () => {
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

	/* This is a test that checks that if likes are missing it will default to zero. */
	test('if likes are missing it will default to zero', async () => {
		const newBlog = {
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			__v: 0
		};

		const response = await api.post('/api/blogs').send(newBlog);
		expect(response.body.likes).toBe(0);
	});

	/* This is a test that checks that if title or url is missing it will return code 400. */
	test('if title or url is missing it will return code 400', async () => {
		let newBlog = {
			_id: '5a422b3a1b54a676234d17f9',
			likes: 12,
			__v: 0
		};

		await api.post('/api/blogs').send(newBlog).expect(400);

		const blogsAtEnd = await blogsInDB();
		expect(blogsAtEnd).toHaveLength(initialBlogs.length);
	});
});






describe('deletion of a blog', () => {
	/* This is a test that checks that a valid blog can be deleted. */
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await blogsInDB();
		const blogToDelete = blogsAtStart[0];

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204);

		const blogsAtEnd = await blogsInDB();

		expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

		const contents = blogsAtEnd.map(r => r.title);

		expect(contents).not.toContain(blogToDelete.title);
	});
});


describe('updating a blog', () => {
	/* This is a test that checks that a valid blog can be deleted. */
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await blogsInDB();
		const blogToDelete = blogsAtStart[0];

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204);

		const blogsAtEnd = await blogsInDB();

		expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

		const contents = blogsAtEnd.map(r => r.title);

		expect(contents).not.toContain(blogToDelete.title);
	});
});






























/* Closes the connection to the database after all tests have been run. */
afterAll(async () => {
	await mongoose.connection.close();
});