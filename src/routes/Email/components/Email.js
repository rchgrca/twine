import React from 'react'
import PropTypes from 'prop-types'
import MailRead from './MailRead'
import MailUnread from './MailUnread'
import MailLoading from './MailLoading'
import { keysrt, getMail } from '../modules/methods'
import './EmailView.scss'

export const Email = ({ messages, markRead, markUnread }) => {
  return (
    <div className='containerEmail'>
      <MailUnread
        messages={getMail(messages, true).sort(keysrt('date')).reverse()}
        handleClick={markRead} />
      <MailRead
        messages={getMail(messages, false).sort(keysrt('date')).reverse()}
        handleClick={markUnread} />
    </div>
  )
}

Email.propTypes = {
  messages: PropTypes.array.isRequired,
  markRead: PropTypes.func.isRequired,
  markUnread: PropTypes.func.isRequired,
}

export default Email
