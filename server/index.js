const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const { entryDB, adminDB } = require('./db')
const entryRouter = require('./routes/entry-router')
const adminRouter = require('./routes/admin-router')

const app = express()
const apiPort = 3000

var corsOptions = {
    origin: 'http://localhost:8000',
    credentials: true
}

app.use(bodyParser.urlencoded({ extended:true }))
app.use(cors(corsOptions))
app.use(bodyParser.json())

entryDB.on('error', console.error.bind(console, 'MongoDB connection error:'))
adminDB.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(passport.initialize())
require('./validation/passport')

app.use('/api', entryRouter)
app.use('/api/admin', adminRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))