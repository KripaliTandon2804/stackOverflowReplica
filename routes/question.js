var dbQuestion = require('../model/questions')
var year = moment().format('YY')
var month = moment().format('MM')
var day = moment().format('DD')

generateQuestionId = () => {
    return new promise ((resolve,reject) => {
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
                question
            })
        })
    }
}