import React from 'react'
import PropTypes from 'prop-types'
import MailEmpty from './MailEmpty'
import { setMultiLineTruncate } from '../modules/methods'
import { MailReadButton } from '../modules/classnamevars'

const getMessages = (messages, handleClick, handleDelete) => {
  if (messages.length > 0) {
    return messages.map((message, i) => {
      return (
        <li className='message bg-white mb1 pv3 ph3 ba b--moon-gray br2 cf' key={`message-read-${i}`}>
          <div className='containerMessage relative-l fr-l w-90-l ph3-l pt0-l'>
            <div className='subject b tl'>{message.subject}</div>
            <div className='tl'>{message.to.join(', ')}</div>
            <div className='containerBody mt3 tl'>{setMultiLineTruncate(message.body, 220)}</div>
            <div className='containerTimestamp absolute-l top-0-l right-0-l tl tr-l'>
              <div className='timestamp moon-gray'>{message.date}</div>
              <div className='delete blue pointer' onClick={() => handleDelete(message.id)}>Delete</div>
            </div>
          </div>
          <div className='containerBtn'>
            <button className={MailReadButton} onClick={() => handleClick(message.id)}>Mark Unread</button>
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
        <ul className='list ph4-l pa0 cf'>
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
