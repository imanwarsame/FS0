import { useState } from 'react';

const Blog = ({blog, updateLikesHandler}) => {
  const [showDetails, setShowDetails] = useState(false);

  const hideWhenDetailsVisible = { display: showDetails ? 'none' : '' }
  const showWhenDetailsVisible = { display: showDetails ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };


  const updateLikes = () => {
    const updatedBlog = {...blog, likes: blog.likes+1}

    updateLikesHandler(updatedBlog);
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenDetailsVisible}>
        {blog.title} {blog.author} <button onClick={() => setShowDetails(true)}>View</button>
      </div>
      <div style={showWhenDetailsVisible}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setShowDetails(false)}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes} <button onClick={updateLikes}>Like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
  </div>
)};

export default Blog