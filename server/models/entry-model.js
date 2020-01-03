const mongoose = require('mongoose')
const { glossaryDB } = require('../db')
const Schema = mongoose.Schema

const Entry = new Schema(
    {
        term: { 
            type: String, 
            validate: {
                validator: v => { return /[a-z]/gi.test(v) },
                message: 'Term must contain text.'
            },
            required: [true, 'You must enter a term.'] 
        },
        definition: { 
            type: String,
            validate: {
                validator: v => { return /[a-z]/gi.test(v) },
                message: 'Definition must contain text.'
            }, 
            required: [true, 'You must enter a definition.'] 
        }
    },
    { timestamps: true }
)

module.exports = glossaryDB.model('entries', Entry)