const mongoose = require('mongoose')
const Schema = mongoose.Schema

var question = new Schema ({
    questionId : String,
    post : String,
    upVote:Boolean,
    downVote:Boolean,
    createdBy:String,
    createdAt:Date,
    answers:[String]
})