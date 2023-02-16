import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    }
  },
})


export const { addNotification } = notificationSlice.actions
export default notificationSlice.reducer