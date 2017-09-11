import React from 'react'
import PropTypes from 'prop-types'
import MailEmpty from './MailEmpty'
import { setMultiLineTruncate } from '../modules/methods'
import { MailReadContainer, MailReadH5, MailReadContainerMessages, MailReadUl,
         MailReadButton, MailReadMessageLi, MailReadContainerMessage, MailReadSubject,
         MailReadFrom, MailReadContainerBody, MailReadContainerDate, MailReadDate,
         MailReadDelete, MailReadContainerBtn } from '../classnames/MailRead'

const getMessages = (messages, handleClick, handleDelete) => {
  if (messages.length > 0) {
    return messages.map((message, i) => {
      return (
        <li className={`message ${MailReadMessageLi}`} key={`message-read-${i}`}>
          <div className={`containerMessage ${MailReadContainerMessage}`}>
            <div className={`subject ${MailReadSubject}`}>{message.subject}</div>
            <div className={`from ${MailReadFrom}`}>{message.to.join(', ')}</div>
            <div className={`containerBody ${MailReadContainerBody}`}>{setMultiLineTruncate(message.body, 220)}</div>
            <div className={`containerDate ${MailReadContainerDate}`}>
              <div className={`date ${MailReadDate}`}>{message.date}</div>
              <div className={`delete ${MailReadDelete}`} onClick={() => handleDelete(message.id)}>Delete</div>
            </div>
          </div>
          <div className={`containerBtn ${MailReadContainerBtn}`}>
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
    <div className={`containerMailRead ${MailReadContainer}`}>
      <h5 className={`elH5 ${MailReadH5}`}>READ EMAIL</h5>
      <div className={`containerMessages ${MailReadContainerMessages}`}>
        <ul className={`elUl ${MailReadUl}`}>
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
