import React from 'react'
import PropTypes from 'prop-types'

export const MailEmpty = ({ text }) => {
  return <img className="loading" src="https://solo.vn/assets/images/cards/loader_blue.gif" />
}

MailEmpty.propTypes = {
  text: PropTypes.string.isRequired
}

export default MailEmpty
