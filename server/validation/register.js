const Validator = require("validator")
const isEmpty = require("is-empty")

validateRegisterInput = data => {
    let errors = {}

    data.username = !isEmpty(data.username) ? data.username : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.passwordval = !isEmpty(data.passwordval) ? data.passwordval : ""

    if (Validator.isEmpty(data.username)) { 
        errors.username = "Username field is required" 
    }

    if (Validator.isEmpty(data.email)) { 
        errors.email = "Email field is required" 
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    if (Validator.isEmpty(data.password)) { 
        errors.password = "Password field is required" 
    }
    
    if (Validator.isEmpty(data.passwordval)) { 
        errors.passwordval = "Password validation field is required" 
    }

    if (!Validator.equals(data.password, data.passwordval)) { 
        errors.passwordval = "Passwords must match" 
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput