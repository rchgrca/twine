import React from 'react'
import PropTypes from 'prop-types'
import MailEmpty from './MailEmpty'
import { setMultiLineTruncate } from '../modules/methods'

const getMessages = (messages, handleClick, handleDelete) => {
  if (messages.length > 0) {
    return messages.map((message, i) => {
      return (
        <li className='message bg-white mb1 pv3 ph3 ba b--moon-gray br2 cf' key={`message-unread-${i}`}>
          <div className='containerSubject cf'>
            <div className='cell'>
              <div className='subject b tl'>{message.subject}</div>
              <div className='tl'>{message.to.join(', ')}</div>
            </div>
            <div className='cell date tl'>{message.date}</div>
            <div className='cell delete tl' onClick={() => handleDelete(message.id)}>Delete</div>
          </div>
          <div className='containerBody tl'>{setMultiLineTruncate(message.body, 115)}</div>
          <div className='containerBtn'>
            <button className='btn btn-primary pointer' onClick={() => handleClick(message.id)}>Mark as Read</button>
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

export const MailUnread = ({ messages, handleClick, handleDelete }) => {
  return (
    <div className='containerMailUnread cf'>
      <h5 className='mb0 pa3 blue'>UNREAD EMAIL</h5>
      <div className='containerMessages pl1 pr1'>
        <ul className='list pa0 cf'>
          {getMessages(messages, handleClick, handleDelete)}
        </ul>
      </div>
    </div>
  )
}

MailUnread.propTypes = {
  messages: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default MailUnread
