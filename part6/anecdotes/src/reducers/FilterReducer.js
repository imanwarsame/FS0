import { createSlice } from '@reduxjs/toolkit'

export const filterChange = filter => {
	return {
	  type: 'SET_FILTER',
	  payload: filter,
	}
}

const initialState = ''

const filterSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      return action.payload
    }
  },
})


export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer