import axios from 'axios'
import fakedata from './messages'
import fakeloading from './emailsLoading'
import { getApiUrl, filterMessages } from '../modules/methods'

// ------------------------------------
// Constants
// ------------------------------------

export const MARK_READ = 'MARK_READ'
export const MARK_UNREAD = 'MARK_UNREAD'
export const LOAD_EMAILS_SUCCESS = 'LOAD_EMAILS_SUCCESS'
export const LOADING = 'LOADING'
export const DELETE_MAIL = 'DELETE_MAIL'

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

export function deleteMail (value = 1) {
  return function (dispatch, getState) {
    return axios.get(getApiUrl('put'), {})
      .then(function (response) {
        dispatch({
          type    : DELETE_MAIL,
          payload : value
        })
      }).catch(function () {
        console.log(`ERROR: ${DELETE_MAIL}`)
      })
  }
}

export function loading () {
  return {
    type: LOADING,
    payload: fakeloading.emails
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
  [LOADING] : (state, action) => {
    return action.payload
  },
  [LOAD_EMAILS_SUCCESS] : (state, action) => {
    return filterMessages(action.emails)
  },
  [DELETE_MAIL] : (state, action) => {
    return state.filter((message) => {
      return message.id !== action.payload
    })
  },
  [MARK_READ] : (state, action) => {
    return state.map((message) => {
      if (message.id === action.payload) {
        message.unread = false
      }
      return message
    })
  },
  [MARK_UNREAD] : (state, action) => {
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
