import React from 'react'
import PropTypes from 'prop-types'

export const MailEmpty = ({ text }) => {
  return <li className='message clearfix center'>{text}</li>
}

MailEmpty.propTypes = {
  text: PropTypes.string.isRequired
}

export default MailEmpty
