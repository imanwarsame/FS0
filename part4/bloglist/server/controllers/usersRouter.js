const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

/* Saving new user to the database. */
usersRouter.post('/', async (request, response) => {
	const { name, username, password } = request.body;

	if (password === undefined) {
		return response.status(400).send({ error: 'Password is required' });
	}
	else if (password.length < 3) {
		return response.status(400).send({ error: 'Password is shorter than 3 characters' });
	}


	/* Hashing the password. */
	const saltRounds = 10; //2^10 hashing iterations completed
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		name,
		username,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);

});


usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
	response.json(users);
});

module.exports = usersRouter;