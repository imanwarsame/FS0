// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.length === 0
		? 0
		: blogs.map(blog => blog.likes).reduce((prev, next) => prev + next);
};


module.exports = { dummy, totalLikes };