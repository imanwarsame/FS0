import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/AnecdoteReducer'
import filterReducer from "./reducers/FilterReducer";

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer
	}
})

export default store