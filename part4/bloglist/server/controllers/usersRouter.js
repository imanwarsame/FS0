const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

/* Saving new user to the database. */
usersRouter.post('/', async (request, response) => {
	const { name, username, password } = request.body;

	if (password === undefined) {
		response.status(400).send({ error: 'Password is required' });
	}
	else if (password.length < 3) {
		response.status(400).send({ error: 'Password is shorter than 3 characters' });
	}
	else {
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
	}


});


usersRouter.get('/', async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

module.exports = usersRouter;