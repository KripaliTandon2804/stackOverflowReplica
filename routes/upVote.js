var dbQuestion = require('../model/questions')
var dbLogin = require('../model/login')
var dbAnswer = require ('../model/answer')
module.exports = (req,res) => {
   if(!req.params.answerId){
       res.json({
           success:false,
           msg:"Please provide all the details."
       })
   }else{
       dbAnswer.findById({_id : req.params.answerId} , (err , data) => {
           if(err){
               res.json({
                   success:false,
                   msg:"Something went wrong"
               })
           }else{
               dbAnswer.findOneAndUpdate({_id : req.params.answerId},{$push : {upVote : req.decoded.email}} ,(err,uVote) => {
                   if(err){
                       res.json({
                           success:false,
                           msg:"Some error occured."
                       })
                   }else{
                        res.json({
                            success:true
                        })
                   }
               })
           }
       })
   }
}