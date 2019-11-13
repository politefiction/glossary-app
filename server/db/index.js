const mongoose = require('mongoose')


const entryDB = mongoose.createConnection(
    'mongodb://127.0.0.1:27017/entries', { useUnifiedTopology: true, useNewUrlParser: true }
)

const adminDB = mongoose.createConnection(
    'mongodb://127.0.0.1:27017/admin', { useUnifiedTopology: true, useNewUrlParser: true }
)

try {
    entryDB
    console.log('Connected to entryDB')
} catch (error) {
    console.log(error)
}

try {
    adminDB
    console.log('Connected to adminDB')
} catch (error) {
    console.log(error)
}

module.exports = { 
    entryDB, 
    adminDB,
    secretOrKey: "secret"
}