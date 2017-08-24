import axios from 'axios'
import fakedata from './messages'
// ------------------------------------
// Constants
// ------------------------------------
export const MARK_READ = 'MARK_READ'
export const MARK_UNREAD = 'MARK_UNREAD'
export const LOAD_EMAILS_SUCCESS = 'LOAD_EMAILS_SUCCESS'

const getApiUrl = (method) => {
  const proxy = 'http://cors-proxy.htmldriven.com/?url='
  const host = 'https://s3.us-east-2.amazonaws.com'
  const path = `twine-public/apis/twine-mail-${method}.json`
  return `${proxy}${host}/${path}`
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
      .then (function (response) {
        dispatch({
          type    : MARK_READ,
          payload : value
        })
      }).catch (function () {
        console.log(`ERROR: ${MARK_READ}`)
      })
  }
}

export function markUnread (value = 1) {
  return function (dispatch, getState) {
    return axios.get(getApiUrl('put'), {})
      .then (function (response) {
        dispatch({
          type    : MARK_UNREAD,
          payload : value
        })
      }).catch (function () {
        console.log(`ERROR: ${MARK_UNREAD}`)
      })
  }
}

export function loadEmails () {
  return function (dispatch) {
    return axios.get(getApiUrl('get'), {})
      .then (function (response) {
        dispatch(loadEmailsSuccess(JSON.parse(response.data.body).emails))
      }).catch (function () {
        console.log('Error: Please refresh')
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_EMAILS_SUCCESS]  : (state, action) => action.emails,
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
