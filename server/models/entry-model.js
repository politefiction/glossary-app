const mongoose = require('mongoose')
const { entryDB } = require('../db')
const Schema = mongoose.Schema

const Entry = new Schema(
    {
        term: { 
            type: String, 
            validate: {
                validator: function(v) {
                  return /[a-z]/gi.test(v);
                },
                message: 'Term must contain text.'
            },
            required: [true, 'You must enter a term.'] 
        },
        definition: { 
            type: String,
            validate: {
                validator: function(v) {
                  return /[a-z]/gi.test(v);
                },
                message: 'Definition must contain text.'
            }, 
            required: [true, 'You must enter a definition.'] 
        }
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