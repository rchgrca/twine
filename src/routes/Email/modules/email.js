import axios from 'axios'
import fakedata from './messages'
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const MARK_READ = 'MARK_READ'
export const MARK_UNREAD = 'MARK_UNREAD'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().counter
        })
        resolve()
      }, 200)
    })
  }
}

export function markRead (value = 1) {
  return {
    type    : MARK_READ,
    payload : value
  }
}

export function markUnread (value = 1) {
  return {
    type    : MARK_UNREAD,
    payload : value
  }
}

export const actions = {
  increment,
  doubleAsync,
  markRead,
  markUnread
}

// ------------------------------------
// Action Handlers
// ------------------------------------
// const proxy = 'https://crossorigin.me'
const host = 'https://s3.us-east-2.amazonaws.com'
const uriPut = 'twine-public/apis/twine-mail-put.json'
const uriGet = 'twine-public/apis/twine-mail-get.json'

const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
  [MARK_READ]    : (state, action) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function () {
      console.log('SUCCESS')
    })
    xhr.addEventListener('error', function () {
      console.log('FAIL')
    })
    xhr.open('PUT', `${host}/${uriPut}/${action.payload}?mark=read`)
    xhr.send()

    const messages = state.map((message) => {
      if (message.id === action.payload) {
        message.unread = false
      }
      return message
    })

    return messages
  },
  [MARK_UNREAD]    : (state, action) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function () {
      console.log('SUCCESS')
    })
    xhr.addEventListener('error', function () {
      console.log('FAIL')
    })
    xhr.open('PUT', `${host}/${uriPut}/${action.payload}?mark=unread`)
    xhr.send()

    const messages = state.map((message) => {
      if (message.id === action.payload) {
        message.unread = true
      }
      return message
    })

    return messages
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const xhr = new XMLHttpRequest()
xhr.addEventListener('load', function () {
  console.log('SUCCESS', JSON.parse(this.responseText))
})
xhr.addEventListener('error', function () {
  console.log('FAIL', JSON.parse(this.responseText))
})
xhr.open('GET', `${host}/${uriGet}`)
xhr.send()
const initialState = fakedata.emails
export default function emailReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
