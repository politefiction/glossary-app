const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const { secret } = require('../db')
const config = require('../config/default')

validateRegistration = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' })
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.adminCode === config.adminCode
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                secret,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      username: user.username,
                      email: user.email
                    }
                  })
                }
              )
            })
            .catch(err => console.log(err))
        })
      })
    }
  })
}

validateLogin = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' })
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username
        }
        jwt.sign(payload, secret, { expiresIn: 31556926 }, (err, token) => {
          if (err) throw err
          res.json({
            success: true,
            token: `JWT ${token}`
          })
        })
      } else {
        res.status(400).json({ passwordincorrect: 'Password incorrect' })
      }
    })
  })
}

deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' })
    }

    return res.status(200).json({ success: true, data: user })
  }).catch(err => console.log(err))
}

module.exports = {
  validateRegistration,
  validateLogin,
  deleteUser
}
