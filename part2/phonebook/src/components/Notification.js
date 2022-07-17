const Notification = ({ message, type }) => {

  const notificationStyle = type === 'info' ? 'notification info' : 'notification error'
  const visibility = message ? 'visible' : 'hidden'

  return (
    <div className={`${notificationStyle} ${visibility}`}>
      {message}
    </div>
  )
}


export default Notification