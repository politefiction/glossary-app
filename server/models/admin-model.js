const mongoose = require('mongoose')
const { adminDB } = require('../db')
const Schema = mongoose.Schema

const Admin = new Schema(
    {
        username: { type: String, required: true },
        email: {type: String, required: true},
        password: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = adminDB.model('users', Admin)