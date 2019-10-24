var dbQuestion = require('../model/questions')
const moment = require('moment')
var year = moment().format('YY')
var month = moment().format('MM')
var day = moment().format('DD')

generateQuestionId = () => {
    return new Promise ((resolve,reject) => {
        var date = moment().format('DD-MM-YY')
        var acDate = moment(date , 'DD-MM-YY').toDate()
        dbQuestion.count({} , (err,count) => {
            if(err){
                reject({
                    success:false,
                    msg:"Error while saving data."
                })
            }else{
                var newcount = count++
                var final = newcount > 9 ? "" + newcount : "0" + newcount
                resolve ('QUID' + year + month + day + final)
            }
        })
        
    })
}
module.exports = (req,res) => {
    if(!req.body.question){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        generateQuestionId().then(QUID => {
            var date = moment().format('DD-MM-YY')
            var acDate = moment(date,'DD-MM-YY').toDate()
            new dbQuestion({
                questionId : QUID,
                userId : req.decoded.userId,
                post : req.body.question,
                createdBy : req.decoded.name,
                createdAt : acDate
            }).save((err , savedPost) => {
                if(err){
                    res.json({
                        success:false,
                        msg:"Please try again after sometime."
                    })
                }else{
                    res.json({
                        success:true,
                        msg:"Question posted successfully.",
                        savedPost : savedPost
                    })
                }
            })
        })
    }
}