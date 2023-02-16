import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnecdote } from '../reducers/AnecdoteReducer'
import { addNotification } from "../reducers/NotificationReducer";


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

    const upvotedAnecdote = JSON.parse(JSON.stringify(anecdotes)).find(anecdote => anecdote.id === id)
    
    dispatch(addNotification(`You voted for '${upvotedAnecdote.content}'`)) //Success notification
    setTimeout(() => {
      dispatch(addNotification(null))
    }, 5000);
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