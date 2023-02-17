import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
	return action;	
}

const NotificationContext = createContext();

export const NotificationcontextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer)
  
	return (
	  <NotificationContext.Provider value={[notification, notificationDispatch] }>
		{props.children}
	  </NotificationContext.Provider>
	)
}

export const useNotificationValue = () => {
	const NotificationAndDispatch = useContext(NotificationContext)
	return NotificationAndDispatch[0]
}
  
export const useNotificationDispatch = () => {
	const NotificationAndDispatch = useContext(NotificationContext)
	return NotificationAndDispatch[1]
}

export default NotificationContext;