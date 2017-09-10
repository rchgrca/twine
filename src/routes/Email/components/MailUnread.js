import React from 'react'
import PropTypes from 'prop-types'
import MailEmpty from './MailEmpty'
import { setMultiLineTruncate } from '../modules/methods'

const getMessages = (messages, handleClick, handleDelete) => {
  if (messages.length > 0) {
    return messages.map((message, i) => {
      return (
        <li className='message bg-white w-33-l mr4-l mb1 pv3 ph3 ba b--moon-gray br2 cf' key={`message-unread-${i}`}>
          <div className='containerSubject mb4 pb4 bb b--moon-gray cf'>
            <div className='cell'>
              <div className='subject b tl'>{message.subject}</div>
              <div className='tl'>{message.to.join(', ')}</div>
            </div>
            <div className='cell date tl'>{message.date}</div>
            <div className='cell delete blue pointer tl' onClick={() => handleDelete(message.id)}>Delete</div>
          </div>
          <div className='containerBody cb pb4 bb b--moon-gray tl'>{setMultiLineTruncate(message.body, 115)}</div>
          <div className='containerBtn tc'>
            <button className='br2 ph3 pv2 mt3 bg-blue white ba b--blue ws-normal pointer tl pointer' onClick={() => handleClick(message.id)}>Mark as Read</button>
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
      <div className='containerMessages ph1'>
        <ul className='list flex-l ph4-l pa0 cf'>
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
