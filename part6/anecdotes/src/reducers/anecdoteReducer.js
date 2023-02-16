import { createSlice } from '@reduxjs/toolkit'
import AnecdoteService from '../services/AnecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    upvoteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )   
    }
  },
})

export const { createAnecdote, setAnecdotes, upvoteAnecdote } = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const notes = await AnecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export default anecdoteSlice.reducer