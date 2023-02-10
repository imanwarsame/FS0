import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

//Required to get blog component to run
const loggedInUser = {
	username: 'test_user'
};

const newBlog = {
	id: '63dd4f17422c28ca849100aA',
	title: 'Test blog',
	author: 'Test author',
	url: 'www.testurl.com',
	likes: 3,
	user: {
		id: '63dd4f17422c28ca849100aA',
		username: 'test_user',
		name: 'test user'
	}
};

test('renders content', () => {
	const { container } = render(<Blog blog={newBlog} loggedInUser={loggedInUser} />);

	//Check title rendered
	let div = container.querySelector('.collapsed_blog');
	expect(div).toHaveTextContent('Test blog');

	//Check author rendered
	expect(div).toHaveTextContent('Test author');

	//Check to ensure likes and url are not displayed
	div = container.querySelector('.expanded_blog');
	expect(div).toHaveStyle('display: none');
});


test('renders content when button clicked', async() => {
	const { container } = render(<Blog blog={newBlog} loggedInUser={loggedInUser} />);

	//Click button
	const user = userEvent.setup();
	const button = screen.getByText('View');
	await user.click(button);

	//Check to ensure likes and url are visible and rendered
	let div = container.querySelector('.expanded_blog');
	expect(div).not.toHaveStyle('display: none');
	expect(div).toHaveTextContent('Likes 3');
	expect(div).toHaveTextContent('www.testurl.com');
});