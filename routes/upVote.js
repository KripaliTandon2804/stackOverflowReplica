var dbQuestion = require('../model/questions')

module.exports = (req,res) => {
    if(!req.body.answerId || !req.body.uName || !req.body.uEmail){
        res.json({
            success:false,
            msg:"Something went wrong."
        })
    }else{
        dbQuestion.findOne({_id : req.body.answerId} , (err , liked) => {
            if(err){
                res.json({
                    success:false,
                    msg:"Please try again later."
                })
            }else if(!liked || liked == null){
                res.json({
                    success:false,
                    msg:"Answer not found."
                })
            }else{
                like = {
                    upVote:true,
                    upVotedBy:req.body.uName,
                    upVoteEmail:req.body.uEmail,
                    upVotedAt:new Date()
                }
                dbQuestion.findOneAndUpdate({_id : req.body.answerId} ,{$set : {'answers.upVote' : like}} , (err , u))
            }
        })
    }
}