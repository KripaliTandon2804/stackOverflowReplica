const mongoose = require('mongoose')
const Schema = mongoose.Schema

var question = new Schema ({
    questionId : String,
    userId:String,
    post : String,    
    createdBy:String,
    createdAt:Date,
    answers: [{
        upVote:[{
            upVote:{
                type:Boolean,
                default:false
            },
            upVoteEmail:String,
            upVoteBy:String,
            upVoteAt:Date
        }],
        downVote:[{
            downVote:{
                type:Boolean,
                default:false
            },
            downVoteEmail:String,
            downVoteBy:String,
            downVoteAt:Date
        }],
        answer:String,
        answeredBy:String,
        answerEmail:String,
        answeredAt: Date,
    }]
})

module.exports = mongoose.model('question' , question)