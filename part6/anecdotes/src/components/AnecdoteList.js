import { useSelector, useDispatch } from 'react-redux'
import { upVote } from '../reducers/AnecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({anecdotes, filter}) => {
    if ( filter === '' ) {
      return anecdotes
    }
    console.log(anecdotes[0]);
    console.log(filter);
    return anecdotes.filter(value => value.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (id) => {
    dispatch(upVote(id));
  }

  return (
    <div>
      {anecdotes.sort(({ votes: previousVotes }, { votes: currentVotes }) => currentVotes - previousVotes)
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