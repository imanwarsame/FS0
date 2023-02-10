import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';


test('<NoteForm /> updates parent state and calls onSubmit', async () => {
	const addBlog = jest.fn(); //Mock function
	const user = userEvent.setup();

	render(<BlogForm addBlogHandler={addBlog} />);

	//Find user inputs and button
	const titleInput = screen.getByPlaceholderText('Blog title...');
	const authorInput = screen.getByPlaceholderText('Blog author...');
	const urlInput = screen.getByPlaceholderText('Blog URL...');
	const addBlogButton = screen.getByText('add');

	//Add inputs
	await user.type(titleInput, 'Test title');
	await user.type(authorInput, 'Test author');
	await user.type(urlInput, 'www.testurl.com');
	await user.click(addBlogButton);

	//Function has been called once
	expect(addBlog.mock.calls).toHaveLength(1);

	//Expecting function props to be equal to test inputs
	expect(addBlog.mock.calls[0][0].title).toBe('Test title');
	expect(addBlog.mock.calls[0][0].author).toBe('Test author');
	expect(addBlog.mock.calls[0][0].url).toBe('www.testurl.com');
});