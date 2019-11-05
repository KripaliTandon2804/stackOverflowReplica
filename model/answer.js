const mongoose = require('mongoose')
const Schema = mongoose.Schema

var answer = new Schema ({
    answerText : String,
    questionId:String,
    upVote:[String],
    downVote:[String],
    answerEmail:String,
    answeredAt: Date    
})

module.exports = mongoose.model('answer' ,answer)