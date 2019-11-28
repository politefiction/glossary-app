const mongoose = require('mongoose')
const config = require('../config/default')

const entryDB = mongoose.createConnection(
    config.entryMongoURI, { useUnifiedTopology: true, useNewUrlParser: true }
)

const adminDB = mongoose.createConnection(
    config.adminMongoURI, { useUnifiedTopology: true, useNewUrlParser: true }
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
    secret: config.jwtSecret
}