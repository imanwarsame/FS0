// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.length === 0
		? 0
		: blogs.map(blog => blog.likes).reduce((prev, next) => prev + next);
};

const favouriteBlog = (blogs) => {
	return blogs.length === 0
		? 0
		: blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog);
};


module.exports = { dummy, totalLikes, favouriteBlog };