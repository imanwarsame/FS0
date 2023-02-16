import { useEffect } from 'react'
import AnecdoteService from './services/AnecdoteService'
import { setAnecdotes } from './reducers/AnecdoteReducer'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    AnecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App