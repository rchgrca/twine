import axios from 'axios'
import moment from 'moment'
import fakedata from './messages'
import { convertDateToMs, convertDateToFormat } from '../modules/methods'
// ------------------------------------
// Constants
// ------------------------------------
export const MARK_READ = 'MARK_READ'
export const MARK_UNREAD = 'MARK_UNREAD'
export const LOAD_EMAILS_SUCCESS = 'LOAD_EMAILS_SUCCESS'

const getApiUrl = (method) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const host = 'https://s3.us-east-2.amazonaws.com'
  const path = `twine-public/apis/twine-mail-${method}.json`
  return `${proxy}${host}/${path}`
}

const removeEmailsDatesInvalid = (emails) => {
  return emails.map((email) => {
    if (!moment(email.date).isValid()) {
      console.log(`ERROR: Malformed Data: Invalid Timestamp: Date = null: id:${email.id}`)
    }
    return email
  })
}

const removeEmailsAddressesInvalid = (emails) => {
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

// ------------------------------------
// Actions
// ------------------------------------
export function loadEmailsSuccess (emails) {
  return {
    type: LOAD_EMAILS_SUCCESS,
    emails
  }
}

export function markRead (value = 1) {
  return function (dispatch, getState) {
    return axios.get(getApiUrl('put'), {})
      .then(function (response) {
        dispatch({
          type    : MARK_READ,
          payload : value
        })
      }).catch(function () {
        console.log(`ERROR: ${MARK_READ}`)
      })
  }
}

export function markUnread (value = 1) {
  return function (dispatch, getState) {
    return axios.get(getApiUrl('put'), {})
      .then(function (response) {
        dispatch({
          type    : MARK_UNREAD,
          payload : value
        })
      }).catch(function () {
        console.log(`ERROR: ${MARK_UNREAD}`)
      })
  }
}

export function loadEmails () {
  return function (dispatch) {
    return axios.get(getApiUrl('get'), {})
      .then(function (response) {
        dispatch(loadEmailsSuccess(response.data.emails))
      }).catch(function () {
        console.log(`ERROR: ${LOAD_EMAILS_SUCCESS}`)
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_EMAILS_SUCCESS]  : (state, action) => {
    return convertDateToFormat(convertDateToMs(removeEmailsAddressesInvalid(removeEmailsDatesInvalid(action.emails))))
  },
  [MARK_READ]            : (state, action) => {
    return state.map((message) => {
      if (message.id === action.payload) {
        message.unread = false
      }
      return message
    })
  },
  [MARK_UNREAD]          : (state, action) => {
    return state.map((message) => {
      if (message.id === action.payload) {
        message.unread = true
      }
      return message
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = [] || fakedata.emails
export default function emailReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
