import moment from 'moment'

export const getApiUrl = (method) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const host = 'https://s3.us-east-2.amazonaws.com'
  const path = `twine-public/apis/twine-mail-${method}.json`
  return `${proxy}${host}/${path}`
}

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

export const removeEmailsDatesInvalid = (emails) => {
  return emails.map((email) => {
    if (!moment(email.date).isValid()) {
      console.log(`ERROR: Malformed Data: Invalid Timestamp: Date = null: id:${email.id}`)
    }
    return email
  })
}

export const removeEmailsAddressesInvalid = (emails) => {
  return emails.map((email) => {
    email.to = email.to.filter((address) => {
      if (!address.includes('@')) {
        console.log(`ERROR: Malformed Data: Email Address: Missing '@':
        id:${email.id}, address:${address}`)
      }
      return address.includes('@')
    })
    return email
  })
}

export const getMail = (messages, isUnread) => {
  return messages.filter((message) => {
    return message.unread === isUnread
  })
}

export const removeInvalidData = (messages) => {
  return removeEmailsAddressesInvalid(removeEmailsDatesInvalid(messages))
}

export const convertDates = (messages) => {
  return convertDateToFormat(convertDateToMs(removeInvalidData(messages)))
}

export const filterMessages = (messages) => {
  return convertDates(messages)
}

export const setMultiLineTruncate = (text, maxlength) => {
  // uses JS solution because pure CSS solutions are not cross-browser reliable
  const ellipsis = text.length > maxlength ? '...' : ''
  return `${text.substring(0, maxlength)}${ellipsis}`
}
