const mongoose = require('mongoose')
const { entryDB } = require('../db')
const Schema = mongoose.Schema

const Entry = new Schema(
    {
        term: { type: String, required: true },
        definition: { type: String, required: true }
    },
    { timestamps: true }
)

const Admin = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = entryDB.model('users', Entry)