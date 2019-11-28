const config = require('../config/default')
const jwt = require('jsonwebtoken')

module.exports = auth = (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) {
        res.status(401).json({ msg: "User unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret)
        req.user = decoded
        next()
    } catch(e) {
        res.status(400).json({ msg: "Token not valid" })
    }
}

module.exports = auth