const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const { glossaryDB } = require('./db')
const entryRouter = require('./routes/entry-router')
const userRouter = require('./routes/user-router')

const app = express()
const apiPort = 8000

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(bodyParser.urlencoded({ extended:true }))
app.use(cors(corsOptions))
app.use(express.json())

glossaryDB.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(passport.initialize())
require('./validation/passport')

app.use('/api', entryRouter)
app.use('/api/users', userRouter)


app.listen(apiPort, () => 
    console.log(`Server running on port ${apiPort}`)
)