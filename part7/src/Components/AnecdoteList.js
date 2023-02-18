import { Link } from 'react-router-dom';

const AnecdoteList = ({ anecdotes }) => (
	<div>
	  <h2>Anecdotes</h2>
	  {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
	</div>
)

export default AnecdoteList