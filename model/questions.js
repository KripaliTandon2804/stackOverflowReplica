const mongoose = require('mongoose')
const Schema = mongoose.Schema

var question = new Schema ({
    questionId : String,
    userId:String,
    post : String,    
    createdBy:String,
    createdAt:Date,
})

module.exports = mongoose.model('question' , question)