import React from 'react'
import PropTypes from 'prop-types'
import MailRead from './MailRead'
import MailUnread from './MailUnread'
import MailLoading from './MailLoading'
import { keysrt, getMail, isLoading } from '../modules/methods'
import './EmailView.scss'

const getMessages = (messages, markRead, markUnread, deleteMail) => {
  return (
    <div>
      <MailUnread
        messages={getMail(messages, true).sort(keysrt('date')).reverse()}
        handleClick={markRead} handleDelete={deleteMail} />
      <MailRead
        messages={getMail(messages, false).sort(keysrt('date')).reverse()}
        handleClick={markUnread} handleDelete={deleteMail} />
    </div>
  )
}

export const Email = ({ messages, markRead, markUnread, deleteMail }) => {
  return (
    <div className='containerEmail bg-black-05 ba-ns b--light-gray'>
      {isLoading(messages) ? <MailLoading /> : getMessages(messages, markRead, markUnread, deleteMail)}
    </div>
  )
}

Email.propTypes = {
  messages: PropTypes.array.isRequired,
  markRead: PropTypes.func.isRequired,
  markUnread: PropTypes.func.isRequired,
  deleteMail: PropTypes.func.isRequired,
}

export default Email
