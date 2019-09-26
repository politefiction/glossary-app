const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Entry = new Schema(
    {
        term: { type: String, required: true },
        definition: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('users', Entry)