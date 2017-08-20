import React from 'react'
import PropTypes from 'prop-types'


const getMailTo = (a) => {
  return a.map((i) => {
    return `${i}, `
  })
}

const getMessages = (messages, handleClick) => {
  return messages.map((message, i) => {
    return (
      <li className="message" key={`message-unread-${i}`}>
        <div className="containerSubject clearfix">
          <div className="cell">
            <div className="subject">{message.subject}</div>
            <div>{getMailTo(message.to)}</div>
          </div>
          <div className="cell date">{message.date}</div>
        </div>
        <div className="containerBody">{message.body}</div>
        <div className="containerBtn">
          <button className='btn btn-primary' onClick={handleClick}>Mark as Read</button>
        </div>
      </li>
    )
  })
}

export const MailUnread = ({ messages, handleClick }) => {
  return (
    <div className="containerMailUnread clearfix">
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
