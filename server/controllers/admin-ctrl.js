const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin-model')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const { secretOrKey } = require('../db')

validateRegistration = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) { return res.status(400).json(errors) }

    Admin.findOne({ email: req.body.email }).then(admin => {
        if (admin) {
            return res.status(400).json({ email: "Email already exists" })
        } else {
            const newAdmin = new Admin({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if (err) throw err
                    newAdmin.password = hash
                    newAdmin
                        .save()
                        .then(admin => res.json(admin))
                        .catch(err => console.log(err))
                })
            })
        }
    })
}

validateLogin = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) { return res.status(400).json(errors) }

    const email = req.body.email
    const password = req.body.password

    Admin.findOne({ email }).then(admin => {
        if (!admin) {
            return res.status(404).json({ emailnotfound: "Email not found" })
        }

        bcrypt.compare(password, admin.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: admin.id,
                    username: admin.username
                }
                jwt.sign(
                    payload,
                    secretOrKey,
                    { expiresIn: 31556926 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: `Bearer ${token}`
                        })
                    }
                )
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" })
            }
        })
    })
}


module.exports = {
    validateRegistration,
    validateLogin
}