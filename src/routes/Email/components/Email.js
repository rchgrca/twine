import React from 'react'
import PropTypes from 'prop-types'
import MailRead from './MailRead'
import MailUnread from './MailUnread'

const getMail = (messages, isUnread) => {
  return messages.filter((message) => {
    return message.unread == isUnread
  })
}

export const Email = ({ messages, markRead, markUnRead }) => {
  return (
    <div style={{ margin: '0 auto' }} >
      <h2>Twine Email</h2>
      <MailUnread messages={getMail(messages,true)} handleClick={markUnRead} />
      <MailRead messages={getMail(messages,false)} handleClick={markRead} />
    </div>
  )
}

Email.propTypes = {
  messages: PropTypes.array.isRequired,
  markRead: PropTypes.func.isRequired,
  markUnRead: PropTypes.func.isRequired,
}

export default Email
