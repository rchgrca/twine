import moment from 'moment'

export const keysrt = (key) => {
  return (a, b) => {
    if (a[key] > b[key]) return 1
    if (a[key] < b[key]) return -1
    return 0
  }
}

export const convertDateToMs = (messages) => {
  return messages.map((message) => {
    message['date'] = parseInt(moment(message.date).format('x'), 10)
    return message
  })
}

export const convertDateToFormat = (messages) => {
  return messages.map((message) => {
    const isMessageToday = moment().format('MMM D, YYYY') === moment(message.date).format('MMM D, YYYY')
    const sFormat = isMessageToday ? 'h mm A' : 'MMM D, YYYY'
    message['date'] = moment(message.date).format(sFormat)
    return message
  })
}

export const getMail = (messages, isUnread) => {
  return messages.filter((message) => {
    return message.unread === isUnread
  })
}

export const setMultiLineTruncate = (text, maxlength) => {
  // uses JS solution because pure CSS solutions are not cross-browser reliable
  const ellipsis = text.length > maxlength ? '...' : ''
  return `${text.substring(0, maxlength)}${ellipsis}`
}
