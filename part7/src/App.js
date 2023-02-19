import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom';
import AnecdoteList from './Components/AnecdoteList';
import CreateAnecdote from './Components/CreateAnecdote';
import About from './Components/About';
import Anecdote from './Components/Anecdote';



const App = () => {
  const [notification, setNotification] = useState('')

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 7,
      id: 2
    }
  ])

  const padding = {
    paddingRight: 5
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    console.log(anecdote);
    setAnecdotes(anecdotes.concat(anecdote))
    
    setNotification(`A new anecdote ${anecdote.content} created!`) //Success notification
    setTimeout(() => {
      setNotification(null)
    }, 5000);
  }

  const anecdoteById = (id) => {
    anecdotes.find(a => a.id === id)
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
      <div>
      <Router>
        <div>
        <Link style={padding} to="/">Anecdotes</Link>
        <Link style={padding} to="/create">Create new</Link>
        <Link style={padding} to="/about">About</Link>
        </div>

        <div>{notification}</div>

        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>}/>
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateAnecdote addNew={addNew}/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Router>      
      <footer>
        <br />
        <div>
          Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

          See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
        </div>
      </footer>
    </div>
  )
}

export default App
