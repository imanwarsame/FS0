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

  const addBlogHandler = async (newBlog) => {    
    try {
      const savedBlog = await blogService.create(newBlog);

      //Concat new blog that was just added to the db to blogs array and update state
      setBlogs(blogs.concat({...savedBlog, user }));

      setUserNotification(`A new blog ${savedBlog.title} by ${savedBlog.author} has been added!`) //Success notification
      setTimeout(() => {
        setUserNotification(null)
      }, 5000);
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


  const updateLikesHandler = async (newBlog) => {    
    try {
      const savedBlog = await blogService.update(newBlog.id ,newBlog);

      //Update state to new array using map. If they do not have the id of
      //the updated blog then return themselves, otherwise replace the data
      setBlogs(blogs.map(n => n.id !== savedBlog.id ? n : {...savedBlog, user }))

      setUserNotification(`${savedBlog.title} now has ${savedBlog.likes} likes!`) //Success notification
      setTimeout(() => {
        setUserNotification(null)
      }, 5000);
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
      {blogs
      .sort(({ likes: previousLikes }, { likes: currentLikes }) => currentLikes - previousLikes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} updateLikesHandler={updateLikesHandler}/>
      )}
    </div>
  );
  
  

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
            <BlogForm addBlogHandler={addBlogHandler}/>
          </Togglable>


          {blogsList()}
        </div>
      }
    </div>
  );
}

export default App