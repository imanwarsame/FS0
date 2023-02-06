const BlogForm = ({newTitle, newAuthor, newURL, addBlogHandler, titleChangeHandler, authorChangeHandler, URLChangeHandler}) => {
  return (
    <form onSubmit={addBlogHandler}>
      <div>
        Title: <input value={newTitle} onChange={titleChangeHandler} placeholder={"Blog title..."}/>
      </div>
      <div>
        Author: <input value={newAuthor} onChange={authorChangeHandler} placeholder={"Blog author..."}/>
      </div>
      <div>
        URL: <input value={newURL} onChange={URLChangeHandler} placeholder={"Blog URL..."}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
}

export default BlogForm