import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/AnecdoteReducer'
import AnecdoteService from '../services/AnecdoteService'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await AnecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm