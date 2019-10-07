const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const entryRouter = require('./routes/entry-router')

const app = express()
const apiPort = 3000

var corsOptions = {
    origin: 'http://localhost:8000',
    credentials: true
}

app.use(bodyParser.urlencoded({ extended:true }))
app.use(cors(corsOptions))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World! Testing, testing')
})

app.use('/api', entryRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))