import React from 'react'
import PropTypes from 'prop-types'

const getMessages = (messages, handleClick) => {
  return messages.map((message, i) => {
    return (
      <li className="messageRead" key={`message-read-${i}`}>
        <div className="cell containerBtn">
          <button className='btn btn-primary' onClick={handleClick}>Mark as Unread</button>
        </div>
        <div className="cell containerMessage">
          <div>{message.subject}</div>
          <div>{message.to}</div>
          <div>{message.body}</div>
        </div>
        <div className="cell containerTimestamp">{message.date}</div>
      </li>
    )
  })
}

export const MailRead = ({ messages, handleClick }) => {
  return (
    <div style={{ margin: '0 auto' }}>
      <h5>READ EMAIL</h5>
      <ul>
        {getMessages(messages,handleClick)}
      </ul>
    </div>
  )
}

MailRead.propTypes = {
  messages: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default MailRead
