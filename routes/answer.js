var dbQuestion = require ('../model/questions')
var dbLogin = require('../model/login')
var dbAnswer = require('../model/answer')

module.exports = (req,res) => {
   dbLogin.findOne({email:req.decoded.email} , (err , uLogin) => {
       if(err){
           res.json({
               success:false,
               msg:"Something went wrong."
           })
       }else if(!uLogin || uLogin == null){
           res.json({
               success:false,
               msg:"User not found"
           })
       }else{
           //console.log('req data=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->>>', req.params.id)
           dbQuestion.findOne({questionId : req.params.id } , (err , uQuestion) => {
               //console.log("************" , uQuestion)
               if(err){
                   res.json({
                       success:false,
                       msg:"Error Occurred.",
                       err:err
                   })
               }else if(!uQuestion || uQuestion == null){
                   res.json({
                       success:false,
                       msg:"Question not found."
                   })
               }else{
                   new dbAnswer ({
                       questionId : uQuestion.questionId,
                       answerText : req.body.answerText,
                       answerEmail : req.decoded.email,
                       answeredAt : new Date()
                   }).save((err ,savedAns) => {
                       if(err){
                           res.json({
                               success:false,
                               msg:"Details not saved."
                           })
                       }else{
                           res.json({
                               success:true,
                               msg:"Answer saved.",
                               savedAns : savedAns
                           })
                       }
                   })
               }
           })
       }
   }) 
}