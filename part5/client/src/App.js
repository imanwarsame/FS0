import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userNotification, setUserNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('notification');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newURL, setNewURL] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, []);


  //Check if user is logged in when component loads for the first time
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Login event handler
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user); //Set user state
      setUsername(''); //Reset username and password fields
      setPassword('');
      blogService.setToken(user.token)

      //Save user to local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      console.log('user has been saved');
    } catch (error) {
      console.log(error.response.data.error)
      setNotificationType('errorMsg')
      setUserNotification(error.response.data.error) //Error notification
      setTimeout(() => {
        setUserNotification(null)
        setNotificationType('notification')
      }, 5000);
    }
  };

  const addBlogHandler = async (event) => {
    event.preventDefault()
    
    try {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newURL,
      };

      await blogService.create(newBlog);

      //Concat new blog that was just added to the db to blogs array and update state
      setBlogs(blogs.concat(newBlog));

      setUserNotification(`A new blog ${newBlog.title} by ${newBlog.author} has been added!`) //Success notification
      setTimeout(() => {
        setUserNotification(null)
      }, 5000);

      setNewTitle('') //Reset input box
      setNewAuthor('') //Reset input box
      setNewURL('') //Reset input box
    } catch (error) {
      console.log(error.response.data.error)
      setNotificationType('errorMsg')
      setUserNotification(error.response.data.error) //Error notification
      setTimeout(() => {
        setUserNotification(null)
        setNotificationType('notification')
      }, 5000);
    }
  };

  //Event handler to clear local data and reset state
  const logOut = (event) => {
    window.localStorage.clear();
    setUser(null);
  };



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  );


  const blogsList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );


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
    <div>
      <h2>blogs</h2>

      <Notification message={userNotification} notificationType={notificationType}/>

      {!user && loginForm()} 
      {user && 
        <div>
          <div>
            {user.name} logged in <button onClick={() => logOut()}>log out</button>
          </div>

          <Togglable buttonLabel='New blog'>
            <BlogForm
              newTitle={newTitle}
              newAuthor={newAuthor}
              newURL={newURL} 
              addBlogHandler={addBlogHandler} 
              titleChangeHandler={handleTitleChange} 
              authorChangeHandler={handleAuthorChange} 
              URLChangeHandler={handleURLChange}
            />
          </Togglable>


          {blogsList()}
        </div>
      }
    </div>
  );
}

export default App