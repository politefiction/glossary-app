const mongoose = require('mongoose')
const config = require('../config/default')

const entryDB = mongoose.createConnection(
    config.entryMongoURI, { useUnifiedTopology: true, useNewUrlParser: true }
)

const userDB = mongoose.createConnection(
    config.userMongoURI, { useUnifiedTopology: true, useNewUrlParser: true }
)

try {
    entryDB
    console.log('Connected to entryDB')
} catch (error) {
    console.log(error)
}

try {
    userDB
    console.log('Connected to userDB')
} catch (error) {
    console.log(error)
}

module.exports = { 
    entryDB, 
    userDB,
    secret: config.jwtSecret
}