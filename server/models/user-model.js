const mongoose = require('mongoose')
const { userDB } = require('../db')
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: { type: String, required: true },
        email: {type: String, required: true},
        password: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = userDB.model('users', User)