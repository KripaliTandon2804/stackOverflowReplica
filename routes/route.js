const express = require('express')
const router = express.Router()
const verify = require('../routes/tokenVerify')

const register = require('../routes/register')
router.post('/register' , register)

const login = require('../routes/login')
router.post('/login' , login)

const question = require('../routes/question')
router.post('/question' ,verify, question)

const answer = require('../routes/answer')
router.post('/answer' , verify ,answer)

module.exports = router