import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnecdote } from '../reducers/AnecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({anecdotes, filter}) => {
    if ( filter === '' ) {
      return anecdotes
    }

    console.log(filter);
    return anecdotes.filter(value => value.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (id) => {
    dispatch(upvoteAnecdote(id));
  }

  const compare = (anecdoteA, anecdoteB) => {
    if (anecdoteA.votes > anecdoteB.votes) {
        return -1
    }
    if (anecdoteA.votes < anecdoteB.votes) {
        return 1
    }
  }

  return (
    <div>
      {[...anecdotes].sort(compare)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList