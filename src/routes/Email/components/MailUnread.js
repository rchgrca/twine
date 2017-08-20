import React from 'react'
import PropTypes from 'prop-types'

const getMessages = (messages, handleClick) => {
  return messages.map((message, i) => {
    return (
      <li className="messageRead" key={`message-unread-${i}`}>
        <div className="cell containerBtn">
          <div>
            <div>{message.subject}</div>
            <div>{message.to}</div>
          </div>
          <div>{message.date}</div>
        </div>
        <div className="cell containerMessage">{message.body}</div>
        <div className="cell containerTimestamp">
          <button className='btn btn-primary' onClick={handleClick}>Mark as Read</button>
        </div>
      </li>
    )
  })
}

export const MailUnread = ({ messages, handleClick }) => {
  return (
    <div style={{ margin: '0 auto' }}>
      <h5>UNREAD EMAIL</h5>
      <ul>
        {getMessages(messages,handleClick)}
      </ul>
    </div>
  )
}

MailUnread.propTypes = {
  messages: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default MailUnread
