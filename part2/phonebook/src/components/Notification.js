import "../index.css";

const Notification = ({ message, notificationType = 'notification' }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={notificationType}>
        {message}
      </div>
    )
}

export default Notification