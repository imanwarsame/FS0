import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';


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
      if (user) {
        //Save user to local storage
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
        console.log('user has been saved');
      }

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

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );

  const blogsList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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
          {blogsList()}
        </div>
      }
    </div>
  );
}

export default App