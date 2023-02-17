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

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(addNotification(notification))
    setTimeout(() => {
      dispatch(addNotification(''))
    }, time*1000);
  }
}

export default notificationSlice.reducer