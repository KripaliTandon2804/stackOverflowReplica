const express = require('express')
const router = express.Router()
const verify = require('../routes/tokenVerify')

const register = require('../routes/register')
router.post('/register' , register)

const login = require('../routes/login')
router.post('/login' , login)

const emailVerify = require('../routes/emailVerify')
router.post('/emailVerify' , verify , emailVerify)

const changePass = require('../routes/changePassword')
router.post('/changePassword' , verify , changePass)

const question = require('../routes/question')
router.post('/question' ,verify, question)

const answer = require('../routes/answer')
router.post('/answer/:id' , verify ,answer)

const upvote = require('../routes/upVote')
router.get('/upvote/:answerId' , verify ,upvote)

const downvote = require('../routes/downVote')
router.get('/downvote/:answerId' , verify , downvote)

module.exports = router