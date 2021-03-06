const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const path = require('path')
const { glossaryDB } = require('./db')
const entryRouter = require('./routes/entry-router')
const userRouter = require('./routes/user-router')

const app = express()
const apiPort = process.env.PORT || 8000

var corsOptions = {
  origin: ['http://localhost:3000', 'https://vast-peak-39324.herokuapp.com/'],
  credentials: true
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(express.json())

glossaryDB.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(passport.initialize())
require('./validation/passport')

app.use('/api', entryRouter)
app.use('/api/users', userRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    console.log(path.join(__dirname, 'client/build', 'index.html'))
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Environment not set as production, for some reason')
  })
}

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
