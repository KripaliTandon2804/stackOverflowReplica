var dbAnswer = require('../model/answer')

module.exports = (req,res) => {
    if(!req.params.answerId){
        res.json({
            success : false,
            msg: "Please provide all the details"
        })
    }else{
        dbAnswer.findById({_id : req.params.answerId} ,(err ,udata) => {
            if(err){
                res.json({
                    success:false,
                    msg: "Something went wrong"
                })
            }else{
                dbAnswer.findOneAndUpdate({_id : req.params.answerId},{$push:{downVote : req.decoded.email}} ,(err,downvote) => {
                    if(err){
                        res.json({
                            success:false,
                            msg:"Please try again"
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