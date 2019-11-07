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
                for (var i in udata.upVote){
                    if(udata.upVote[i] === req.decoded.email){
                        var deleted = udata.upVote.splice(i , 1)
                    }
                }
                console.log("^^^^^^^^^^",deleted)
                if(deleted){
                    dbAnswer.findOneAndUpdate({_id : req.params.answerId} , {$addToSet : {downVote : req.decoded.email},$set : {upVote : udata.upVote}} , (err , updated) => {
                        if(err){
                            res.json({
                                success:false,
                                msg:"Please try again"
                            })
                        }else{
                            res.json({
                                success:true,
                                msg:"Updated."
                            })
                        }
                    })
                }else{
                    dbAnswer.findOneAndUpdate({_id : req.params.answerId} , {$addToSet : {downVote : req.decoded.email}} , (err ,sUpdate) => {
                        if(err){
                            res.json({
                                success:false,
                                msg:"Error occured.",
                                err:err
                            })
                        }else{
                            res.json({
                                success:true,
                                msg:"Dislike."
                            })
                        }
                    })
                }
             
            }
        })
    }
}