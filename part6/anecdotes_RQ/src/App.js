import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote));
    }
  })

  const handleVote = (anecdote) => {
    const changedAnecdote = {...anecdote, votes: anecdote.votes + 1};
    updateAnecdoteMutation.mutate(changedAnecdote);
  }

  const result = useQuery(
    'anecdotes', getAnecdotes, 
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  );

  

  /* Checking if the request was successful. If not, it will return a message. */
  if ( !result.isSuccess ) {
    return <div>Anecdote service is not available due to server error</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
