import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);


  // const handleLogin = async (event) => {
  //   event.preventDefault()
    
  //   try {
  //     const user = await loginService.login({
  //       username, password,
  //     })
  //     setUser(user);
  //     setUsername('');
  //     setPassword('');
  //   } catch (exception) {
  //     setErrorMessage('Wrong credentials')
  //     setTimeout(() => {
  //       setErrorMessage(null)
  //     }, 5000);
  //   }
  // };

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App