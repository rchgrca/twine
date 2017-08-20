import React from 'react'
import PropTypes from 'prop-types'
import MailRead from './MailRead'
import MailUnread from './MailUnread'
import './EmailView.scss'

const getMail = (messages, isUnread) => {
  return messages.filter((message) => {
    return message.unread == isUnread
  })
}

export const Email = ({ messages, markRead, markUnread }) => {
  return (
    <div className="containerEmail">
      <h2>Twine Email</h2>
      <MailUnread messages={getMail(messages,true)} handleClick={markRead} />
      <MailRead messages={getMail(messages,false)} handleClick={markUnread} />
    </div>
  )
}

Email.propTypes = {
  messages: PropTypes.array.isRequired,
  markRead: PropTypes.func.isRequired,
  markUnread: PropTypes.func.isRequired,
}

export default Email
