import React from 'react'
import PropTypes from 'prop-types'

export const Email = ({ markRead, markUnRead }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Email</h2>
    <button className='btn btn-primary' onClick={markRead}>
      Mark Read
    </button>
    {' '}
    <button className='btn btn-secondary' onClick={markUnRead}>
      Mark Unread
    </button>
  </div>
)
Email.propTypes = {
  markRead: PropTypes.func.isRequired,
  markUnRead: PropTypes.func.isRequired,
}

export default Email
