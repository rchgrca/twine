import React from 'react'
import PropTypes from 'prop-types'
import MailRead from './MailRead'
import MailUnread from './MailUnread'
import { keysrt, convertDateToMs, convertDateToFormat, getMail } from '../modules/methods'
import './EmailView.scss'

export const Email = ({ messages, markRead, markUnread }) => {
  convertDateToMs(messages)
  return (
    <div className='containerEmail'>
      <MailUnread
        messages={convertDateToFormat(getMail(messages, true).sort(keysrt('date')).reverse())}
        handleClick={markRead} />
      <MailRead
        messages={convertDateToFormat(getMail(messages, false).sort(keysrt('date')).reverse())}
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
