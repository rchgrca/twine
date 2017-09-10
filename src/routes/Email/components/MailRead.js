import React from 'react'
import PropTypes from 'prop-types'
import MailEmpty from './MailEmpty'
import { setMultiLineTruncate } from '../modules/methods'

const getMessages = (messages, handleClick, handleDelete) => {
  if (messages.length > 0) {
    return messages.map((message, i) => {
      return (
        <li className='message bg-white mb1 pv3 ph3 ba b--moon-gray br2 cf' key={`message-read-${i}`}>
          <div className='cell containerMessage'>
            <div className='subject b tl'>{message.subject}</div>
            <div className='tl'>{message.to.join(', ')}</div>
            <div className='containerBody  tl'>{setMultiLineTruncate(message.body, 220)}</div>
            <div className='containerTimestamp tl'>
              <div className='cell timestamp'>{message.date}</div>
              <div className='cell delete' onClick={() => handleDelete(message.id)}>Delete</div>
            </div>
          </div>
          <div className='cell containerBtn'>
            <button className='btn btn-primary pointer' onClick={() => handleClick(message.id)}>Mark Unread</button>
          </div>
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
    <div className='containerMailRead cf'>
      <h5 className='mb0 pa3 pt0 blue'>READ EMAIL</h5>
      <div className='containerMessages pl1 pr1'>
        <ul className='list pa0 cf'>
          {getMessages(messages, handleClick, handleDelete)}
        </ul>
      </div>
    </div>
  )
}

MailRead.propTypes = {
  messages: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default MailRead
