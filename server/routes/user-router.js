const express = require('express')
const UserCtrl = require('../controllers/user-ctrl')
const router = express.Router()

router.post('/register', UserCtrl.validateRegistration)
router.post('/login', UserCtrl.validateLogin)
router.delete('/admin/:id', UserCtrl.deleteUser)

module.exports = router