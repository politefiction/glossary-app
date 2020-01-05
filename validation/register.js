const Validator = require('validator')
const isEmpty = require('is-empty')
const config = require('../config/default')

validateRegisterInput = data => {
  let errors = {}

  data.username = !isEmpty(data.username) ? data.username : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.passwordval = !isEmpty(data.passwordval) ? data.passwordval : ''
  data.adminCode = !isEmpty(data.adminCode) ? data.adminCode : ''

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  if (Validator.isEmpty(data.passwordval)) {
    errors.passwordval = 'Password validation field is required'
  }

  if (!Validator.equals(data.password, data.passwordval)) {
    errors.passwordval = 'Passwords must match'
  }

  if (Validator.isEmpty(data.adminCode)) {
    errors.adminCode = 'Must have admin code to register'
  } else if (!Validator.equals(data.adminCode, config.adminCode)) {
    errors.adminCode = 'Admin code is incorrect'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateRegisterInput
