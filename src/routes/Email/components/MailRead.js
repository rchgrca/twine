import React from 'react'
import PropTypes from 'prop-types'

const setMultiLineTruncate = (text, maxlength) => {
  // uses JS solution because pure CSS solutions are not cross-browser reliable
  const ellipsis = text.length > maxlength ? '...' : ''
  return `${text.substring(0, maxlength)}${ellipsis}`
}

const getMessages = (messages, handleClick) => {
  if (messages.length > 0) {
    return messages.map((message, i) => {
      return (
        <li className='message clearfix' key={`message-read-${i}`}>
          <div className='cell containerBtn'>
            <button className='btn btn-primary' onClick={() => handleClick(message.id)}>Mark Unread</button>
          </div>
          <div className='cell containerMessage'>
            <div className='subject'>{message.subject}</div>
            <div>{message.to.join(', ')}</div>
            <div className='containerBody'>{setMultiLineTruncate(message.body, 185)}</div>
          </div>
          <div className='cell containerTimestamp'>{message.date}</div>
        </li>
      )
    })
  } else {
    return (
      <li className='message clearfix center'>There are no Read messages</li>
    )
  }
}

export const MailRead = ({ messages, handleClick }) => {
  return (
    <div className='containerMailRead'>
      <h5>READ EMAIL</h5>
      <ul className='clearfix'>
        {getMessages(messages, handleClick)}
      </ul>
    </div>
  )
}

MailRead.propTypes = {
  messages: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default MailRead
