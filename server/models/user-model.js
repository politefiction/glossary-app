const mongoose = require('mongoose')
const { glossaryDB } = require('../db')
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: { type: String, required: true },
        email: {type: String, required: true},
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false }
    },
    { timestamps: true }
)

module.exports = glossaryDB.model('users', User)