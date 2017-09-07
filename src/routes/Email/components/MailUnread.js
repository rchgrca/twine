import React from 'react'
import PropTypes from 'prop-types'
import MailEmpty from './MailEmpty'
import { setMultiLineTruncate } from '../modules/methods'

const getMessages = (messages, handleClick) => {
  if (messages.length > 0) {
    return messages.map((message, i) => {
      return (
        <li className='message' key={`message-unread-${i}`}>
          <div className='containerSubject clearfix'>
            <div className='cell'>
              <div className='subject'>{message.subject}</div>
              <div>{message.to.join(', ')}</div>
            </div>
            <div className='cell date'>{message.date}</div>
          </div>
          <div className='containerBody'>{setMultiLineTruncate(message.body, 115)}</div>
          <div className='containerBtn'>
            <button className='btn btn-primary' onClick={() => handleClick(message.id)}>Mark as Read</button>
          </div>
        </li>
      )
    })
  } else {
    return (
      <MailEmpty text={'There are no Unread messages'} />
    )
  }
}

export const MailUnread = ({ messages, handleClick }) => {
  return (
    <div className='containerMailUnread clearfix'>
      <h5>UNREAD EMAIL</h5>
      <ul className='clearfix'>
        {getMessages(messages, handleClick)}
      </ul>
    </div>
  )
}

MailUnread.propTypes = {
  messages: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default MailUnread
