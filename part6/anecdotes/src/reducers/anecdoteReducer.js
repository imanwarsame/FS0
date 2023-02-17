import { createSlice } from '@reduxjs/toolkit'
import AnecdoteService from '../services/AnecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    upvoteReducer(state, action) {
      return state.map(anecdote =>
        anecdote.id !== action.payload.id ? anecdote : action.payload 
      )   
    }
  },
})

export const { appendAnecdote, setAnecdotes, upvoteReducer } = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const notes = await AnecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await AnecdoteService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const upvoteAnecdote = (id, anecdoteToChange) => {
  return async dispatch => {
    const changedAnecdote = { 
      ...anecdoteToChange, 
      votes: anecdoteToChange.votes + 1 
    }

    const savedAnecdote = await AnecdoteService.update(id, changedAnecdote);

    dispatch(upvoteReducer(savedAnecdote))
  }
}

export default anecdoteSlice.reducer