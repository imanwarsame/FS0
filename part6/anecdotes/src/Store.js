import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/AnecdoteReducer'
import filterReducer from "./reducers/FilterReducer";
import notificationReducer from './reducers/NotificationReducer';

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer,
		notification: notificationReducer
	}
})

export default store