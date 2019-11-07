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
            for (var i in data.downVote){
                if(data.downVote[i] === req.decoded.email){
                    var deleted = data.downVote.splice(i , 1)
                }
            }
            if(deleted){
                dbAnswer.findOneAndUpdate({_id : req.params.answerId} , {$addToSet : {upVote : req.decoded.email} , $set : {downVote : data.downVote}} , (err,updated) => {
                    if(err){
                        res.json({
                            success:false,
                            msg:"Please try again later"
                        })
                    }else{
                        res.json({
                            success:true,
                            msg:"Updated"
                        })
                    }
                })
            }else{
                dbAnswer.findOneAndUpdate({_id:req.params.answerId} , {$addToSet : {upVote : req.decoded.email}} ,(err, sUpdated) => {
                    if(err){
                        res.json({
                            success:false,
                            msg:"Error Occured"
                        })
                    }else{
                        res.json({
                            success:true,
                            msg:"Liked."
                        })
                    }
                })
            }
           }
        })                                 
   }
}