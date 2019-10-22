var dbLogin = require('../model/login')
var dbRegister = require('../model/register')
var moment = require('moment')
var jwt = require('jsonwebtoken')

var year = moment().format('YY')
var month = moment().format('MM')
var day = moment().format('DD')

var generateUserId = () => {
    return new Promise ((resolve , reject) => {
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
                            userId:USID,
                            email:logindata.email,
                            password:logindata.password
                        }).save((err , saved) => {
                            if(err){
                                res.json({
                                    success:false,
                                    msg: "Something went wrong."
                                })
                            }else{
                                var tokenData = {
                                    _id : saved._id,
                                    userId:saved.userId,
                                    name : saved.name,
                                    email:saved.email,
                                    phone:saved.phone
                                }
                                var token = jwt.sign(tokenData ,req.app.get('secretKey'))
                                res.json({
                                    success:true,
                                    msg:"Login successful",
                                    token:token
                                })
                            }
                        })
                    })
               
            }else{
                res.json({
                    success:false,
                    msg:"Incorrect Password"
                })
            }
        })
    }
}
