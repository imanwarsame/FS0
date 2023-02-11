const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogsRouter');
const usersRouter = require('./controllers/usersRouter');
const loginRouter = require('./controllers/login');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

/* Connecting to the MongoDB database. */
mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		error('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

/* Telling the app to use the routers for login, blogs and users. */
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

/* A conditional statement that checks if the environment is set to test. If it is, it will use the
testing router. */
if (process.env.NODE_ENV === 'test') {
	console.log('Test mode active');
	const testingRouter = require('./controllers/testRouter');
	app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;