import React from 'react'


const Notification = ({ message, type }) => {

  if (message === null) {
    return null
  }

  const notificationStyle = type === 'info' ? 'notification info' : 'notification error'

  return (
    <div className={notificationStyle}>
      {message}
    </div>
  )
}


export default Notification