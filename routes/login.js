var dbLogin = require('../model/login')
var dbRegister = require('../model/register')
var moment = require('moment')

var year = moment().format('YY')
var month = moment().format('MM')
var day = moment().format('DD')

var generateUserId = () => {
    return new promise ((resolve , reject) => {
        var date = moment().format('DD-MM-YY')
        var acDate = moment(date , 'DD-MM-YY').toDate()
        dbLogin.count({} , (err , count) => {
            if(err){
                reject({
                    success:false,
                    msg:"Error while saving data."
                })
            }else{
                var newcount = count++
                var final = newcount > 9 ? "" + newcount : "0"+ newcount
                resolve('USID'+ year + month + day + final)
            }
        })
    })
}

module.exports = (req,res) => {
    if(!req.body.email || !req.body.password){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        dbRegister.findOne({email:req.body.email} , (err ,logindata) => {
            if(err){
                res.json({
                    success:false,
                    msg:"Please try again."
                })
            }else if(!logindata || logindata == null){
                res.json({
                    success:false,
                    msg:"Please register first."
                })
            }else if(logindata.password == req.body.password){
                

                generateUserId().then(USID => {
                    var date = moment().format('DD-MM-YY')
                    var acDate = moment(date , 'DD-MM-YY').toDate()
                    new dbLogin({
                        UserId:USID,
                        email:logindata.email,
                        password:logindata.password
                    })
                })
               
            }
        })
    }
}
