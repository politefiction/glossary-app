const mongoose = require('mongoose')
const config = require('../config/default')

const glossaryDB = mongoose.createConnection(config.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

try {
  glossaryDB
  console.log('Connected to glossaryDB')
} catch (error) {
  console.log(error)
}

module.exports = {
  glossaryDB,
  secret: config.jwtSecret
}
