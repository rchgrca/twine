import React from 'react'
import PropTypes from 'prop-types'
import MailEmpty from './MailEmpty'
import { setMultiLineTruncate } from '../modules/methods'

const getMessages = (messages, handleClick, handleDelete) => {
  if (messages.length > 0) {
    return messages.map((message, i) => {
      return (
        <li className='message clearfix' key={`message-read-${i}`}>
          <div className='cell containerBtn'>
            <button className='btn btn-primary pointer' onClick={() => handleClick(message.id)}>Mark Unread</button>
          </div>
          <div className='cell containerMessage'>
            <div className='subject b tl'>{message.subject}</div>
            <div className='tl'>{message.to.join(', ')}</div>
            <div className='containerBody  tl'>{setMultiLineTruncate(message.body, 220)}</div>
          </div>
          <div className='cell containerTimestamp'>{message.date}</div>
          <div className='cell delete' onClick={() => handleDelete(message.id)}>Delete</div>
        </li>
      )
    })
  } else {
    return (
      <MailEmpty text={'There are no Read messages'} />
    )
  }
}

export const MailRead = ({ messages, handleClick, handleDelete }) => {
  return (
    <div className='containerMailRead'>
      <h5 className='pa3 blue'>READ EMAIL</h5>
      <ul className='list clearfix'>
        {getMessages(messages, handleClick, handleDelete)}
      </ul>
    </div>
  )
}

MailRead.propTypes = {
  messages: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default MailRead
