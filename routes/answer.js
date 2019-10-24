var dbQuestion = require ('../model/questions')

module.exports = (req,res) => {
    if(!req.body.questionId || !req.body.answer || !req.body.aName || !req.body.email){
        res.json({
            success:false,
            msg:"Please enter all the details"
        })
    }else{
        dbQuestion.findOne({questionId : req.body.questionId} , (err , questionData) => {
            if(err){
                res.json({
                    success:false,
                    msg:"Something went wrong."
                })
            }else if(!questionData || questionData == null){
                res.json({
                    success:false,
                    msg:"Question not found."
                })
            }else{
                let answers = {
                    answer:req.body.answer,
                    answeredBy : req.body.aName,
                    answerEmail : req.body.email,
                    answeredAt : new Date()
                }
                dbQuestion.updateOne({questionId : req.body.questionId} , {$push : {answers : answers}} , (err , update) => {
                    if(err){
                        res.json({
                            success:false,
                            msg:"Error Occured."
                        })
                    }else{
                        res.json({
                            success:true,
                            msg:"Answer Registered."
                        })
                    }
                })
            }
        })
    }
}