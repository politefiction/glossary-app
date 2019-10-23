const express = require('express')
const AdminCtrl = require('../controllers/admin-ctrl')
const router = express.Router()

router.post('/register', AdminCtrl.validateRegistration)
router.post('/login', AdminCtrl.validateLogin)

module.exports = router