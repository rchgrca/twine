import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import MailRead from './MailRead'
import MailUnread from './MailUnread'
import './EmailView.scss'

const keysrt = (key) => {
  return function (a, b) {
    if (a[key] > b[key]) return 1
    if (a[key] < b[key]) return -1
    return 0
  }
}

const convertDateToMs = (messages) => {
  return messages.map((message) => {
    message['date'] = parseInt(moment(message.date).format('x'), 10)
    return message
  })
}

const convertDateToFormat = (messages) => {
  return messages.map((message) => {
    const isMessageToday = moment().format('MMM D, YYYY') === moment(message.date).format('MMM D, YYYY')
    const sFormat = isMessageToday ? 'h mm A' : 'MMM D, YYYY'
    message['date'] = moment(message.date).format(sFormat)
    return message
  })
}

const getMail = (messages, isUnread) => {
  return messages.filter((message) => {
    return message.unread === isUnread
  })
}

export const Email = ({ messages, markRead, markUnread }) => {
  convertDateToMs(messages)
  return (
    <div className='containerEmail'>
      <h2>Twine Email</h2>
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
