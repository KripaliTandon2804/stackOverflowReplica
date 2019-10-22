const express = require('express')
const router = express.Router()

const register = require('../routes/register')
router.post('/register' , register)

const login = require('../routes/login')
router.post('/login' , login)

module.exports = router