import React from 'react'
import PropTypes from 'prop-types'
import MailEmpty from './MailEmpty'
import { setMultiLineTruncate, getMarginLeftOdd } from '../modules/methods'
import { MailUnreadMessageLi, MailUnreadButton, MailUnreadContainerSubject,
         MailUnreadSubject, MailUnreadFrom, MailUnreadDate, MailUnreadDelete,
         MailUnreadContainerBody, MailUnreadContainerBtn, MailUnreadContainer,
         MailUnreadH5, MailUnreadContainerMessages, MailUnreadUl } from '../classnames/MailUnread'

const getMessages = (messages, handleClick, handleDelete) => {
  if (messages.length > 0) {
    return messages.map((message, i) => {
      return (
        <li className={`message ${MailUnreadMessageLi} ${getMarginLeftOdd(i)}`} key={`message-unread-${i}`}>
          <div className={`containerSubject ${MailUnreadContainerSubject}`}>
            <div>
              <div className={`subject ${MailUnreadSubject}`}>{message.subject}</div>
              <div className={`from ${MailUnreadFrom}`}>{message.to.join(', ')}</div>
            </div>
            <div className={`date ${MailUnreadDate}`}>{message.date}</div>
            <div className={`delete ${MailUnreadDelete}`} onClick={() => handleDelete(message.id)}>Delete</div>
          </div>
          <div className={`containerBody ${MailUnreadContainerBody}`}>{setMultiLineTruncate(message.body, 115)}</div>
          <div className={`containerBtn ${MailUnreadContainerBtn}`}>
            <button className={MailUnreadButton} onClick={() => handleClick(message.id)}>Mark as Read</button>
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
    <div className={`containerMailUnread ${MailUnreadContainer}`}>
      <h5 className={`elH5 ${MailUnreadH5}`}>UNREAD EMAIL</h5>
      <div className={`containerMessages ${MailUnreadContainerMessages}`}>
        <ul className={`elUl ${MailUnreadUl}`}>
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
