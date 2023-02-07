import { useState } from 'react';

const BlogForm = ({ addBlogHandler }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newURL, setNewURL] = useState('');
  
  const addBlog = (event) => {
    //Prevents default operation of OnSubmit button
    //which is to refresh the page
    event.preventDefault();

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    };

    addBlogHandler(newBlog);
    
    setNewTitle('') //Reset input box
    setNewAuthor('') //Reset input box
    setNewURL('') //Reset input box
  }




    //Event handlers for input text changing
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value) //sets the newName state
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value) //sets the newAuthor state
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value) //sets the newURL state
  }
  
  
  return (
    <form onSubmit={addBlog}>
      <div>
        Title: <input value={newTitle} onChange={handleTitleChange} placeholder={"Blog title..."}/>
      </div>
      <div>
        Author: <input value={newAuthor} onChange={handleAuthorChange} placeholder={"Blog author..."}/>
      </div>
      <div>
        URL: <input value={newURL} onChange={handleURLChange} placeholder={"Blog URL..."}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
}

export default BlogForm